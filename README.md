# Shopify Auth Express Middleware

A package that makes it easy to manage OAuth flow with Shopify in an [Express.js](https://expressjs.com) application. The package builds on the [`@shopify/shopify-api`](https://www.npmjs.com/package/@shopify/shopify-app-express) package for managing OAuth 2.0 and allows clients to pass their own behavior for access token storage and retrieval, or provides out of the box support, allowing your app to make authorized requests to the [Shopify Admin API](https://shopify.dev/docs/api/admin-graphql).

---

## Requirements
To use this package, you'll need to:
- have a Shopify Partner account and development store
- have an app already set up on your partner account

## Usage Example

```sh
npm i @versollabs/shopify-auth-express-middleware
```

```ts
import { ShopifyAuth, MongoDbSessionStore } from '@versollabs/shopify-auth-express-middleware';

const app = express();
app.use(bodyParser.json());

const shopifyAuth = ShopifyAuth({ // Configure `ShopifyAuth`
  api: {
    apiKey: String(process.env.CLIENT_ID),
    apiSecretKey: String(process.env.CLIENT_SECRET),
    hostName: String(process.env.HOSTNAME),
    scopes: ['read_products', 'read_orders'],
  },
  authPaths: {
    begin: '/auth',
    callback: '/auth/callback',
  },
  sessionStore: MongoDbSessionStore({ // Provide a session store or use a built-in one
    url: String(process.env.MONGODB_URI),
    dbName: 'shopify',
    collectionName: 'shops',
  }),
});

app.use(shopifyAuth.router()); // Use the router middleware in your Express app

// Once storefront has installed your app call `getAccessToken` to get an access token for the store.
const accessToken = await shopifyAuth.getAccessToken(storeName);
```

## Provide your own session store

You will likely want to provide your own behavior for managing access tokens. You can create a session storage object that implements the `AbstractSessionStore` interface and pass it to the ShopifyAuth constructor.

```ts
export interface AbstractSessionStore {
  add(shopName: string, accessToken: string): Promise<void>
  get(shopName: string): Promise<string | null>
}
```

```ts
import { ShopifyAuth, AbstractSessionStore } from '@versollabs/shopify-auth-express-middleware';

class MySessionStore implements AbstractSessionStore {
  async add(shopName: string): Promise<void> {
    // Add access token to persistent storage
  }

  async get(shopName: string): Promise<string | null> {
    // Get access token from your session store
  }
}

const shopifyAuth = ShopifyAuth({ // Configure `ShopifyAuth`
  api: {
    apiKey: String(process.env.CLIENT_ID),
    apiSecretKey: String(process.env.CLIENT_SECRET),
    hostName: String(process.env.HOSTNAME),
    scopes: ['read_products', 'read_orders'],
  },
  authPaths: {
    begin: '/auth',
    callback: '/auth/callback',
  },
  sessionStore: new MySessionStore()
});

app.use(shopifyAuth.router());
```

## Exposing a public endpoint for local dev

In order to perform auth with the Shopify API, you'll need to expose a public endpoint for your app. For local dev you can use a tool like [ngrok](https://ngrok.com) to create a local tunnel to your localhost.

Follow [ngrok instructions](https://ngrok.com/docs/getting-started/) to install and connect your account.

To create the tunnel, run
```sh
ngrok http http://localhost:<your-apps-port>
```
This will output a public URL that will direct requests to your local app.

## Integrating with Shopify

In order to complete setup of the auth flow, there are a couple steps you'll take in your Shopify Partners account.

1. Log in to your [Shopify Partner account](https://partners.shopify.com) and navigate to your app (or create one in the dashboard if you don't have one already).
2. In the Configurations tab of your app, set the following URLs:
   - Set App URL to the URL of the begin path - `https://<your-app-url.com>/auth`
   - And set Whitelisted redirection URL(s) to the callback path: `https://your-app-url.com/auth/callback`

When a Shopify storefront owner clicks to install your app a request will be sent to the "begin" route ('/auth') of your Express.js backend. The storefront owner will be redirected to a page where they can authorize your app to access their store data. After authorization, a request will be sent to the "callback" route ('/auth/callback') of your Express.js backend where the OAuth 2.0 access token for accessing that storefront's data will be captured and stored in your chosen session store.

Now from the partner dashboard in the overview tab for your app, select a store to test your app to test integration.
