import { isDisplay, getText, getAttributeValue, } from './helper.service'

export default class SafetyPage {
    static overviewInfo='[data-auto-id="aboutUsModelIntro-2-0"] [data-testid="ModelIntro:description"]';
    static manWithVolvoImg='[id="aboutUsPromotionalHero-3-0"] div div picture img';

    public static overviewInfoContent() {
        isDisplay(this.overviewInfo);
        return getText(this.overviewInfo);
    }

    public static imgIsDisplayed() {
        return isDisplay(this.manWithVolvoImg);
    }

    public static imgAltText() {
        return getAttributeValue(this.manWithVolvoImg,'alt');
    }

    public static imgSrc() {
        return getAttributeValue(this.manWithVolvoImg,'src');
    }
}
