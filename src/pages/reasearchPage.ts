import { isDisplay, getText, getAttributeValue, } from './helper.service'

export default class FeaturesPage {
    static researchInfo='[data-auto-id="aboutUsModelIntro-2-0"] div div[data-testid="ModelIntro:description"] p';
    static volvoTestingPlantImg='[data-auto-id="aboutUsPromotionalHero-3-0"] div div picture';
    
    public static async getResearchInfo() {
        const element = await $(this.researchInfo);
        await element.waitForDisplayed();
        return await element;
    }

    public static async getVolvoTestingPlantImg() {
        const element = await $(this.volvoTestingPlantImg);
        await element.waitForDisplayed();
        return await element;
    }
    public static async researchInfoContent() {
        await isDisplay(await this.getResearchInfo());
        return getText(await this.getResearchInfo());
    }

    public static async researchImgIsDisplayed() {
        return isDisplay(await this.getVolvoTestingPlantImg());
    }

    public static async researchImgAltText() {
        return getAttributeValue(await this.getVolvoTestingPlantImg(),'alt');
    }

    public static async researchImgSrc() {
        return getAttributeValue(await this.getVolvoTestingPlantImg(),'src');
    }
}
