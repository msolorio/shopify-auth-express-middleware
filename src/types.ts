import { LATEST_API_VERSION, LogSeverity } from '@shopify/shopify-api'
import { AbstractSessionStore } from './sessionStore/types';
import { Request, Response } from 'express';

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
  fakeShopifyApi?: NarrowedShopifyApi;
}

export type ShopifyAuthPaths = ShopifyAuthOptions['authPaths'];
export type ShopifyAuthApi = ShopifyAuthOptions['api'];

export type Shop = {
  shopName: string;
  accessToken: string;
}

export type BeginOptions = {
  shop: string;
  callbackPath: string;
  isOnline: false;
  rawRequest: Request;
  rawResponse: Response;
}

export type CallbackOptions = {
  rawRequest: Request;
  rawResponse: Response;
}

export type NarrowedShopifyObject = {
  auth: {
    begin: (options: BeginOptions) => Promise<void>;
    callback: (options: CallbackOptions) => Promise<{ session: { shop: string, accessToken?: string | undefined } }>;
  },
  utils: {
    sanitizeShop: (shopName: string, isOnline: false) => string | null;
  }
}

type ShopifyApiOptions = {
  apiKey: string;
  apiSecretKey: string;
  scopes: Array<string>;
  hostName: string;
  apiVersion: typeof LATEST_API_VERSION;
  isEmbeddedApp: false;
  logger: {
    level: LogSeverity;
  }
}

export interface NarrowedShopifyApi {
  (options: ShopifyApiOptions): NarrowedShopifyObject;
}
