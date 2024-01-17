const wholeYoutubeSwitch = document.getElementById('wholeYoutubeSwitch');
const mainPageSwitch = document.getElementById('mainPageSwitch');
const shortsSwitch = document.getElementById('shortsSwitch');
const commentsSectionSwitch = document.getElementById('commentsSwitch');
const recommendedVideosSwitch = document.getElementById('recommendedSwitch');

shortsSwitch.addEventListener('click', function () {
    toggleSettings('shortsSection', shortsSwitch);
});
mainPageSwitch.addEventListener('click', function () {
    toggleSettings('mainPage', mainPageSwitch);
});
wholeYoutubeSwitch.addEventListener('click', function () {
    toggleSettings('wholeYoutube', wholeYoutubeSwitch);
});
commentsSectionSwitch.addEventListener('click', function () {
    toggleSettings('commentSection', commentsSectionSwitch);
});
recommendedVideosSwitch.addEventListener('click', function () {
    toggleSettings('recommendedVideos', recommendedVideosSwitch);
});


// let globalState = {};
// optymalizacja??? czy to jest niezbędne?
let currentState = {
    shortsSection: shortsSwitch.checked,
    mainPage: mainPageSwitch.checked,
    wholeYoutube: wholeYoutubeSwitch.checked,
    commentSection: commentsSectionSwitch.checked,
    recommendedVideos: recommendedVideosSwitch.checked
};

function waitForElement(selector) {
    console.log('selector', selector)
    console.log('selector', selector)
    return new Promise(resolve => {
        // Returns if already exists?
        if (document.querySelectorAll(selector)?.length) {
            console.log('resolve', resolve(document.querySelectorAll(selector)));
            return resolve(document.querySelectorAll(selector));
        }
        const observer = new MutationObserver(mutations => {
            console.log('')
            if (document.querySelectorAll(selector)?.length) {
                console.log('resolve', resolve(document.querySelectorAll(selector)));
                resolve(document.querySelectorAll(selector));
                console.log('resolve2')
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
    shortsSwitch.checked = result.currentState.shortsSection;
    mainPageSwitch.checked = result.currentState.mainPage;
    wholeYoutubeSwitch.checked = result.currentState.wholeYoutube
    commentsSectionSwitch.checked = result.currentState.commentSection
    recommendedVideosSwitch.checked = result.currentState.recommendedVideos
    // nadmiarowe? \/
    currentState = result.currentState;
});

function toggleSettings(section, checkbox) {
    // nadmiarowe? \/
    currentState[section] = checkbox.checked;

    chrome.storage.sync.set({'currentState': currentState}).then(() => {
        // waitForElement('[is-shorts]').then((element) => {
        //     console.log('222222', element)
        //     return element.style.display = currentState[section] ? 'none' : 'flex';
        // });
        // // const shortsContainer = document.querySelector('[is-shortsSection]');
        // // shortsContainer.style.display = currentState[section] ? 'none' : 'flex';
        // console.log('Value is set to ', currentState[section]);
    });
}

//TODO: debounce na settera stanu ustawień
