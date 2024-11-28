import 'dotenv/config';
import assert from 'node:assert';
import { MongoDbSessionStore, mongoClient } from '#src/sessionStore/mongoDbSessionStore';
import { deleteAllRecordsMongo } from '../_utils/deleteAllRecordsMongo';

beforeEach(async () => await deleteAllRecordsMongo());

describe('MongoDbSessionStore', () => {
  it('can add a shop to mongodb', async () => {
    const mongoDbSessionStore = MongoDbSessionStore();
    const shop = {
      shopName: 'shop1.myshopify.com',
      accessToken: 'shpua_123',
    };

    await mongoDbSessionStore.add(shop);

    await mongoClient.connect();
    const addedShop = await mongoClient
      .db('shopify')
      .collection('shops')
      .findOne({ shopName: 'shop1.myshopify.com' });
    await mongoClient.close();
    assert.equal(addedShop && addedShop.shopName, shop.shopName);
    assert.equal(addedShop && addedShop.accessToken, shop.accessToken);
  });

  it('can get a shop from mongodb', async () => {
    const mongoDbSessionStore = MongoDbSessionStore();
    const shortShopName = 'shop1';
    const shop = {
      shopName: `${shortShopName}.myshopify.com`,
      accessToken: 'shpua_123',
    };

    await mongoClient.connect();
    await mongoClient
      .db('shopify')
      .collection('shops')
      .insertOne(shop);
    await mongoClient.close();

    const retrievedShop = await mongoDbSessionStore.get(shortShopName);

    assert.equal(retrievedShop && retrievedShop.shopName, shop.shopName);
    assert.equal(retrievedShop && retrievedShop.accessToken, shop.accessToken);
  });
});
