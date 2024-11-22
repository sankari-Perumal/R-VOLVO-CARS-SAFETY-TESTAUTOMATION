import { clickElement, isDisplay, getAttributeValue } from '../pages/helper.service'
import { compareArray, getArrayFromJson } from '../utils/utils';
export default class SafetyPage {
    // Selectors
    static logo = '#sitenav-topbar-wrapper nav div:nth-child(1) div a img';
    static acceptCookiesBtn = '//button[@id="onetrust-accept-btn-handler"]';
    static headerTabsRibbon = "#site-navigation";
    static headerTabsDiv = "#sitenav-topbar-section div ul li button span";
    static submenu = '//nav/div[3]/ul/li';
    static submenuOverview = '/a/em[text()="Overview"]';
    static submenuCultureVision = '/a/em[text()="Culture & vision"]';
    static submenuFeatures = '/a/em[text()="Features"]';
    static submenuChildsafety = '/a/em[text()="Child safety"]';
    static submenuResearch = '/a/em[text()="Research"]';
    static submenuHeritage = '/a/em[text()="Heritage"]';
    static submenuParentAttribute = '/parent::a';
    static safetyHeader = '[data-testid="ModelIntro:model"]';

    public static async getLogo() {
        const element = await $(this.headerTabsRibbon).shadow$(this.logo);
        await element.waitForDisplayed();
        return await element;
    }
    public static async getacceptCookiesBtn() {
        const element = await $(this.acceptCookiesBtn);
        await element.waitForDisplayed();
        return await element;
    }

    public static async getSubMenuOverview() {
        return await $(this.submenu.concat(this.submenuOverview));
    }

    public static async clickOverview() {
        await clickElement(await this.getSubMenuOverview());
    }
    public static async getsubmenuCultureVision() {
        return await $(this.submenu.concat(this.submenuCultureVision));
    }
    public static async getsubmenuFeatures() {
        return await $(this.submenu.concat(this.submenuFeatures));
    }
    public static async getSubMenuChildSafety() {
        return await $(this.submenu.concat(this.submenuChildsafety));
    }

    public static async getsubmenuResearch() {
        return await $(this.submenu.concat(this.submenuResearch));
    }
    public static async getsubmenuHeritage() {
        return await $(this.submenu.concat(this.submenuHeritage));
    }

    public static async getOverviewParentTag() {
        return await $(this.submenu.concat(this.submenuOverview.concat(this.submenuParentAttribute)));
    }

    public static async getSafetyHeader() {
        return await $(this.safetyHeader);
    }

    public static async waitUntilRender() {
        await this.acceptCookies();
        expect((await this.getLogo)).toBeTruthy();
    }


    public static async acceptCookies() {
        const cookiesDisplay: boolean = await isDisplay((await this.getacceptCookiesBtn()));
        if (cookiesDisplay) {
            await clickElement(await this.getacceptCookiesBtn());
        }
    }

    public static async verifyLogoDisplay() {
        return await isDisplay(await this.getLogo());
    }

    public static async validateHeaderTabs(headerArray: any) {
        const headersFromUI: string[] = await this.getHeaderTabs(this.headerTabsRibbon, this.headerTabsDiv);
        const headers = await getArrayFromJson(headerArray);
        console.log('*************HEADERS FROM UI*************', headersFromUI);
        console.log('*************HEADERS FROM TEST DATA*************', headers);
        return compareArray(headersFromUI, headers);
    }

    public static async validateSubTabs(headerArray: any) {
        const headersFromUI: string[] = await this.getSubTabs();
        const headers = await getArrayFromJson(headerArray);
        console.log('*************SUB HEADERS FROM UI*************', headersFromUI);
        console.log('*************SUB HEADERS FROM TEST DATA*************', headers);
        return compareArray(headersFromUI, headers);
    }

    public static async getHeaderTabs(rooElementLocator: string, shadowElementLocator: string): Promise<string[]> {
        const element = await $(rooElementLocator).shadow$$(shadowElementLocator)
        let headerArray: string[] = await this.getAllContent(element);
        return headerArray;
    }
    public static async getSubTabs(): Promise<string[]> {
        const element = await $$(this.submenu);
        let subMenu: string[] = await this.getAllContent(element);
        return subMenu;
    }

    public static async getAllContent(element: ChainablePromiseElement) {
        let headerArray: string[];
        headerArray = new Array();
        for (let i = 0; i < element.length; i++) {
            headerArray.push(await element[i].getText());
        }
        console.log('*************CONTENTS FETCHED FROM UI*************', headerArray);
        return headerArray;
    }


    public static async clickCultureVision() {
        await clickElement(await this.getsubmenuCultureVision());
    }
    public static async clickFeatures() {
        await clickElement(await this.getsubmenuFeatures());
    }
    public static async clickChildsafety() {
        await clickElement(await this.getSubMenuChildSafety());
    }
    public static async clickResearch() {
        await clickElement(await this.getsubmenuResearch());
    }

    public static async clickHeritage() {
        await clickElement(await this.getsubmenuHeritage());
    }

    public static async isActiveStage() {
        let activeStage: boolean = false;
        const isAttributePresent = await getAttributeValue(this.getOverviewParentTag, 'data-active');
        if (isAttributePresent == 'true') {
            activeStage = true;
        }
        return activeStage;
    }

    public static async clickOnTab(tabName: string) {
        switch (tabName.toLowerCase()) {
            case 'overview':
                await this.clickOverview();
                break;
            case 'culturevision':
                await this.clickCultureVision();
                break;
            case 'features':
                await this.clickFeatures();
                break;
            case 'childsafety':
                await this.clickChildsafety();
                break;
            case 'reasearch':
                await this.clickResearch();
                break;
            case 'heritage':
                await this.clickHeritage();
                break;

            default:
                throw new Error(`Please check the passed ${tabName} tab name`);
        }
        await browser.pause(3000);
    }

    public static async safetyHeadeDisplay() {
        await browser.pause(3000);
        return await isDisplay(await this.getSafetyHeader());
    }
}
