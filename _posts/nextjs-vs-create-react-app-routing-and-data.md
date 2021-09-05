---
title: 'Create React App vs. Next.js: Routing and fetching data'
excerpt: "Like many, I started with Create React App. Since then, I use Next.js almost exclusively. Here's why."
coverImage: '/assets/blog/nextjs-vs-create-react-app-routing-and-data/right-arrow.jpg'
date: '2021-09-05T07:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/nextjs-vs-create-react-app-routing-and-data/right-arrow.jpg'
---

When I first started learning React, all the courses, tutorials, and blogs I consumed positioned Create React App as the standard way to set up a React app. And while that might have been true at one point, it seems due time we move on. And I in my opinion, Next.js is what we should be moving on to.

Next.js brings the same capabilities to the table as Create React App, but with an incredibly fine tuned developer experience. Everything just seems to work right out of the box. And while you might think that out-of-the-box behaviour creates an overly opinionated framework, it doesn’t. Everything in Next.js can be customized; tailored to your specific needs.

But enough talk. Let’s take a look at a couple major differences between the two: routing, and fetching data.

## Routing
With Create React App, you’ll need to set routes up manually and install an additional package; usually React Router. That’s not a big deal if you’re building an SPA without any routes, but for any large complex projects, having a usable path for your user (and yourself) is a must.

While setting up React Router isn’t complicated, Next.js handles routing beautifully, right out of the box. When you spin up a new Next.js app, it comes with a `pages/` directory at the root. Files you add there will automatically create routes based on their title. Adding a new page is as simple as creating a new file.

* `pages/hello-world.jsx` becomes `sandypockets.dev/hello-world`
* `pages/posts/hello-world.jsx` becomes `sandypockets.dev/posts/hello-world.jsx`

Next.js makes dynamic routing easy as can be too. Each post on this blog is rendered using a dynamic route. This means that even though the page path changes, each blog post is created from a single skeleton, which then renders each post dynamically.

To create a new dynamic route, all you need to do is use some square brackets in the file name.

* `pages/posts/[id].jsx` becomes `sandypockets.dev/posts/some-post-title`

Then anything you set up in that `[id].js` file will be displayed each time anything at `sandypockets.dev/posts/` is visited. A common practice from there is to use the Next.js built in router to obtain the `id` from the URL (the part after `posts/`) and use it to hydrate the page with data as needed. Using the Next.js router is dead easy too. Import at the top of the file, and you can start using it right away without installing more dependencies.

## Fetching data
Almost all projects have some sort of environment variables. Environment variables often contain sensitive information; if they didn’t, we wouldn’t use environment variables in the fist place. But, they do. And protecting that data is not only important, but easy to accidentally expose.

At some point, it’s likely that your app will need to communicate with another service. Let’s take a look at how this problem is addressed differently between Create React App and Next.js.

Create React App provides you with a frontend. You can communicate with whatever APIs you need to from there, but it’s not ideal. The reason being that even if your sensitive information, like an API key, is stored in an environment variable, it will eventually be visible to the client when the API call is made. Take a look through some of the results in the Network tab of Google Chrome’s Dev Tools panel the next time you’re browsing the web or submitting a form.

The solution is to use a server alongside your React frontend. That way, your frontend can make an API call to the server. And instead of storing your environment variables on the frontend, you can store them on the server. When the frontend communicates with the server, the server then makes the necessary additional API calls using the sensitive data. This not only ensures that unnecessary data is kept out of the client, but also provides an opportunity to move any data processing or business logic off of the client and onto the server, keeping your frontend both lightweight and secure.

You might be thinking, _that all sounds pretty good_. And it does. Next.js just does it better.

Next.js is serverless. Of course, that’s only half true. It doesn’t have a server in the traditional sense, but what it provides you instead are API routes. The API routes are basically normal JavaScript files, that live in a special `api` directory within the `pages` directory. Any files you add to that `pages/api/` directory will behave like an endpoint. From there, you just need to set up the `request` and `response` in each file, just like you would on an Express server.

* `pages/api/users.js` becomes an endpoint at `sandypockets.dev/api/users`

That way, your frontend can make a call to one of the routes in `pages/api/`, which you can then use to format the data for upcoming requests, and in turn make any API calls to other services your app relies on. This type of configuration keeps all the heavy lifting on the server where it belongs. And, since your environment variables, along with your app’s business logic, are only used in the `pages/api/` directory, they’re never visible on the frontend.

## Resources

* [Next.js - Router]
* [Create React App - Routing]
* [Next.js - API Routes]
* [Create React App - Fetching Data]