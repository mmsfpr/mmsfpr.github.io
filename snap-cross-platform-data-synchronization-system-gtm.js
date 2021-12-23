
/*
 * Run cookie discrepancies checker at a pre-configured interval
 * We have to drop the whole block of code here as an anonymouse function
 * as opposed to just firing a scoped function, because CSP blows up with
 * a script-src eval error
 */

window.setInterval(function() {
  
  console.log("===-*-*-*-*-*-*-*-*-*-* START run for checkCookiesForDiscrepanciesAgainstStorageSystems() *-*-*-*-*-*-*-*-*-*-===");
  var cookieNames = [];
  for (var i = 0; i < MM_CPDSS_CONFIG_DATA_LAYER_VARIABLES["formInputFields"].length; i++) {
    cookieNames.push(MM_CPDSS_CONFIG_DATA_LAYER_VARIABLES["formInputFields"][i]["cookieName"]);
  }

  for (var i = 0; i < MM_CPDSS_CONFIG_DATA_LAYER_VARIABLES["formButtons"].length; i++) {
    cookieNames.push(MM_CPDSS_CONFIG_DATA_LAYER_VARIABLES["formButtons"][i]["cookieName"]);
  }

  for (var i = 0; i < MM_CPDSS_CONFIG_DATA_LAYER_VARIABLES["formDropDownMenus"].length; i++) {
    cookieNames.push(MM_CPDSS_CONFIG_DATA_LAYER_VARIABLES["formDropDownMenus"][i]["cookieName"]);
  }

  for (var i = 0; i < MM_CPDSS_CONFIG_DATA_LAYER_VARIABLES["utmCodes"].length; i++) {
    cookieNames.push(MM_CPDSS_CONFIG_DATA_LAYER_VARIABLES["utmCodes"][i]);
  }

  console.log("cookieNames: " + cookieNames);
  var lastUpdatedTimestamp = Date.now();
  
  for (var i = 0; i < cookieNames.length; i++) {
    console.log("Scanning for discrepancies for variable: " + cookieNames[i]);
    // var regexMatchCookieName = new RegExp('/^(.*;)?\s*'+ cookieNames[i] +'\s*=\s*[^;]+(.*)?$/');
    // if (getCookie(cookieNames[i]) !== null) {
    if (
      typeof(getCookie(cookieNames[i])) !== "undefined"
      && getCookie(cookieNames[i]) !== null
    ) {
      console.log("Cookie '"+ cookieNames[i] +"' does exist, but let's see if it matches what's in localStorage (because localStorage will match the GTM Data Layer and we want to make sure GTM Data Layer is up-to-date)");
      // Cookie does exist, but let's see if it matches what's in localStorage (because localStorage will match the GTM Data Layer and we want to make sure GTM Data Layer is up-to-date)
      if (typeof(Storage) !== "undefined") {
        // BEGIN SYNC COOKIE TO LOCAL STORAGE
        if (window.localStorage.getItem(cookieNames[i]) !== null) {
          if (window.localStorage.getItem(cookieNames[i]) !== getCookie(cookieNames[i])) {
            console.log("Cookie '"+ cookieNames[i] +"' does not match with corresponding localStorage value, updating storage systems with Cookie value");
            // Cookie value does not match with corresponding localStorage value, updating storage systems with Cookie value
            synchronizeCookieWithStorageSystems(cookieNames[i], getCookie(cookieNames[i]), lastUpdatedTimestamp);
          }
          else {
            console.log("Cookie '"+ cookieNames[i] +"' matches with corresponding localStorage value. No need to update storage systems.");
          }
        }
        else {
          console.log("We don't have a value in localStorage for '"+ cookieNames[i] +"', meaning it must be a new cookie. So let's synchronize it to localStorage and GTM Data Layer");
          // We don't have a value in localStorage for this cookie, meaning it must be a new cookie. So let's synchronize it to localStorage and GTM Data Layer
          synchronizeCookieWithStorageSystems(cookieNames[i], getCookie(cookieNames[i]), lastUpdatedTimestamp);
        }
        // END SYNC COOKIE TO LOCAL STORAGE
        
        // BEGIN SYNC LOCAL STORAGE TO DATALAYER
        var gtmContainerId = MM_CPDSS_CONFIG_GTM_CONTAINER_ID_HOSTNAME_MAP[location.hostname] || undefined;
        var dataLayerValue = window.google_tag_manager[gtmContainerId].dataLayer.get(cookieNames[i]) || undefined;
        var localStorageValue = window.localStorage.getItem(cookieNames[i]);
        if (typeof(dataLayerValue) !== "undefined") {
          if (dataLayerValue !== localStorageValue) {
            console.log("Data Layer variable '"+ cookieNames[i] +"' does not match with corresponding localStorage value, updating storage systems with localStorage value");
            synchronizeCookieWithStorageSystems(cookieNames[i], localStorageValue, lastUpdatedTimestamp);
          }
          else {
            console.log("Data Layer variable '"+ cookieNames[i] +"' matches with corresponding localStorage value. No need to update storage systems.");
          }
        }
        else {
          console.log("We don't have a value in localStorage for '"+ cookieNames[i] +"', meaning it must be a new localStorage variable. So let's synchronize the dataLayer to localStorage");
          // We don't have a value in localStorage for '"+ cookieNames[i] +"', meaning it must be a new localStorage variable. So let's synchronize the dataLayer to localStorage
          synchronizeCookieWithStorageSystems(cookieNames[i], localStorageValue, lastUpdatedTimestamp);
        }
        // END SYNC LOCAL STORAGE TO DATALAYER
      }
    }
    else {
      console.log("Cookie '"+ cookieNames[i] +"' does not exist, see if we have it in localStorage.");
      // Cookie does not exist, see if we have it in localStorage
      if (typeof(Storage) !== "undefined") {
        if (window.localStorage.getItem(cookieNames[i]) !== null) {
          console.log("Cookie '"+ cookieNames[i] +"' was deleted! Resetting it from localStorage now.");
          // Cookie was deleted! Resetting it from localStorage now...
          setCookie(cookieNames[i], window.localStorage.getItem(cookieNames[i]), window.localStorage.getItem(cookieNames[i] + "LastUpdated"));
          // setCookie(cookieNames[i] + "LastUpdated", getCookie(cookieNames[i] + "LastUpdated"));
        }
        else {
          console.log("'"+ cookieNames[i] +"' does not exist in LocalStorage. Skipping this one.");
        }
      }
    }
  }
  console.log("===-*-*-*-*-*-*-*-*-*-* END run for checkCookiesForDiscrepanciesAgainstStorageSystems() *-*-*-*-*-*-*-*-*-*-===");
}, MM_CPDSS_CONFIG_SYNC_INTERVAL);



/*
 * Run query string parameter discrepancies checker at page load time
 */

checkQueryStringForDiscrepanciesAgainstStorageSystems();
