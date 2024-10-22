import { MongoClient, Db, Collection } from 'mongodb';

const url = 'mongodb://root:example@mongo:27017';
const client = new MongoClient(url);
const dbName = 'shopifyAuth';

await client.connect();
const db = client.db(dbName);
const shops = db.collection('shops');

const results = await shops.find({}).toArray()
console.log('results', results)

class ShopsRepository {
  private _mongodbClient: MongoClient
  private _db: Db
  private _shopsModel: Collection

  constructor({ mongodbClient }: { mongodbClient: MongoClient }) {
    this._mongodbClient = mongodbClient
    this._db = this._mongodbClient.db(dbName);
    this._shopsModel = this._db.collection('shops');
  }

  async getAll() {
    return await this._shopsModel.find({}).toArray();
  }

  async add(shop: any) {
    return await this._shopsModel.insertOne(shop);
  }
}

export { ShopsRepository, client as mongodbClient }