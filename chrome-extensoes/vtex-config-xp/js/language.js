let languageOptions = ['pt-br', 'en', 'es'];
let languageSel = languageOptions[0];

const setLanguage = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("language", (data) => {
      languageSel = data.language;
      if (!languageSel) {
        chrome.storage.sync.set({ language: languageOptions[0] });
        languageSel = languageOptions[0];
      }
      resolve(languageSel);
    });
  })
}

const getLanguageItem = async (section, item, field, index) => {
  const languageJson = await fetch(`/language/${languageSel}.json`);
  const language = await languageJson.json();
  console.log(item, field, index);
  return (index === undefined && field === undefined) ? language[section][item] : (index === undefined) ? language[section][item][field] : language[section][item][field][index];
}
