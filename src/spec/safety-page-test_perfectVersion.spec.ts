import { browser } from '@wdio/globals';
import safetyPage from '../pages/safety-page';
import { getEnv } from '../helper/env/env';
import { Protocol } from 'devtools-protocol';
getEnv();
import { clearStorage } from '../utils/clearSessions';
import { monitorNetwork } from '../utils/monitorNetwoek';
import { waitForPageContents } from '../utils/waitForPageLoad';
import { waitForLDClient } from '../utils/waitForLCDClient';

xdescribe('Verify safety page', () => {

    beforeAll(async () => {
        await browser.saveScreenshot('error0.png');
        await browser.url(process.env.BASEURL!);
        await safetyPage.waitUntilRender();
    })


    xit('should compare successful with a baseline', async () => {
        // browser.url('https://Codemify.com/interview/interview');
        // // Check a screen
        // expect(browser.checkScreen('"C:\Users\sanka\OneDrive\Pictures\Safety-Highlights-Hero1.png"', { /* some options */ }).misMatchPercentage).toEqual(0);

        // // Check an element
        // expect(browser.checkElement('.rightSideBarUL', 'firstButtonElement', { /* some options */ }).misMatchPercentage).toEqual(0);

        // // Check a full page screenshot
        // expect(browser.checkFullPageScreen('fullPage', { /* some options */ }).misMatchPercentage).toEqual(0);

        // //   // Check a full page screenshot with all tab executions
        // // expect(browser.checkTabbablePage('check-tabbable', { /* some options, use the same options as for checkFullPageScreen */ })).toEqual(0);

        const tag = 'header';

        // Save the element screenshot (this could be done in a separate test for the baseline)
        const headerElement = await $('[id="aboutUsPromotionalHero-3-0"] div div picture img'); // You can use any valid selector here
        if (!headerElement) {
            throw new Error('Element not found');
        }
        await headerElement.moveTo();
        // await headerElement.scrollIntoView();
        // Save the screenshot of the element (this will save the image in the specified directory)
        // await headerElement.saveElement('header');
        await browser.saveElement(headerElement, tag); // Saves the element screenshot as 'header.png'

        // Compare the captured element screenshot with the baseline image
        const result = browser.checkScreen('Safety-Highlights-Hero1'); // Compare with 'header.png' baseline
        console.log(`Mismatch Percentage: ${await result.misMatchPercentage}`);

        // You can assert if the mismatch percentage is acceptable
        expect(result.misMatchPercentage).toBeLessThan(1); // Acceptable tolerance level
    });
});

