import { router } from 'expo-router';

export const authenticateLuminateUser = async (payload) => {
  try {
    await fetch(`https://secure.nokidhungry.org/site/CRConsAPI?method=authenticateUser&api_key=sosapikey&v=1.0&response_format=json&primary_email=${payload.data.signInDetails.loginId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(rep => rep.json())
    .then(res => {
      console.log(res);
      router.navigate('(home)');
    });
  } catch (error) {
    console.error(error);
    router.navigate('(home)');
  }
}