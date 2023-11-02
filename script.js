'use strict';

const   DOMSelectors = {
  shortsSection: '[is-shorts]',
  videosSection: 'ytd-rich-grid-row',
};

//TODO - Dodać nasluchwianie zmian ustawień w popupie.
chrome.storage.sync.get('currentState').then((state) => {
  for (const [key, value] of Object.entries(DOMSelectors)) {
    if (state.currentState[key]) {
      if (key === 'videos') {
        setTimeout(() => {
          waitForElement(value).then((elements) => {
            elements.forEach((el) => el.style.display = 'none');
          });
        }, 100)
      } else {

      waitForElement(value).then((element) => {
        element.style.display = 'none';
        // true dla ukrytych elementow
        // console.log(element.style.cssText.includes('display: none;'));
      });
      }
    }
  }
});

function waitForElement(selector) {
  return new Promise(resolve => {
    // if (document.querySelector(selector)) {
    //   return resolve(document.querySelector(selector));
    // }
    const observer = new MutationObserver(mutations => {
      setTimeout(() => {
        if (document.querySelectorAll(selector).length) {
          console.log(document.querySelectorAll(selector));
          resolve(document.querySelectorAll(selector));
          observer.disconnect();
        }
      }, 100);
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
