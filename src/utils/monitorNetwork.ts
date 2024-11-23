
import { Protocol } from 'devtools-protocol';

export const monitorNetwork = async (browser: WebdriverIO.Browser) => {
    await browser.cdp('Network', 'enable');
};

export const monitorNetworkResponse = async (browser: WebdriverIO.Browser) => {
    await browser.cdp('Network', 'responseReceived', async (params: Protocol.Network.ResponseReceivedEvent) => {
        if (params.response.url.includes('.woff2') || params.response.url.includes('.jpg')) {
            console.log(`Resource URL: ${params.response.url}, Status: ${params.response.status}`);
        }
    });
    console.log('***************NETWORK MONITERING STARTED***************');
};