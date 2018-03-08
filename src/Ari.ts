/**
 * A utility library for asterisk
 */
import * as ARI from 'ari-client';
import * as DEBUG from 'debug';

const debug = DEBUG('AST_MONGO:ari');

/** configuration to make Ari */
export interface AriConfigs {
    url: string;
    user: string;
    password: string;
}

/**
 * Ari provides some utility by Asterisk Restful Interface.
 */
export class Ari {

    private _configs: AriConfigs;
    private _ari?: any;

    constructor(configs: AriConfigs) {
        this._configs = configs;
    }

    protected get url(): string {
        return this._configs.url;
    }

    protected get user(): string {
        return this._configs.user;
    }

    protected get password(): string {
        return this._configs.password;
    }

    protected get ari() {
        if (!this._ari)
            throw new Error('not connected');
        return this._ari;
    }

    /**
     * connect a remort asterisk
     */
    async connect(): Promise<void> {
        debug(`connect to ${this.user}@${this.url}`);
        this._ari = await ARI.connect(this.url, this.user, this.password);
    }

    /**
     * disconnect from the remort asterisk
     */
    disconnect(): void {
        debug('disconnect');
        // this.ari.stop();
    }

    /**
     * get an endpoint status of the remote asterisk
     * @param id    is id for the endpoint you want
     */
    async getEndpointStatus(id: string, tech = 'PJSIP'): Promise<string> {
        let state: string;
        try {
            const endpoint = await this.ari.endpoints.get({
                resource: id,
                tech: tech,
            });
            state = endpoint.state;
        }
        catch (err) {
            if (!err.message)
                throw err;
            const message = JSON.parse(err.message);
            if (message.message != 'Endpoint not found')
                throw err;
            state = 'no endpoint';
        }
        debug(`status of ${tech}/${id} is '${state}'`);
        return state;
    }
}
