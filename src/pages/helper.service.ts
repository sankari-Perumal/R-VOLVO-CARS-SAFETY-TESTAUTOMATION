export async function element(element:string):ChainablePromiseElement {
    await $(element).waitForDisplayed();
    return await $(element);
}

export async function elements(element:string):ChainablePromiseElement {
    return $$(element);
}

export async function isDisplay(element:string):Promise<boolean> {
    await $(element).waitForDisplayed();
    return await $(element).isDisplayed();
}

export async function clickElement(element:string) {
    await $(element).waitForDisplayed({timeout:3000});
    await $(element).waitForClickable({timeout:3000});
    await $(element).click();
}

export async function getText(element:string):Promise<string> {
    return await $(element).getText();
}

export async function shadowElements(rootElement:string,shadowElement:string):ChainablePromiseElement {
    await $(rootElement).shadow$$(shadowElement);
    return await $(rootElement).shadow$$(shadowElement);
}

export async function shadowElement(rootElement:string,shadowElement:string):ChainablePromiseElement {
    await $(rootElement).shadow$(shadowElement);
    return await $(rootElement).shadow$(shadowElement);
}

export async function getAttributeValue(ele:string,attributeName:string) {
   await $(ele).waitForDisplayed();
   return await $(ele).getAttribute(attributeName);
}