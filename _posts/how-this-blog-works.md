---
title: 'How this blog works'
excerpt: "We take a lot of what happens on the internet for granted. Even with simple apps or websites, there's often quite a bit more going on behind the scenes than you might expect."
coverImage: '/assets/blog/how-this-blog-works/sheets-of-paper.jpg'
date: '2021-08-30T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/how-this-blog-works/sheets-of-paper.jpg'
---

# How this blog works

We take a lot of what happens on the internet for granted. Even with simple apps or websites, there's often quite a bit more going on behind the scenes than you might expect.

This blog is a [Next.js](https://nextjs.org/) app, styled with [Tailwind CSS](https://tailwindcss.com/). Blog articles are written in Markdown, and converted to HTML to be rendered on the page. You can follow along in the [GitHub repo](https://github.com/sandypockets/blog).

This article focuses on JavaScript, and how blog posts are gathered from the file system, parsed, and rendered. Tailwind and Markdown styling are beyond today's scope.

## How it works

New posts are a good place to start, since that's what feeds into everything else before it's ultimately rendered on the page. All posts are written in Markdown, with a `.md` file extension.

### Front matter

The blog uses a Node package called [Gray Matter](https://github.com/jonschlinkert/gray-matter), which takes "front matter" from each blog post, and turns it into useable data. Like it suggests, front matter needs to be at the front, or top, or the markdown file; though I doubt that's the reason for its name. At the top of the page, the front matter needs to be contained within a set of three dashes (`---`), like this:

```markdown
---
title: 'A blog starter you actually want to use'
excerpt: 'There are hundreds of different blog starters out there. But none felt quite right. So I built my own. Based off the basic Next.js Blog Starter, but now with several handy features like dark mode (using local storage) or Google Analytics. It comes with Storybook too.'
coverImage: '/assets/blog/a-nextjs-blog-starter-you-actually-want-to-use/tree-minimal.jpg'
date: '2021-08-24T05:35:07.322Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/a-nextjs-blog-starter-you-actually-want-to-use/tree-minimal.jpg'
---
```

So what's happening here?

Front matter is essentially a list of key/value pairs, just like JSON, or a JavaScript object, or a Ruby hash. The indentations (2 spaces, like a Markdown list indentation) result in a child being created. If this were written in JSON, it would look something like this:

```json
{
  "title": "A blog starter you actually want to use",
  "excerpt": "There are hundreds of different blog starters out there. But none felt quite right. So I built my own. Based off the basic Next.js Blog Starter, but now with several handy features like dark mode (using local storage) or Google Analytics. It comes with Storybook too.",
  "coverImage": "/assets/blog/a-nextjs-blog-starter-you-actually-want-to-use/tree-minimal.jpg",
  "date": "2021-08-24T05:35:07.322Z",
  "author": {
    "name": "sandypockets",
    "picture": "/assets/blog/authors/sandypockets_avatar.jpg"
  },
  "ogImage": {
    "url": "/assets/blog/a-nextjs-blog-starter-you-actually-want-to-use/tree-minimal.jpg"
  }
}
```

For this app, it is important that the posts are put into the `/_posts` directory, since that's the directory that the app's been configured to check for new posts.

### Dynamic routing

This blog relies on Next.js' dynamic routing; the page URL and contents can change, but the structure of it will remain the same, like a template. The cornerstone of dynamic routing is the `[id]` or `[slug]`. In the case of _this_ blog, the name `[slug]` is used. The `[slug]` (or `[id]`!) is just the portion of the URL path that represents uniqueness, _like an ID_.

The slug for each post is the file title. I'll get into how that happens a bit later, but for now all you need to know is:

* `hello-world.md` has a slug of `hello-world`.
* The URL on the front end would look like `website.com/posts/hello-world`.

As we can see, Next.js maps page paths within the project directory the same way they're displayed in the browser. When a user visits a page like `website.com/posts/hello-world`, Next.js serves up the `/pages/posts/[slug].js` component.

Using this `/[slug].js` format, the same component can be used for every blog post. Even if the blog has thousands of pages, the page code only needs to be written once.

But where's the data come from? It's already there, long before the user even visits the page. The magic begins right in the `/pages/posts/[slug].js` component.

### Fetching data, at build time

In that `/pages/posts/[slug].js` component, the `getStaticPaths()` and `getStaticProps()` functions run at build time. They run on the server when the app is first being compiled. That's why they're called `static`, they don't change. This plays a big part in what makes the website lightning fast.

Everything is pre-generated on the server at build, before the user even visits the site, instead of the more traditional set up where the page is generated on each request. Generating the pages at build allow our app to generate every page _once_, and then serve the same pre-built page to multiple users. It's easy to go down a rabbit hole with this, but the TL;DR is that it's more performant.

### Getting all the posts

The `getStaticPaths()` function calls the `getAllPosts()` function from the `/lib/api.js` file.

This `/lib/api.js` file is 40 lines long, so I won't walk through it line by line. But essentially, it takes a look in the `/_posts` directory, and completes the following tasks:

1. Creates a list of all posts and meta data.
2. Creates a list of post `slugs` based on the Markdown file title, by using Node's built in `fs` ([File System](https://nodejs.org/api/fs.html#fs_file_system)). As mentioned above, the slug for `hello-world.md` becomes `hello-world`.
3. Gets the Markdown content for the post of each `slug`.
4. The front matter gets passed to the `grey-matter` package, which returns metadata like title and excerpt.
4. All slugs, content, and metadata get passed to the page as an object `params`.

Jumping back to the `/pages/posts/[slug].js` page, the component now has the data (`params`) it needs as props. But it still isn't parsed. It's just Markdown, which isn't something browsers can understand. If the process stopped here, the entire contents would just be basic text, without styling.

### Markdown to HTML

1. The app now calls the `getStaticProps({ params })` function. As we can see, it takes `params` as an argument.
2. The `getStaticProps({ params })` function in turn calls the `markdownToHtml` function from `/lib/markdownToHtml.js`, as passes in the post's raw Markdown, as an argument.
3. Over in the `/lib/markdownToHtml.js` file, the post body is passed to  `remark`.

Like `grey-matter`, `remark` is an imported package that helps take care of some of the heavy lifting. In this case, `remark` is responsible for receiving Markdown input and spitting out the appropriate HTML as a string. Creating this functionality manually would be tedious, but `remark` makes it easy.

Take a look at the `/lib/markdownToHtml.js` file that handles this part of the process.

```javascript
import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).use(prism).process(markdown)
  return result.toString()
}
```

Let's take a look at what's happening here.

First, the required packages are imported.
* [`remark`](https://www.npmjs.com/package/remark) is for parsing Markdown.
* [`remark-html`](https://www.npmjs.com/package/remark-html) converts that parsed Markdown to HTML.
* [`prism`](https://www.npmjs.com/package/remark-prism) is just for syntax highlighting with formatted code blocks like the one above. Without it, code wouldn't have syntax highlighting, like the example below.

```html
import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).use(prism).process(markdown)
  return result.toString()
}
```

Below the imports, in the `markdownToHtml(markdown)` function, the bit to pay attention to is the handful of methods chained together with dots (`.`):

```javascript
remark().use(html).use(prism).process(markdown)
  return result.toString()
```

1. `remark()` initializes the `remark` package.
2. `use(html)` tells `remark` output should be HTML.
3. `use(prism)` tells `remark` to use the `prism` package, which only applies to code blocks by default.
4. `process(markdown)` tells `remark` to get to work on our Markdown content, which we pass to `process()` as an argument: `markdown`.
5. The result (HTML) is returned as a string.

The result string contains the HTML for the entire post contents. The HTML string, along with the post's metadata (like the title, and author) is passed to the `[slug].js` component as props. Each instance of the component (the page, `[slug].js`, in this case) uses the unique data of one individual blog post; resulting in each blog post having its own unique page and URL, while keeping code DRY and manageable.
