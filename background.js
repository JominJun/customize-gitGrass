const HALLOWEEN = ["#ebedf0", "#ffee4a", "#ffc501", "#fe9600", "#03001c"];
const OCEAN = ["#ebedf0", "#79b8ff", "#2188ff", "#005cc5", "#032f62"];
const ORANGE = ["#ebedf0", "#ffab70", "#f66a0a", "#e36209", "#d15704"];
const RED = ["#ebedf0", "#fdaeb7", "#ea4a5a", "#cb2431", "#9e1c23"];
const PURPLE = ["#ebedf0", "#d1bcf9", "#8a63d2", "#5a32a3", "#3a1d6e"];

const updateCommitColor = (colorList) => {
  day = new Date().getDay();

  chrome.tabs.executeScript(
    {
      code: `
        rectFillList = [];
        for(let i=0; i<365+${day}; i++){
          rectFillList.push(document.getElementsByTagName('rect')[i].getAttribute('fill'))
        }
        rectFillList
        `,
    },
    (results) => {
      rectFillList = String(results).split(",");

      for (let id in rectFillList) {
        for (let i = 1; i <= 4; i++) {
          if (rectFillList[id].includes(i)) {
            chrome.tabs.executeScript({
              code: `document.getElementsByTagName('rect')[${id}].style.fill = "${colorList[i]}"`,
            });
          }
        }
      }
    }
  );
};

const updateIndexColor = (colorList) => {
  for (let i = 0; i < 5; i++) {
    chrome.tabs.executeScript({
      code: `document.querySelectorAll("ul.legend li")[${i}].style.background = "${colorList[i]}"`,
    });
  }
};

const setTheme = (colorList) => {
  updateIndexColor(colorList);
  updateCommitColor(colorList);
};

const changeColor = (theme) => {
  switch (theme) {
    case "HALLOWEEN":
      setTheme(HALLOWEEN);
      break;
    case "OCEAN":
      setTheme(OCEAN);
      break;
    case "ORANGE":
      setTheme(ORANGE);
      break;
    case "RED":
      setTheme(RED);
      break;
    case "PURPLE":
      setTheme(PURPLE);
      break;
  }
};

chrome.webNavigation.onCompleted.addListener(
  () => {
    chrome.storage.local.get(["theme"], (res) => {
      changeColor(res.theme);
    });
  },
  {
    url: [
      {
        hostContains: "github.com",
      },
    ],
  }
);
