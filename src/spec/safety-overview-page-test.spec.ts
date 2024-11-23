import { browser } from '@wdio/globals';
import { getEnv } from '../helper/env/env';
import safetyPage from '../pages/safety-page';
import overViewPage from '../pages/overview-page';
import testData from '../test-data/testData.json';
import { clearStorage } from '../utils/clearSessions';
import { monitorNetwork } from '../utils/monitorNetwork';
import { waitForPageContents } from '../utils/waitForPageLoad';

getEnv();

describe('Verify Overview section', () => {
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

    it('should display proper overview content', async () => {
        expect(await overViewPage.overviewInfoContent()).toContain(testData.elementsText.overviewBannerText);
    });

    it('should the man with volvo image is visible on the page',async()=>{
        expect(await (overViewPage.imgIsDisplayed())).toBeTruthy();
        expect(await (overViewPage.imgAltText())).toBe(testData.elementsText.manWithVolvoAltTxt);
        expect(await (overViewPage.imgSrc())).toBe(testData.elementsText.manWithVolvoSrc);
    })
});