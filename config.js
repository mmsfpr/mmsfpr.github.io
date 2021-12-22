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
          "querySelector": "[id='rentbtn']",
          "cookieValue": "Rent"
        },
        {
          "querySelector": "[id='ownbtn']",
          "cookieValue": "Own"
        }
      ],
    },
    {
      "cookieName": "yearsAtAddress",
      "valueOptions": [
        {
          "querySelector": "[id='lessthanonebtn']",
          "cookieValue": "Less than 1 Year"
        },
        {
          "querySelector": "[id='onetothreebtn']",
          "cookieValue": "Between 1 - 3 Years"
        },
        {
          "querySelector": "[id='threetofivebtn']",
          "cookieValue": "Between 3 - 5 Years"
        },
        {
          "querySelector": "[id='fiveormorebtn']",
          "cookieValue": "5 or More Years"
        }
      ],
    },
    {
      "cookieName": "directDeposit",
      "valueOptions": [
        {
          "querySelector": "[id='directdepositnobtn']",
          "cookieValue": "No"
        },
        {
          "querySelector": "[id='directdeposityesbtn']",
          "cookieValue": "Yes"
        },
      ],
    },
  ],
  "formInputFields": [
    {
      "cookieName": "firstName",
      "querySelector": "[name='First Name']",
    },
    {
      "cookieName": "zipCode",
      "querySelector": "[name='Zip Code']",
    },
    {
      "cookieName": "state",
      "querySelector": "[id='state']",
    },
    {
      "cookieName": "dateOfBirth",
      "querySelector": "[id='dateOfBirth']",
    }
  ],
  "formDropDownMenus": [

  ],
  "utmCodes": [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ]
};