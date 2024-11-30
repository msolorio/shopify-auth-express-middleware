import { AbstractSessionStore } from '#src/sessionStore';
import { Shop } from '#src/types';

export const FakeSessionStore = (store: Record<string, Shop> = {}) => new _FakeSessionStore(store);

class _FakeSessionStore implements AbstractSessionStore {
  public _store: Record<string, Shop> = {};

  constructor(store: Record<string, Shop> = {}) {
    this._store = store;
  }

  public async add(shop: Shop) {
    const shortShopName = shop.shopName.split('.')[0];
    this._store[shortShopName] = shop;
  }

  public async get(shopName: string): Promise<Shop | null> {
    return this._store[shopName] || null;
  }
}
