import express from 'express'
import { getApiUrl } from '#app/config.mjs'

const app = express()
const port = 3000

app.get('/health', (_, res) => {
  res.status(200).send('OK')
})

app.listen(port, () => {
  console.log(`Server listening at ${getApiUrl()}`)
})
