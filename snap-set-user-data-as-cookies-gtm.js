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

if (typeOf(readTextFile) !== "function") { // this function might already be set in another javascript file so we check it here
  function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            return rawFile.responseText;
        }
    }
    rawFile.send(null);
  }
}
//usage:
// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
// var fileText = readTextFile("https://mmsfpr.github.io/config.json");


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
  // TODO: replace this with reading config.json file
  var formButtonsObject = {
    "rentOrOwn": [
      "rentbtn",
      "ownbtn",
    ],
    "yearsAtThisAddress": [
      "lessthanonebtn",
      "onetothreebtn",
      "threetofivebtn",
      "fiveormorebtn",
    ]
  };

  var formButtonsObjectKeys = Object.keys(formButtonsObject);
  for (var i = 0; i < formButtonsObjectKeys.length; i++) {
    var formButtonObjectKeyName = formButtonsObjectKeys[i];
    var formButtonFieldIds = formButtonsObject[formButtonObjectKeyName];
    var formButtonHasSelection = false;
    for (var ii = 0; ii < formButtonFieldIds.length; ii++) {
      if (document.querySelector("#" + formButtonFieldIds[ii] + ".activeButtonListener.active") !== null) {
        formButtonHasSelection = true;
        console.log(formButtonObjectKeyName + ": " + formButtonFieldIds[ii]);
      }
    }
    if (!formButtonHasSelection) {
      console.log(formButtonObjectKeyName + ": (none)");
    }
  }
}

function addListenersToFormButtons() {
  var configUrl = "https://mmsfpr.github.io/config.json";
  var configText = readTextFile(configUrl);
  var config = JSON.parse(configText);
  var formButtons = config["formButtons"];

  for (var i = 0; i < formButtons.length; i++) {
    var formButtonObject = formButtons[i];
    var elementAttributeName = formButtonObject["attributeName"];
    var elementAttributeValue = formButtonObject["attributeValue"];
    var elementQuerySelector = "[" + elementAttributeName + "='" + elementAttributeValue +"']";
    var formButtonField = document.querySelector(elementQuerySelector);
    if (formButtonField !== null) {
      console.log("Adding listener for element matching querySelector(" + elementQuerySelector + ")");
      addClassToElement(elementQuerySelector, "activeButtonListener");
      formButtonField.addEventListener("focusout", function(event) {
        scanAllFormButtonsAndSetCookieValues();
      });
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
  var formInputFields = [
    {"name": "First Name"},
    {"id": "lastName"},
    {"name": "Mobile Phone Number"},
    {"id": "emailAddress"},
    {"id": "verificationCode"},
    {"id": "homeAddress"},
    {"name": "Zip Code"},
    {"id": "apartment/suite"},
    {"id": "dateOfBirth"},
    {"id": "driverLicenseNumber"},
    {"id": "state"},
    {"id": "socialSecurityNumberOrItin"},
  ];
  
  for (var i = 0; i < formInputFields.length; i++) {
    var formElementObject = formInputFields[i];
    var elementAttributeName = Object.keys(formElementObject);
    var elementAttributeValue = formElementObject[elementAttributeName];
    var elementQuerySelector = "[" + elementAttributeName + "='" + elementAttributeValue +"']";
    var formInputField = document.querySelector(elementQuerySelector);
    if (formInputField !== null) {
      console.log("Adding listener for element matching querySelector(" + elementQuerySelector + ")");
      formInputField.addEventListener("focusout", function(event) {
        var eventElementId = event.target.id;
        var eventElementName = event.target.name;
        var eventElementValue = event.target.value;
        console.log("eventElementId: " + eventElementId + " | eventElementName: " + eventElementName + " | eventElementValue: " + eventElementValue);
        setCookie(eventElementName, eventElementValue, null);
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

