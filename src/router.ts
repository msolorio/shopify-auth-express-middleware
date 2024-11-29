import { Request, Response, Router } from 'express';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api'
import { AbstractSessionStore } from './sessionStore';
import { ShopifyAuthPaths, ShopifyAuthApi, Shop, ShopifyObject } from './types';

export class ShopifyAuthRouter {
  private _shopify: ShopifyObject; // narrowed Shopify type
  private _authPaths: ShopifyAuthPaths;
  private _sessionStore: AbstractSessionStore;

  constructor({ api, authPaths, sessionStore }: {
    api: ShopifyAuthApi,
    authPaths: ShopifyAuthPaths,
    sessionStore: AbstractSessionStore,
  }) {
    this._shopify = shopifyApi({
      apiKey: api.apiKey,
      apiSecretKey: api.apiSecretKey,
      scopes: api.scopes,
      hostName: api.hostName,
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: false,
    });
    this._authPaths = authPaths;
    this._sessionStore = sessionStore;
  }

  public create() {
    const router = Router();

    router.get(this._authPaths.begin, async (req, res) => {
      const shop = String(req.query.shop);
      await this._begin(shop, req, res);
    });

    router.get(this._authPaths.callback, async (req, res) => {
      await this._callback(req, res);
      res.status(200).send('You have approved the app.');
    });

    return router;
  }

  private async _begin(shopName: string, req: Request, res: Response) {
    await this._shopify.auth.begin({
      shop: String(this._shopify.utils.sanitizeShop(shopName, true)),
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
    console.log('callback.session', callback.session);
    const shop: Shop = {
      shopName: callback.session.shop,
      accessToken: String(callback.session.accessToken),
    }

    await this._sessionStore.add(shop);
  }
}
