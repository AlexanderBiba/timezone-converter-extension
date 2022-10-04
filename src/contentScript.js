import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "./contentScript.css"
import { parse as chronoParse } from 'chrono-node';

chrome.storage.sync.get(null, ({ gravity = "bottom", position = "center", duration = 3, timezone: timeZone }) => document.addEventListener("selectstart", () => {
    const parseSelection = e => {
        document.removeEventListener("mouseup", parseSelection);
        const selectedText = document.getSelection().toString();
        if (!selectedText) return;
        chronoParse(selectedText)?.forEach(({ text, start, end }) => {
            const node = document.createElement("span");
            node.innerHTML = `<span class="tz-source">"${text}"</span> is <span class="tz-start">${start.date().toLocaleString("en-US", { timeZone })}</span>` + (end ? ` to <span class="tz-end">${end.date().toLocaleString("en-US", { timeZone })}</span>` : "");
            Toastify({
                node,
                gravity,
                position,
                duration: duration * 1000,
                close: true
            }).showToast()
        });
        e.stopPropagation();
    };
    document.addEventListener("mouseup", parseSelection);
}));