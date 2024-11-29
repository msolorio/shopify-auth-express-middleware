import { LATEST_API_VERSION, shopifyApi } from '@shopify/shopify-api'
import { ShopifyObject, BeginOptions, CallbackOptions } from '#src/types';

type ShopifyApiOptions = Parameters<typeof shopifyApi> & {
  apiVersion: typeof LATEST_API_VERSION;
  isEmbeddedApp: false;
}

export const fakeShopifyApi = function (options: ShopifyApiOptions): ShopifyObject {
  options;
  return {
    auth: {
      begin: async (options: BeginOptions) => {
        options.rawResponse.redirect(options.callbackPath);
      },
      callback: async (options: CallbackOptions) => {
        options;
        return {
          session: {
            shop: 'shop1.myshopify.com',
            accessToken: 'shpua_123',
          }
        }
      }
    },
    utils: {
      sanitizeShop: (shopName: string, isOnline: false) => {
        isOnline;
        return `${shopName}.myshopify.com`;
      }
    }
  }
}

