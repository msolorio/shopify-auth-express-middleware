import 'dotenv/config';
import assert from 'node:assert';
import { MongoDbSessionStore } from '#src/sessionStore/mongoDbSessionStore';
import { deleteAllRecordsMongo, mongoClient } from '../_utils/deleteAllRecordsMongo';

beforeEach(async () => await deleteAllRecordsMongo());

describe('MongoDbSessionStore', () => {
  it('can add a shop to mongodb', async () => {
    const collectionName = 'shops-test'
    const mongoDbSessionStore = MongoDbSessionStore({
      url: String(process.env.MONGODB_URI),
      dbName: 'shopify',
      collectionName: collectionName,
    });
    const shopName = 'shop1'
    const accessToken = 'shpua_123'

    await mongoDbSessionStore.add(shopName, accessToken);

    await mongoClient.connect();
    const foundShop = await mongoClient
      .db('shopify')
      .collection(collectionName)
      .findOne({ shopName });
    await mongoClient.close();
    assert.equal(foundShop && foundShop.shopName, shopName);
    assert.equal(foundShop && foundShop.accessToken, accessToken);
  });

  it('can get a shop from mongodb', async () => {
    const collectionName = 'shops-test'
    const mongoDbSessionStore = MongoDbSessionStore({
      url: String(process.env.MONGODB_URI),
      dbName: 'shopify',
      collectionName: collectionName,
    });
    const shopName = 'shop1';
    const accessToken = 'shpua_123';

    await mongoClient.connect();
    await mongoClient
      .db('shopify')
      .collection(collectionName)
      .insertOne({ shopName, accessToken });
    await mongoClient.close();

    const result = await mongoDbSessionStore.get(shopName);

    assert.equal(result, accessToken);
  });
});
