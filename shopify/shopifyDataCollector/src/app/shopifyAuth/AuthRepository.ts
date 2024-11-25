import { MongoClient, Db, Collection } from 'mongodb';
import { ShopifyAuthDb, Shop } from './types';

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

  public async add(shop: Shop) {
    await this._mongodbClient.connect()
    await this._shopsModel.updateOne(
      { shopName: shop.shopName },
      { $set: shop },
      { upsert: true },
    )
    await this._mongodbClient.close()
  }

  public async get(shopName: string) {
    await this._mongodbClient.connect()
    const fullShopName = `${shopName}.myshopify.com`
    const result = await this._shopsModel.findOne({ shopName: fullShopName })
    await this._mongodbClient.close()
    return result
  }
}

export { AuthRepository }
