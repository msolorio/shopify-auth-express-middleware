# Shopify API Multi-Tenant

This plugin allows backend applications to pull storefront data from Shopify's admin API and manages OAuth 2.0 flow.

This plugin is part of the larger Junta project, an ETL platform for small businesses to track trends and derive insight, unifying data from common ecommerce solutions and exposing behind a single user friendly product.

Many more such plugins will be built out and unified on the Junta platform.

![Shopify API Multi-Tenant](./README_assets/junta_project.png)

# Setup

If you need to authenticate new stores, follow step 1. Otherwise, skip to step 2.

1. Create a public endpoint for the auth server with ngrok.
```
ngrok http http://localhost:3000
```
This will output a public endpoint. Add this endpoint as `HOSTNAME=` in the `.env` file.

In the webpage for your Shopify app under the configuration section, add the public ngrok endpoint under the `App URL` and `Allowed redirection URL(s)` fields and then click save.
```
# App URL
https://<your-public-endpoint>/api/auth

# Allowed redirection URL(s)
https://<your-public-endpoint>/api/auth
https://<your-public-endpoint>/api/auth/callback
```


2. Next start the data collector, auth server, and the mongodb for storing access tokens.
```
docker compose up
```

3. Have the storefront install your app. This will grant the app permissions to store's data and we will store an access token for the store.
4. Access storefront data by making a request to the data collector.