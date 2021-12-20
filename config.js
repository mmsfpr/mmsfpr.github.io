var MM_CPDSS_CONFIG_SYNC_INTERVAL = 10000; // milliseconds

var MM_CPDSS_CONFIG_FORM_FIELDS = { // stands for Mash Metrics Cross-Platform Data Synchronization System Config
  "formButtons": [
    {
      "cookieName": "rentOrOwn",
      "valueOptions": [
        {
          "attributeName": "id",
          "attributeValue": "rentbtn",
          "cookieValue": "Rent"
        },
        {
          "attributeName": "id",
          "attributeValue": "ownbtn",
          "cookieValue": "Own"
        }
      ],
    },
    {
      "cookieName": "yearsAtThisAddress",
      "valueOptions": [
        {
          "attributeName": "id",
          "attributeValue": "lessthanonebtn",
          "cookieValue": "Less than 1 Year"
        },
        {
          "attributeName": "id",
          "attributeValue": "onetothreebtn",
          "cookieValue": "Between 1 - 3 Years"
        },
        {
          "attributeName": "id",
          "attributeValue": "threetofivebtn",
          "cookieValue": "Between 3 - 5 Years"
        },
        {
          "attributeName": "id",
          "attributeValue": "fiveormorebtn",
          "cookieValue": "5 or More Years"
        }
      ],
    }
  ],
  "formInputFields": [
    {
      "cookieName": "firstName",
      "attributeName": "name",
      "attributeValue": "First Name",
    },
    {
      "cookieName": "lastName",
      "attributeName": "id",
      "attributeValue": "lastName",
    },
    {
      "cookieName": "mobileNumber",
      "attributeName": "name",
      "attributeValue": "Mobile Phone Number",
    },
    {
      "cookieName": "email",
      "attributeName": "id",
      "attributeValue": "emailAddress",
    },
    {
      "cookieName": "verificationCode",
      "attributeName": "id",
      "attributeValue": "verificationCode",
    },
    {
      "cookieName": "homeAddress",
      "attributeName": "id",
      "attributeValue": "homeAddress",
    },
    {
      "cookieName": "zipCode",
      "attributeName": "name",
      "attributeValue": "Zip Code",
    },
    {
      "cookieName": "apartmentOrSuite",
      "attributeName": "id",
      "attributeValue": "apartment/suite",
    },
    {
      "cookieName": "driversLicenseNumber",
      "attributeName": "id",
      "attributeValue": "driverLicenseNumber",
    },
    {
      "cookieName": "state",
      "attributeName": "id",
      "attributeValue": "state",
    },
    {
      "cookieName": "dateOfBirth",
      "attributeName": "id",
      "attributeValue": "dateOfBirth",
    }
  ],
  "formDropDownMenus": {

  }
}