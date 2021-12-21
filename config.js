/*
 * Mash Metrics Cross Platform Data Synchronization System Configuration
 */

var MM_CPDSS_CONFIG_SYNC_INTERVAL = 10000; // milliseconds

var MM_CPDSS_CONFIG_COOKIE_DOMAIN = ".snapfinance.com";

var MM_CPDSS_CONFIG_COOKIE_PATH = "/";

var MM_CPDSS_CONFIG_COOKIE_EXPIRATION_IN_DAYS = 365 * 2; // 2 years

var MM_CPDSS_CONFIG_GTM_CONTAINER_ID_HOSTNAME_MAP = {
  "snapfinance.com": "GTM-52J6JQ5",
  "learn.snapfinance.com": "GTM-52J6JQ5",
  "blog.snapfinance.com": "GTM-52J6JQ5",
  "apply.snapfinance.com": "GTM-T4KFL8S",
};

var MM_CPDSS_CONFIG_FORM_FIELDS = {
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
      "cookieName": "yearsAtAddress",
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
    },
    {
      "cookieName": "directDeposit",
      "valueOptions": [
        {
          "attributeName": "id",
          "attributeValue": "directdepositnobtn",
          "cookieValue": "No"
        },
        {
          "attributeName": "id",
          "attributeValue": "directdeposityesbtn",
          "cookieValue": "Yes"
        },
      ],
    },
  ],
  "formInputFields": [
    {
      "cookieName": "firstName",
      "attributeName": "name",
      "attributeValue": "First Name",
    },
    {
      "cookieName": "zipCode",
      "attributeName": "name",
      "attributeValue": "Zip Code",
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
  "formDropDownMenus": [

  ],
};