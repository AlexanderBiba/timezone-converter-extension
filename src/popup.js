const tzSelector = document.getElementById("tz-selector");

tzSelector.addEventListener("change", e => chrome.storage.sync.set({ timezone:  e.target.value }));

chrome.storage.sync.get("timezone", ({ timezone: storedTimezone }) => {
    Intl.supportedValuesOf("timeZone").forEach(timezone => {
        const option = document.createElement("option");
        option.append(document.createTextNode(timezone));
        option.dataset.timezone = timezone;
        if (storedTimezone === timezone) option.selected = true;
        tzSelector.append(option);
    });
});