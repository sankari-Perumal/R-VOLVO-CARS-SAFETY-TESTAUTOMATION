import { isDisplay, getText, getAttributeValue,clickElement } from './helper.service'

export default class FeaturesPage {
   
    static researchInfo = '[data-auto-id="aboutUsModelIntro-2-0"] div div[data-testid="ModelIntro:description"] p';
    static volvoTestingPlantImg = '[data-auto-id="aboutUsPromotionalHero-3-0"] div div picture';
    static videoContent = '[data-auto-id="aboutUsVideoWithPreview-0-2"] div div video';
    static watchFilmBtn='#aboutUsVideoWithPreview-0-2 > div > div:nth-child(2) > div > button';
    static pauseBtn='[data-testid="icon:pause"]';
    static showMoreBtn='#aboutUsFaq-8-2 > div > div.button-group > button';

    public static async getResearchInfo() {
        const element = await $(this.researchInfo);
        await element.waitForDisplayed();
        return element;
    }

    public static async getVolvoTestingPlantImg() {
        const element = await $(this.volvoTestingPlantImg);
        await element.waitForDisplayed();
        return element;
    }

    public static async getVideoContent() {
        const element = await $(this.videoContent);
        await $(this.videoContent).moveTo();
        await element.waitForDisplayed();
        return element;
    }

    public static async getWatchFilmBtn() {
        const element = await $(this.watchFilmBtn);
        await element.waitForDisplayed();
        return element;
    }

    public static async getPauseBtn() {
        const element = await $(this.pauseBtn);
        await element.waitForDisplayed();
        return element;
    }

    public static async getShowMoreBtn() {
        const element = await $(this.showMoreBtn);
        await element.waitForDisplayed();
        return element;
    }

    public static async researchInfoContent() {
        await isDisplay(await this.getResearchInfo());
        return getText(await this.getResearchInfo());
    }

    public static async researchImgIsDisplayed() {
        return isDisplay(await this.getVolvoTestingPlantImg());
    }

    public static async researchImgAltText() {
        return getAttributeValue(await this.getVolvoTestingPlantImg(), 'alt');
    }

    public static async researchImgSrc() {
        return getAttributeValue(await this.getVolvoTestingPlantImg(), 'src');
    }

    public static async getVideo() { return await $(this.videoContent) }
    public static async verifyVideoDisplay() {
        return await isDisplay((await this.getVideoContent()));
    }

    public static async videoSrc() {
        return getAttributeValue((await this.getVideoContent()).$('source'), 'src');
    }

    public static async verifyWatchFilmBtnDisplay() {
        return await isDisplay((await this.getWatchFilmBtn()));
    }

    public static async verifyPauseBtnDisplay() {
        return await isDisplay((await this.getPauseBtn()));
    }

    public static async verifyShowMoreBtnDisplay() {
        await browser.pause(4000);
        return await isDisplay((await this.getShowMoreBtn()));
    }

    public static async verifyShowLessBtnDisplay() {
        return await isDisplay((await this.getShowMoreBtn()));
    }

    public static async clickShowMoreBtn()
    {
        await clickElement(await this.getShowMoreBtn());
        await browser.pause(3000);
    }

    public static async verifyQuetionaryAreaExpand()
    {
        return await getAttributeValue(await this.getShowMoreBtn(),'aria-expanded');
    }

    public static async verifyShowLessBtn()
    {
        const optionTxt=(await this.getShowMoreBtn()).getText();
        return await optionTxt=='Show less'?true:false;
    }
}
