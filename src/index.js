import { parseDate } from 'chrono-node';

chrome.webNavigation.onCompleted.addListener(({ tabId, frameType }) => {
    if (frameType !== "outermost_frame") return;
    chrome.scripting.executeScript({
        target: { tabId },
        func: function() {
            document.body.addEventListener("mouseup", e => {
                const selectedText = window.getSelection().toString();
                if (!selectedText) return;
                chrome.runtime.sendMessage(selectedText, transformedTimestamp => {
                    if (!transformedTimestamp) return;
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
                    });
                    setTimeout(() => popup.remove(), 10_000);
                    popup.addEventListener("click", () => popup.remove());
                    document.body.appendChild(popup);
                });
                e.stopPropagation();
            });
        }
    });
});

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    chrome.storage.sync.get("timezone", ({ timezone: timeZone }) => callback(parseDate(msg)?.toLocaleString("en-US", { timeZone })));
    return true
});