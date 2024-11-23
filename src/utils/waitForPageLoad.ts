export const waitForPageContents = async (browser: WebdriverIO.Browser) => {
    console.log('***************PAGE CONTENTS AND IMAGES ARE STARTED LOADING***************');
    await browser.waitUntil(() => {
        return browser.execute(() => {
            return Array.from(document.querySelectorAll('img')).some(
                (img) => img.complete && img.naturalWidth > 0
            );
        });
    }, {
        timeout: 100000, 
        timeoutMsg: '***************Page did not load properly.***************',
    });
    console.log('***************PAGE CONTENTS AND IMAGES ARE LOADED***************');
};