
import * as EventEmitter from 'events';

export = AmiClient;

declare class AmiClient extends EventEmitter {
    constructor(...args: any[]);

    action(...args: any[]): Promise<any>;

    connect(...args: any[]): Promise<any>;

    disconnect(...args: any[]): void;

    option(...args: any[]): void;

    options(...args: any[]): void;

    send(...args: any[]): void;

    write(...args: any[]): void;

    static defaultMaxListeners: number;

    static init(): void;

    static listenerCount(emitter: any, type: any): any;

    static usingDomains: boolean;

}

declare namespace AmiClient {

    // namespace init {
    //     const prototype: {
    //     };
    //
    // }
    //
    // namespace listenerCount {
    //     const prototype: {
    //     };
    //
    // }

    // namespace prototype {
    //     const connection: any;
    //
    //     const domain: any;
    //
    //     const isConnected: any;
    //
    //     const lastAction: any;
    //
    //     const lastEvent: any;
    //
    //     const lastResponse: any;
    //
    //     function action(...args: any[]): void;
    //
    //     function addListener(type: any, listener: any): any;
    //
    //     function connect(...args: any[]): void;
    //
    //     function disconnect(...args: any[]): void;
    //
    //     function emit(type: any, ...args: any[]): any;
    //
    //     function eventNames(): any;
    //
    //     function getMaxListeners(): any;
    //
    //     function listenerCount(type: any): any;
    //
    //     function listeners(type: any): any;
    //
    //     function on(type: any, listener: any): any;
    //
    //     function once(type: any, listener: any): any;
    //
    //     function option(...args: any[]): void;
    //
    //     function options(...args: any[]): void;
    //
    //     function prependListener(type: any, listener: any): any;
    //
    //     function prependOnceListener(type: any, listener: any): any;
    //
    //     function removeAllListeners(type: any, ...args: any[]): any;
    //
    //     function removeListener(type: any, listener: any): any;
    //
    //     function send(...args: any[]): void;
    //
    //     function setMaxListeners(n: any): any;
    //
    //     function write(...args: any[]): void;
    //
    //     namespace addListener {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace emit {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace eventNames {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace getMaxListeners {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace listenerCount {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace listeners {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace on {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace once {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace prependListener {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace prependOnceListener {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace removeAllListeners {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace removeListener {
    //         const prototype: {
    //         };
    //
    //     }
    //
    //     namespace setMaxListeners {
    //         const prototype: {
    //         };
    //
    //     }
    //
    // }
    //
}
