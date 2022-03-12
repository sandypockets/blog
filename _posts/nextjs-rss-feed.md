---
title: 'How to generate an RSS feed for your Next.js blog'
excerpt: "Imagine being able to log into one dashboard and getting the latest news and events from all of your favorite websites, blogs, or podcasts? RSS feeds are what make experiences like that possible."
coverImage: '/assets/blog/2022/feed.jpg'
date: '2022-03-12T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/2022/feed.jpg'
---

> Imagine being able to log into one dashboard and getting the latest news and events from all of your favorite websites, blogs, or podcasts?

RSS feeds are what make experiences like that possible. Without them, we’d be forced to check each blog individually for updates. At best, we could subscribe to the blog’s newsletters to stay in the know as new articles are released, but we’d still need to actually read the email, then go to the blog, and then read the article. 

To be frank, that sounds awful.

The good news is that RSS feeds (which stands for _Really Simple Syndication_) have already solved this problem for us. RSS feeds provide a standardized data structure for feed-like updates that can be consumed by popular news aggregator apps like Feedly or Inoreader.

So, the TL;DR is that an RSS feed makes it easy for readers to consume your content. And when blogging, content is the name of the game, so why not make it more accessible?

## Not all blogs are created equal
If you’re reading this, you probably have a blog with Next.js already, or you’re considering starting one up. But do you know what's really happening under the hood?

If you fall into the former, in your blog, try appending `/feed.xml` to the end of the root domain. If you see some XML pop onto the screen, then you already have an RSS feed set up, and no further action is required. If you see a 404 error at `/feed.xml`, follow the steps in the next section to learn how to set one up.

If you fall into the latter group and haven’t started your blog yet, then you can use a template like my [Next.js blog starter](https://github.com/sandypockets/nextjs-blog-starter) that comes with an RSS feed baked right in.

## Setting up an RSS feed in Next.js
An RSS feed should update automatically anytime you add new content to your blog. To ensure that happens, we’ll create a script to generate the RSS feed, and we’ll configure the `package.json` scripts to run it after each build. That way the content of your blog always remains in sync with the RSS feed you’re delivering to your readers.

1. Create a new directory at the root of your project called `scripts`
2. In the new `scripts` directory, create a file called `generate-rss.mjs`

Wait a second, what the heck is an `.mjs` file? The extension simply indicates that the file is an ES6 module, so we can use syntax like `import` and `export`. Learn more in this [StackOverflow](https://stackoverflow.com/a/57492606/15155943) post.

We’re going to be using a few different packages in this sitemap, so let’s go ahead and add those imports to the top of the page now.

```javascript
import { writeFileSync, readFileSync } from 'fs';
import RSS from 'rss';
import { globby } from "globby";
import matter from 'gray-matter'
```

If you don't have all these currently installed into your project, you can install them as developer dependencies with either command below:

```shell
# with yarn
yarn add --dev rss globby grey-matter
```

```shell
# or with npm
npm install --save-dev rss globby grey-matter
```

Next add an async function, responsible for generating the actual feed.

```javascript
import { writeFileSync, readFileSync } from 'fs';
import RSS from 'rss';
import { globby } from "globby";
import matter from 'gray-matter'

// Add async function
async function generate() {
 
}

generate();
```

Since the RSS feed should contain all our posts, let’s gather all the posts together. In my Next.js starter, the posts are markdown files, and live in the `_posts/` directory. Let’s pull those into the function using `globby`.

```javascript
import { writeFileSync, readFileSync } from 'fs';
import RSS from 'rss';
import { globby } from "globby";
import matter from 'gray-matter'

async function generate() {
  // Get all posts with globby
  const allBlogs = await globby([
    '_posts/*.md',
  ]);

}

generate();
```

`allBlogs` is now an array, packed full of your post’s file names. Perfect! Let’s come back to this. In the meantime, we need to set up the base URLs for the RSS feed.

```javascript
import { writeFileSync, readFileSync } from 'fs';
import RSS from 'rss';
import { globby } from "globby";
import matter from 'gray-matter'

async function generate() {
 
  const allBlogs = await globby([
    '_posts/*.md',
  ]);

   // Set up RSS feed URLs
   const feed = new RSS({
     title: 'SANDYPOCKETS',
     site_url: 'https://sandypockets.dev',
     feed_url: 'https://sandypockets.dev/feed.xml'
  });
   
}

generate();
```

Now for the meat and potatoes of our `generate()` function. We’ll:

1. Use the file name, and `fs.readFileSync()` to get all the content within each file, including its front matter.
2. Use `matter` to read the post’s front matter
3. Use the `.replace()` method to format the file names, trimming the `.md` extension
4. Pass the post as an item to the `feed` object from the RSS feed we created earlier.
5. Use `fs.writeFileSync()` to output the data into `public/feed.xml`

```javascript
import { writeFileSync, readFileSync } from 'fs';
import RSS from 'rss';
import { globby } from "globby";
import matter from 'gray-matter'

async function generate() {
 
  const allBlogs = await globby([
    '_posts/*.md',
  ]);

   const feed = new RSS({
     title: 'SANDYPOCKETS',
     site_url: 'https://sandypockets.dev',
     feed_url: 'https://sandypockets.dev/feed.xml'
  });


  // Loop over each post title
  allBlogs.map((post) => {
	// Read entire contents of each post
    const fileContents = readFileSync(post, 'utf8')
	// Get front matter from post
    const { data } = matter(fileContents)
	// Format post URL
    const slug = post
      .replace('_posts', '/posts')
      .replace('.md', '')
	// Pass formatted data to RSS feed
    feed.item({
      title: data.title,
      url: `https://sandypockets.dev${slug}`,
      date: data.date,
      description: data.excerpt
    });
  });
  // Output RSS feed at /feed.xml
  writeFileSync('public/feed.xml', feed.xml({ indent: true }));
}

