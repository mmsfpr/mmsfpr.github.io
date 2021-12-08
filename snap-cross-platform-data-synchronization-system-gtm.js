/*
 * Start Configuration
 */

var checkCookiesForDiscrepanciesInterval = 10000; // milliseconds

// gtag("config", "GA_MEASUREMENT_ID", {
//   "cookie_prefix": "",
//   "cookie_domain": "snapfinance.com",
//   "cookie_expires": 2 * 365 * 24 * 60 * 60 * 1000 // 2 years in milliseconds
// });

/*
 * End Configuration
 */


/*
 * Start Helper Functions
 */

function synchronizeCookieWithStorageSystems(variableName, variableValue, timestamp) {
  // console.log("Running function synchronizeCookieWithStorageSystems(" + variableName + ", " + variableValue + ", " + timestamp + ")");
  updateVariableInLocalStorage(variableName, variableValue, timestamp);
  updateVariableInGtmDataLayer(variableName, variableValue);
}

function updateVariableInLocalStorage(variableName, variableValue, timestamp) {
  if (typeof(Storage) !== "undefined") {
    // console.log("Running function updateVariableInLocalStorage(" + variableName + ", " + variableValue + ", " + timestamp + ")");
    window.localStorage.setItem(variableName, variableValue);
    window.localStorage.setItem(variableName + "LastUpdated", timestamp);
  }
  else {
    // console.log("localStorage not supported by this browser.");
  }
}

function updateVariableInGtmDataLayer(variableName, variableValue) {
  // console.log("Running function updateVariableInGtmDataLayer(" + variableName + ", " + variableValue + ")");
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    variableName: variableValue
  });
}

function setCookie(variableName, variableValue, expirationInDays) {
  // console.log("Running function setCookie(" + variableName + ", " + variableValue + ", " + expirationInDays + ")");
  var domain = ".snapfinance.com";
  var path = "/";
  if (expirationInDays === null) {
    expirationInDays = 365 * 2;
  }
  var expirationDate = new Date();
  var expirationInMilliseconds = expirationInDays * 24 * 60 * 60 * 1000;
  expirationDate.setTime(expirationDate.getTime() + expirationInMilliseconds);

  var cookieString = variableName + "=" + variableValue + "; expires=" + expirationDate.toGMTString() + "; path=" + path + "; domain=" + domain;
  document.cookie = cookieString;

  var cookieStringLastUpdated = variableName + "LastUpdated=" + Date.now() + "; expires=" + expirationDate.toGMTString() + "; path=" + path + "; domain=" + domain;
  document.cookie = cookieStringLastUpdated;
}

function getCookie(variableName) {
  // console.log("Running function getCookie(" + variableName + ")");
  if (document.cookie.length > 0) {
    variableNameIndexStart = document.cookie.indexOf(variableName + "=");
    if (variableNameIndexStart != -1) {
      variableNameIndexStart = variableNameIndexStart + variableName.length + 1;
      variableNameIndexEnd = document.cookie.indexOf(";", variableNameIndexStart);
      if (variableNameIndexEnd == -1) {
        variableNameIndexEnd = document.cookie.length;
      }
      return unescape(document.cookie.substring(variableNameIndexStart, variableNameIndexEnd));
    }
  }
  return null;
}

function getQueryStringParameter(parameterName) {
  // console.log("Running function getQueryStringParameter(" + parameterName + ")");
  parameterName = parameterName.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + parameterName + "(=([^&#]*)|&|#|$)"), results = regex.exec(window.location.href);
  if (!results) { return null; }
  if (!results[2]) { return ""; }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkQueryStringForDiscrepanciesAgainstStorageSystems() {
  // console.log("Running function checkQueryStringForDiscrepanciesAgainstStorageSystems()");
  var queryStringParameters = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];
  var lastUpdatedTimestamp = Date.now();
  for (var i = 0; i < queryStringParameters.length; i++) {
    if (getQueryStringParameter(queryStringParameters[i]) !== null) {
      // Query string parameter does exist, but let's see if it matches what's in localStorage because localStorage will match the GTM Data Layer and we want to make sure GTM Data Layer is up-to-date
      if (typeof(Storage) !== "undefined") {
        if (window.localStorage.getItem(queryStringParameters[i]) !== null) {
          if (window.localStorage.getItem(queryStringParameters[i] !== getQueryStringParameter(queryStringParameters[i]))) {
            // Query string parameter value does not match with corresponding localStorage value, dropping a new cookie and will be resolved automatically with cookie discrepancy checker
            setCookie(queryStringParameters[i], getQueryStringParameter(queryStringParameters[i]), lastUpdatedTimestamp);
          }
        }
        else {
          // We don't have a value in localStorage for this Query string parameter, meaning it must be a new query string parameter. So let's drop it as a cookie, and it will automatically be synchronized to localStorage and GTM Data Layer with the cookie discrepancy checker
          setCookie(queryStringParameters[i], getQueryStringParameter(queryStringParameters[i]), lastUpdatedTimestamp);
        }
      }
    }
    else {
      // Query string parameter does not exist on this page load. No need to run anything here... Not unless we care to reset UTM codes if a user manually deletes the cookies...
    }
  }
}

