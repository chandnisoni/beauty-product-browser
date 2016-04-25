# Beauty Product Browser

A simple application to produce and deploy a web application that allows users to browse the Amazon product catalog related to beauty products.

User will be able to access web application and see a list of products, including product images and product names and would also be able to interact with a list to go to the product page on www.amazon.com.

### Highlights
* Uses AWS Product Advertising API to display products
* Front-end: Bootstrap, AngularJS, HTML, CSS
* Back-end: node.js, express, node-apac (aws client), node-cache
* Utilizes [node-cache](https://www.npmjs.com/package/node-cache) module to cache AWS response on server-side.
* Doesn't store awsId, awsSecret and assocId separately in the code-base. The application loads these using the environment variables. See more heroku specific details [here](https://devcenter.heroku.com/articles/config-vars).


# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed. Also, please copy `.env.example` as `.env` inside the root directory, and provide your `awsId`, `awsSecret` and `assocId`.

```sh
$ git clone https://github.com/chandnisoni/beauty-product-browser.git
$ cd beauty-product-browser
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

Configure your `awsId`, `awsSecret` and `assocId` using following command:
```
heroku config:set awsId=<your-aws-id> awsSecret=<your-aws-secret> assocId=<your-assoc-id>
```

followed by:
```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
