import { writeFileSync } from 'fs';
import RSS from 'rss';
import { globby } from "globby";
import fs from 'fs'
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

  allBlogs.map((post) => {
    const fileContents = fs.readFileSync(post, 'utf8')
    const { data } = matter(fileContents)
    const slug = post
      .replace('_posts', '/posts')
      .replace('.md', '')
    feed.item({
      title: data.title,
      url: `https://sandypockets.dev${slug}`,
      date: data.date,
      description: data.excerpt
    });
  });

  writeFileSync('public/feed.xml', feed.xml({ indent: true }));
}

generate();