import { browser } from '@wdio/globals';
import safetyPage from '../pages/safety-page';
import heritage from '../pages/heritagePage';
import { getEnv } from '../helper/env/env';
getEnv();
import { clearStorage } from '../utils/clearSessions';
import { monitorNetwork } from '../utils/monitorNetwork';
import { waitForPageContents } from '../utils/waitForPageLoad';

describe('visual regression comparison', () => {
    beforeAll(async () => {
        await monitorNetwork(browser);
        await browser.url(process.env.BASEURL!);
        await browser.pause(2000);
        await clearStorage(browser);
        await browser.pause(2000);
        await safetyPage.waitUntilRender();
        await browser.pause(2000);
        await waitForPageContents(browser);
        await browser.pause(5000);
    })

    it('should compare an element with the baseline', async () => {
        await safetyPage.clickOnTab('heritage');
        const tagName='nilsbohlin';
        const imgElement = await heritage.getNilsbohlinImg(); 
        const result =await browser.checkElement(imgElement, tagName);
        expect(result).toBeLessThan(1);
    });


});