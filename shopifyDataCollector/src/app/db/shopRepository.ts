import { MongoClient, Db, Collection } from 'mongodb';

const url = 'mongodb://root:example@mongo:27017'
const dbName = 'shopifyAuth';

class ShopsRepository {
  private _mongodbClient: MongoClient
  private _db: Db
  private _shopsModel: Collection

  constructor() {
    this._mongodbClient = new MongoClient(url);
    this._db = this._mongodbClient.db(dbName);
    this._shopsModel = this._db.collection('shops');
  }

  async get(shop: string) {
    await this._mongodbClient.connect()
    const fullShop = `${shop}.myshopify.com`
    const result = await this._shopsModel.findOne({ shop: fullShop })
    await this._mongodbClient.close()
    return result
  }
  // async add(shop: any) {
  //   await this._mongodbClient.connect()
  //   await this._shopsModel.updateOne(
  //     { shop: shop.shop },
  //     { $set: shop },
  //     { upsert: true },
  //   )
  //   await this._mongodbClient.close()
  // }
}

export { ShopsRepository }