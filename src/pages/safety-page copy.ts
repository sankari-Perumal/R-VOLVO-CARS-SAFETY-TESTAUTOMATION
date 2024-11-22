import { clickElement, isDisplay, getAttributeValue, getText } from '../pages/helper.service'
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
    static ourCarsTopmenu = '#sitenav-topbar-section div ul li:nth-child(1) button span';
    static topMenuPanelCloseBtn = '[data-autoid="sitenav-carsmenu-close-button"]';
    static ourCarsPanel = '[id="sitenav-topbar-carsMenu"]';
    static allRechargeModelPanel = '[data-auto-id="aboutUsCarCarousel-0-3"]';
    static allRechargeModelPanelHeader = '.stack-16 > h2';
    static allRechargeModelPanelTabs = 'div div:nth-child(1) button';
    static prevBtn = '[data-autoid="carousel-prev-button"]';
    static nxtBtn = '[data-autoid="carousel-next-button"]';
    static modelList = '[id=":r0:"]';
    static modelImg = '[data-autoid="carousel:card"]';
   
    // Elements
    public static async getLogo() {
        const element = await $(this.headerTabsRibbon).shadow$(this.logo);
        await element.waitForDisplayed();
        return element;
    }
    public static async getacceptCookiesBtn() {
        const element = await $(this.acceptCookiesBtn);
        await element.waitForDisplayed();
        return element;
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

    public static async getSubMenuOverview() {
        return await $(this.submenu.concat(this.submenuOverview));
    }

    public static async getOverviewParentTag() {
        return await $(this.submenu.concat(this.submenuOverview.concat(this.submenuParentAttribute)));
    }

    public static async getSafetyHeader() {
        return await $(this.safetyHeader);
    }

    public static async getOurCars() {
        const element = await $(this.headerTabsRibbon).shadow$(this.ourCarsTopmenu);
        await element.waitForDisplayed();
        return element;
    }

    public static async getCloseBtn() {
        const element = await $(this.headerTabsRibbon).shadow$(this.topMenuPanelCloseBtn);
        await element.waitForDisplayed();
        return element;
    }

    public static async getOurCarsPanel() {
        const element = await $(this.headerTabsRibbon).shadow$(this.ourCarsPanel);
        await element.waitForDisplayed();
        return element;
    }

    public static async isAllRechargeModelsPanelDisplay() {
       return await $(this.allRechargeModelPanel).isDisplayed();
    }

    public static async getAllRechargeModelsHeader() {
        const element = await $(this.allRechargeModelPanelHeader);
        await element.waitForDisplayed();
        return await element;
    }

    public static async getPrevBtn() {
        const element = await $(this.prevBtn);
        await element.waitForDisplayed();
        return await element;
    }

    public static async getNxtBtn() {
        const element = await $(this.nxtBtn);
        await element.waitForDisplayed();
        return await element;
    }


    public static async getAllRechargeModelsHeaderContent() {
        return await getText(await this.getAllRechargeModelsHeader());

    }

    public static async isAllModelsDisplay() {
        return await $$(this.modelImg).length == 9 ? true : false;
    }


    //click
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

    public static async clickOverview() {
        await clickElement(await this.getSubMenuOverview());
    }

    public static async ourCarsClick() {
        await browser.pause(3000);
        await clickElement(await this.getOurCars());
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




    public static async isActiveStage() {
        let activeStage: boolean = false;
        const isAttributePresent = await getAttributeValue(await this.getOverviewParentTag, 'data-active');
        console.log(await isAttributePresent,'shdasdha7777777777777777777777777777');
        if (await isAttributePresent == 'true') {
            activeStage = true;
        }
        return activeStage;
    }



    public static async safetyHeadeDisplay() {
        await browser.pause(3000);
        return await isDisplay(await this.getSafetyHeader());
    }



    public static async verifyCloseBtnDisplay() {
        return await isDisplay(await this.getCloseBtn());
    }


    public static async verifyPanelDisplay() {
        return await getAttributeValue(await this.getOurCarsPanel(), 'aria-hidden');
    }
    // public static async closeBtnClick() {
    //     await clickElement(await this.getCloseBtn());
    // }


    // public static async isAllRechargeModelPanelDisplay() {
    //     return await (await this.getAllRechargeModelsPanesl()).isDisplayed();
    // }

    public static async isPrevButtonDisplay() {
        return await isDisplay(await this.getPrevBtn());
    }


    public static async isNxtButtonDisplay() {
        return await isDisplay(await this.getNxtBtn());
    }
}
