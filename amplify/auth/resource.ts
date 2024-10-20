import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      facebook: {
        clientId: secret('1561961587731597'),
        clientSecret: secret('02bd5a4f91534a833549c81e83729e1a')
      },
      callbackUrls: [
        'http://localhost:3000/',
        'https://nokidhungry.org'
      ],
      logoutUrls: ['http://localhost:3000/', 'https://nokidhungry.org'],
    }
  },
});
