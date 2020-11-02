const buttons = document.getElementsByTagName("button");

const updateStorageInfo = (theme) => {
  chrome.storage.local.set({ theme: theme });

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.tabs.executeScript({
      code: `
        if("${tabs[0].url}".includes("github")){
          window.location.reload()
        }`,
    });
    window.location.reload();
  });
};

for (let button of buttons) {
  button.onclick = () => {
    updateStorageInfo(button.getAttribute("data-theme"));
  };
}

window.onload = () => {
  chrome.storage.local.get(["theme"], (res) => {
    if (!res.theme) now_theme = "original";
    document.getElementById("theme_condition").textContent = res.theme;
  });
};
