import { NarrowedShopifyApi, BeginOptions, CallbackOptions } from '#src/types';

export const fakeShopifyApi: NarrowedShopifyApi = function (options) {
  options;
  return {
    auth: {
      begin: async (options: BeginOptions) => {
        return options.rawResponse.redirect(`${options.callbackPath}?shop=${options.shop}`);
      },
      callback: async (options: CallbackOptions) => {
        options;
        return {
          session: {
            shop: String(options.rawRequest.query.shop),
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

