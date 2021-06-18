let siteVTEX = document.getElementById("site-vtex");
let h1Label = document.querySelector('h1');
let siteVTEXLable = document.querySelector('.item label[for="site-vtex"]');
let versaoVTEX = document.getElementById("versao-vtex");
let versaoVTEXLabel = document.querySelector('.item label[for="versao-vtex"]')
let accountNameVTEX = document.getElementById("accountName-vtex");
let virtualFolderVTEX = document.getElementById("virtualFolder-vtex");
let salesChannelVTEX = document.getElementById("salesChannel-vtex");

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
        json.version = 0;
      } else {
        let scripts = document.head.getElementsByTagName('script');
        let scriptsArray = [...scripts];
        let isIO = scriptsArray.find(x => x.outerHTML.indexOf("io.vtex.com.br") > -1);
        console.log('getObjeto: identifica vtex.io', isIO);
        if (isIO != undefined) {
          json.isVTEX = true;
          json.version = 1;
        } else {
          json.isVTEX = false;
          json.version = 2;
        }
      }
      if (json.isVTEX) {
        let headTXT = document.head.getInnerHTML();
        let posI = headTXT.indexOf("<!-- CommerceContext.Current.VirtualFolder.Name:");
        let virtualFolderName;
        if (posI > -1) {
          posI = headTXT.indexOf(":", posI);
          let posF = headTXT.indexOf("-->", posI);
          virtualFolderName = headTXT.substr(posI + 1, (posF - posI) - 1).trim();
        }
        json.virtualFolderName = virtualFolderName;
      } else {
        json.virtualFolderName = false;
      }
    }
    chrome.runtime.sendMessage({ isVTEX: json.isVTEX, version: json.version, virtualFolderName: json.virtualFolderName, accountName: ((typeof jsnomeLoja !== "undefined") ? jsnomeLoja : false), salesChannel: ((typeof jssalesChannel !== "undefined") ? jssalesChannel : false) });
  });
}

async function templateLanguage() {
  h1Label.innerHTML = await getLanguageItem("info-site", "h1");
  siteVTEXLable.innerHTML = await getLanguageItem("info-site", "site-vtex", "label") + ": ";
  versaoVTEXLabel.innerHTML = await getLanguageItem("info-site", "versao-vtex", "label") + ": ";
}


async function init() {
  templateLanguage();
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getObjeto
  });
}

setLanguage().then(languageSel => {
  chrome.storage.sync.get("objeto", ({ objeto }) => {
    chrome.storage.sync.set({ objeto });
    init();
  });
});

chrome.runtime.onMessage.addListener(async function (json, sender, sendResponse) {
  siteVTEX.innerHTML = await getLanguageItem("info-site", "site-vtex", "value", json.isVTEX ? 0 : 1);
  versaoVTEX.innerHTML = await getLanguageItem("info-site", "versao-vtex", "value", json.version);
  virtualFolderVTEX.innerHTML = json.virtualFolderName;
  accountNameVTEX.innerHTML = json.accountName;
  salesChannelVTEX.innerHTML = json.salesChannel;
});


// When the button is clicked, inject exempleFunc into current page
versaoVTEX.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: exempleFunc
  });
});

