export const clearStorage = async (browser: WebdriverIO.Browser) => {
    // Clear local storage, session storage, and cookies
    await browser.execute('window.localStorage.clear();');
    await browser.execute('window.sessionStorage.clear();');
    await browser.deleteCookies();
    console.log('***************PREVIOUS SESSIONS, COOKIES AND STORAGE CLEARED***************');    
};