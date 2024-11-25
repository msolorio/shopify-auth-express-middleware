import { MongoClient, Db, Collection } from 'mongodb';
import { ShopifyAuthDb } from './types';

class AuthRepository {
  private _mongodbClient: MongoClient
  private _db: Db
  private _shopsModel: Collection

  constructor({ url, dbName, collectionName }: ShopifyAuthDb) {
    const _url = url;
    const _dbName = dbName;
    const _collectionName = collectionName;
    this._mongodbClient = new MongoClient(_url);
    this._db = this._mongodbClient.db(_dbName);
    this._shopsModel = this._db.collection(_collectionName);
  }

  async add(shop: any) {
    await this._mongodbClient.connect()
    await this._shopsModel.updateOne(
      { shop: shop.shop },
      { $set: shop },
      { upsert: true },
    )
    await this._mongodbClient.close()
  }

  async get(shop: string) {
    await this._mongodbClient.connect()
    const fullShop = `${shop}.myshopify.com`
    const result = await this._shopsModel.findOne({ shop: fullShop })
    await this._mongodbClient.close()
    return result
  }
}

export { AuthRepository }
