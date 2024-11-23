const getPort = function (): number {
  return Number(process.env.PORT) || 3000;
}

const getApiUrl = function (): string {
  const host = process.env.API_HOST || 'localhost'
  return `http://${host}:${getPort()}`
}

export { getApiUrl, getPort }