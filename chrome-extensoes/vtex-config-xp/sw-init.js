try {
  chrome.runtime.onInstalled.addListener(() => {
    let objeto = JSON.stringify({ isVTEX: false, version: null });
    chrome.storage.sync.set({ objeto });
    console.log('Dados iniciais do vtex-config-xp', objeto);
  });

} catch (e) {
  console.error('vtex-config-xp: sw-init.js', e.message);
}

