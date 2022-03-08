const strings = {
  welcome: {
    en: "Welcome, beloved customer!",
    sv: "Välkommen, käre kund!",
  },
  signin: {
    en: "Sign in",
    sv: "Logga in",
  },
  or: {
    en: "or",
    sv: "eller",
  },
  "continue-as-guest": {
    en: "continue as guest",
    sv: "fortsätt som gäst",
  },
  "i-am-customer": {
    en: "I am a Customer",
    sv: "Jag är en Kund",
  },
  "i-am-bartender": {
    en: "I am a Bartender",
    sv: "Jag är en Bartender",
  },
  "vip-customer": {
    en: "VIP Customer",
    sv: "VIP Kund",
  },
  username: {
    en: "Username",
    sv: "Användarnamn",
  },
  password: {
    en: "Password",
    sv: "Lösenord",
  },
  "all-items": {
    en: "   All items",
    sv: "   Alla objekt",
  },
  "beer": {
    en: "   Beer",
    sv: "   Öl",
  },
  "wine": {
    en: "   Wine",
    sv: "   Vin",
  },
  "cocktail": {
    en: "   Cocktail",
    sv: "   Cocktail",
  },
  "log-out": {
    en: "   Log out",
    sv: "   Logga ut",
  },
  "cart": {
    en: "   Cart",
    sv: "   Vagn",
  },
  "non-alcohol": {
    en: "   Non-Alcoholic",
    sv: "   Alkoholfritt",
  },
  "manage-stock": {
    en: "   Manage stock",
    sv: "   Hantera lager",
  },
  "table-orders": {
    en: "   Table orders",
    sv: "   Bordsbeställningar",
  },
  "security": {
    en: "   Security",
    sv: "   Säkerhet",
  }

};

/**
 * Update UI
 */
export function updateUILocale() {
  const locale = getCurrentLocale();
  const swe = document.getElementById('swedish-button');
  const eng = document.getElementById('english-button');
  if (locale == "sv"){
    swe.src = "/images/sweden-activated.png";
    eng.src = "/images/united-kingdom.png";
  } else {
    swe.src = "/images/sweden.png";
    eng.src = "/images/united-kingdom-activated.png";
  }
  for (const el of document.querySelectorAll("[data-i18n]")) {
    const key = el.attributes.getNamedItem("data-i18n").value;
    if (!strings.hasOwnProperty(key)) {
      console.warn("Missing translation for ", key);
    } else {
      el.innerHTML = strings[key][locale];
    }
  }
}

/**
 * Retrieve the currently selected locale
 *
 * @return {"en"|"sv"}
 */
export function getCurrentLocale() {
  const locale = localStorage.getItem("flyingdutchman_locale");
  if (locale) {
    return locale;
  } else {
    return "sv";
  }
}

/**
 * Change the current locale
 * @param {"en"|"sv"} locale
 */
export function setCurrentLocale(locale) {
  localStorage.setItem("flyingdutchman_locale", locale);
  updateUILocale();
}

/***
 * Change locale whatever
 * This works better for some weird reason!
 *
 */
window.setLanguage = function(locale){
  localStorage.setItem("flyingdutchman_locale", locale);
  updateUILocale();
}