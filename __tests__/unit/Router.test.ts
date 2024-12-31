import assert from 'node:assert';
import express from 'express';
import request from 'supertest';
import { ShopifyAuth } from '#src/index';
import { FakeSessionStore } from '../_fakes/FakeSessionStore';
import { fakeShopifyApi } from '../_fakes/FakeShopifyApi';

describe('Auth Router', () => {
  it('stores access token after shopify shop owner triggers auth route', async () => {
    const fakeSessionStore = FakeSessionStore({});

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
      fakeShopifyApi: fakeShopifyApi,
    });
    const app = express();
    app.use(shopifyAuth.router());

    const shopName = 'shop1';
    const fullShopName = `${shopName}.myshopify.com`;
    await request(app)
      .get(`/auth?shop=${fullShopName}`)
      .expect(302)
      .then((response) => {
        return request(app)
          .get(response.header.location)
          .expect(200);
      });

    assert(shopName in fakeSessionStore._store)
  })
})
