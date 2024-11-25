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
  db: {
    url: string;
    dbName: string;
    collectionName: string;
  }
}

export type ShopifyAuthPaths = ShopifyAuthOptions['authPaths'];
export type ShopifyAuthApi = ShopifyAuthOptions['api'];
export type ShopifyAuthDb = ShopifyAuthOptions['db'];

export type Shop = {
  shopName: string;
  accessToken: string;
}
