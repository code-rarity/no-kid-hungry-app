import { saveKeyValue } from "@/helpers/misc";
const LuminateBaseClientURL = "https://secure.nokidhungry.org/site/CRConsAPI";
const LuminateBaseServerURL = "https://secure.nokidhungry.org/site/SRConsAPI";

export const createOrAuthUser = async (payload) => {
  try {
    await fetch(`${LuminateBaseClientURL}?method=authenticateUser&api_key=sosapikey&v=1.0&response_format=json&primary_email=${payload.data.signInDetails.loginId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(rep => rep.json())
    .then(res => {
      if(res) {
        // User exists in luminate CRM, so save token
        saveKeyValue("luminateToken", res.loginResponse.token);
      } else {
        // User does not exist in luminate CRM, so create them
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export const getUserTransactions = async (token) => {
  try {
    await fetch(`${LuminateBaseClientURL}?method=getUserTransactions&api_key=sosapikey&v=1.0&response_format=json&auth=${token}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(rep => rep.json())
    .then(res => {
      console.log(res);
    });
  } catch (error) {
    console.error(error);    
  }
}