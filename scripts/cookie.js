function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=/; SameSite=Lax`; 
    // Добавь "; Secure" если сайт только по HTTPS:
    // document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=/; SameSite=Lax; Secure`;
}

function acceptCookies() {
    setCookie("cookieconsent", "accepted", 30);
    const consentBar = document.getElementById("cookie-consent-bar");
    if (consentBar) {
        consentBar.style.display = "none";
    }
}

function fixCookieConsentBarPosition() {
    const consentBar = document.getElementById("cookie-consent-bar");
    if (consentBar) {
        consentBar.style.position = "fixed";
    }
}

function redirectToPrivacyPolicyRu() {
    window.location.href = "privacy_policy.html";
}

function redirectToPrivacyPolicyEt() {
    window.location.href = "privacy_policy_et.html";
}

window.addEventListener('load', () => {
    if (!getCookie("cookieconsent")) {
        const consentBar = document.getElementById("cookie-consent-bar");
        if (consentBar) {
            consentBar.style.display = "block";
        }
    }
    fixCookieConsentBarPosition();
});
