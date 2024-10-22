import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { getApiUrl, getPort } from '#app/config.js'
import { ShopsRepository } from '#app/db/shopRepository'

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
const adminApiUrl = (store: string) => `https://${store}.myshopify.com/admin/api/2025-01/graphql.json`

app.get('/health', (_, res) => {
  res.status(200).send('OK')
})

app.get('/data/:shopify_store', async (req, res) => {
  const shopRepository = new ShopsRepository()
  const session = await shopRepository.get(req.params.shopify_store)

  return res.json(session)

  // const shopifyStore = req.params.shopify_store
  // const data = await fetch(adminApiUrl(shopifyStore), {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Shopify-Access-Token': process.env.SHOPIFY_API_KEY,
  //   },
  //   body: JSON.stringify({
  //     query: `
  //       {
  //         shop {
  //           name
  //         }
  //       }
  //     `,
  //   }),
})

app.listen(getPort(), () => {
  console.log(`Server listening at ${getApiUrl()}`)
})
