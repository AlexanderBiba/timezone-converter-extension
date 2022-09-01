import { parseDate } from 'chrono-node';

chrome.webNavigation.onCompleted.addListener(({ tabId, frameType }) => {
    if (frameType !== "outermost_frame") return;
    chrome.scripting.executeScript({
        target: { tabId },
        func: function() {
            document.body.addEventListener("mouseup", e => {
                const selectedText = window.getSelection().toString();
                if (selectedText) chrome.runtime.sendMessage(selectedText, console.log);
                e.stopPropagation();
            });
        }
    });
});

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    callback(parseDate(msg)?.toLocaleString("en-US", {timeZone: "America/New_York"}));
});