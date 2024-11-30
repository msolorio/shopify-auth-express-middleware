# Shopify Auth Express Middleware

A package that makes it easy to manage Shopify authentication in an [Express.js](https://expressjs.com) application. The package builds on the [`@shopify/shopify-api`](https://www.npmjs.com/package/@shopify/shopify-app-express) package and handles OAuth 2.0 and access token storage when Shopify stores install your Shopify app, allowing your app to make authorized requests to the [Shopify Admin API](https://shopify.dev/docs/api/admin-graphql).

---

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
  sessionStore: MongoDbSessionStore(), // Choose a session store (MongoDB, PostgreSQL, Redis)
});

app.use(shopifyAuth.router()); // Use the router middleware in your Express app

// Call `getAccessToken` to get an access token for a store.
const accessToken = await shopifyAuth.getAccessToken(storeName);

```
