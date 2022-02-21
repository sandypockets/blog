import React from "react";
import * as fs from "fs";
const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = "https://sandypockets.dev/";
  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "api",
        "projects",
        "_app.js",
        "_document.js",
        "404.js",
        "sitemap.xml.jsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath}`;
    });

  let dynamicPaths = []
  const postTitles = fs.readdirSync("_posts")
  for (const title in postTitles) {
    const formattedTitle = postTitles[title].split('.')[0]
    dynamicPaths.push(`${BASE_URL}/posts/${formattedTitle}`)
  }

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
    .map((url) => {
      return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
    })
    .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;