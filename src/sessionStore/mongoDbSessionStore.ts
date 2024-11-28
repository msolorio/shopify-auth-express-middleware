import 'dotenv/config';
import { MongoClient, Db, Collection } from 'mongodb';
import { Shop } from '#src/types';
import { AbstractSessionStore } from './index';

export const MongoDbSessionStore = function MongoDbSessionStore() {
  return new _MongoDbSessionStore();
}

export const mongoClient = new MongoClient(String(process.env.MONGODB_URI));

class _MongoDbSessionStore implements AbstractSessionStore {
  private _dbName = 'shopify'
  private _collectionName = 'shops'
  private _mongodbClient: MongoClient
  private _db: Db
  private _shopsModel: Collection

  constructor() {
    this._mongodbClient = mongoClient;
    this._db = this._mongodbClient.db(this._dbName);
    this._shopsModel = this._db.collection(this._collectionName);
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
