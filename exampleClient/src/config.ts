const getPort = function (): number {
  return Number(process.env.PORT) || 3001;
}

const getApiUrl = function (): string {
  const host = process.env.API_HOST || 'localhost'
  return `http://${host}:${getPort()}`
}

export const CLIENT_ID = process.env.CLIENT_ID
export const CLIENT_SECRET = process.env.CLIENT_SECRET
export const SHOPIFY_AUTH_ENDPOINT = process.env.SHOPIFY_AUTH_ENDPOINT
export const MONGODB_URI = process.env.MONGODB_URI

export { getApiUrl, getPort }
