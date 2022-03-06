---
title: 'How to set up CORS with Express.js'
excerpt: "A quick and straightforward guide for getting started with CORS and Express.js. Learn how to set up CORS for all routes, some routes, or with specific domains."
coverImage: '/assets/blog/2022/signal-tower.jpg'
date: '2022-03-05T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/2022/signal-tower.jpg'
---

If you plan to use your Express.js server with anything other than the [built-in templating engines](https://expressjs.com/en/guide/using-template-engines.html) (like pug, ejs, or handlebars) as a client, then you’ll likely run into some challenges with cross-origin resource sharing, more commonly known as CORS. 

Cross-origin resource sharing involves pretty much exactly what it sounds like it does and nothing more, sharing resources across multiple origins. And an origin is just a technical term for domain, port, or scheme, and resources boils down to the ability for the two to communicate. What all that means is, without CORS, both the client and server need to reside at the same domain. Otherwise, the client won't be able to fetch or write data to the server. The server will simply refuse the connection.

The good news is that resolving those errors is as simple as enabling CORS. And thankfully, the setup is quite minimal thanks to the [`cors` middleware](https://www.npmjs.com/package/cors). Let’s walk through setting up CORS on an existing Express server.

### Install CORS
The CORS middleware is just like any other package, and can be installed with NPM or yarn.

```shell
npm install cors
```

### Allow all CORS requests
Enabling CORS across all routes on your server is the easiest method, although not always the safest. If you have any routes that should remain entirely private, consider allowing CORS on a single route only, and adding additional routes only as needed.

To add CORS to all your routes, open the `app.js` file. Import CORS into the file by adding a require statement:

```javascript
var cors = require('cors')
```

Then find the following line in the `app.js` file:

```javascript
app.use()
```

Add `cors()` as an argument to `app.use()` like this:

```javascript
app.use(cors())
```

Your `app.js` file should look something like this afterwards:

```javascript
var express = require('express')

// Add CORS
var cors = require('cors')
var app = express()

// Use CORS
app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins and routes!'})
})

app.listen(80, function () {
  console.log('Server listening on port 80')
})
```

Your server now accepts requests from any origin. If you want to limit that to specific origins, jump down to Allow CORS from specific domains.

### Allow CORS on a single route only

Allowing CORS on a route-by-route basis is the option that you’ll likely want in most cases, as (without any further configuration) it exposes the smallest surface area to the outside world.

To add CORS to a single route, go to your `app.js` file, and add the following to import CORS:

```javascript
var cors = require('cors')
```

Then add `cors()` as an argument to the route, between the path and callback function, like this:

```javascript
app.get('/products/:id', cors(), function (req, res, next) {
```

Altogether, the `app.js` file should now look something like this.

```javascript
var express = require('express')
var app = express()

// Add CORS
var cors = require('cors')

// Add CORS to specific route only
app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.listen(80, function () {
  console.log('Server listening on port 80')
})
```

### Allow CORS from specific domains

Ensuring that you are only using CORS on routes that need it is a good start, but configuring the specific origin that you expect to call the route is better. That way, even though the route will accept requests from an outside domain, you can still limit which domains it will accept. Accommodating without sacrificing much security.

To allow traffic from specific domains, first add CORS to your server, then create an object, containing two keys:
- `origin`
- `optionSuccessStatus`

The top half of your `app.js` file should look something like this:

```javascript
var express = require('express')
var app = express()

// Add CORS
var cors = require('cors')

// Create options for CORS
var corsOptions = {
origin: 'https://some-other-domain.com',
optionsSuccessStatus: 200 // Force status 200 instead of 204 for legacy compatibility
}
```

Then all you need to do is pass the newly created `corsOptions` object to the `cors()` function in your route, like this:

```javascript
// Pass corsOptions as argument to cors
app.get('/products/:id', cors(corsOptions), function (req, res, next) {
res.json({msg: 'This is CORS-enabled for only example.com'})
})
```

Altogether, your `app.js` file should look something like the file below:

```javascript
var express = require('express')
var app = express()

// Add CORS
var cors = require('cors')

// Create options for CORS
var corsOptions = {
  origin: 'https://some-other-domain.com',
optionsSuccessStatus: 200 // Force status 200 instead of 204 for legacy compatibility
}

// Pass corsOptions as argument to cors
app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com'})
})

app.listen(80, function () {
console.log('Server listening on port 80')
})
```

### Further reading
- [Express JS Docs](https://expressjs.com/)
- [How to create a bot to check product availability using an Express server](https://sandypockets.dev/posts/checking-ps5-inventory-with-javascript)
- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

Cover photo credit goes to [Jan Huber on Unsplash](https://unsplash.com/@jan_huber) 