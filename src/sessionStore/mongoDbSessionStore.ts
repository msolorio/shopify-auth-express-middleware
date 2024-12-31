import 'dotenv/config';
import { MongoClient, Db, Collection } from 'mongodb';
// import { Shop } from '#src/types';
import { AbstractSessionStore, MongoDbSessionStoreOptions } from './types';

export const MongoDbSessionStore = function MongoDbSessionStore(options: MongoDbSessionStoreOptions) {
  return new _MongoDbSessionStore(options);
}

class _MongoDbSessionStore implements AbstractSessionStore {
  private _mongodbClient: MongoClient
  private _db: Db
  private _shopsModel: Collection

  constructor(options: MongoDbSessionStoreOptions) {
    this._mongodbClient = new MongoClient(options.url);
    this._db = this._mongodbClient.db(options.dbName);
    this._shopsModel = this._db.collection(options.collectionName);
  }

  public async add(shopName: string, accessToken: string): Promise<void> {
    await this._mongodbClient.connect()
    await this._shopsModel.updateOne(
      { shopName },
      { $set: { shopName, accessToken } },
      { upsert: true },
    )
    await this._mongodbClient.close()
  }

  public async get(shopName: string): Promise<string | null> {
    await this._mongodbClient.connect()
    const result = await this._shopsModel.findOne({ shopName })
    await this._mongodbClient.close()
    return result ? result.accessToken : null as unknown as string | null;
  }
}
