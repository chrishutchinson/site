import { NextApiHandler } from "next";
import sanitizeHtml from "sanitize-html";

import { getWeeknotes } from "../../../api/prismic";
import { renderPrismicBodyAsHtml } from "../../../utils/render-content";

const BASE_DOMAIN = "https://www.chrishutchinson.me";

const feedHandler: NextApiHandler = async (req, res) => {
  const weeknotes = await getWeeknotes();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/rss+xml");
  res.send(`<?xml version="1.0" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chris Hutchinson</title>
    <link>${BASE_DOMAIN}</link>
    <description>The latest weeknotes from Chris Hutchinson – a software engineer and Raspberry Pi tinkerer.</description>
    <atom:link href="${BASE_DOMAIN}/api/weeknotes/feed.xml" rel="self" type="application/rss+xml" />

    ${weeknotes
      .map((weeknote) => {
        const weeknoteHtml = sanitizeHtml(
          renderPrismicBodyAsHtml(weeknote.body),
          {
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
          }
        );

        return `<item>
          <guid>${BASE_DOMAIN}/weeknotes/${weeknote.slug}</guid>
          <title>${weeknote.headline}</title>
          <link>${BASE_DOMAIN}/weeknotes/${weeknote.slug}</link>
          <description><![CDATA[ ${weeknoteHtml} ]]></description>
          <pubDate>${new Date(weeknote.publishedAt).toUTCString()}</pubDate>
        </item>`;
      })
      .join("\n")}
  </channel>
  </rss>`);
};

export default feedHandler;
