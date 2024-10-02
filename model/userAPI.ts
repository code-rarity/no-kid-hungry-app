import { deleteValueFor, saveKeyValue } from "@/helpers/misc";

const LUMINATE_CONS_CLIENT_URL = "https://secure.nokidhungry.org/site/CRConsAPI";
const LUMINATE_CONS_SERVER_URL = "https://secure.nokidhungry.org/site/SRConsAPI";
const API_KEY = 'sosapikey';
const VERSION = '1.0';
const RESPONSE_FORMAT = 'json';

// ** External functions to use elsewhere in the app ** //

// createOrGetAuthUser runs on app login to sync or create an user
export const createOrGetAuthUser = async (payload) => {
  if(typeof payload !== 'undefined') {
    const primaryEmail = payload.data.signInDetails.loginId;
    try {
      await fetch(`${LUMINATE_CONS_CLIENT_URL}?method=authenticateUser&api_key=${API_KEY}&v=${VERSION}&response_format=${RESPONSE_FORMAT}&primary_email=${primaryEmail}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        if(typeof result.loginResponse !== 'undefined') {
          // Luminate CRM is database of record, so we must update dynamoDB with any changes
          // We do this on login, so that we dont have to keep querying Luminate's APIs
          console.log("User successful luminate auth, so now get user data and sync w/ dynamoDB");
          getSyncAuthUser(result.loginResponse.token);
        } else {
          if(result.errorResponse.code == "16") {
            console.log("User does not exist in Luminate, so now create user in Luminate and dynamoDB");
            createAuthUser(primaryEmail);
          } else {
            throw new Error("An error occurred with the API call! Cannot auth into Luminate.");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("Must provide a payload object including the email.");
  }
}

export const logOutUser = async () => {
  try {
    await fetch(`${LUMINATE_CONS_CLIENT_URL}?method=logout&api_key=${API_KEY}&v=${VERSION}&response_format=${RESPONSE_FORMAT}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(result => {
      deleteValueFor("luminateToken");
      deleteValueFor("email");
      deleteValueFor("user");
    });
  } catch (error) {
    console.error(error);    
  }    
}

// ** Internal functions to be used within other functions here ** //

const getSyncAuthUser = (token) => {
  // Use Expo's Secure Store to safely store the luminate session token locally
  saveKeyValue("luminateToken", token);

  try {
    fetch(`${LUMINATE_CONS_CLIENT_URL}?method=getUser&api_key=${API_KEY}&v=${VERSION}&response_format=${RESPONSE_FORMAT}&sso_auth_token=${token}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(result => {
      // This is where we will update dynamoDB user record with most up to date CRM information
      console.log(result);
    });
  } catch (error) {
    console.log(error);    
  }
}

const createAuthUser = (email) => {
  try {
    fetch(`${LUMINATE_CONS_CLIENT_URL}?method=create&api_key=${API_KEY}&v=${VERSION}&response_format=${RESPONSE_FORMAT}&primary_email=${email}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(result => {
      // This is where we will create a dynamoDB user record with email, cons_id, and other information
      console.log(result);
    });
  } catch (error) {
    console.error(error);    
  }  
}

const getUserTransactions = async (token) => {
try {
    await fetch(`${LUMINATE_CONS_CLIENT_URL}?method=getUserTransactions&api_key=${API_KEY}&v=${VERSION}&response_format=${RESPONSE_FORMAT}&sso_auth_token=${token}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(result => {
      return result;
    });
  } catch (error) {
    console.error(error);    
  }
}