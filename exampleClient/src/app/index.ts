import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import { ShopifyAuth } from '../../../src';
import { FakeSessionStore } from '../../../__tests__/_fakes/FakeSessionStore';
import { getApiUrl, getPort } from '../config';
import { scopes } from './scopes';

const app = express()
app.use(bodyParser.json())

// TODO: replace with real session store
const fakeSessionStore = FakeSessionStore({
  'shop1': {
    'shopName': 'shop1.myshopify.com',
    'accessToken': 'shpua_123',
  }
});
const shopifyAuth = ShopifyAuth({
  api: {
    apiKey: String(process.env.CLIENT_ID),
    apiSecretKey: String(process.env.CLIENT_SECRET),
    hostName: String(process.env.HOSTNAME),
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

