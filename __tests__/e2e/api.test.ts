import { getApiUrl } from '#app/config.js'

describe('health endpoint', () => {
  it('returns 200 and ok', async () => {
    const response = await fetch(`${getApiUrl()}/health`)
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
  })
})