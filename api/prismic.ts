const fixture = {
  data: {
    allBlog_posts: {
      edges: [
        {
          node: {
            _meta: {
              id: "YDAIVxUAACYA5rtF",
              uid: "my-wordpress-renaissance",
            },
            headline: [
              {
                type: "heading1",
                text: "My WordPress Renaissance",
                spans: [],
              },
            ],
            subheading: null,
            published_at: "2015-01-21T00:00:00+0000",
            body: [
              {
                type: "text",
                primary: {
                  text: [
                    {
                      type: "paragraph",
                      text:
                        "There’s lot to say about WordPress, some good, some bad. It seems no matter who you talk to, everyone has heard of WordPress, everyone has used WordPress, and everyone has at least one thing they hate about WordPress.",
                      spans: [],
                    },
                    {
                      type: "paragraph",
                      text:
                        "For those I’ve spoken to, that issue can be one of many things. If they’re a developer, it’s ‘The Loop’, or WordPress’ quite frankly awful theming API. If they’re an editor or writer, it’s probably the challenges they face trying to make their work look good, or how they don’t have the flexibility to try new things.",
                      spans: [],
                    },
                    {
                      type: "paragraph",
                      text:
                        "Over the past few years I’ve spent a lot of time working with WordPress. I started by building a news site for my old student newspaper, Redbrick(2011–12). I then worked at a WordPress development agency, building anything from small personal blogs, to large ecommerce websites.",
                      spans: [
                        {
                          start: 137,
                          end: 145,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "http://www.redbrick.me/",
                          },
                        },
                      ],
                    },
                    {
                      type: "paragraph",
                      text:
                        "More recently, I’ve tried using it in a entirely new way. In a nutshell, this new stack consists of:",
                      spans: [],
                    },
                    {
                      type: "list-item",
                      text: "WordPress",
                      spans: [
                        {
                          start: 0,
                          end: 9,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "https://wordpress.org/",
                          },
                        },
                      ],
                    },
                    {
                      type: "list-item",
                      text: "Advanced Custom Fields",
                      spans: [
                        {
                          start: 0,
                          end: 22,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "http://www.advancedcustomfields.com/",
                          },
                        },
                      ],
                    },
                    {
                      type: "list-item",
                      text: "WordPress API (WP-API)",
                      spans: [
                        {
                          start: 0,
                          end: 22,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "http://wp-api.org/",
                          },
                        },
                      ],
                    },
                    {
                      type: "list-item",
                      text:
                        "ACF to WP-API (an open source plugin I’ve written to include Advanced Custom Fields data in the WordPress API)",
                      spans: [
                        {
                          start: 0,
                          end: 13,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "https://wordpress.org/plugins/acf-to-wp-api/",
                          },
                        },
                        {
                          start: 18,
                          end: 29,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "https://github.com/times/acf-to-wp-api",
                          },
                        },
                      ],
                    },
                    {
                      type: "list-item",
                      text: "A frontend framework, such as AngularJS",
                      spans: [
                        {
                          start: 30,
                          end: 39,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "https://angularjs.org/",
                          },
                        },
                      ],
                    },
                    {
                      type: "paragraph",
                      text:
                        "I’ve used this set of tools a few times to rapidly (and I mean really rapidly) produce a structured and fully-featured CMS backend, with flexibility and extensibility based on the needs of the project (Advanced Custom Fields & ACF to WP-API). By using the REST API provided by WP-API, I’ve been able to forget about some of the weaker aspects of WordPress and take advantage of some of its better features — such as revisions, a simple editing interface, and familiarity.",
                      spans: [
                        {
                          start: 63,
                          end: 77,
                          type: "strong",
                        },
                      ],
                    },
                    {
                      type: "paragraph",
                      text:
                        "I can then use any frontend framework, such as AngularJS, to consume the REST API, and display the content in the form I choose, taking advantage of the great features of those JavaScript frameworks, without the hassle of WordPress theming. These frameworks make it easy to swap out the API at a later point to a newer or alternative CMS, whilst maintaining the same frontend code base.",
                      spans: [],
                    },
                    {
                      type: "paragraph",
                      text:
                        "I’ve found this stack exceptionally useful during hack days for rapidly producing a flexible CMS, spending less time worrying about models, databases and editing interfaces, and more time focussing on the core idea (the frontend product). Advanced Custom Fields allows me to add and create the fields I need for the specific project, whilst maintaining an easy to use interface. I competed on a staff team at The Times & The Sunday Times’ Build The News in October 2014 and our team built Placard (a flexible and easy to use campaigning platform) based on this stack — both the WordPress plugin & AngularJS frontend are available on GitHub.",
                      spans: [
                        {
                          start: 439,
                          end: 453,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "https://buildthenews.wordpress.com/",
                          },
                        },
                        {
                          start: 489,
                          end: 498,
                          type: "em",
                        },
                        {
                          start: 578,
                          end: 594,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "https://github.com/times/placard",
                          },
                        },
                        {
                          start: 597,
                          end: 615,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "http://www.github.com/times/placard-ui",
                          },
                        },
                      ],
                    },
                    {
                      type: "paragraph",
                      text:
                        "Whilst this combination of tools does not solve all the problems WordPress has, it allows both users and developers to take advantage of it as a powerful CMS, and pair it with their frontend framework of choice. In separating the data layer from the presentation layer, adding new features and extending functionality becomes quick, and very easy.",
                      spans: [],
                    },
                    {
                      type: "paragraph",
                      text:
                        "Are you using the WordPress API for anything? Let me know on Twitter @chrishutchinson.",
                      spans: [
                        {
                          start: 69,
                          end: 85,
                          type: "hyperlink",
                          data: {
                            link_type: "Web",
                            url: "http://www.twitter.com/chrishutchinson",
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
};

export type Post = {
  id: string;
  slug: string;
  headline: string;
  subheading: string | null;
  summary: string;
  publishedAt: string;
  body: any;
};

const trimToWordCount = (str: string, count: number): string => {
  return `${str.split(" ").slice(0, count).join(" ").trim()}...`;
};

export const getPosts = async () => {
  return fixture.data.allBlog_posts.edges.map(
    (edge) =>
      ({
        id: edge.node._meta.id,
        slug: edge.node._meta.uid,
        headline: edge.node.headline[0].text,
        subheading: edge.node.subheading && edge.node.subheading[0].text,
        summary: edge.node.subheading
          ? edge.node.subheading[0].text
          : trimToWordCount(edge.node.body[0].primary.text[0].text, 20),
        publishedAt: edge.node.published_at,
        body: edge.node.body,
      } as Post)
  );
};
