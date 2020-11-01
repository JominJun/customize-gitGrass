const halloween = ["#ebedf0", "#ffee4a", "#ffc501", "#fe9600", "#03001c"];

chrome.webNavigation.onCompleted.addListener(
  () => {
    chrome.tabs.executeScript(
      {
        code:
          "rectFillList = [];\
          for(let i=0; i<365; i++){ rectFillList.push(document.getElementsByTagName('rect')[i].getAttribute('fill')) }\
          rectFillList",
      },
      (results) => {
        chrome.storage.local.get(["theme"], (res) => {
          if (res.theme == "halloween") {
            chrome.tabs.executeScript({
              code: `
                  document.querySelectorAll("ul.legend li")[0].style.background = "#ebedf0"
                  document.querySelectorAll("ul.legend li")[1].style.background = "#ffee4a"
                  document.querySelectorAll("ul.legend li")[2].style.background = "#ffc501"
                  document.querySelectorAll("ul.legend li")[3].style.background = "#fe9600"
                  document.querySelectorAll("ul.legend li")[4].style.background = "#03001c"
                  `,
            });

            list = String(results).split(",");
            for (let j in list) {
              switch (list[j]) {
                case "var(--color-calendar-graph-day-bg)":
                  list[j] = "0";
                  break;
                case "var(--color-calendar-graph-day-L1-bg)":
                  list[j] = "1";
                  chrome.tabs.executeScript({
                    code: `document.getElementsByTagName('rect')[${j}].style.fill = "#ffee4a"`,
                  });
                  break;
                case "var(--color-calendar-graph-day-L2-bg)":
                  list[j] = "2";
                  chrome.tabs.executeScript({
                    code: `document.getElementsByTagName('rect')[${j}].style.fill = "#ffc501"`,
                  });
                  break;
                case "var(--color-calendar-graph-day-L3-bg)":
                  list[j] = "3";
                  chrome.tabs.executeScript({
                    code: `document.getElementsByTagName('rect')[${j}].style.fill = "#fe9600"`,
                  });
                  break;
                case "var(--color-calendar-graph-day-L4-bg)":
                  list[j] = "4";
                  chrome.tabs.executeScript({
                    code: `document.getElementsByTagName('rect')[${j}].style.fill = "#03001c"`,
                  });
                  break;
              }
            }
          }
        });
      }
    );
  },
  {
    url: [
      {
        hostContains: "github.com",
      },
    ],
  }
);
