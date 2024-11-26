// import { Shopify } from '@shopify/shopify-api';
import { AbstractSessionStore } from './sessionStore';

export type ShopifyAuthOptions = {
  api: {
    apiKey: string;
    apiSecretKey: string;
    hostName: string;
    scopes: Array<string>;
  },
  authPaths: {
    begin: string;
    callback: string;
  }
  sessionStore: AbstractSessionStore;
}

export type ShopifyAuthPaths = ShopifyAuthOptions['authPaths'];
export type ShopifyAuthApi = ShopifyAuthOptions['api'];

export type MongoDbSessionStoreOptions = {
  url: string;
  dbName: string;
  collectionName: string;
}

export type Shop = {
  shopName: string;
  accessToken: string;
}
