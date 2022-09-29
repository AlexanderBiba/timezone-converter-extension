import { parse as chronoParse } from 'chrono-node';

chrome.webNavigation.onCompleted.addListener(({ tabId, frameType }) => {
    if (frameType !== "outermost_frame") return;
    chrome.scripting.executeScript({
        target: { tabId },
        files: ["client.js"]
    });
});

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    chrome.storage.sync.get("timezone", ({ timezone: timeZone }) => callback(chronoParse(msg).map(({ text, start, end }) => `${text} is ${([start.date().toLocaleString("en-US", { timeZone })].concat(end ? [end.date().toLocaleString("en-US", { timeZone })] : [])).join(" to ")}`)));
    return true
});