import 'webdriverio';

declare global {
    namespace WebdriverIO {
        interface Browser {
            /**
             * Save a screenshot of the current viewport.
             *
             * @param tag - A unique identifier for the screenshot.
             * @returns void
             */
            saveScreen(tag: string): void;

            /**
             * Save a screenshot of a specific element.
             *
             * @param selector - The selector or WebdriverIO.Element to capture.
             * @param tag - A unique identifier for the screenshot.
             * @returns void
             */
            saveElement(selector: string | Element, tag: string): void;

            /**
             * Save a screenshot of the entire page.
             *
             * @param tag - A unique identifier for the screenshot.
             * @returns void
             */
            saveFullPageScreen(tag: string): void;

            /**
             * Compare the current viewport with a baseline image.
             *
             * @param tag - A unique identifier for the baseline image.
             * @param options - Optional comparison options.
             * @returns Object containing the `misMatchPercentage`.
             */
            checkScreen(tag: string, options?: Record<string, unknown>): { misMatchPercentage: number };

            /**
             * Compare a specific element with a baseline image.
             *
             * @param selector - The selector or WebdriverIO.Element to capture.
             * @param tag - A unique identifier for the baseline image.
             * @param options - Optional comparison options.
             * @returns Object containing the `misMatchPercentage`.
             */
            checkElement(
                selector: string | Element,
                tag: string,
                options?: Record<string, unknown>
            ):  number ;

            /**
             * Compare the entire page with a baseline image.
             *
             * @param tag - A unique identifier for the baseline image.
             * @param options - Optional comparison options.
             * @returns Object containing the `misMatchPercentage`.
             */
            checkFullPageScreen(tag: string, options?: Record<string, unknown>): { misMatchPercentage: number };
        }

        interface Element {
            /**
             * Save a screenshot of the current element.
             *
             * @param tag - A unique identifier for the screenshot.
             * @returns void
             */
            saveElement(tag: string): void;

            /**
             * Compare the current element with a baseline image.
             *
             * @param tag - A unique identifier for the baseline image.
             * @param options - Optional comparison options.
             * @returns Object containing the `misMatchPercentage`.
             */
            checkElement(tag: string, options?: Record<string, unknown>): { misMatchPercentage: number };
        }
    }
    
    interface Window {
        LDClient?: {
            initialized: boolean;
            // Add other properties or methods of LDClient if needed
        };
    }
}

declare module 'webdriverio' {
    interface ChainablePromiseElement<T> extends WebdriverIO.Element {}
}
