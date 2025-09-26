import { NextApiHandler } from "next";
import sanitizeHtml from "sanitize-html";

import { getAllDocuments } from "../../api/prismic";
import { renderPrismicBodyAsHtml } from "../../utils/render-content";

const BASE_DOMAIN = "https://www.chrishutchinson.me";

const feedHandler: NextApiHandler = async (req, res) => {
  const documents = await getAllDocuments();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/rss+xml");
  res.send(`<?xml version="1.0" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chris Hutchinson (Journal and weeknotes)</title>
    <link>${BASE_DOMAIN}</link>
    <description>The latest journal entries and weeknotes from Chris Hutchinson – a software engineer and Raspberry Pi tinkerer.</description>
    <atom:link href="${BASE_DOMAIN}/api/feed.xml" rel="self" type="application/rss+xml" />

    ${documents
      .map(({ type, document }) => {
        const html =
          type === "externalPost"
            ? `<a href="${document.url}">${document.url}</a>`
            : sanitizeHtml(renderPrismicBodyAsHtml(document.body), {
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
          <guid>${BASE_DOMAIN}/journal/entry/${document.slug}</guid>
          <title>${document.headline}</title>
          <link>${BASE_DOMAIN}/journal/entry/${document.slug}</link>
          <description><![CDATA[ ${html} ]]></description>
          <pubDate>${new Date(document.publishedAt).toUTCString()}</pubDate>
        </item>`;
      })
      .join("\n")}
  </channel>
  </rss>`);
};

export default feedHandler;
