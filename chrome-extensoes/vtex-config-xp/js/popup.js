let siteVTEX = document.getElementById("site-vtex");
let versaoVTEX = document.getElementById("versao-vtex");

// The body of this function will be execuetd as a content script inside the
// current page
function exempleFunc() {
  chrome.storage.sync.get("objeto", ({ objeto }) => {
    let div = document.createElement("div");
    let log = document.createTextNode(objeto);
    div.appendChild(log);
    document.body.appendChild(div);
  });
}

function hasClass(_class, _element) {
  _element == undefined ? document.body : _element;
  return _element.classList.contains(_class);
}

function getObjeto() {
  console.log('getObjeto: identifica body', document.body.getAttribute("class"));
  chrome.storage.sync.get("objeto", ({ objeto }) => {
    let json = JSON.parse(objeto);
    if (json.version == null) {
      //verifica se o site é da VTEX.cms ou VTEX.io
      console.log('getObjeto: identifica VTEX.cmc', document.documentElement.getAttribute('xmlns:vtex'));
      if (document.documentElement.getAttribute('xmlns:vtex') != null) {
        json.isVTEX = true;
        json.version = "VTEX.CMS";
      } else {
        let scripts = document.head.getElementsByTagName('script');
        let scriptsArray = [...scripts];
        let isIO = scriptsArray.find(x => x.outerHTML.indexOf("io.vtex.com.br") > -1);
        console.log('getObjeto: identifica vtex.io', isIO);
        if (isIO != undefined) {
          json.isVTEX = true;
          json.version = "VTEX.IO";
        } else {
          json.isVTEX = false;
          json.version = "outra plataforma";
        }
      }
    }
    chrome.runtime.sendMessage({ isVTEX: json.isVTEX, version: json.version });
  });
}
async function init() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getObjeto
  });
}

chrome.storage.sync.get("objeto", ({ objeto }) => {
  chrome.storage.sync.set({ objeto });
  init();
});

chrome.runtime.onMessage.addListener(function (json, sender, sendResponse) {
  siteVTEX.innerHTML = json.isVTEX ? "Sim" : "Não";
  versaoVTEX.innerHTML = json.version;
});


// When the button is clicked, inject exempleFunc into current page
versaoVTEX.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: exempleFunc
  });
});

