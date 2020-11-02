const originalBtn = document.querySelector("#original");
const halloweenBtn = document.querySelector("#halloween");

const updateStorageInfo = (theme) => {
  chrome.storage.local.set({ theme: theme });

  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    chrome.tabs.executeScript({
      code: `
        if("${tabs[0].url}".includes("github")){
          window.location.reload()
        }`,
    });
    window.location.reload();
  });
}

window.onload = () => {
  chrome.storage.local.get(["theme"], (res) => {
    if (!res.theme) now_theme = "original";
    document.getElementById("theme_condition").textContent = res.theme;
  });
}

originalBtn.addEventListener("click", () => {
  updateStorageInfo("original")
});

halloweenBtn.addEventListener("click", () => {
  updateStorageInfo("halloween")
});
