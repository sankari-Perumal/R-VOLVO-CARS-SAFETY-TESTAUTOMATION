import { isDisplay, getText, getAttributeValue, clickElement } from './helper.service'

export default class SafetyPage {
    
    static overviewInfo = '[data-auto-id="aboutUsModelIntro-2-0"] [data-testid="ModelIntro:description"]';
    static manWithVolvoImg = '[id="aboutUsPromotionalHero-3-0"] div div picture img';
    static backToTopRoot = '[id="vcc-site-footer"]';
    static backToTopBtn = '[id="vcc-site-footer-shadow-container"] [data-autoid="footer:backToTop"]';

    public static async getOverviewInfo() {
        const element = await $(this.overviewInfo);
        await element.waitForDisplayed();
        return element;
    }

    public static async getManWithVolvoImg() {
        const element = await $(this.manWithVolvoImg);
        await element.waitForDisplayed();
        return element;
    }

    public static async getBackToTopBtn() {
        const element = await $(this.backToTopRoot).shadow$(this.backToTopBtn);
        await element.waitForDisplayed();
        return element;
    }

    public static async overviewInfoContent() {
        await isDisplay(await this.getOverviewInfo());
        return getText(await this.getOverviewInfo());
    }

    public static async imgIsDisplayed() {
        return isDisplay(await this.getManWithVolvoImg());
    }

    public static async imgAltText() {
        return getAttributeValue(await this.getManWithVolvoImg(), 'alt');
    }

    public static async imgSrc() {
        return getAttributeValue(await this.getManWithVolvoImg(), 'src');
    }

    public static async backToTopAction() {
        await clickElement(await this.getBackToTopBtn());
        await browser.pause(3000);
    }

    public static async backToTopElementDisplay() {
       return await isDisplay(await this.getBackToTopBtn());
    }
}
