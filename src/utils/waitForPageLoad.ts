export const waitForPageContents = async (browser: WebdriverIO.Browser) => {
    console.log('*******************PAGE CONTENTS AND IMAGES ARE STARTED LOADING*******************');
    await browser.waitUntil(() => {
        return browser.execute(() => {
            return Array.from(document.querySelectorAll('img')).some(
                (img) => img.complete && img.naturalWidth > 0
            );
        });
    }, {
        timeout: 100000, // 20 seconds
        timeoutMsg: 'Page did not load properly.',
    });
    console.log('*******************PAGE CONTENTS AND IMAGES ARE LOADED*******************');
};
// export const waitForPageContents1 = async (browser: WebdriverIO.Browser) => {
// await browser.waitUntil(() => {
//     return browser.execute(() => {
//         const imagesLoaded = Array.from(document.querySelectorAll('img')).every(
//             (img) => img.complete && img.naturalWidth > 0
//         );

//         const contentLoaded = document.querySelector('#content');

//         return imagesLoaded && contentLoaded;
//     });
// }, {
//     timeout: 30000, // Wait for up to 30 seconds
//     timeoutMsg: 'Page did not load properly: Images or content missing',
// };