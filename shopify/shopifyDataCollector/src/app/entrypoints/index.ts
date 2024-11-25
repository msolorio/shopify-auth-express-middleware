import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { getApiUrl, getPort } from '#app/config'
import { ShopifyAuth, MongoDbSessionStore } from '#app/shopifyAuth'
import { scopes } from './scopes';

const adminApiUrl = (store: string) => `https://${store}.myshopify.com/admin/api/2025-01/graphql.json`

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

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
  sessionStore: MongoDbSessionStore({
    url: String(process.env.MONGODB_URI),
    dbName: 'shopifyAuth',
    collectionName: 'shops',
  }),
})

app.use(shopifyAuth.router());

app.get('/health', (_, res) => {
  res.status(200).send('OK')
})

app.get('/data/:shopify_store', async (req, res) => {
  const storeName = req.params.shopify_store;
  const accessToken = await shopifyAuth.getAccessToken(storeName);

  const data = await fetch(adminApiUrl(storeName), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({
      query: `
        query {
          orders(first: 20) {
            edges {
              node {
                id
                updatedAt
              }
            }
          }
        }
      `,
    }),
  })
  const json = await data.json()
  return res.json(json)
})

app.listen(getPort(), () => {
  console.log(`Server listening at ${getApiUrl()}`)
})
