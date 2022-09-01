chrome.webNavigation.onCompleted.addListener(({ tabId, frameType }) => {
    if (frameType !== "outermost_frame") return;
    chrome.scripting.executeScript({
        target: { tabId },
        func: function() {
            document.body.addEventListener("mouseup", e => {
                const selection = window.getSelection();
                const selectedText = selection.toString();
                if (selectedText) {
                    console.log(`${selectedText} is ${selectedText} in your timezone`)
                }
                e.stopPropagation();
            });
        }
    });
});