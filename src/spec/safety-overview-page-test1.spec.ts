import { browser } from '@wdio/globals';
import { getEnv } from '../helper/env/env';
import safetyPage from '../pages/safety-page';
import overViewPage from '../pages/overview-page';
import testData from '../test-data/testData.json';

getEnv();
describe('Verify Overview section', () => {

    beforeAll(async () => {
        await browser.url(process.env.BASEURL!);
        await safetyPage.waitUntilRender();
    })

    it('should display Overview as a default tab', async () => {
        expect(await safetyPage.isActiveStage()).toBeTrue();
    });

    it('should display proper overview content', async () => {
        expect(await overViewPage.overviewInfoContent()).toContain(testData.elementsText.overviewContent);
    });

    it('should the man with volvo image is visible on the page',async()=>{
        expect(await (overViewPage.imgIsDisplayed())).toBeTruthy();
        expect(await (overViewPage.imgAltText())).toBe(testData.elementsText.manWithVolvoAltTxt);
        expect(await (overViewPage.imgSrc())).toBe(testData.elementsText.manWithVolvoSrc);
    })
});

describe('Verify Overview section1', () => {

    beforeAll(async () => {
        await browser.url(process.env.BASEURL!);
        await safetyPage.waitUntilRender();
    })

    it('should display Overview as a default tab', async () => {
        expect(await safetyPage.isActiveStage()).toBeTrue();
    });

    it('should display proper overview content', async () => {
        expect(await overViewPage.overviewInfoContent()).toContain(testData.elementsText.overviewContent);
    });

    it('should the man with volvo image is visible on the page',async()=>{
        expect(await (overViewPage.imgIsDisplayed())).toBeTruthy();
        expect(await (overViewPage.imgAltText())).toBe(testData.elementsText.manWithVolvoAltTxt);
        expect(await (overViewPage.imgSrc())).toBe(testData.elementsText.manWithVolvoSrc);
    })
});