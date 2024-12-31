import assert from 'node:assert';
import { ShopifyAuth } from '#src/index';
import { FakeSessionStore } from '../_fakes/FakeSessionStore';

describe('ShopifyAuth', () => {
  it('can return an access token', async () => {
    const accessToken = 'shpua_123';
    const fakeSessionStore = FakeSessionStore({
      'shop1': accessToken,
    });
    const shopifyAuth = ShopifyAuth({
      api: {
        apiKey: 'API_KEY',
        apiSecretKey: 'API_SECRET_KEY',
        hostName: 'HOSTNAME',
        scopes: [],
      },
      authPaths: {
        begin: '/auth',
        callback: '/auth/callback',
      },
      sessionStore: fakeSessionStore,
    });
    const result = await shopifyAuth.getAccessToken('shop1');

    assert.equal(result, accessToken);
  });
});
