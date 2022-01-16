chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        code: ' if (document.body.innerText.indexOf("Cat") !=-1) {' +
              '     alert("Cat not found!");' +
              ' } '+
              ' console.log("dfs"); '
    });
}, {
    url: [{
        // Runs on example.com, example.net, but also example.foo.com
        hostContains: '.example.'
    }],
});

