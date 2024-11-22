import { isDisplay, getText, getAttributeValue, } from './helper.service'

export default class ChildSafetyPage {
    static childsafetyInfo='[data-auto-id="aboutUsModelIntro-2-0"] div div p';
    static childWithVolvo='[data-auto-id="aboutUsPromotionalHero-3-0"] div div picture';

    public static async getChildsafetyInfo() {
        const element = await $(this.childsafetyInfo);
        await element.waitForDisplayed();
        return await element;
    }

    public static async getChildWithVolvo() {
        const element = await $(this.childWithVolvo);
        await element.waitForDisplayed();
        return await element;
    }
    
    public static async childsafetyInfoContent() {
        await isDisplay(await this.getChildsafetyInfo());
        return getText(await this.getChildsafetyInfo());
    }

    public static async featuresImgIsDisplayed() {
        return isDisplay(await this.getChildWithVolvo());
    }

    public static async featuresImgAltText() {
        return getAttributeValue(await this.getChildWithVolvo(),'alt');
    }

    public static async featuresImgSrc() {
        return getAttributeValue(await this.getChildWithVolvo(),'src');
    }
}
