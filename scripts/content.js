'use strict';
// const DOMSelectors = {
//     shortsSection: '[is-shorts]',
//     mainPage: '#contents',
// };
const DOMSelectors = {
    shortsSection: ['[is-shorts]', '[title="Shorts"]', '#shorts-container', '#items', 'ytd-reel-shelf-renderer', '#chips'],
    commentSection: ['#comments'],
    mainPage: ['#primary', '#chips-content', '#chips'],
    wholeYoutube: ['ytd-app'],
    recommendedVideos: ['#secondary'],

};
// setInterval(() => {
//     console.log('conent')
// }, 2000)
//TODO - stop nasluchiwaniu po jakimś czasie/przy ostatnim elemencie pętli
//TODO - Dodać nasluchwianie zmian ustawień w popupie.
chrome.storage.sync.get('currentState').then((state) => {
    for (const [key, selectors] of Object.entries(DOMSelectors)) {
        console.log('key', key, state, state.currentState[key])
        if (state.currentState[key]) {
            if (key === 'mainPage') {
                setTimeout(() => {
                    selectors.forEach((selector) => {
                        console.log('____WFM')

                        console.log('selector', selector)
                        waitForElement(selector).then((elements) => {
                            console.log('v1', selector)
                            console.log('elements', elements)

                            elements.forEach((el) => el.style.display = 'none');
                        });
                    })
                }, 100)
            } else {
                selectors.forEach((selector) => {
                    console.log('____WFM')
                    waitForElement(selector).then((elements) => {
                        console.log('v2', selector, elements)

                        elements.forEach((el) => el.style.display = 'none')
                        // true dla ukrytych elementow
                        // console.log(element.style.cssText.includes('display: none;'));
                    });
                })
            }
        }
    }
});

function waitForElement(selector) {
    return new Promise(resolve => {
        console.log('promise')
        // Returns if already exists?
        if (document.querySelectorAll(selector)?.length) {
            return resolve(document.querySelectorAll(selector));
        }
        const observer = new MutationObserver(mutations => {
            console.log('1', document.querySelectorAll(selector), selector)
            if (document.querySelectorAll(selector)?.length) {
                console.log('new MutationObserver', document.querySelectorAll(selector));
                resolve(document.querySelectorAll(selector));
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
        });
    });
}
