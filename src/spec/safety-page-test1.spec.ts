import { browser } from '@wdio/globals';
import { getEnv } from '../helper/env/env';
import safetyPage from '../pages/safety-page';
import testData from '../test-data/testData.json';

getEnv();
describe('Verify safety page', () => {

    beforeAll(async () => {
        await browser.url(process.env.BASEURL!);
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