let page = document.getElementById("main");
let language = document.getElementById("language");

// Reacts to a button click by marking marking the selected button and saving
// the selection
function handleLanguageChange(event) {
  chrome.storage.sync.set({ language: language.options[language.selectedIndex].value });
}

// Add a button to the page for each supplied color
function constructOptions() {
  setLanguage().then(languageSel => {
    for (i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i] == languageSel) {
        language.selectedIndex = i;
      }
    }
  })

  // …and register a listener for when that language is change.
  language.addEventListener("change", handleLanguageChange);
}

// Initialize the page by constructing the color options
constructOptions();
