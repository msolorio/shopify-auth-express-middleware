import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { ShopifyAuth } from '../../../src';
import { FakeSessionStore } from '../../../__tests__/_fakes/FakeSessionStore';
import { getApiUrl, getPort, CLIENT_ID, CLIENT_SECRET, SHOPIFY_AUTH_ENDPOINT } from '../config';
import { scopes } from './scopes';

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

// TODO: replace with real session store
const fakeSessionStore = FakeSessionStore({
  'shop1': {
    'shopName': 'shop1.myshopify.com',
    'accessToken': 'shpua_123',
  }
});

const shopifyAuth = ShopifyAuth({
  api: {
    apiKey: String(CLIENT_ID),
    apiSecretKey: String(CLIENT_SECRET),
    hostName: String(SHOPIFY_AUTH_ENDPOINT),
    scopes: scopes,
  },
  authPaths: {
    begin: '/auth',
    callback: '/auth/callback',
  },
  sessionStore: fakeSessionStore,
});

app.use(shopifyAuth.router());

app.get('/health', (_, res) => {
  res.status(200).send('OK')
});

app.get('/access_token/:shopify_store', async (req, res) => {
  const storeName = req.params.shopify_store;
  const accessToken = await shopifyAuth.getAccessToken(storeName);
  return res.status(200).send({ accessToken });
});

app.listen(getPort(), () => {
  console.log(`Server listening at ${getApiUrl()}`)
})

