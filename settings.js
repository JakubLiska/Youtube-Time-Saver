const shortsSwitch = document.getElementById('shortsSwitch');
const videosSwitch = document.getElementById('videosSwitch');

shortsSwitch.addEventListener('click', function() {
  toggleState('shorts', shortsSwitch);
});
videosSwitch.addEventListener('click', function() {
  toggleState('videos', videosSwitch);
});

// let globalState = {};
// optymalizacja??? czy to jest niezbędne?
let currentState = {
  shorts: shortsSwitch.checked,
  videos: videosSwitch.checked,
};

function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}


//Get state after user opens browser.
chrome.storage.sync.get('currentState').then((result) => {
  shortsSwitch.checked = result.currentState.shorts;
  videosSwitch.checked = result.currentState.videos;

  // nadmiarowe? \/
  currentState = result.currentState;
});

function toggleState(section, checkbox) {
  // nadmiarowe? \/
  currentState[section] = checkbox.checked;

  chrome.storage.sync.set({'currentState': currentState}).then(() => {
    waitForElement('[is-shorts]').then((element) => {
      return element.style.display = currentState[section] ? 'none' : 'flex';
    });
    // const shortsContainer = document.querySelector('[is-shorts]');
    // shortsContainer.style.display = currentState[section] ? 'none' : 'flex';
    console.log('Value is set to ' + currentState[section]);
  });
}

//TODO: debounce na settera stanu ustawień
