function getUrlsInCurrentWindow(callback) {
    var queryInfo = {
        currentWindow: true
    };

    var urls = '';
    chrome.tabs.query(queryInfo, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            urls += tabs[i].url;
            if (i < tabs.length - 1) {
                urls += '\n';
            }
        }

        callback(urls);
    });

}

function copyUrlsToClipboard(urlString) {
    var container = document.getElementById('container');
    var textarea = document.createElement('textarea');

    textarea.textContent = urlString;
    container.appendChild(textarea);
    textarea.select();
    var result = document.execCommand('copy');
    container.removeChild(textarea);

    if (result) {
        container.innerHTML = 'Copied!';
    } else {
        container.innerHTML = 'Copy Failed';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getUrlsInCurrentWindow(copyUrlsToClipboard);
});
