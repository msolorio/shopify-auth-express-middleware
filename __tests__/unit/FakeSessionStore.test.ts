import assert from 'node:assert';
import { FakeSessionStore } from '../_fakes/FakeSessionStore';

describe('FakeSessionStore', () => {
  it('can get shop records', async () => {
    const accessToken = 'shpua_111'
    const store = {
      'shop1': accessToken
    }
    const fakeSessionStore = FakeSessionStore(store);
    const result = await fakeSessionStore.get('shop1');

    assert.equal(result, accessToken);
  });

  it('can store shop records', async () => {
    const fakeSessionStore = FakeSessionStore();
    const shopName = 'shop2'
    const accessToken = 'shpua_222'
    await fakeSessionStore.add(shopName, accessToken);

    assert.equal(fakeSessionStore._store[shopName], accessToken);
  });
});
