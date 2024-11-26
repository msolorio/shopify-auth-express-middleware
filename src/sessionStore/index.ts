export { MongoDbSessionStore } from './mongoDbSessionStore.js';
import { Shop } from '#src/types';

export interface AbstractSessionStore {
  add(shop: Shop): Promise<void>
  get(shopName: string): Promise<Shop | null>
}
