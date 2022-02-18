---
title: 'How to verify Stripe webhook signatures in Next.js API routes'
excerpt: "Learn how to work around a common snag when building SaaS applications with Next.js and Stripe"
coverImage: '/assets/blog/2022/digital-signature.jpg'
date: '2022-02-17T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/2022/digital-signature.jpg'
---

From the very first time I used Next.js, it quickly became my frontend framework of choice. Its API routes were of particular interest to me. I was, and still am, fascinated with that particular abstraction. To me, it was perfect. Everything just sort of worked. And that rang true for a long time, up until recently when I built my first SaaS app ([Tattle](https://tattletale.dev)) with payments powered by Stripe. 

I have some experience with Stripe’s dashboard and APIs, but up until building Tattle, hadn't yet implemented their checkout from start to finish. For the most part, everything is pretty straightforward, Stripe's checkout documentation is fantastic. But I ran into a snag when building out the logic for handling Stripe's webhooks.

If you aren’t familiar with them, [webhooks](https://en.wikipedia.org/wiki/Webhook) are like notifications sent from one server to another; in this case, from Stripe’s server to mine. 

A common use case (my exact use case, in this scenario) would be a customer, paying for a subscription. Stripe processes the payment, then sends my app, Tattle, a webhook to notify it of the payment, and whether it was successful or not. Then Tattle can take an action (either granting or denying access) based on the outcome of the payment. 

While ‘notifications between servers’ might sound pretty innocent, they're anything but. If a webhook were forged by a bad actor, the malicious webhook could instruct the receiving server to take actions it shouldn’t, like allowing a user without a subscription to appear as if they have one. 

As such, it is of great importance that each webhook is verified before any action is taken by the app. To do that, Stripe sends along a special signature with each webhook it sends, and our app has a secret key to verify that signature’s authenticity, thus confirming the webhook was actually sent from Stripe.

When I talk about Next.js, I'm always touting its DX. An example of one of those DX niceties is how Next.js parses requests. When your app receives a request, Next.js parses the request body into JSON before it even reaches the handler. For most projects, that's awesome; except it doesn't play well with Stripe. Stripe expects the _raw_ request body, before it's parsed. So, when it receives the already parsed body, it isn't able to read it properly, and therefore cannot verify the signature. The good news is, Next also has some baked in middlewares that we can use to work around this.

### Create a custom config for the handler
Each Next.js API route exports a default function, the handler. In that same route file, Next also has a look for a specific named export: `config`. 

You can optionally include a `config` export to change the default (you guessed it) configuration. But before we start customizing things, take a look at the _default config_ below. Even if you do not include a `config` export in your route, the default is what's being used behind the scenes. 

```javascript
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
```

Taking a look at the default config, we can see the issue: `bodyParser`. We need the _raw_ request body, not the _parsed_ request body. Let's go ahead and disable `bodyParser` by setting up a custom `config`.

```javascript
export const config = {
  api: {
    bodyParser: false,
  },
}
```

### Handle the stream
As you might have noticed, disabling `bodyParser` alone hasn't been enough to get the webhook signatures verified. The reason being that (as we can see in the [Next.js docs](https://nextjs.org/docs/api-routes/response-helpers)) disabling `bodyParser` results in the request being consumed as a `Stream`. But our code isn't set up to manage a `Stream` yet. 

Thankfully, Vercel has created a nice library to handle that: [`micro`](https://github.com/vercel/micro).

```shell
# Install mirco
yarn add mirco
```

The `micro` library creates a buffer for the `Stream`, which we’ll see an example of in the next step.

### Verify webhook signatures with the Stripe SDK
Now, with the automatic parsing disabled, and a buffer to handle the stream, we can safely pass the request to Stripe’s SDK, which verifies the signature authenticity.

```javascript
import Stripe from "stripe";
import { buffer } from 'micro';

const webhookSecret = "your-webhook-secret";
const stripe = new Stripe("your-stripe-secret", {
  apiVersion: "2020-08-27",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function checkSignature(req, res) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    if (event) {
      console.log("Webhook signature verified.")
    }
  } catch (err) {
    res.status(400).send(`Webhook signature could not be verified.`);
    console.error("Webhook signature could not be verified: ", err.message)
    return;
  }
  return handleWebhook(req, res, event)
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return checkSignature(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}
```

And that’s it. Our app can now take important actions, like managing subscriptions, confidently, knowing the data originated from the intended trusted source. 

### Further reading
- [Next.js API Middlewares](https://nextjs.org/docs/api-routes/api-middlewares)
- [Micro - Asynchronous HTTP microservices](https://github.com/vercel/micro)
- [Stripe Docs - Check the webhook signatures](https://stripe.com/docs/webhooks/signatures)

Photo by [DocuSign](https://unsplash.com/@docusign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/signature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  