xdescribe('Visual Regression Test', () => {
    xit('should compare a screenshot with the baseline', async () => {
        await browser.url('https://webdriver.io');

        // Set viewport size
        await browser.setWindowSize(1920, 1080);

        // Take a screenshot and compare it to the baseline
        const result = await browser.checkScreen('homepage');
        expect(result.misMatchPercentage).toBeLessThan(1, 'The screenshot differs too much from the baseline.');
    });

    xit('should compare an element with the baseline', async () => {

        await browser.saveScreenshot('error0.png');
        // await browser.url(testData.BASEURL);
        await browser.url(process.env.BASEURL!);
        await browser.pause(5000);
        browser.execute('window.localStorage.clear();');
        browser.execute('window.sessionStorage.clear();');
        browser.deleteCookies();
        browser.waitUntil(
            () => browser.execute(() => window.LDClient && window.LDClient.initialized),
            {
                timeout: 10000,
                timeoutMsg: 'LaunchDarkly client did not initialize in time',
            }
        );



        await browser.pause(5000)
        await browser.saveScreenshot('error1.png');
        console.log('*******************************', await browser.getTitle());
        await browser.saveScreenshot('error2.png');
        console.log('*******************************', await browser.getUrl());
        await browser.saveScreenshot('error3.png');
        await safetyPage.waitUntilRender();
        await browser.pause(10000)
        const isLoaded = browser.waitUntil(() => {
            return browser.execute(() => {
                // Execute in the browser context
                return Array.from(document.querySelectorAll('img')).every((img) => img.complete && img.naturalWidth > 0);
            });
        }, {
            timeout: 20000, // 20 seconds
            timeoutMsg: 'Page did not load properly.',
        });

        console.log('===============================', isLoaded);
        const header = await $('[id="aboutUsPromotionalHero-3-0"] div div picture img');
        await browser.pause(10000);
        // await browser.url('https://webdriver.io');

        // const header = await $('header');

        // Take a screenshot of the header 

        const result = await browser.checkElement(header, 'xxx');
        console.log('*********************************************', await result)
        // expect(await result).toBeLessThan(1, 'The header differs too much from the baseline.');
        const logs = await browser.getLogs('browser');
        console.log('****************************************', await logs, '*************************************');
        (async () => {
            // Enable Network monitoring
            console.log('__________________________________________________________________');
            await browser.cdp('Network', 'enable');
            console.log('__________________________________________________________________');
            // Listen to network events via CDP
            await browser.cdp('Network', 'responseReceived', async (params: Protocol.Network.ResponseReceivedEvent) => {
                if (await params.response.url.includes('.woff2') || await params.response.url.includes('.jpg')) {
                    console.log('__________________________________________________________________');
                    console.log(`Resource URL: ${params.response.url}, Status: ${params.response.status}`);
                    console.log('__________________________________________________________________');
                }
            });
        })();
        // (async () => {
        // Enable Network monitoring
        // await browser.cdp('Network', 'enable');

        // Listen for Network.responseReceived events
        //     browser.on('devtools', (type: string, event: Protocol.Network.ResponseReceivedEvent) => {
        //         if (type === 'Network.responseReceived') {
        //             const params = event as Protocol.Network.ResponseReceivedEvent;
        //             if (params.response.url.includes('.woff2') || params.response.url.includes('.jpg')) {
        //                 console.log(`Resource URL: ${params.response.url}, Status: ${params.response.status}`);
        //             }
        //         }
        //     });
        // })();
        // browser.cdp('Network', 'enable');
        // browser.on('Network.responseReceived', (params: Protocol.Network.ResponseReceivedEvent) => {
        //     if (params.response.url.includes('.woff2') || params.response.url.includes('.jpg')) {
        //         console.log(`Resource URL: ${params.response.url}, Status: ${params.response.status}`);
        //     }
        // });
        // browser.cdp('Network', 'enable');
        // browser.on('Network.responseReceived', (params) => {
        //     if (params.response.url.includes('.woff2') || params.response.url.includes('.jpg')) {
        //         console.log(`Resource URL: ${params.response.url}, Status: ${params.response.status}`);
        //     }
        // });
        // browser.waitUntil(
        //     () => $('//*[@id="aboutUsSliderWithIcons-1-1"]/div[1]/button[1]/div/div[1]').isDisplayed(),
        //     {
        //         timeout: 30000,
        //         timeoutMsg: 'Images did not load completely',
        //     }
        // );

        await browser.pause(50000);
    });

    it('should compare an element with the baseline', async () => {
        await browser.setTimeout({ 'script': 100000 })
        await browser.cdp('Network', 'enable');

        await browser.url(process.env.BASEURL!);

        await browser.pause(5000);
        await browser.execute('window.localStorage.clear();');
        await browser.execute('window.sessionStorage.clear();');
        await browser.deleteCookies();

        await browser.pause(5000);
        await safetyPage.waitUntilRender();
        await browser.pause(5000);
        await browser.waitUntil(
            () => browser.execute(() => window.LDClient && window.LDClient.initialized),
            {
                timeout: 30000,
                timeoutMsg: 'LaunchDarkly client did not initialize in time',
            }
        );
        await browser.pause(5000);
        const isLoaded = await browser.waitUntil(() => {
            return browser.execute(() => {
                // Execute in the browser context
                return Array.from(document.querySelectorAll('img')).every((img) => img.complete && img.naturalWidth > 0);
            });
        }, {
            timeout: 30000,
            timeoutMsg: 'Page did not load properly.',
        });

        console.log('===============================', await isLoaded);

        await browser.cdp('Network', 'responseReceived', async (params: Protocol.Network.ResponseReceivedEvent) => {
            if (await params.response.url.includes('.woff2') || await params.response.url.includes('.jpg')) {
                console.log('__________________________________________________________________');
                console.log(`Resource URL: ${params.response.url}, Status: ${params.response.status}`);
                console.log('__________________________________________________________________');
            }
        });

        const logs = await browser.getLogs('browser');
        console.log('****************************************', await logs, '*************************************');


        await browser.pause(50000);
    });
});

