import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { getApiUrl, getPort } from '#app/config.js'
import { AuthRepository } from '#app/db/shopRepository'

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
const adminApiUrl = (store: string) => `https://${store}.myshopify.com/admin/api/2025-01/graphql.json`

app.get('/health', (_, res) => {
  res.status(200).send('OK')
})

app.get('/data/:shopify_store', async (req, res) => {
  const shopifyStore = req.params.shopify_store
  const authRepository = new AuthRepository()
  const session = await authRepository.get(shopifyStore)
  const accessToken = String(session && session.accessToken)

  const data = await fetch(adminApiUrl(shopifyStore), {
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
