import 'dotenv/config';
import pg from 'pg';
import { Shop } from '#src/types';
import { AbstractSessionStore, PostgresSessionStoreOptions } from './types';

export const PostgresSessionStore = function PostgresSessionStore(options: PostgresSessionStoreOptions) {
  return new _PostgresSessionStore(options);
}

class _PostgresSessionStore implements AbstractSessionStore {
  private pgClient: pg.Client;
  private tableName: string;

  constructor(options: PostgresSessionStoreOptions) {
    this.pgClient = new pg.Client({ connectionString: options.url });
    this.tableName = options.tableName;
  }

  public async add(shop: Shop) {
    await this.pgClient.connect();
    const query = `
      INSERT INTO ${this.tableName} (shop_name, access_token)
      VALUES ($1, $2)
    `;
    await this.pgClient.query(query, [shop.shopName, shop.accessToken]);
    await this.pgClient.end();
  }

  public async get(shopName: string): Promise<Shop | null> {
    await this.pgClient.connect();
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE shop_name = $1
    `;
    const { rows } = await this.pgClient.query(query, [shopName]);
    await this.pgClient.end();

    return {
      shopName: rows[0].shop_name,
      accessToken: rows[0].access_token,
    }
  }
}
