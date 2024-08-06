import { StripePaymentIntentRequestBody, StripePaymentIntentResponse } from "@/helpers/types";
import AWS from 'aws-sdk';

const parseString = require('react-native-xml2js').parseString;

AWS.config.update({
  region: 'us-east-1', // replace with your region
  accessKeyId: 'AKIATPYABGGAZIFRLNGE', //process.env.AWS_ACCESS_KEY_ID, // replace with your access key
  secretAccessKey: 'bF6iW/FNN1jw0aOuZ/DtnTY/UgYxicMoHdFm+xLs', //process.env.AWS_SECRET_ACCESS_KEY, // replace with your secret key
});

const lambda = new AWS.Lambda();
const podcastURL = 'https://shareourstrength.org/feed/podcast/';

export const createPaymentIntentClientSecret = async ({
  amount,
  currency,
}: StripePaymentIntentRequestBody): Promise<StripePaymentIntentResponse> => {
  const params = {
    FunctionName: 'sos-react-native-payment-intent', // replace with your Lambda function name
    InvocationType: 'RequestResponse', // or 'Event' for async invocation
    Payload: JSON.stringify({
      amount,
      currency,
    }), // payload to send to the Lambda function
  };

  try {
    const response = await lambda.invoke(params).promise();

    const { clientSecret, customer } = JSON.parse(response.Payload);

    if (!clientSecret || !customer) {
      const errorMessage = "Could not get clientSecret or customer from Stripe";

      throw new Error(errorMessage);
    }

    return { clientSecret, customer };
  } catch (error) {
    return {
      clientSecret: null,
      customer: null,
    };
  }
};

/*export const dataFetchAndLoadServices = {
  fetchEpisodes: async () => {
    const mediaArray = [];
    try {
      await fetch(podcastURL)
      .then(response => response.text())
      .then((result) => {
        parseString(result, function(err, res) {
          (res.rss.channel[0].item).map((episode, index) => {
            setEpisodes(prevEpisodes => [
              ...prevEpisodes,
              {
                title: episode.title[0],
                date: episode.pubDate[0],
                image: episode['itunes:image'][0].$.href,
                desc: episode.description[0],
                duration: episode['itunes:duration'][0],
                url: episode.enclosure[0].$.url,
              }
            ]);
          });
          //console.log(res.rss.channel[0].item[0]['itunes:image'][0].$.href);
          //console.log(res.rss.channel[0].item[0].enclosure[0].$.url);
        });
      })
    } catch (error) {
      console.error(error);
    }
  }
};*/