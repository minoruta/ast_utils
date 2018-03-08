/**
 * A utility library for asterisk
 */
import * as AmiClient from 'asterisk-ami-client';
import * as DEBUG from 'debug';

const debug = DEBUG('AST_MONGO:ami');

/** configuration to make Ari */
export interface AmiConfigs {
    user: string;
    secret: string;
    host: string;
    port: number;
}

export interface AmiResponse {
  Message: string;
  Output: string;
  Response: string;
}

class Timeout {
    private static readonly DEFAULT_TIMEOUT = 100 * 1000; // msec
    private readonly _saved: number;
    constructor(timeout = Timeout.DEFAULT_TIMEOUT) {
        this._saved = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    }
    end(): void {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = this._saved;
    }
}

/**
 * Ami provides some utility by Asterisk Management Interface.
 */
export class Ami extends AmiClient {

    private _configs: AmiConfigs;

    /**
     * @param configs    is configuration to make Ami
     */
    constructor(configs: AmiConfigs) {
        super({
            reconnect: true,
            keepAlive: true
        });
        this._configs = configs;
    }

    protected get user(): string {
        return this._configs.user;
    }

    protected get secret(): string {
        return this._configs.secret;
    }

    protected get dst(): { host: string, port: number } {
        return {
            host: this._configs.host,
            port: this._configs.port
        };
    }

    /**
     * connect a remort asterisk
     */
    connect(): Promise<void> {
        debug(`connect to ${this.user}@${this.dst.host}:${this.dst.port}`);
        return super.connect(this.user, this.secret, this.dst);
    }

    /**
     * disconnect from the remote server
     */
    disconnect(): void {
        debug('disconnect');
        super.disconnect();
    }

    exec(command: string): Promise<AmiResponse> {
        debug(`exec '${command}'`);
        return super.action({
            Action: 'Command',
            Command: command
        }, true);
    }

    /**
     * let a remote asterisk reload dial plan
     */
    reloadDialPlan(): Promise<AmiResponse> {
        return this.exec('dialplan reload');
    }

    /**
     * execute 'core reload'
     * @return after the command has been executed.
     */
    reload(): Promise<AmiResponse> {
        return this.exec('core reload');
    }

    /**
     * let a remote asterisk-self restart
     * @param when  ['now'|'gracefully'|'when convenient '], the default is 'now'
     * @return when the connection has been reestablished.
     */
    restart(when = 'now'): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            debug('restart');
            const timer = new Timeout();
            super.once('reconnection', () => {
                debug('reconnected');
                timer.end();
                resolve();
            });
            this.exec(`core restart ${when}`)
            .then(response => debug(response))
            .catch((err: any) => {
                if (err.message !== 'Client disconnected.') {
                    timer.end();
                    super.removeAllListeners();
                    return reject(err);
                }
                debug('disconnected');
            });
        });
    }

    /**
     * let a remote server call to callee with specified sound
     * @param callee    id of callee
     * @param sound     sound file to play while calling
     * @param tech      default is 'PJSIP'
     */
    callWithSound(callee: string, sound: string, tech = 'PJSIP'): Promise<AmiResponse> {
        return this.exec(`channel originate ${tech}/${callee} application playback ${sound}`);
    }
}
