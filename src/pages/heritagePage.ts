import { isDisplay, getText, getAttributeValue, } from './helper.service'

export default class HeritagePage {
    static heritageInfo='[data-auto-id="aboutUsModelIntro-2-0"] div div p';
    static nilsbohlinImg='(//*[@data-auto-id="image-with-text"])[1]/div/div/div/div/picture/img';

    public static async getHeritageInfo() {
        const element = await $(this.heritageInfo);
        await element.waitForDisplayed();
        return element;
    }

    public static async getNilsbohlinImg() {
        const element = await $(this.nilsbohlinImg);
        await element.waitForDisplayed();
        return element;
    }

    public static async heritageInfoContent() {
        await isDisplay(await this.getHeritageInfo());
        return getText(await this.getHeritageInfo());
    }

    public static async featuresImgIsDisplayed() {
        return isDisplay(await this.getNilsbohlinImg());
    }

    public static async featuresImgAltText() {
        return getAttributeValue(await this.getNilsbohlinImg(),'alt');
    }

    public static async featuresImgSrc() {
        return getAttributeValue(await this.getNilsbohlinImg(),'src');
    }
}
