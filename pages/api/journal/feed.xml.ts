import { NextApiHandler } from "next";
import sanitizeHtml from "sanitize-html";

import { getPosts } from "../../../api/prismic";
import { renderPostAsHtml } from "../../../utils/render-content";

const BASE_DOMAIN = "https://www.chrishutchinson.me";

const feedHandler: NextApiHandler = async (req, res) => {
  const posts = await getPosts();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/rss+xml");
  res.send(`<?xml version="1.0" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chris Hutchinson</title>
    <link>${BASE_DOMAIN}</link>
    <description>The latest journal entries from Chris Hutchinson – a software engineer, working at The Times, and Raspberry Pi tinkerer.</description>
    <atom:link href="${BASE_DOMAIN}/api/journal/feed.xml" rel="self" type="application/rss+xml" />

    ${posts
      .map((post) => {
        const postHtml = sanitizeHtml(renderPostAsHtml(post), {
          allowedTags: [
            "p",
            "a",
            "pre",
            "span",
            "strong",
            "ul",
            "ol",
            "li",
            "blockquote",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "img",
          ],
        });

        return `<item>
          <guid>${BASE_DOMAIN}/journal/entry/${post.slug}</guid>
          <title>${post.headline}</title>
          <link>${BASE_DOMAIN}/journal/entry/${post.slug}</link>
          <description><![CDATA[ ${postHtml} ]]></description>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        </item>`;
      })
      .join("\n")}
  </channel>
  </rss>`);
};

export default feedHandler;
