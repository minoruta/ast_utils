/**
 * A utility library for asterisk
 */
import { Ari, AriConfigs } from './Ari';
import { Ami, AmiConfigs, AmiResponse } from './Ami';
import * as DEBUG from 'debug';

const debug = DEBUG('AST_MONGO:utils');

/** configuration to make AstUtils */
export interface AstUtilsConfg {
    host: string;
    ari: {
        protocol: string;
        port: number;
        username: string;
        password: string;
    };
    ami: {
        port: number;
        username: string;
        password: string;
    };
}

export type AstUtilsResponse = AmiResponse;

/**
 * AstUtils provides convenient functions to test ast_mongo.
 */
export class AstUtils {

    private _ari?: Ari;
    private _ami?: Ami;

    protected get ari(): Ari {
        if (!this._ari)
            throw new Error('no valid ari');
        return this._ari;
    }

    protected get ami(): Ami {
        if (!this._ami)
            throw new Error('no valid ami');
        return this._ami;
    }

    /**
     * @param config    is configuration to make AstUtils
     */
    constructor(config: AstUtilsConfg) {
        this._ari = new Ari({
            url: `${config.ari.protocol}://${config.host}:${config.ari.port}`,
            user: config.ari.username,
            password: config.ari.password
        });
        this._ami = new Ami({
            host: config.host,
            port: config.ami.port,
            user: config.ami.username,
            secret: config.ami.password
        });
    }

    /**
     * connect a remort asterisk
     */
    async connect(): Promise<void> {
        await this.ari.connect();
        await this.ami.connect();
    }

    /**
     * disconnect from the remort asterisk
     */
    disconnect(): void {
        this.ari.disconnect();
        this.ami.disconnect();
    }

    /**
     * get an endpoint status of the remote asterisk
     * @param id    is id for the endpoint you want
     */
    getEndpointStatus(id: string): Promise<string> {
        return this.ari.getEndpointStatus(id);
    }

    /**
     * exec the specified command
     */
    exec(command: string): Promise<AstUtilsResponse> {
        debug('exec', command);
        return this.ami.exec(command);
    }

    /**
     * let a remote asterisk reload dial plan
     */
    reloadDialPlan(): Promise<AstUtilsResponse> {
        debug('reloadDialPlan');
        return this.ami.reloadDialPlan();
    }

    /**
     * execute 'core reload'
     * @param timer time to wait after the command has been executed, default is 1000msec.
     * @return  when the spcified timer has been expired
     *          after 'core reload' command is executed.
     */
    async reload(timer = 1000): Promise<void> {
        debug('reload', timer);
        await this.ami.reload();
        return new Promise<void>(resolve => setTimeout(resolve, timer));
    }

    /**
     * let a remote asterisk-self restart
     * @param timer time to wait after reconnection, default is 1000msec.
     * @return  when the spcified timer has been expired
     *          after a connection is reestablished.
     */
    async restart(timer = 1000): Promise<void> {
        debug('restart', timer);
        await this.ami.restart();
        return new Promise<void>(resolve => setTimeout(resolve, timer));
    }

    /**
     * let a remote server call to callee with specified sound
     * @param callee    id of callee
     * @param sound     sound file to play while calling
     */
    callWithSound(callee: string, sound: string): Promise<AstUtilsResponse> {
        debug('callWithSound', callee, sound);
        return this.ami.callWithSound(callee, sound);
    }
}
