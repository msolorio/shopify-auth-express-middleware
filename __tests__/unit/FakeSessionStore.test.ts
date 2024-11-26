import assert from 'node:assert';
import { FakeSessionStore } from '#src/sessionStore/FakeSessionStore';

describe('FakeSessionStore', () => {
  it('can get shop records', async () => {
    const store = {
      'shop1': {
        'shopName': 'shop1.myshopify.com',
        'accessToken': 'shpua_123',
      }
    }
    const fakeSessionStore = FakeSessionStore(store);
    const shop = await fakeSessionStore.get('shop1');

    assert.equal(shop, store.shop1);
  });

  it('can store shop records', async () => {
    const fakeSessionStore = FakeSessionStore();
    const shortShopName = 'shop2';
    const shop = {
      'shopName': `${shortShopName}.myshopify.com`,
      'accessToken': 'shpua_123',
    }
    await fakeSessionStore.add(shop);

    assert.equal(fakeSessionStore._store[shortShopName], shop);
  });
});
