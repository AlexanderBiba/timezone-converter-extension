import { parse as chronoParse } from 'chrono-node';

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    chrome.storage.sync.get("timezone", ({ timezone: timeZone }) => callback(chronoParse(msg).map(({ text, start, end }) => `${text} is ${([start.date().toLocaleString("en-US", { timeZone })].concat(end ? [end.date().toLocaleString("en-US", { timeZone })] : [])).join(" to ")}`)));
    return true
});
