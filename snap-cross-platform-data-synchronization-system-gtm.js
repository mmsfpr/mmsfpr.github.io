
/*
 * Run cookie discrepancies checker at a pre-configured interval
 * We have to drop the whole block of code here as an anonymouse function
 * as opposed to just firing a scoped function, because CSP blows up with
 * a script-src eval error
 */

window.setInterval(function() {
  console.log.log("-------- START run for checkCookiesForDiscrepanciesAgainstStorageSystems() --------");
  var cookieNames = [];
  for (var i = 0; i < MM_CPDSS_CONFIG_FORM_FIELDS["formInputFields"].length; i++) {
    cookieNames.push(MM_CPDSS_CONFIG_FORM_FIELDS["formInputFields"][i]["cookieName"]);
  }

  for (var i = 0; i < MM_CPDSS_CONFIG_FORM_FIELDS["formButtons"].length; i++) {
    cookieNames.push(MM_CPDSS_CONFIG_FORM_FIELDS["formInputFields"][i]["cookieName"]);
  }

  for (var i = 0; i < MM_CPDSS_CONFIG_FORM_FIELDS["formDropDownMenus"].length; i++) {
    cookieNames.push(MM_CPDSS_CONFIG_FORM_FIELDS["formInputFields"][i]["cookieName"]);
  }

  var lastUpdatedTimestamp = Date.now();
  for (var i = 0; i < cookieNames.length; i++) {
    console.log.log("Scanning for discrepancies for variable: " + cookieNames[i]);
    // var regexMatchCookieName = new RegExp('/^(.*;)?\s*'+ cookieNames[i] +'\s*=\s*[^;]+(.*)?$/');
    if (getCookie(cookieNames[i]) !== null) {
      console.log.log("Cookie '"+ cookieNames[i] +"' does exist, but let's see if it matches what's in localStorage (because localStorage will match the GTM Data Layer and we want to make sure GTM Data Layer is up-to-date)");
      // Cookie does exist, but let's see if it matches what's in localStorage (because localStorage will match the GTM Data Layer and we want to make sure GTM Data Layer is up-to-date)
      if (typeof(Storage) !== "undefined") {
        if (window.localStorage.getItem(cookieNames[i]) !== null) {
          if (window.localStorage.getItem(cookieNames[i]) !== getCookie(cookieNames[i])) {
            console.log.log("Cookie '"+ cookieNames[i] +"' does not match with corresponding localStorage value, updating storage systems with Cookie value");
            // Cookie value does not match with corresponding localStorage value, updating storage systems with Cookie value
            synchronizeCookieWithStorageSystems(cookieNames[i], getCookie(cookieNames[i]), lastUpdatedTimestamp);
          }
          else {
            console.log.log("Cookie '"+ cookieNames[i] +"' matches with corresponding localStorage value. No need to update storage systems.");
          }
        }
        else {
          console.log.log("We don't have a value in localStorage for '"+ cookieNames[i] +"', meaning it must be a new cookie. So let's synchronize it to localStorage and GTM Data Layer");
          // We don't have a value in localStorage for this cookie, meaning it must be a new cookie. So let's synchronize it to localStorage and GTM Data Layer
          synchronizeCookieWithStorageSystems(cookieNames[i], getCookie(cookieNames[i]), lastUpdatedTimestamp);
        }
      }
    }
    else {
      console.log.log("Cookie '"+ cookieNames[i] +"' does not exist, see if we have it in localStorage.");
      // Cookie does not exist, see if we have it in localStorage
      if (typeof(Storage) !== "undefined") {
        if (window.localStorage.getItem(cookieNames[i]) !== null) {
          console.log.log("Cookie '"+ cookieNames[i] +"' was deleted! Resetting it from localStorage now.");
          // Cookie was deleted! Resetting it from localStorage now...
          setCookie(cookieNames[i], window.localStorage.getItem(cookieNames[i]), window.localStorage.getItem(cookieNames[i] + "LastUpdated"));
          // setCookie(cookieNames[i] + "LastUpdated", getCookie(cookieNames[i] + "LastUpdated"));
        }
        else {
          console.log.log("'"+ cookieNames[i] +"' does not exist in LocalStorage. Skipping this one.");
        }
      }
    }
  }
  console.log.log("-------- END run for checkCookiesForDiscrepanciesAgainstStorageSystems() --------");
}, MM_CPDSS_CONFIG_SYNC_INTERVAL);


/*
 * Run query string parameter discrepancies checker at page load time
 */

checkQueryStringForDiscrepanciesAgainstStorageSystems();
