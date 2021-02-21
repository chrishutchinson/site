import { RichTextBlock } from "prismic-reactjs";

export type PrismicSlice<T> =
  | (T extends "text"
      ? {
          type: "text";
          primary: {
            text: RichTextBlock[];
          };
        }
      : never)
  | (T extends "blockquote"
      ? {
          type: "blockquote";
          primary: {
            text: RichTextBlock[];
          };
        }
      : never)
  | (T extends "divider"
      ? {
          type: "divider";
        }
      : never)
  | (T extends "gist"
      ? {
          type: "gist";
          primary: {
            embed: {
              gist: string;
            };
          };
        }
      : never)
  | (T extends "video"
      ? {
          type: "video";
          primary: {
            embed: {
              html: string;
            };
          };
        }
      : never)
  | (T extends "tweet"
      ? {
          type: "tweet";
          primary: {
            embed: {
              html: string;
            };
          };
        }
      : never);

type PrismicBody = PrismicSlice<
  "text" | "blockquote" | "divider" | "gist" | "video" | "tweet"
>[];

const makeQuery = async <T extends object>(
  query: string,
  variables?: object
): Promise<T> => {
  const masterRef = await fetchMasterRef();

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
        "Prismic-Ref": masterRef,
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

const fetchMasterRef = async () => {
  const { refs } = await fetch(
    "https://chrishutchinson.cdn.prismic.io/api/v2",
    {
      method: "get",
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json() as Promise<{
      refs: {
        isMasterRef: boolean;
        ref: string;
      }[];
    }>;
  });

  return refs.find((r) => r.isMasterRef).ref;
};

export type Post = {
  id: string;
  slug: string;
  headline: string;
  subheading: string | null;
  summary: string;
  publishedAt: string;
  body: PrismicBody;
};

type PrismicPostNode = {
  meta: {
    id: string;
    slug: string;
  };
  headline: RichTextBlock[];
  subheading: RichTextBlock[];
  publishedAt: string;
  body: PrismicBody;
};

const trimToWordCount = (str: string, count: number): string => {
  return `${str.split(" ").slice(0, count).join(" ").trim()}...`;
};

const formatPrismicPost = (node: PrismicPostNode): Post => {
  const firstTextBlock = node.body.find((block) => block.type === "text") as {
    type: "text";
    primary: {
      text: RichTextBlock[];
    };
  };

  return {
    id: node.meta.id,
    slug: node.meta.slug,
    headline: node.headline[0].text,
    subheading: node.subheading && node.subheading[0].text,
    summary: node.subheading
      ? node.subheading[0].text
      : trimToWordCount(firstTextBlock.primary.text[0].text, 20),
    publishedAt: node.publishedAt,
    body: node.body,
  };
};

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
                primary {
                  text
                }
              }
              ... on Blog_postBodyVideo {
                type
                primary {
                  embed
                }
              }
              ... on Blog_postBodyGist {
                type
                primary {
                  embed
                }
              }
              ... on Blog_postBodyDivider {
                type
              }
              ... on Blog_postBodyBlockquote {
                type
                primary {
                  text
                }
              }
              ...on Blog_postBodyTweet {
                type
                primary {
                  embed
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
            primary {
              text
            }
          }
          ... on Blog_postBodyVideo {
            type
            primary {
              embed
            }
          }
          ... on Blog_postBodyGist {
            type
            primary {
              embed
            }
          }
          ... on Blog_postBodyDivider {
            type
          }
          ... on Blog_postBodyBlockquote {
            type
            primary {
              text
            }
          }
          ...on Blog_postBodyTweet {
            type
            primary {
              embed
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