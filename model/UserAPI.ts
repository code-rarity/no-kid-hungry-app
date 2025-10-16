import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { deleteValueFor, saveKeyValue } from "@/helpers/misc";

const LUMINATE_CONS_CLIENT_URL = "https://secure.nokidhungry.org/site/CRConsAPI";
const LUMINATE_CONS_SERVER_URL = "https://secure.nokidhungry.org/site/SRConsAPI";
const API_KEY = 'sosapikey';
const VERSION = '1.0';
const RESPONSE_FORMAT = 'json';

// LUMINATE CRM IS DATABASE OF RECORD - PULL AND PUSH UPDATES //
// ** External functions to use elsewhere in the app ** //

export const checkIfLoggedIn = async () => {
  try {
    const user = await getCurrentUser();
    if(typeof user !== 'undefined') {
      return user;
    } else {
      return undefined;
    }
  } catch(error) {
    return undefined;
  }
}

// Luminate functions for login, logout and more
// fetchOrCreateLuminateUser gets or creates luminate user
export const fetchOrCreateLuminateUser = async (payload) => {
  if(typeof payload !== 'undefined') {
    try {
      // Email must be lowercase for subsequent API calls!!
      const primaryEmail = (payload.data.signInDetails.loginId).toLowerCase();
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
          console.log("Logged in user exists in Luminate - need to sync between Luminate and DynamoDB");
          fetchAndSyncDBS(result.loginResponse.token);
        } else {
          // Some type of error on Luminate authenticateUser call
          if(result.errorResponse.code == "16") {
            try {
              console.log("User does not exist in Luminate, so now create user in Luminate and dynamoDB");
              createLuminateUser(primaryEmail);
              // See if they are logged in automatically after create or not
            } catch(error) {
              // App logout user if they failed to get created in Luminate
              signOut();
              throw new Error("Could not create a luminate user, so logging out as Auth not synced");
            }
          } else {
            // Logout of the App login as the user either made a typo or doesn't exist in luminate
            signOut();
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

export const logOutLuminateUser = async () => {
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

const fetchAndSyncDBS = (token) => {
  // Use Expo's Secure Store to safely store the luminate session token locally
  // saveKeyValue("luminateToken", token);

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

const createLuminateUser = (email) => {
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