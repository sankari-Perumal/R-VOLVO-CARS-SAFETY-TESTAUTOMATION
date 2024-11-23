import { isDisplay, getText, getAttributeValue, } from './helper.service'

export default class CultureAndVisionPage {
    
    static cultureAndVisionInfo = '[data-auto-id="aboutUsModelIntro-2-0"] [data-testid="ModelIntro:description"]';
    static employeesWithEquip = '[id="aboutUsPromotionalHero-3-0"] div div picture img';

    public static async getCultureAndVisionInfo() {
        const element = await $(this.cultureAndVisionInfo);
        await element.waitForDisplayed();
        return element;
    }

    public static async getEmployeesWithEquip() {
        const element = await $(this.employeesWithEquip);
        await element.waitForDisplayed();
        return element;
    }

    public static async cultureAndVisonInfoContent() {
        await isDisplay(await this.getCultureAndVisionInfo());
        return getText(await this.getCultureAndVisionInfo());
    }

    public static async cultureAndVisonImgIsDisplayed() {
        return isDisplay(await this.getEmployeesWithEquip());
    }

    public static async cultureAndVisonImgAltText() {
        return getAttributeValue(await this.getEmployeesWithEquip(), 'alt');
    }

    public static async cultureAndVisonImgSrc() {
        return getAttributeValue(await this.getEmployeesWithEquip(), 'src');
    }
}
