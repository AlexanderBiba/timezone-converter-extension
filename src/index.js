import { parseDate } from 'chrono-node';

chrome.webNavigation.onCompleted.addListener(({ tabId, frameType }) => {
    if (frameType !== "outermost_frame") return;
    chrome.scripting.executeScript({
        target: { tabId },
        func: function() {
            document.body.addEventListener("mouseup", e => {
                const selectedText = window.getSelection().toString();
                if (selectedText) chrome.runtime.sendMessage(selectedText, transformedTimestamp => {
                    const popup = document.createElement("div");
                    popup.append(document.createTextNode(transformedTimestamp));
                    Object.assign(popup.style, {
                        background: "red",
                        position: "absolute",
                        top: "95%",
                        left: "50%",
                        padding: "5px",
                        border: "5px",
                        borderRadius: "10px"
                    })
                    popup.addEventListener("click", () => popup.remove());
                    document.body.appendChild(popup);
                });
                e.stopPropagation();
            });
        }
    });
});

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    chrome.storage.sync.get("timezone", ({ timezone: timeZone }) => {
        const transformedTimestamp = parseDate(msg)?.toLocaleString("en-US", { timeZone })
        if (transformedTimestamp) callback(transformedTimestamp);
    });
    return true
});