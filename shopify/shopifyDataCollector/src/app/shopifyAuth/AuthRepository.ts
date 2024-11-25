import { MongoClient, Db, Collection } from 'mongodb';

class AuthRepository {
  private _mongodbClient: MongoClient
  private _db: Db
  private _shopsModel: Collection

  constructor({ url, dbName, collectionName }: { url?: string, dbName?: string, collectionName?: string }) {
    const _url = url || process.env.MONGODB_URI || '';
    const _dbName = dbName || 'shopifyAuth';
    const _collectionName = collectionName || 'shops';
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
