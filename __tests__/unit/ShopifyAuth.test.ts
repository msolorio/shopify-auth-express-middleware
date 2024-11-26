import assert from 'node:assert';
// import express from 'express'
// import bodyParser from 'body-parser'
import { ShopifyAuth } from '#src/index';
import { FakeSessionStore } from '#src/sessionStore/FakeSessionStore';

describe('ShopifyAuth', () => {
  it('can return an access token', async () => {
    const fakeSessionStore = FakeSessionStore({
      'shop1': {
        'shopName': 'shop1.myshopify.com',
        'accessToken': 'shpua_123',
      }
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
    const accessToken = await shopifyAuth.getAccessToken('shop1');

    assert.equal(accessToken, 'shpua_123');
  })
})
