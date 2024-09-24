import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { getApiUrl, getPort } from '#app/config.js'

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/health', (_, res) => {
  res.status(200).send('OK')
})

app.listen(getPort(), () => {
  console.log(`Server listening at ${getApiUrl()}`)
})
