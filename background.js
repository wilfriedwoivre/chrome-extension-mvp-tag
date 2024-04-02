chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
    if (url.includes("azure") || url.includes("microsoft")) {
        chrome.scripting.executeScript({
            target: { tabId },
            func: AddMVPTag
        }).then(() => console.log("injected a function"));
    }
});


function AddMVPTag() {
    console.log("HREF " + window.location.href);

    var ignoreList = [
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        "https://learn.microsoft.com/en-us/docs.theme/master/en-us/_themes/global/identity-profile.html",
        "https://learn.microsoft.com/_themes/docs.theme/master/en-us/_themes/global/identity-profile.html"
    ];

    if (ignoreList.includes(window.location.href)) {
        console.log("Ignoring " + window.location.href);
    } else {
        if (window.location.origin == "https://learn.microsoft.com") {
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

            if (currentUrl !== newUrl) {
                console.log("Redirecting: " + currentUrl + " to " + newUrl);
                window.location.replace(newUrl);
            }
        }
    }
}

