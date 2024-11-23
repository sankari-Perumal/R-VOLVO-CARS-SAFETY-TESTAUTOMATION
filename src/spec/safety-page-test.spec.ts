import { browser } from '@wdio/globals';
import safetyPage from '../pages/safety-page';
import overviewPage from '../pages/overview-page';
import cultureAndVisionPage from '../pages/cultureAndVisionPage';
import featuresPage from '../pages/featuresPage';
import childSafetyPage from '../pages/childSafetyPage';
import reasearchPage from '../pages/reasearchPage';
import heritagePage from '../pages/heritagePage';
import testData from '../test-data/testData.json';
import { getEnv } from '../helper/env/env';
getEnv();
import { clearStorage } from '../utils/clearSessions';
import { monitorNetwork } from '../utils/monitorNetwork';
import { waitForPageContents } from '../utils/waitForPageLoad';
import { scrollToBottomOfThePage } from '../pages/helper.service';

describe('Verify safety page', () => {

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

    it('should launch and display application logo', async () => {
        expect(await safetyPage.verifyLogoDisplay()).toBeTruthy();
    })

    it('should display all the header tabs', async () => {
        expect(await safetyPage.verifyLogoDisplay()).toBeTruthy();
        expect(await safetyPage.validateHeaderTabs(testData.elementsText.headerTabs)).toBeTrue();
    })

    it('should display all the sub menus', async () => {
        expect(await safetyPage.validateSubTabs(testData.elementsText.subTabs)).toBeTrue();
    })

    it('should navigate and display urls and banner content', async () => {
        expect(await browser.getUrl()).toBe(testData.url.root.concat(testData.url.overview));
        expect(await overviewPage.overviewInfoContent()).toContain(testData.elementsText.overviewBannerText);
        await safetyPage.clickOnTab('culturevision')
        expect(await browser.getUrl()).toBe(testData.url.root.concat(testData.url.cultureVision));
        expect(await cultureAndVisionPage.cultureAndVisonInfoContent()).toContain(testData.elementsText.cultureAndVisionBannerText);
        await safetyPage.clickOnTab('features');
        expect(await browser.getUrl()).toBe(testData.url.root.concat(testData.url.features));
        expect(await featuresPage.featuresInfoContent()).toContain(testData.elementsText.featuresBannerText);
        await safetyPage.clickOnTab('childsafety');
        expect(await browser.getUrl()).toBe(testData.url.root.concat(testData.url.childsafety));
        expect(await childSafetyPage.childsafetyInfoContent()).toContain(testData.elementsText.childSafetyBannerText);
        await safetyPage.clickOnTab('reasearch');
        expect(await browser.getUrl()).toBe(testData.url.root.concat(testData.url.research));
        expect(await reasearchPage.researchInfoContent()).toContain(testData.elementsText.researchBannerText);
        await safetyPage.clickOnTab('heritage');
        expect(await browser.getUrl()).toBe(testData.url.root.concat(testData.url.heritage));
        expect(await heritagePage.heritageInfoContent()).toContain(testData.elementsText.heritageBannerText);
    })

    it('should display back to top button and should function properly', async () => {
        await safetyPage.clickOnTab('overview');
        await scrollToBottomOfThePage();
        expect(await overviewPage.backToTopElementDisplay()).toBeTrue();
        await overviewPage.backToTopAction();
        expect(await safetyPage.safetyHeadeDisplay()).toBeTrue();
    })

    it('should display all recharge models at the bottom of the page', async () => {
        expect(await safetyPage.isAllRechargeModelsPanelDisplay()).toBeTrue();
        expect(await safetyPage.getAllRechargeModelsHeaderContent()).toContain(testData.elementsText.allRechargeModelsHeader);
        expect(await safetyPage.isPrevButtonDisplay()).toBeTrue();
        expect(await safetyPage.isNxtButtonDisplay()).toBeTrue();
        expect(await safetyPage.isAllModelsDisplay()).toBeTrue();
    })
});