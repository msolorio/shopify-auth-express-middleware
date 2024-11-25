import { Request, Response, Router } from 'express';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, Shopify } from '@shopify/shopify-api'
import { AuthRepository } from '#app/shopifyAuth/AuthRepository.js'

type ShopifyAuthOptions = {
  api: {
    apiKey: string;
    apiSecretKey: string;
    hostName: string;
    scopes: Array<string>;
  },
  auth: {
    beginPath: string;
    callbackPath: string;
  }
  db: {
    url: string;
    dbName: string;
    collectionName: string;
  }
}

class _ShopifyAuth {
  private _shopify: Shopify;
  private _authRepository: AuthRepository;
  private _beginAuthPath: string;
  private _callbackAuthPath: string;

  constructor(options: ShopifyAuthOptions) {
    this._shopify = shopifyApi({
      apiKey: options.api.apiKey,
      apiSecretKey: options.api.apiSecretKey,
      scopes: options.api.scopes,
      hostName: options.api.hostName,
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: false,
    })
    this._authRepository = new AuthRepository({
      url: options.db.url,
      dbName: options.db.dbName,
      collectionName: options.db.collectionName,
    });
    this._beginAuthPath = options.auth.beginPath;
    this._callbackAuthPath = options.auth.callbackPath;
  }

  public async getAccessToken(shopName: string) {
    const session = await this._authRepository.get(shopName);
    return String(session && session.accessToken);
  }

  public router() {
    const router = Router();

    router.get(this._beginAuthPath, async (req, res) => {
      const shop = String(req.query.shop);
      await this._begin(shop, req, res);
    });

    router.get(this._callbackAuthPath, async (req, res) => {
      await this._callback(req, res);
      res.status(200).send('You have approved the app.');
    });

    return router;
  }

  private async _begin(shopName: string, req: Request, res: Response) {
    await this._shopify.auth.begin({
      shop: String(this._shopify.utils.sanitizeShop(shopName, true)),
      callbackPath: this._callbackAuthPath,
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
    console.log('callback.session', callback.session) // contains access token
    await this._authRepository.add(callback.session);
  }
}

const ShopifyAuth = function (options: ShopifyAuthOptions) {
  return new _ShopifyAuth(options);
}


export { ShopifyAuth };
