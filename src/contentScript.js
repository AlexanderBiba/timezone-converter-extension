import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

document.body.addEventListener("mouseup", e => {
    const selectedText = window.getSelection().toString();
    if (!selectedText) return;
    chrome.runtime.sendMessage(selectedText, popupMessages => {
        if (!popupMessages) return;
        popupMessages.forEach(text => Toastify({
            duration: 300000,
            text,
            gravity: "bottom",
            position: "right",
            close: true
        }).showToast());
    });
    e.stopPropagation();
});