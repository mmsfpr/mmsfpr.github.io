/*
 * Start Helper Functions
 */

if (typeOf(setCookie) !== "function") { // this function might already be set in another javascript file so we check it here
  function setCookie(variableName, variableValue, expirationInDays) {
    console.log("Running function setCookie(" + variableName + ", " + variableValue + ", " + expirationInDays + ")");
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
}

function addClassToElement(querySelector, className) {
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
  var formButtons = MM_CPDSS_CONFIG["formButtons"];

  for (var i = 0; i < formButtons.length; i++) {
    var formButtonObject = formButtons[i];
    var cookieName = formButtonObject["cookieName"];
    var formButtonHasSelection = false;
    var formButtonValueOptions = formButtonObject[i]["valueOptions"];
    for (var ii = 0; ii < formButtonValueOptions.length; ii++) {
      var elementAttributeName = formButtonValueOptions[ii]["attributeName"];
      var elementAttributeValue = formButtonValueOptions[ii]["attributeValue"];
      var elementQuerySelector = "[" + elementAttributeName + "='" + elementAttributeValue +"'].activeButtonListener.active";
      var formButtonFieldIsSelected = document.querySelector(elementQuerySelector);
      if (formButtonFieldIsSelected !== null) {
        formButtonHasSelection = true;
        var cookieValue = formButtonValueOptions[ii]["cookieValue"];
        console.log(cookieName + ": " + cookieValue);
      }
    }
    if (!formButtonHasSelection) {
      console.log(cookieName + ": (none)");
    }
  }
}

function addListenersToFormButtons() {
  var formButtons = MM_CPDSS_CONFIG["formButtons"];

  for (var i = 0; i < formButtons.length; i++) {
    var formButtonObject = formButtons[i];
    var formButtonValueOptions = formButtonObject["valueOptions"];
    for (var ii = 0; ii < formButtonValueOptions.length; ii++) {
      var elementAttributeName = formButtonObject["attributeName"];
      var elementAttributeValue = formButtonObject["attributeValue"];
      var elementQuerySelector = "[" + elementAttributeName + "='" + elementAttributeValue +"']";
      var formButtonField = document.querySelector(elementQuerySelector);
      if (formButtonField !== null) {
        console.log("Adding listener for element matching document.querySelector(" + elementQuerySelector + ")");
        addClassToElement(elementQuerySelector, "activeButtonListener");
        formButtonField.addEventListener("focusout", function(event) {
          scanAllFormButtonsAndSetCookieValues();
        });
      }
    }
  }
  // var formButtonsObject = {
  //   "rentOrOwn": [
  //     "rentbtn",
  //     "ownbtn",
  //   ],
  //   "yearsAtThisAddress": [
  //     "lessthanonebtn",
  //     "onetothreebtn",
  //     "threetofivebtn",
  //     "fiveormorebtn",
  //   ]
  // };

  // // formButtonsObject = config["formButtons"];

  // var formButtonsObjectKeys = Object.keys(formButtonsObject);
  // for (var i = 0; i < formButtonsObjectKeys.length; i++) {
  //   var formButtonObjectKeyName = formButtonsObjectKeys[i];
  //   var formButtonObjectKeyIds = formButtonsObject[formButtonObjectKeyName];
  //   for (var ii = 0; ii < formButtonObjectKeyIds.length; ii++) {
  //     var formButton = document.getElementById(formButtonObjectKeyIds[ii]);
  //     if (formButton !== null) {
  //       addClassToElement("#"+ formButtonObjectKeyIds[ii], "activeButtonListener");
  //       formButton.addEventListener("focusout", function(event) {
  //         scanAllFormButtonsAndSetCookieValues();
  //       });
  //     }
  //   }
  // }
}

function addListenersForFormInputFields() {
  // TODO: FIGURE OUT HOW TO ADD CORRESPONDING COOKIE NAMES FOR EACH OF THESE
  var formInputFields = MM_CPDSS_CONFIG["formInputFields"];
  
  for (var i = 0; i < formInputFields.length; i++) {
    var formElementObject = formInputFields[i];
    var elementAttributeName = formElementObject["attributeName"];
    var elementAttributeValue = formElementObject["attributeValue"];
    var elementCookieName = formElementObject["cookieName"];
    var elementQuerySelector = "[" + elementAttributeName + "='" + elementAttributeValue +"']";
    var formInputField = document.querySelector(elementQuerySelector);
    if (formInputField !== null) {
      console.log("Adding listener for element matching document.querySelector(" + elementQuerySelector + ")");
      formInputField.addEventListener("focusout", function(event) {
        var eventElementId = event.target.id;
        var eventElementName = event.target.name;
        var eventElementValue = event.target.value;
        console.log("eventElementId: " + eventElementId + " | eventElementName: " + eventElementName + " | eventElementValue: " + eventElementValue);
        setCookie(elementCookieName, eventElementValue, null);
      });
    }
  }
}

/*
 * End Helper Functions
 */

/**********************************************/

/*
 * Add listeners for form input fields
 */

addListenersForFormInputFields();

/**********************************************/

/*
 * Add listener for form buttons
 */

addListenersToFormButtons();

