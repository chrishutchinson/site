import { RichTextBlock } from "prismic-reactjs";

const makeQuery = async <T extends object>(
  query: string,
  variables?: object
): Promise<T> => {
  const { data } = await fetch(
    `https://chrishutchinson.prismic.io/graphql?query=${encodeURIComponent(
      query
    )}${
      variables
        ? `&variables=${encodeURIComponent(JSON.stringify(variables))}`
        : ""
    }`,
    {
      method: "get",
      headers: {
        "Prismic-Ref": "YDAI9hUAACYA5r4R",
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  });

  return data as T;
};

export type Post = {
  id: string;
  slug: string;
  headline: string;
  subheading: string | null;
  summary: string;
  publishedAt: string;
  body: {
    type: "text";
    primary: {
      text: RichTextBlock[];
    };
  }[];
};

type PrismicPostNode = {
  meta: {
    id: string;
    slug: string;
  };
  headline: RichTextBlock[];
  subheading: RichTextBlock[];
  publishedAt: string;
  body: {
    type: "text";
    primary: {
      text: RichTextBlock[];
    };
  }[];
};

const trimToWordCount = (str: string, count: number): string => {
  return `${str.split(" ").slice(0, count).join(" ").trim()}...`;
};

const formatPrismicPost = (node: PrismicPostNode): Post => ({
  id: node.meta.id,
  slug: node.meta.slug,
  headline: node.headline[0].text,
  subheading: node.subheading && node.subheading[0].text,
  summary: node.subheading
    ? node.subheading[0].text
    : trimToWordCount(node.body[0].primary.text[0].text, 20),
  publishedAt: node.publishedAt,
  body: node.body,
});

export const getPosts = async () => {
  const POSTS_QUERY = `
    query GetLatestBlogPosts {
      posts: allBlog_posts(sortBy: published_at_DESC, first: 10) {
        edges {
          node {
            meta: _meta {
              id
              slug: uid
            }
            headline
            subheading
            publishedAt: published_at
            body {
              ... on Blog_postBodyText {
                type
                label
                primary {
                  text
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await makeQuery<{
    posts: {
      edges: {
        node: PrismicPostNode;
      }[];
    };
  }>(POSTS_QUERY);

  return data.posts.edges.map(({ node }) => formatPrismicPost(node));
};

export const getPost = async (slug: string) => {
  const POST_QUERY = `
    query GetBlogPostBySlug($slug: String!) {
      post: blog_post(uid: $slug, lang: "en-gb") {
        meta: _meta {
          id
          slug: uid
        }
        headline
        subheading
        publishedAt: published_at
        body {
          ... on Blog_postBodyText {
            type
            label
            primary {
              text
            }
          }
        }
      }
    }
  `;

  const data = await makeQuery<{
    post: PrismicPostNode;
  }>(POST_QUERY, {
    slug,
  });

  return formatPrismicPost(data.post);
};
