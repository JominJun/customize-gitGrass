originalBtn = document.querySelector("#original");
halloweenBtn = document.querySelector("#halloween");

originalBtn.addEventListener("click", () => {
  chrome.storage.local.set({ theme: "original" });
  chrome.tabs.executeScript({
    code: `window.location.reload()`,
  });
  window.location.reload();
});

halloweenBtn.addEventListener("click", () => {
  chrome.storage.local.set({ theme: "halloween" });
  chrome.tabs.executeScript({
    code: `window.location.reload()`,
  });
  window.location.reload();
});

var now_theme;
chrome.storage.local.get(["theme"], (res) => {
  now_theme = res.theme;
  document.getElementById("theme_condition").textContent = now_theme;
});
