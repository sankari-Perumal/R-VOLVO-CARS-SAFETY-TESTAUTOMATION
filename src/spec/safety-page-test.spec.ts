import { browser } from '@wdio/globals';
import safetyPage from '../pages/safety-page';
import testData from '../test-data/testData.json';
import { getEnv } from '../helper/env/env';
getEnv();

describe('Verify safety page', () => {

    beforeAll(async () => {
        await browser.saveScreenshot('error0.png');
        // await browser.url(testData.BASEURL);
        await browser.url(process.env.BASEURL!);
        await browser.saveScreenshot('error1.png');
        console.log('*******************************', await browser.getTitle());
        await browser.saveScreenshot('error2.png');
        console.log('*******************************', await browser.getUrl());
        await browser.saveScreenshot('error3.png');
        await safetyPage.waitUntilRender();
    })

    it('should launch and display application logo', async () => {
        expect(safetyPage.verifyLogoDisplay()).toBeTruthy();
    })

    it('should display all the header tabs', async () => {
        expect(safetyPage.verifyLogoDisplay()).toBeTruthy();
        expect(await safetyPage.validateHeaderTabs(testData.elementsText.headerTabs)).toBeTrue();
    })

    it('should display all the sub menus', async () => {
        expect(await safetyPage.validateSubTabs(testData.elementsText.subTabs)).toBeTrue();
    })
});