import Toastify from 'toastify-js';

document.body.addEventListener("mouseup", e => {
    const selectedText = window.getSelection().toString();
    if (!selectedText) return;
    chrome.runtime.sendMessage(selectedText, popupMessages => {
        if (!popupMessages) return;
        popupMessages.forEach(text => Toastify({
            text,
            gravity: "bottom",
            position: "right",
            close: true
        }).showToast());
    });
    e.stopPropagation();
});