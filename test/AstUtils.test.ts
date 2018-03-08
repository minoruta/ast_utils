import { AstUtils } from '../src/AstUtils';

let asterisk: AstUtils;

describe('AstUtils.utils', () => {
    test ('connect to asterisk', async () => {
        asterisk = new AstUtils({
            host: '127.0.0.1',
            ari: {
                protocol: 'http',
                port: 8088,
                username: 'asterisk',
                password: 'asterisk'
            },
            ami: {
                port: 5038,
                username: 'asterisk',
                password: 'asterisk'
            }
        });
        await asterisk.connect();
    });
    test ('reload dialplan', async () => {
        const response = await asterisk.reloadDialPlan();
        expect(response).toMatchSnapshot();
    });

    test ("get status of an unknown endpoint", async () => {
        const result = await asterisk.getEndpointStatus('1234567890');
        expect(result).toBe('no endpoint');
    });

    test ("get status of a valid endpoint", async () => {
        const result = await asterisk.getEndpointStatus('6001');
        expect(result).toBe('offline');
    });

    test ("get list of a endpoints", async () => {
        const result = await asterisk.exec('core show codecs');
        expect(result).toMatchSnapshot();
    });

    test ("call with sound", async () => {
        const response = await asterisk.callWithSound('6001', 'hello');
        expect(response).toMatchSnapshot();
    });

    test ('restart asterisk', async () => {
        await asterisk.restart();
    });

    test ('disconnet from the remote asterisk', async () => {
        await asterisk.disconnect();
    });
});
