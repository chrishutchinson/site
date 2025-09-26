import { format } from "date-fns";
import { RichTextBlock } from "prismic-reactjs";
import { trimToWordCount } from "../utils/trim-to-word-count";

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

export type PrismicBody = PrismicSlice<
  "text" | "blockquote" | "divider" | "gist" | "video" | "tweet"
>[];

const makeQuery = async <T extends object>(
  query: string,
  variables?: object,
): Promise<T> => {
  const masterRef = await fetchMasterRef();

  const { data } = await fetch(
    `https://chrishutchinson.prismic.io/graphql?query=${encodeURIComponent(
      query,
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
    },
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
    },
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

export type ExternalPost = {
  id: string;
  slug: string;
  headline: string;
  subheading: string | null;
  publishedAt: string;
  url: string;
};

export type Weeknote = {
  id: string;
  slug: string;
  headline: string;
  subheading: string | null;
  publishedAt: string;
  weekBeginningDate: string;
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

type PrismicWeeknoteNode = {
  meta: {
    id: string;
    slug: string;
  };
  subheading: RichTextBlock[];
  weekBeginningDate: string;
  publishedAt: string;
  body: PrismicBody;
};

type PrismicExternalPostNode = {
  meta: {
    id: string;
    slug: string;
  };
  headline: RichTextBlock[];
  subheading: RichTextBlock[];
  publishedAt: string;
  external_url: {
    _linkType: string;
    url?: string;
    target?: string;
    _meta?: {
      id: string;
      slug: string;
    };
  };
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

const formatPrismicWeeknote = (node: PrismicWeeknoteNode): Weeknote => {
  return {
    id: node.meta.id,
    slug: node.meta.slug,
    headline: `Weeknotes for week beginning ${format(
      new Date(node.weekBeginningDate),
      "do LLLL yyyy",
    )}`,
    weekBeginningDate: format(new Date(node.weekBeginningDate), "do LLLL yyyy"),
    subheading: node.subheading && node.subheading[0].text,
    publishedAt: node.publishedAt,
    body: node.body,
  };
};

const formatPrismicExternalPost = (
  node: PrismicExternalPostNode,
): ExternalPost => {
  if (!node.external_url || !node.external_url.url) {
    throw new Error("External post is missing external URL");
  }

  return {
    id: node.meta.id,
    slug: node.meta.slug,
    headline: node.headline[0].text,
    subheading: node.subheading && node.subheading[0].text,
    publishedAt: node.publishedAt,
    url: node.external_url.url,
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
};

export const getDocument = async (slug: string) => {
  const POST_QUERY = `
    query GetDocumentBySlug($slug: String!) {
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

      weeknote: week_note(uid: $slug, lang: "en-gb") {
        meta: _meta {
          id
          slug: uid
        }
        subheading
        publishedAt: published_at
        weekBeginningDate: week_beginning_date
        body {
          ... on Week_noteBodyText {
            type
            primary {
              text
            }
          }
          ... on Week_noteBodyVideo {
            type
            primary {
              embed
            }
          }
          ... on Week_noteBodyGist {
            type
            primary {
              embed
            }
          }
          ... on Week_noteBodyDivider {
            type
          }
          ... on Week_noteBodyBlockquote {
            type
            primary {
              text
            }
          }
          ...on Week_noteBodyTweet {
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
    post: PrismicPostNode | null;
    weeknote: PrismicWeeknoteNode | null;
  }>(POST_QUERY, {
    slug,
  });

  if (!data.post && !data.weeknote) {
    throw new Error("No post found matching the requested slug");
  }

  if (data.weeknote) {
    return {
      type: "weeknote" as const,
      document: formatPrismicWeeknote(data.weeknote),
    };
  }

  return {
    type: "post" as const,
    document: formatPrismicPost(data.post),
  };
};

export const getAllPostSlugs = () => {
  const recursivelyFetchSlugs = async (
    list: string[] = [],
    after?: string,
  ): Promise<string[]> => {
    const ALL_POST_SLUGS_QUERY = `query GetAllPostSlugs($after: String) {
      posts: allBlog_posts(first: 100, sortBy: published_at_DESC, after: $after) {
         pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            meta: _meta {
              slug: uid
            }
          }
        }
      }
    }`;

    const { posts } = await makeQuery<{
      posts: {
        pageInfo: {
          endCursor?: string;
          hasNextPage: boolean;
        };
        edges: {
          node: {
            meta: {
              slug: string;
            };
          };
        }[];
      };
    }>(ALL_POST_SLUGS_QUERY, {
      after,
    });

    const newList = [...list, ...posts.edges.map((e) => e.node.meta.slug)];

    if (posts.pageInfo.hasNextPage && posts.pageInfo.endCursor) {
      return recursivelyFetchSlugs(newList, posts.pageInfo.endCursor);
    }

    return newList;
  };

  return recursivelyFetchSlugs();
};

export const getAllDocumentSlugs = async () => {
  const postSlugs = await getAllPostSlugs();
  const weeknoteSlugs = await getAllWeeknoteSlugs();

  return [...postSlugs, ...weeknoteSlugs];
};

export const getWeeknotes = async () => {
  const WEEKNOTES_QUERY = `
    query GetLatestWeeknotes {
      weeknotes: allWeek_notes(sortBy: published_at_DESC, first: 10) {
        edges {
          node {
            meta: _meta {
              id
              slug: uid
            }
            subheading
            publishedAt: published_at
            weekBeginningDate: week_beginning_date
            body {
              ... on Week_noteBodyText {
                type
                primary {
                  text
                }
              }
              ... on Week_noteBodyVideo {
                type
                primary {
                  embed
                }
              }
              ... on Week_noteBodyGist {
                type
                primary {
                  embed
                }
              }
              ... on Week_noteBodyDivider {
                type
              }
              ... on Week_noteBodyBlockquote {
                type
                primary {
                  text
                }
              }
              ...on Week_noteBodyTweet {
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
    weeknotes: {
      edges: {
        node: PrismicWeeknoteNode;
      }[];
    };
  }>(WEEKNOTES_QUERY);

  return data.weeknotes.edges.map(({ node }) => formatPrismicWeeknote(node));
};

export const getWeeknote = async (slug: string) => {
  const WEEKNOTE_QUERY = `
    query GetWeeknoteBySlug($slug: String!) {
      weeknote: week_note(uid: $slug, lang: "en-gb") {
        meta: _meta {
          id
          slug: uid
        }
        subheading
        publishedAt: published_at
        weekBeginningDate: week_beginning_date
        body {
          ... on Week_noteBodyText {
            type
            primary {
              text
            }
          }
          ... on Week_noteBodyVideo {
            type
            primary {
              embed
            }
          }
          ... on Week_noteBodyGist {
            type
            primary {
              embed
            }
          }
          ... on Week_noteBodyDivider {
            type
          }
          ... on Week_noteBodyBlockquote {
            type
            primary {
              text
            }
          }
          ...on Week_noteBodyTweet {
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
    weeknote: PrismicWeeknoteNode;
  }>(WEEKNOTE_QUERY, {
    slug,
  });

  if (!data.weeknote) {
    throw new Error("No post found matching the requested slug");
  }

  return formatPrismicWeeknote(data.weeknote);
};

export const getAllWeeknoteSlugs = () => {
  const recursivelyFetchSlugs = async (
    list: string[] = [],
    after?: string,
  ): Promise<string[]> => {
    const ALL_WEEKNOTES_QUERY = `query GetAllWeeknoteSlugs($after: String) {
      weeknotes: allWeek_notes(first: 100, sortBy: published_at_DESC, after: $after) {
         pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            meta: _meta {
              slug: uid
            }
          }
        }
      }
    }`;

    const { weeknotes } = await makeQuery<{
      weeknotes: {
        pageInfo: {
          endCursor?: string;
          hasNextPage: boolean;
        };
        edges: {
          node: {
            meta: {
              slug: string;
            };
          };
        }[];
      };
    }>(ALL_WEEKNOTES_QUERY, {
      after,
    });

    const newList = [...list, ...weeknotes.edges.map((e) => e.node.meta.slug)];

    if (weeknotes.pageInfo.hasNextPage && weeknotes.pageInfo.endCursor) {
      return recursivelyFetchSlugs(newList, weeknotes.pageInfo.endCursor);
    }

    return newList;
  };

  return recursivelyFetchSlugs();
};

export const getAllDocuments = async (
  {
    count,
  }: {
    count?: number;
  } = {
    count: 10,
  },
): Promise<
  (
    | { type: "weeknote"; document: Weeknote }
    | { type: "post"; document: Post }
    | { type: "externalPost"; document: ExternalPost }
  )[]
> => {
  const ALL_CONTENT_QUERY = `
    query GetLatestContent($count: Int) {
      documents: _allDocuments(type_in: ["blog_post", "week_note", "external_post"], sortBy: meta_firstPublicationDate_DESC, first: $count) {
        edges {
          node {
            type: __typename
            ... on Blog_post {
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

            ... on Week_note {
              meta: _meta {
                id
                slug: uid
              }
              subheading
              publishedAt: published_at
              weekBeginningDate: week_beginning_date
              body {
                ... on Week_noteBodyText {
                  type
                  primary {
                    text
                  }
                }
                ... on Week_noteBodyVideo {
                  type
                  primary {
                    embed
                  }
                }
                ... on Week_noteBodyGist {
                  type
                  primary {
                    embed
                  }
                }
                ... on Week_noteBodyDivider {
                  type
                }
                ... on Week_noteBodyBlockquote {
                  type
                  primary {
                    text
                  }
                }
                ...on Week_noteBodyTweet {
                  type
                  primary {
                    embed
                  }
                }
              }
            }

            ... on External_post {
              meta: _meta {
                id
                slug: uid
              }
              headline
              subheading
              publishedAt: published_at
              external_url {
                _linkType
                ... on _ExternalLink {
                  url
                  target
                }
                ... on _Document {
                  _meta {
                    id
                    slug: uid
                  }
                }
                ... on _FileLink {
                  url
                }
                ... on _ImageLink {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await makeQuery<{
    documents: {
      edges: {
        node:
          | ({
              type: "Week_note";
            } & PrismicWeeknoteNode)
          | ({
              type: "Blog_post";
            } & PrismicPostNode)
          | ({
              type: "External_post";
            } & PrismicExternalPostNode);
      }[];
    };
  }>(ALL_CONTENT_QUERY, {
    count,
  });

  return data.documents.edges.map(({ node }) => {
    if (node.type === "Blog_post") {
      return {
        type: "post",
        document: formatPrismicPost(node),
      };
    }

    if (node.type === "Week_note") {
      return {
        type: "weeknote",
        document: formatPrismicWeeknote(node),
      };
    }

    if (node.type === "External_post") {
      return {
        type: "externalPost",
        document: formatPrismicExternalPost(node),
      };
    }
  });
};
