import { isDisplay, getText, getAttributeValue, } from './helper.service'

export default class FeaturesPage {
    static featuresInfo='[id="aboutUsTextStatement-0-1"] div div p span.ej';
    static digitalRenderingImg='(//*[@data-auto-id="image-with-text"])[1]/div/div/div/div/picture/img';

    public static async getFeaturesInfo() {
        const element = await $(this.featuresInfo);
        await element.waitForDisplayed();
        return await element;
    }

    public static async getDigitalRenderingImg() {
        const element = await $(this.digitalRenderingImg);
        await element.waitForDisplayed();
        return await element;
    }

    public static async featuresInfoContent() {
        await isDisplay(await this.getFeaturesInfo());
        return getText(await this.getFeaturesInfo());
    }

    public static async featuresImgIsDisplayed() {
        return isDisplay(await this.getDigitalRenderingImg());
    }

    public static async featuresImgAltText() {
        return getAttributeValue(await this.getDigitalRenderingImg(),'alt');
    }

    public static async featuresImgSrc() {
        return getAttributeValue(await this.getDigitalRenderingImg(),'src');
    }
}
