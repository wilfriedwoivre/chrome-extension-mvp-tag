chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
    if (url.includes("azure") || url.includes("microsoft")) {
        chrome.scripting.executeScript({
            target: { tabId },
            func: AddMVPTag
        }).then(() => console.log("injected a function"));
    } else {
        return;
    }
});


function AddMVPTag() {
    var currentUrl = window.location.href;
    newUrl = "";
    if (currentUrl.indexOf("?") == -1) {
        newUrl = currentUrl + "?WT.mc_id=AZ-MVP-4039694";
    }
    else {
        tagIndex = currentUrl.indexOf("WT.mc_id=");
        if (tagIndex == -1) {
            newUrl = currentUrl + "&WT.mc_id=AZ-MVP-4039694";
        }
        else {
            nextParameters = currentUrl.indexOf("&", tagIndex);
            if (nextParameters == -1) { nextParameters = currentUrl.length }
            newUrl = currentUrl.replace(currentUrl.slice(tagIndex, nextParameters), "WT.mc_id=AZ-MVP-4039694")
        }
    }

    console.log("Redirecting: " + currentUrl + " to " + newUrl);
    if (currentUrl !== newUrl) {
        window.location.replace(newUrl);
    }

}

