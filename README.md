# shopify-dev-challenge-2021 [backend]


### Quick Description

  - Nuxt.Js SSR to make a quick frontend for public and private image uploading
  - User can upload images [locally] as either public or private
  - Private images are secured via a password and each access is authenticated via jwt

### Necessary Upgrades For A Prodcution Build
 - Seperate the api from Nuxt so that the frontend and backend logic are separated and modular
 - Use a database for Users and Images[meta] (preferably NoSQL for the unstructured metadata )
 - Use a Content Delivery Network (CDN) for actual delivery of the images - some of the popular options allow for granular access control which would revoke the need to verify a json web token with every request as this can be an expensive process
 - Add in metadata check of files on upload, as well as allowing user to enter additional information
 - Further develop the templated frontend


### Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


