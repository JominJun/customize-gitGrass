const halloween = ["#ebedf0", "#ffee4a", "#ffc501", "#fe9600", "#03001c"];

const updateCommitColor = (colorList) => {
  chrome.tabs.executeScript(
    {
      code:
        `
        rectFillList = [];
        for(let i=0; i<365; i++){
          rectFillList.push(document.getElementsByTagName('rect')[i].getAttribute('fill'))
        }
        rectFillList
        `,
    },
    (results) => {
      rectFillList = String(results).split(",");

      for (let id in rectFillList) {
        for(let i=1; i<=4; i++) {
          if(rectFillList[id].includes(i)) {
            chrome.tabs.executeScript({
              code: `document.getElementsByTagName('rect')[${id}].style.fill = "${colorList[i]}"`,
            });
          }
        }
      }
    }
  )
}

const updateIndexColor = (colorList) => {
  for(let i=0; i<5; i++) {
    chrome.tabs.executeScript({
      code: `document.querySelectorAll("ul.legend li")[${i}].style.background = "${colorList[i]}"`
    });
  }
}

const changeColor = (theme) => {
  switch(theme) {
    case "halloween":
      updateIndexColor(halloween);
      updateCommitColor(halloween);
      break;
  }
}

chrome.webNavigation.onCompleted.addListener(
  () => {
    chrome.storage.local.get(["theme"], (res) => {
      changeColor(res.theme)
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
