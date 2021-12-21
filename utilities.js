/*
 * Start Helper Functions for all files
 */

function setCookie(variableName, variableValue, expirationInDays = null) {
  // console.log("Running function setCookie(" + variableName + ", " + variableValue + ", " + expirationInDays + ")");
  if (expirationInDays === null) {
    expirationInDays = MM_CPDSS_CONFIG_SYNC_COOKIE_EXPIRATION_IN_DAYS;
  }
  var expirationDate = new Date();
  var expirationInMilliseconds = expirationInDays * 24 * 60 * 60 * 1000;
  expirationDate.setTime(expirationDate.getTime() + expirationInMilliseconds);

  var cookieString = variableName + "=" + variableValue + "; expires=" + expirationDate.toGMTString() + "; path=" + MM_CPDSS_CONFIG_SYNC_COOKIE_PATH + "; domain=" + MM_CPDSS_CONFIG_SYNC_COOKIE_DOMAIN;
  document.cookie = cookieString;

  var cookieStringLastUpdated = variableName + "LastUpdated=" + Date.now() + "; expires=" + expirationDate.toGMTString() + "; path=" + MM_CPDSS_CONFIG_SYNC_COOKIE_PATH + "; domain=" + MM_CPDSS_CONFIG_SYNC_COOKIE_DOMAIN;
  document.cookie = cookieStringLastUpdated;
}


/*
 * End Helper Functions for all files
 */

/**********************************************/

/*
 * Start Helper Functions for set-user-data-as-cookies-gtm.js
 */

function addClassToElement(querySelector, className) {
  // console.log("Running function addClassToElement(" + querySelector + ", " + className + ")");
  var element = document.querySelector(querySelector);
  if (element !== null) {
    var elementClasses = element.className;
    elementClasses = elementClasses.split(" ");
    if (!elementClasses.includes(className)) {
      elementClasses.push(className);
      elementClasses = elementClasses.join(" ");
      element.className = elementClasses;
    }
  }
}

function removeClassFromElement(querySelector, className) {
  // console.log("Running function removeClassFromElement(" + querySelector + ", " + className + ")");
  var element = document.querySelector(querySelector);
  if (element !== null) {
    var elementClasses = element.className;
    elementClasses = elementClasses.split(" ");
    elementClasses = elementClasses.filter(function(e) { return e !== className });
    elementClasses = elementClasses.join(" ");
    element.className = elementClasses;
  }
}

function scanAllFormButtonsAndSetCookieValues() {
  // console.log("Running function scanAllFormButtonsAndSetCookieValues()");
  var formButtons = MM_CPDSS_CONFIG_FORM_FIELDS["formButtons"];

  for (var i = 0; i < formButtons.length; i++) {
    var formButtonObject = formButtons[i];
    var cookieName = formButtonObject["cookieName"];
    var formButtonHasSelection = false;
    var formButtonValueOptions = formButtonObject["valueOptions"];
    for (var ii = 0; ii < formButtonValueOptions.length; ii++) {
      var elementAttributeName = formButtonValueOptions[ii]["attributeName"];
      var elementAttributeValue = formButtonValueOptions[ii]["attributeValue"];
      var elementQuerySelector = "[" + elementAttributeName + "='" + elementAttributeValue +"'].activeButtonListener.active";
      var formButtonFieldIsSelected = document.querySelector(elementQuerySelector);
      if (formButtonFieldIsSelected !== null) {
        formButtonHasSelection = true;
        var cookieValue = formButtonValueOptions[ii]["cookieValue"];
        // console.log(cookieName + ": " + cookieValue);
      }
    }
    if (!formButtonHasSelection) {
      // console.log(cookieName + ": (none)");
    }
  }
}

function addListenersToFormButtons() {
  // console.log("Running function addListenersToFormButtons()");
  var formButtons = MM_CPDSS_CONFIG_FORM_FIELDS["formButtons"];

  for (var i = 0; i < formButtons.length; i++) {
    var formButtonObject = formButtons[i];
    var formButtonValueOptions = formButtonObject["valueOptions"];
    for (var ii = 0; ii < formButtonValueOptions.length; ii++) {
      var elementAttributeName = formButtonValueOptions[ii]["attributeName"];
      var elementAttributeValue = formButtonValueOptions[ii]["attributeValue"];
      var elementQuerySelector = "[" + elementAttributeName + "='" + elementAttributeValue +"']";
      // console.log("elementQuerySelector: " + elementQuerySelector);
      var formButtonField = document.querySelector(elementQuerySelector);
      if (formButtonField !== null) {
        // console.log("Adding listener for element matching document.querySelector(" + elementQuerySelector + ")");
        addClassToElement(elementQuerySelector, "activeButtonListener");
        formButtonField.addEventListener("focusout", function(event) {
          scanAllFormButtonsAndSetCookieValues();
        });
      }
    }
  }
}

function addListenersToFormInputFields() {
  // console.log("Running function addListenersToFormInputFields()");
  var formInputFields = MM_CPDSS_CONFIG_FORM_FIELDS["formInputFields"];
  
  for (var i = 0; i < formInputFields.length; i++) {
    var formElementObject = formInputFields[i];
    var elementAttributeName = formElementObject["attributeName"];
    var elementAttributeValue = formElementObject["attributeValue"];
    var elementCookieName = formElementObject["cookieName"];
    var elementQuerySelector = "[" + elementAttributeName + "='" + elementAttributeValue +"']";
    // console.log("elementQuerySelector: " + elementQuerySelector);
    var formInputField = document.querySelector(elementQuerySelector);
    if (formInputField !== null) {
      // console.log("Adding listener for element matching document.querySelector(" + elementQuerySelector + ")");
      formInputField.addEventListener("focusout", function(event) {
        var eventElementId = event.target.id;
        var eventElementName = event.target.name;
        var eventElementValue = event.target.value;
        var formInputFields = MM_CPDSS_CONFIG_FORM_FIELDS["formInputFields"];
        
        for (var i = 0; i < formInputFields.length; i++) {
          var formElementObject = formInputFields[i];
          var elementAttributeName = formElementObject["attributeName"];
          var elementAttributeValue = formElementObject["attributeValue"];
          var elementCookieName = formElementObject["cookieName"];

          if (
            elementAttributeName == "id"
            && eventElementId == elementAttributeValue
          ) {
            // console.log("eventElementId: " + eventElementId + " | eventElementName: " + eventElementName + " | eventElementValue: " + eventElementValue);
        setCookie(elementCookieName, eventElementValue);
          }
          else if (
            elementAttributeName == "name"
            && eventElementName == elementAttributeValue
          ) {
            // console.log("eventElementId: " + eventElementId + " | eventElementName: " + eventElementName + " | eventElementValue: " + eventElementValue);
            setCookie(elementCookieName, eventElementValue);
          }
        }
      });
    }
  }
}


/*
 * End Helper Functions for set-user-data-as-cookies-gtm.js
 */

/**********************************************/


/*
 * Start Helper Functions for snap-cross-platform-data-synchronization-system-gtm.js
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
  var dataLayerObject = {};
  dataLayerObject[variableName] = variableValue;
  window.dataLayer.push(dataLayerObject);
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
      // return unescape(document.cookie.substring(variableNameIndexStart, variableNameIndexEnd));
      return document.cookie.substring(variableNameIndexStart, variableNameIndexEnd);
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
 * End Helper Functions for snap-cross-platform-data-synchronization-system-gtm.js
 */

/* -------------------------------- */