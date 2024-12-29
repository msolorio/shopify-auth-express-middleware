import 'dotenv/config';
import assert from 'node:assert';
import pg from 'pg';
import { PostgresSessionStore } from '#src/sessionStore';

const tableName = 'shops_test';
const postgresUri = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/shopify`;
const client = new pg.Client({ connectionString: postgresUri });

beforeAll(async () => {
  await client.connect();
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    shop_name VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
    access_token VARCHAR(255) NOT NULL
  );
`;
  await client.query(createTableQuery)
    .catch(err => console.error('Error creating table', err))
})

afterEach(async () => {
  await client.query(`DELETE FROM ${tableName}`)
    .catch(err => console.error('Error deleting records', err));
})

afterAll(async () => {
  await client.query(`DROP TABLE ${tableName}`)
  await client.end()
})

describe('PostgresSessionStore', () => {
  it('can add a shop to postgres', async () => {
    const postgresSessionStore = PostgresSessionStore({
      url: postgresUri,
      tableName: tableName,
    });
    const shop = { shopName: 'shop1', accessToken: 'shpua_123' };

    await postgresSessionStore.add(shop);

    const query = `SELECT * FROM ${tableName} WHERE shop_name = $1`;
    const { rows } = await client.query(query, [shop.shopName]);

    assert.equal(rows[0].shop_name, shop.shopName);
    assert.equal(rows[0].access_token, shop.accessToken);
  })

  it('can get a shop from postgres', async () => {
    const shopName = 'shop1';
    const shop = { shopName, accessToken: 'shpua_123' };
    const query = `INSERT INTO ${tableName} (shop_name, access_token) VALUES ($1, $2)`;
    await client.query(query, [shop.shopName, shop.accessToken]);

    const postgresSessionStore = PostgresSessionStore({
      url: postgresUri,
      tableName: tableName,
    });
    const result = await postgresSessionStore.get(shopName);

    assert.equal(result && result.shopName, shop.shopName);
    assert.equal(result && result.accessToken, shop.accessToken);
  })
})
