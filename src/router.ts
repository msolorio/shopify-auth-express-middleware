import { Request, Response, Router } from 'express';
import { shopifyApi, LATEST_API_VERSION, LogSeverity } from '@shopify/shopify-api'
import { AbstractSessionStore } from './sessionStore/types';
import { ShopifyAuthPaths, ShopifyAuthApi, NarrowedShopifyObject, NarrowedShopifyApi } from './types';

export class ShopifyAuthRouter {
  private _shopify: NarrowedShopifyObject;
  private _shopifyApi: NarrowedShopifyApi;
  private _authPaths: ShopifyAuthPaths;
  private _sessionStore: AbstractSessionStore;

  constructor({ api, authPaths, sessionStore, fakeShopifyApi }: {
    api: ShopifyAuthApi,
    authPaths: ShopifyAuthPaths,
    sessionStore: AbstractSessionStore,
    fakeShopifyApi?: NarrowedShopifyApi
  }) {
    this._shopifyApi = fakeShopifyApi || shopifyApi;
    this._shopify = this._shopifyApi({
      apiKey: api.apiKey,
      apiSecretKey: api.apiSecretKey,
      scopes: api.scopes,
      hostName: api.hostName,
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: false,
      logger: {
        level: LogSeverity.Error,
      }
    });
    this._authPaths = authPaths;
    this._sessionStore = sessionStore;
  }

  public create() {
    const router = Router();

    router.get(this._authPaths.begin, async (req, res) => {
      const fullShopName = String(req.query.shop);
      await this._begin(fullShopName, req, res);
    });

    router.get(this._authPaths.callback, async (req, res) => {
      await this._callback(req, res);
      res.status(200).send('You have approved the app.');
    });

    return router;
  }

  private async _begin(fullShopName: string, req: Request, res: Response) {
    await this._shopify.auth.begin({
      shop: fullShopName,
      callbackPath: this._authPaths.callback,
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  }

  private async _callback(req: Request, res: Response) {
    const callback = await this._shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const shopName = callback.session.shop.split('.')[0]
    const accessToken = String(callback.session.accessToken)

    await this._sessionStore.add(shopName, accessToken);
  }
}
