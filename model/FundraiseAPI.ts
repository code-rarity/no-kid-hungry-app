const LUMINATE_TEAMRAISER_CLIENT_URL = "https://secure.nokidhungry.org/site/CRTeamraiserAPI";
const LUMINATE_TEAMRAISER_SERVER_URL = "https://secure.nokidhungry.org/site/SRTeamraiserAPI";
const API_KEY = 'sosapikey';
const VERSION = '1.0';
const RESPONSE_FORMAT = 'json';

// ** Functions for displaying and interacting with teamraiser campaigns ** //

export const fetchFundraisers = async () => {
  try {
    await fetch(`${LUMINATE_TEAMRAISER_CLIENT_URL}?method=getTeamraisersByInfo&api_key=${API_KEY}&v=${VERSION}&response_format=${RESPONSE_FORMAT}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then((result) => {
      console.log(result);
    });
  } catch (error) {
    console.log(error);
  }
}