import 'dotenv/config';
import assert from 'node:assert';
import { MongoDbSessionStore } from '#src/sessionStore/mongoDbSessionStore';
import { deleteAllRecordsMongo, mongoClient } from '../_utils/deleteAllRecordsMongo';

const testDbName = 'shopify-test';

afterEach(async () => await deleteAllRecordsMongo(testDbName));

describe('MongoDbSessionStore', () => {
  it('can add a shop to mongodb', async () => {
    const mongoDbSessionStore = MongoDbSessionStore({
      url: String(process.env.MONGODB_URI),
      dbName: testDbName,
      collectionName: 'shops',
    });
    const shop = {
      shopName: 'shop1.myshopify.com',
      accessToken: 'shpua_123',
    };

    await mongoDbSessionStore.add(shop);

    await mongoClient.connect();
    const addedShop = await mongoClient
      .db(testDbName)
      .collection('shops')
      .findOne({ shopName: 'shop1.myshopify.com' });
    await mongoClient.close();
    assert.equal(addedShop && addedShop.shopName, shop.shopName);
    assert.equal(addedShop && addedShop.accessToken, shop.accessToken);
  });

  it('can get a shop from mongodb', async () => {
    const mongoDbSessionStore = MongoDbSessionStore({
      url: String(process.env.MONGODB_URI),
      dbName: testDbName,
      collectionName: 'shops',
    });
    const shortShopName = 'shop1';
    const shop = {
      shopName: `${shortShopName}.myshopify.com`,
      accessToken: 'shpua_123',
    };

    await mongoClient.connect();
    await mongoClient
      .db(testDbName)
      .collection('shops')
      .insertOne(shop);
    await mongoClient.close();

    const retrievedShop = await mongoDbSessionStore.get(shortShopName);

    assert.equal(retrievedShop && retrievedShop.shopName, shop.shopName);
    assert.equal(retrievedShop && retrievedShop.accessToken, shop.accessToken);
  });
});