/*
 * End Helper Functions
 */

/* -------------------------------- */

/*
 * Run cookie discrepancies checker at a pre-configured interval
 * We have to drop the whole block of code here as an anonymouse function
 * as opposed to just firing a scoped function, because CSP blows up with
 * a script-src eval error
 */

window.setInterval(function() {
  // console.log("-------- START run for checkCookiesForDiscrepanciesAgainstStorageSystems() --------");
  var variableNames = [
    // "sessionId", // cookie value generated by the backend
    // "applicationId", // cookie value generated by the backend
    // "userId", // cookie value generated by the backend
    // "city",
    // "state",
    // "type",
    // "applicationLanguage",
    // "bankName",
    // "birthYear",
    "firstTimeUser",
    "applicationLanguage",
    "zipCode",
    "averagePaycheck",
    "findStoresZipCode",
    "findStoresIndustry",
    "findStoresSearchTerm",
    "findStoresSearchRadius",
    "partnerCompanyName",
    "partnerZipCode",
    "returningIdNumber",
    "userId",
    "applicationId",
    "sessionId",
  ];
  var lastUpdatedTimestamp = Date.now();
  for (var i = 0; i < variableNames.length; i++) {
    // console.log("Scanning for discrepancies for variable: " + variableNames[i]);
    // var regexMatchCookieName = new RegExp('/^(.*;)?\s*'+ variableNames[i] +'\s*=\s*[^;]+(.*)?$/');
    if (getCookie(variableNames[i]) !== null) {
      // console.log("Cookie '"+ variableNames[i] +"' does exist, but let's see if it matches what's in localStorage (because localStorage will match the GTM Data Layer and we want to make sure GTM Data Layer is up-to-date)");
      // Cookie does exist, but let's see if it matches what's in localStorage (because localStorage will match the GTM Data Layer and we want to make sure GTM Data Layer is up-to-date)
      if (typeof(Storage) !== "undefined") {
        if (window.localStorage.getItem(variableNames[i]) !== null) {
          if (window.localStorage.getItem(variableNames[i]) !== getCookie(variableNames[i])) {
            // console.log("Cookie '"+ variableNames[i] +"' does not match with corresponding localStorage value, updating storage systems with Cookie value");
            // Cookie value does not match with corresponding localStorage value, updating storage systems with Cookie value
            synchronizeCookieWithStorageSystems(variableNames[i], getCookie(variableNames[i]), lastUpdatedTimestamp);
          }
          else {
            // console.log("Cookie '"+ variableNames[i] +"' matches with corresponding localStorage value. No need to update storage systems.");
          }
        }
        else {
          // console.log("We don't have a value in localStorage for '"+ variableNames[i] +"', meaning it must be a new cookie. So let's synchronize it to localStorage and GTM Data Layer");
          // We don't have a value in localStorage for this cookie, meaning it must be a new cookie. So let's synchronize it to localStorage and GTM Data Layer
          synchronizeCookieWithStorageSystems(variableNames[i], getCookie(variableNames[i]), lastUpdatedTimestamp);
        }
      }
    }
    else {
      // console.log("Cookie '"+ variableNames[i] +"' does not exist, see if we have it in localStorage.");
      // Cookie does not exist, see if we have it in localStorage
      if (typeof(Storage) !== "undefined") {
        if (window.localStorage.getItem(variableNames[i]) !== null) {
          // console.log("Cookie '"+ variableNames[i] +"' was deleted! Resetting it from localStorage now.");
          // Cookie was deleted! Resetting it from localStorage now...
          setCookie(variableNames[i], window.localStorage.getItem(variableNames[i]), window.localStorage.getItem(variableNames[i] + "LastUpdated"));
          // setCookie(variableNames[i] + "LastUpdated", getCookie(variableNames[i] + "LastUpdated"));
        }
        else {
          // console.log("'"+ variableNames[i] +"' does not exist in LocalStorage. Skipping this one.");
        }
      }
    }
  }
  // console.log("-------- END run for checkCookiesForDiscrepanciesAgainstStorageSystems() --------");
}, checkCookiesForDiscrepanciesInterval);

/*
 * Run query string parameter discrepancies checker at page load time
 */

checkQueryStringForDiscrepanciesAgainstStorageSystems();