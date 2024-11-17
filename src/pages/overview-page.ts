import { isDisplay, getText } from './helper.service'

export default class SafetyPage {
    static overviewInfo='[data-auto-id="aboutUsModelIntro-2-0"] [data-testid="ModelIntro:description"]';

    public static overviewInfoContent() {
        isDisplay(this.overviewInfo);
        return getText(this.overviewInfo);
    }

}
