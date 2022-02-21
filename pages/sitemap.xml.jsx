import React from "react";
// import * as fs from "fs";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  // const BASE_URL = "https://sandypockets.dev";
  // const staticPaths = fs
  //   .readdirSync("pages")
  //   .filter((staticPage) => {
  //     return ![
  //       "api",
  //       "projects",
  //       "_app.js",
  //       "_document.js",
  //       "404.js",
  //       "sitemap.xml.jsx",
  //     ].includes(staticPage);
  //   })
  //   .map((staticPagePath) => {
  //     return `${BASE_URL}/${staticPagePath}`;
  //   });
  //
  // let dynamicPaths = []
  // const postTitles = fs.readdirSync("_posts")
  // for (const title in postTitles) {
  //   const formattedTitle = postTitles[title].split('.')[0]
  //   dynamicPaths.push(`${BASE_URL}/posts/${formattedTitle}`)
  // }
  //
  // const allPaths = [...staticPaths, ...dynamicPaths];
  //
  // const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  //     ${allPaths
  //   .map((url) => {
  //     return `
  //           <url>
  //             <loc>${url}</loc>
  //             <lastmod>${new Date().toISOString()}</lastmod>
  //             <changefreq>monthly</changefreq>
  //             <priority>1.0</priority>
  //           </url>
  //         `;
  //   })
  //   .join("")}
  //   </urlset>
  // `;

   const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://sandypockets.dev/about.jsx</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/contact.jsx</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/index.jsx</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/counting-cards-with-javascript</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/customizing-shopifys-dawn-theme</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/finding-time-to-write-is-hard</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/form-labels-and-placeholder-text</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/how-this-blog-works</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/how-to-build-a-chrome-extension</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/how-to-hide-the-cart-icon-on-shopify-dawn-theme</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/is-rails-still-worth-learning</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/javascript-event-loop</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/nextjs-vs-create-react-app-routing-and-data</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/open-source</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/reading-and-writing-files-with-javascript</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/shopify-product-reviews-app-layout</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/verify-stripe-webhooks-nextjs</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://sandypockets.dev/posts/why-i-use-tailwind-css</loc>
<lastmod>2022-02-21T04:03:03.531Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>
</urlset>`

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;