import { AbstractSessionStore } from '#src/sessionStore/types';

export const FakeSessionStore = (store: Record<string, string> = {}) => new _FakeSessionStore(store);

class _FakeSessionStore implements AbstractSessionStore {
  public _store: Record<string, string> = {};

  constructor(store: Record<string, string> = {}) {
    this._store = store;
  }

  public async add(shopName: string, accessToken: string): Promise<void> {
    this._store[shopName] = accessToken;
  }

  public async get(shopName: string): Promise<string | null> {
    return this._store[shopName] || null;
  }
}
