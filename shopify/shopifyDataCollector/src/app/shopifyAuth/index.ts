import '@shopify/shopify-api/adapters/node';
import { AuthRepository } from '#app/shopifyAuth/AuthRepository'
import { ShopifyAuthRouter } from '#app/shopifyAuth/router'
import { ShopifyAuthOptions } from './types'

class _ShopifyAuth {
  private _authRepository: AuthRepository;
  private _authRouter: ShopifyAuthRouter;

  constructor(options: ShopifyAuthOptions) {
    this._authRepository = new AuthRepository({
      url: options.db.url,
      dbName: options.db.dbName,
      collectionName: options.db.collectionName,
    });
    this._authRouter = new ShopifyAuthRouter({
      api: options.api,
      authPaths: options.authPaths,
      authRepository: this._authRepository
    })
  }

  public async getAccessToken(shopName: string) {
    const session = await this._authRepository.get(shopName);
    return String(session && session.accessToken);
  }

  public router() {
    return this._authRouter.create();
  }
}

const ShopifyAuth = function (options: ShopifyAuthOptions) {
  return new _ShopifyAuth(options);
}


export { ShopifyAuth };
