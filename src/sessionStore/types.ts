export interface AbstractSessionStore {
  add(shopName: string, accessToken: string): Promise<void>
  get(shopName: string): Promise<string | null>
}

export type MongoDbSessionStoreOptions = {
  url: string;
  dbName: string;
  collectionName: string;
} | Record<string, never>;
