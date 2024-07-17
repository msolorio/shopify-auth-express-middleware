import express from 'express'
import { getApiUrl, getPort } from '#app/config.mjs'

const app = express()

app.get('/health', (_, res) => {
  res.status(200).send('OK')
})

app.listen(getPort(), () => {
  console.log(`Server listening at ${getApiUrl()}`)
})
