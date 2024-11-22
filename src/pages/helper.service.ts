export async function element(element:string):ChainablePromiseElement {
    await $(element).waitForDisplayed({timeout:5000});
    return await $(element);
}

export async function elements(element:string):ChainablePromiseElement {
    return $$(element);
}

export async function isDisplay(element:ChainablePromiseElement):Promise<boolean> {
    await browser.pause(2000);
    await (element).waitForDisplayed();
    return await (element).isDisplayed();
}

export async function clickElement(element:ChainablePromiseElement) {
    await (element).waitForDisplayed();
    await (element).waitForClickable();
    await (element).click();
}

export async function getText(element:ChainablePromiseElement):Promise<string> {
    await (await (element)).waitForExist();
    return await (await (await $(element)).getText()).replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function shadowElements(rootElement:string,shadowElement:string):ChainablePromiseElement {
    await $(rootElement).shadow$$(shadowElement);
    return await $(rootElement).shadow$$(shadowElement);
}

export async function shadowElement(rootElement:string,shadowElement:string):ChainablePromiseElement {
    await $(rootElement).shadow$(shadowElement);
    return await $(rootElement).shadow$(shadowElement);
}

export async function getAttributeValue(ele:ChainablePromiseElement,attributeName:string) {
   await (await ele).waitForDisplayed();
   return await (await ele).getAttribute(attributeName);
}
