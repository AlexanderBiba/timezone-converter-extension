import './popup.css';

const tzSelector = document.getElementById("tz-selector");
const gravitySelector = document.getElementById("gravity-selector");
const positionSelector = document.getElementById("position-selector");
const durationInput = document.getElementById("duration-input");

tzSelector.addEventListener("change", e => chrome.storage.sync.set({ timezone:  e.target.value }));
gravitySelector.addEventListener("change", e => chrome.storage.sync.set({ gravity:  e.target.value }));
positionSelector.addEventListener("change", e => chrome.storage.sync.set({ position:  e.target.value }));
durationInput.addEventListener("change", e => chrome.storage.sync.set({ duration:  e.target.value }));

const populateSelector = (selector, values, selected) => values.forEach(value => {
    const option = document.createElement("option");
    option.append(document.createTextNode(value));
    if (selected === value) option.selected = true;
    selector.append(option);
});

chrome.storage.sync.get(null, ({ gravity = "bottom", position = "center", duration = 3, timezone }) => {
    populateSelector(tzSelector, Intl.supportedValuesOf("timeZone"), timezone);
    populateSelector(gravitySelector, ["top", "bottom"], gravity);
    populateSelector(positionSelector, ["left", "center", "right"], position);
    durationInput.value = duration;
});