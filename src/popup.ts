document.addEventListener('DOMContentLoaded', async () => {
    try {
        const activeTab = await chrome.tabs.query({active: true, currentWindow: true});
        const message = await chrome.tabs.sendMessage(activeTab[0].id!, {type: 'can_download'});
        if (message === false)
            document.querySelector('#download')!.innerHTML = 'Current page is unsupported';
        else {
            document.querySelector('#download')!.innerHTML = '<button>Download</button><br/><input type="checkbox" id="highContrastStroke"> <label for="highContrastStroke">Enable high contrast blocks stroke</label>';
            document.querySelector('#download > button')!.addEventListener('click', download);
        }
    }
    catch (e) {
        console.log(e);
        document.querySelector('#download')!.innerHTML = 'Current page is unsupported';
        return;
    }    
});

async function download() {
    const activeTab = await chrome.tabs.query({active: true, currentWindow: true});
    await chrome.tabs.sendMessage(activeTab[0].id!, {type: 'download', highContrastStroke: (document.querySelector('#highContrastStroke') as HTMLInputElement).checked});
}
