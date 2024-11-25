import { MongoClient, Db, Collection } from 'mongodb';
import { Shop, MongoDbSessionStoreOptions } from '#app/shopifyAuth/types';
import { AbstractSessionStore } from './index';

export const MongoDbSessionStore = function MongoDbSessionStore(options: MongoDbSessionStoreOptions) {
  return new _MongoDbSessionStore(options);
}

class _MongoDbSessionStore implements AbstractSessionStore {
  private _mongodbClient: MongoClient
  private _db: Db
  private _shopsModel: Collection

  constructor({ url, dbName, collectionName }: MongoDbSessionStoreOptions) {
    const _url = url;
    const _dbName = dbName;
    const _collectionName = collectionName;
    this._mongodbClient = new MongoClient(_url);
    this._db = this._mongodbClient.db(_dbName);
    this._shopsModel = this._db.collection(_collectionName);
  }

  public async add(shop: Shop) {
    await this._mongodbClient.connect()
    await this._shopsModel.updateOne(
      { shopName: shop.shopName },
      { $set: shop },
      { upsert: true },
    )
    await this._mongodbClient.close()
  }

  public async get(shopName: string): Promise<Shop | null> {
    await this._mongodbClient.connect()
    const fullShopName = `${shopName}.myshopify.com`
    const result = await this._shopsModel.findOne({ shopName: fullShopName })
    await this._mongodbClient.close()
    return result as unknown as Shop | null;
  }
}