describe('Visual Regression Test', () => {

    // beforeAll(async () => {
    //     await browser.setTimeout({ 'script': 100000 })
    //     await setupPage(browser, process.env.BASEURL!);
    // })

    xit('should compare an element with the baseline', async () => {

        // await browser.cdp('Network', 'enable');

        // await browser.url(process.env.BASEURL!);

        // await browser.pause(5000);
        // await browser.execute('window.localStorage.clear();');
        // await browser.execute('window.sessionStorage.clear();');
        // await browser.deleteCookies();

        // await browser.pause(5000);
        // await safetyPage.waitUntilRender();
        // await browser.pause(5000);
        // await browser.waitUntil(
        //     () => browser.execute(() => window.LDClient && window.LDClient.initialized),
        //     {
        //         timeout: 30000,
        //         timeoutMsg: 'LaunchDarkly client did not initialize in time',
        //     }
        // );       
        // await browser.pause(5000);
        // const isLoaded = await browser.waitUntil(() => {
        //     return browser.execute(() => {
        //         // Execute in the browser context
        //         return Array.from(document.querySelectorAll('img')).every((img) => img.complete && img.naturalWidth > 0);
        //     });
        // }, {
        //     timeout: 30000, 
        //     timeoutMsg: 'Page did not load properly.',
        // });

        // console.log('===============================', await isLoaded);

        // await browser.cdp('Network', 'responseReceived', async (params: Protocol.Network.ResponseReceivedEvent) => {
        //     if (await params.response.url.includes('.woff2') || await params.response.url.includes('.jpg')) {
        //         console.log('__________________________________________________________________');
        //         console.log(`Resource URL: ${params.response.url}, Status: ${params.response.status}`);
        //         console.log('__________________________________________________________________');
        //     }
        // });

        // const logs = await browser.getLogs('browser');
        // console.log('****************************************', await logs, '*************************************');
        console.log('=================================================================')

        await browser.pause(50000);
    });

    xit('should compare an element with the baseline', async () => {

        await browser.cdp('Network', 'enable');

        await browser.url(process.env.BASEURL!);

        await browser.pause(5000);
        await browser.execute('window.localStorage.clear();');
        await browser.execute('window.sessionStorage.clear();');
        await browser.deleteCookies();

        await browser.pause(5000);
        await safetyPage.waitUntilRender();
        await browser.pause(5000);
        // await browser.waitUntil(
        //     () => browser.execute(() => window.LDClient && window.LDClient.initialized),
        //     {
        //         timeout: 60000,
        //         timeoutMsg: 'LaunchDarkly client did not initialize in time',
        //     }
        // );       
        await browser.pause(5000);
        const isLoaded = await browser.waitUntil(() => {
            return browser.execute(() => {
                // Execute in the browser context
                return Array.from(document.querySelectorAll('img')).every((img) => img.complete && img.naturalWidth > 0);
            });
        }, {
            timeout: 60000,
            timeoutMsg: 'Page did not load properly.',
        });

        console.log('===============================', await isLoaded);

        await browser.cdp('Network', 'responseReceived', async (params: Protocol.Network.ResponseReceivedEvent) => {
            if (await params.response.url.includes('.woff2') || await params.response.url.includes('.jpg')) {
                console.log('__________________________________________________________________');
                console.log(`Resource URL: ${params.response.url}, Status: ${params.response.status}`);
                console.log('__________________________________________________________________');
            }
        });

        // const logs = await browser.getLogs('browser');
        // console.log('****************************************', await logs, '*************************************');
        // console.log('=================================================================')

        // await browser.pause(50000);
    });
});


describe('Volvo Cars Website', () => {
    
    xit('should load the page properly', async () => {
        await monitorNetwork1(browser);
        // Navigate to the URL
        await browser.url(process.env.BASEURL!);
        // await browser.setTimeout({ 'script': 100000 });
        // Call the individual functions
        await clearStorage(browser); // Clears storage and cookies
        await browser.pause(5000);
        await safetyPage.waitUntilRender();
        await browser.pause(5000);
        await waitForLDClient(browser);
        // await waitForLDClientAndElement(browser,'//*[@id="aboutUsPromotionBackgroundImage-0-2"]/div/div');
        await browser.pause(5000);
        await waitForPageContents(browser); // Waits for images to load
        await browser.pause(5000);
        await monitorNetwork(browser); // Starts network monitoring

        // Add your test logic here
        const pageTitle = await browser.getTitle();
        console.log(pageTitle);

        // More test actions...
    });


    it('should compare an element with the baseline', async () => {

        // await browser.cdp('Network', 'enable');
        await monitorNetwork1(browser);
        await browser.url(process.env.BASEURL!);
        await browser.pause(5000);
        await clearStorage(browser);
        await browser.pause(5000);
        await safetyPage.waitUntilRender();
        await browser.pause(5000);      
        
        await waitForPageContents(browser);await browser.pause(5000);
        // await monitorNetwork(browser);
        await browser.pause(5000);
    });
});