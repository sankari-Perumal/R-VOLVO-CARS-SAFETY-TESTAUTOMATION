import { clickElement, isDisplay, shadowElements, elements, getAttributeValue, shadowElement } from '../pages/helper.service'
import { compareArray, getArrayFromJson } from '../utils/utils';

export default class SafetyPage {
    // Selectors
    static logo = '#sitenav-topbar-wrapper nav div:nth-child(1) div a img';
    static acceptCookiesBtn = '[id="onetrust-accept-btn-handler"]';
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

    public static async waitUntilRender() {
        await this.acceptCookies();
        const element = await shadowElement(this.headerTabsRibbon, this.logo);
        expect((element)).toBeTruthy();
    }

    public static async acceptCookies() {
        const cookiesDisplay: boolean = await isDisplay((this.acceptCookiesBtn));
        if (cookiesDisplay) {
            await clickElement(this.acceptCookiesBtn);
        }
    }

    public static verifyLogoDisplay() {
        return isDisplay(this.logo);
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
        const element = await shadowElements(rooElementLocator, shadowElementLocator);
        let headerArray: string[] = await this.getAllContent(element);
        return headerArray;
    }
    public static async getSubTabs(): Promise<string[]> {
        const element = await elements(await this.submenu);
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

    public static async clickOverview() {
        await clickElement(this.submenu.concat(this.submenuOverview));
    }
    public static async clickCultureVision() {
        await clickElement(this.submenu.concat(this.submenuCultureVision));
    }
    public static async clickFeatures() {
        await clickElement(this.submenu.concat(this.submenuFeatures));
    }
    public static async clickChildsafety() {
        await clickElement(this.submenu.concat(this.submenuChildsafety));
    }
    public static async clickResearch() {
        await clickElement(this.submenu.concat(this.submenuResearch));
    }

    public static async clickHeritage() {
        await clickElement(this.submenuHeritage);
    }

    public static async isActiveStage() {
        let activeStage: boolean = false;
        const isAttributePresent = await getAttributeValue(this.submenu.concat(this.submenuOverview.concat(this.submenuParentAttribute)));
        if (isAttributePresent == 'true') {
            activeStage = true;
        }
        return activeStage;
    }
}
