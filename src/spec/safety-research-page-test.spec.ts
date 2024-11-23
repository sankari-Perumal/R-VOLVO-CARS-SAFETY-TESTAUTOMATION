import { browser } from '@wdio/globals';
import { getEnv } from '../helper/env/env';
import safetyPage from '../pages/safety-page';
import reasearchPage from '../pages/reasearchPage';
import { clearStorage } from '../utils/clearSessions';
import { monitorNetwork } from '../utils/monitorNetwork';
import { waitForPageContents } from '../utils/waitForPageLoad';

getEnv();

describe('Verify Research page', () => {
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
        await safetyPage.clickOnTab('reasearch');
    })

    it('should display video with its appropriate attributes', async () => {
        await safetyPage.clickOnTab('reasearch');
        await browser.pause(5000);
        expect(await reasearchPage.verifyVideoDisplay()).toBeTrue();
        expect(await reasearchPage.verifyWatchFilmBtnDisplay()).toBeTrue();
        expect(await reasearchPage.verifyPauseBtnDisplay()).toBeTrue();
        await safetyPage.clickOnTab('heritage');
    })

    it('show more should expand area and display showless action', async () => {
        await safetyPage.clickOnTab('reasearch');
        expect(await reasearchPage.verifyShowMoreBtnDisplay()).toBeTrue();
        await reasearchPage.clickShowMoreBtn();
        expect(await reasearchPage.verifyQuetionaryAreaExpand()).toBe('true');
        expect(await reasearchPage.verifyShowLessBtn()).toBeTrue();
    })
});