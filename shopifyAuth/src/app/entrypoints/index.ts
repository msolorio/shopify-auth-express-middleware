import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { getApiUrl, getPort } from '#app/config.js'
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api'
import { ShopsRepository } from '#app/db/connection'

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

const shopify = shopifyApi({
  apiKey: process.env.CLIENT_ID,
  apiSecretKey: String(process.env.CLIENT_SECRET),
  scopes: ['read_products', 'read_inventory'],
  hostName: String(process.env.HOSTNAME),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

app.get('/api/auth', async (req, res) => {
  const shop = String(req.query.shop);
  // redirects user to authorization screen and after user approves, redirected to callback route
  await shopify.auth.begin({
    shop: String(shopify.utils.sanitizeShop(shop, true)),
    callbackPath: '/api/auth/callback',
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  });
});

app.get('/api/auth/callback', async (req, res) => {
  const callback = await shopify.auth.callback({
    rawRequest: req,
    rawResponse: res,
  });
  console.log('callback.session', callback.session) // contains access token
  const shopsRepository = new ShopsRepository();
  await shopsRepository.add(callback.session);


  res.status(200).send('You have approved the app.');
});

app.get('/health', (_, res) => {
  res.status(200).send('OK')
})

app.listen(getPort(), () => {
  console.log(`Server listening at ${getApiUrl()}`)
})
