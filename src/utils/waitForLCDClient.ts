export const waitForLDClient = async (browser: WebdriverIO.Browser) => {
    await browser.waitUntil(
        () => browser.execute(() => window.LDClient && window.LDClient.initialized),
        {
            timeout: 100000, // Timeout for 30 seconds
            interval: 1000, // Check every second
            timeoutMsg: 'LaunchDarkly client did not initialize in time',
        }
    );
    console.log('LaunchDarkly client initialized');
};

export const waitForLDClientAndElement = async (browser: WebdriverIO.Browser, elementSelector: string) => {
    try {
        // Wait for the LaunchDarkly client to initialize or the element to appear
        await browser.waitUntil(
            async () => {
                const ldClientInitialized = await browser.execute(() => window.LDClient && window.LDClient.initialized);
                const elementVisible = await browser.$(elementSelector).isDisplayed(); // Check if the expected element is visible
                return ldClientInitialized || elementVisible; // Exit early if either condition is met
            },
            {
                timeout: 30000, // 30 seconds
                timeoutMsg: 'LaunchDarkly client did not initialize or expected element did not load',
            }
        );
        console.log('LaunchDarkly client initialized or expected element loaded');
    } catch (error) {
        console.error('Error waiting for LaunchDarkly client or element:', error);
    }
};


// export const waitForLDClient = async (browser: WebdriverIO.Browser) => {
//     const maxRetries:number = 30; // Maximum number of retries
//     let retries:number = 0;

//     while (retries < maxRetries) {
//         const isLDClientInitialized = await browser.execute(() => {
//             console.log('===========',retries);
//             return window.LDClient && window.LDClient.initialized;
//         });

//         if (isLDClientInitialized) {
//             console.log('LaunchDarkly client initialized');
//             return;
//         }

//         retries++;
//         console.log(`Retry ${retries}: LaunchDarkly client not initialized, waiting...`);
//         await browser.pause(1000); // Wait for 1 second before retrying
//     }

//     throw new Error('LaunchDarkly client did not initialize in time');
// };

export const waitForLDClient1 = async (browser: WebdriverIO.Browser) => {
    await browser.waitUntil(
        async () => {
            return await browser.execute(() => {
                // Check if LDClient exists and is initialized
                return window.LDClient && window.LDClient.initialized;
            });
        },
        {
            timeout: 30000, // Timeout for 30 seconds
            interval: 1000, // Check every second
            timeoutMsg: 'LaunchDarkly client did not initialize in time',
        }
    );
    console.log('LaunchDarkly client initialized');
};