generate();
```

### Configuring your `package.json`
We’ve created a script, but at the moment we’re not actually calling this file anywhere. Since we want it to run automatically with after each build, we can take advantage of the `scripts` in the `package.json` file; specifically the `postbuild` script. Add the following script to your `package.json` file.

```json
"postbuild": "node ./scripts/generate-rss.mjs",
```

If you want to run a second action on the `postbuild` script, you can include it with `&&` like this:

```json
"postbuild": "node ./scripts/generate-rss.mjs && node ./scripts/generate-sitemap.mjs",
```

With that, your `package.json` file should look something like this:

```json
{
  "name": "blog",
  "version": "0.1.0",
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "postbuild": "node ./scripts/generate-rss.mjs",
  },
  "dependencies": {
```

### Testing
Build your app. That’s it.

1. Run `yarn build`
2. Note the `public/feed.xml` file that has been generated
3. Run `yarn start`
4. Navigate to `localhost:3000/feed.xml` to view the XML RSS feed.

### Consuming an RSS feed
While an RSS feed is really for your readers, and not something you’ll need to use personally, you might be interested in giving RSS feeds a try for your own news. [Inoreader](https://www.inoreader.com/) (rated Wired Magazine’s “Best Overall” RSS reader) touts its ability to help you _“Take back your news feed”_. In a world of noise, that’s a big deal.

If that’s a route you want to go, then you’ll need some sort of app to receive and parse the RSS feed data. Which one is best for you is going to depend on your workflow, but some favourites around the web are the aforementioned Inoreader, [Feedly](https://feedly.com/) (“Best for Beginners”), or [Newsblur](https://newsblur.com/) (“Best for DIYers”, and compatible with [IFTT (If This Then That)](https://ifttt.com/))

### Further reading
- [How do RSS feeds work - RSS.com](https://rss.com/blog/how-do-rss-feeds-work/)
- [RSS - MDN](https://developer.mozilla.org/en-US/docs/Glossary/RSS)
- [Best RSS Feed Readers - Wired.com](https://www.wired.com/story/best-rss-feed-readers/)
- [Reading and writing files with JavaScript](https://sandypockets.dev/posts/reading-and-writing-files-with-javascript)

Photo credit to [Taras Shypka on Unsplash](https://unsplash.com/@bugsster).

Deploy your own blog, with a built-in RSS feed and sitemap using this [Next.js blog starter template](https://blog-starter.sandypockets.dev/posts/getting-started)