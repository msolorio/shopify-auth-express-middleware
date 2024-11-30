import { Shop } from '#src/types';

export interface AbstractSessionStore {
  add(shop: Shop): Promise<void>
  get(shopName: string): Promise<Shop | null>
}

export type MongoDbSessionStoreOptions = {
  url: string;
  dbName: string;
  collectionName: string;
} | Record<string, never>;
