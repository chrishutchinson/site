import { faCalendar, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { useInView } from "react-intersection-observer";
import { Box, Flex, Heading, Link, Text } from "theme-ui";

import { getPost, Post } from "../../../api/prismic";
import { Container } from "../../../components/Container";
import { Blockquote } from "../../../components/content-blocks/Blockquote";
import { Divider } from "../../../components/content-blocks/Divider";
import { Gist } from "../../../components/content-blocks/Gist";
import { Tweet } from "../../../components/content-blocks/Tweet";
import { Text as TextContentBlock } from "../../../components/content-blocks/Text";
import { Page } from "../../../components/Page";
import Head from "next/head";

const Content: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Box>
      {post.body.map((slice, index) => {
        if (slice.type === "text") {
          return <TextContentBlock slice={slice} />;
        }

        if (slice.type === "divider") {
          return <Divider key={index} />;
        }

        if (slice.type === "blockquote") {
          return <Blockquote slice={slice} />;
        }

        if (slice.type === "gist") {
          return <Gist slice={slice} />;
        }

        if (slice.type === "tweet") {
          return <Tweet slice={slice} />;
        }

        return null;
      })}
    </Box>
  );
};

const Aside: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        minWidth: ["100%", 200, 350],
        maxWidth: ["100%", 200, 350],
      }}
    >
      <Box
        as="aside"
        sx={{
          padding: [3, 4],
          backgroundColor: "buff",
          marginBottom: 3,
          marginRight: [0, 4],
        }}
      >
        <Box
          sx={{
            marginBottom: [0, 3],
          }}
        >
          <Text as="p">
            <FontAwesomeIcon icon={faCalendar} />
            <br />
            First published on{" "}
            <Text as="time" title={post.publishedAt}>
              {format(new Date(post.publishedAt), "MMMM do, yyyy")}
            </Text>
          </Text>
        </Box>

        <Box
          sx={{
            display: ["none", "initial"],
          }}
        >
          <Text as="p">
            <FontAwesomeIcon icon={faLink} />
            <br />
            <Text
              as="code"
              sx={{
                wordBreak: "break-word",
              }}
            >
              chrishutchinson.me/journal/entry/{post.slug}
            </Text>
          </Text>
        </Box>
      </Box>
      <Box
        sx={{
          marginBottom: 5,
        }}
      >
        <Link href="/journal">Back to all entries</Link>
      </Box>
    </Flex>
  );
};

const Entry: React.FC<{ post: Post }> = ({ post }) => {
  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0.5,
  });

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url: `https://www.chrishutchinson.me/journal/entry/${post.slug}`,
            headline: post.headline,
            alternativeHeadline: post.subheading,
            dateCreated: post.publishedAt,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            inLanguage: "en-GB",
            isFamilyFriendly: "true",
            copyrightYear: new Date().getFullYear().toString(),
            copyrightHolder: "Chris Hutchinson",
            author: {
              "@type": "Person",
              name: "Chris Hutchinson",
              url: "https://www.chrishutchinson.me",
            },
          })}
        </script>
      </Head>

      <Page title={post.headline} headerLayout="inline">
        <Box
          sx={{
            paddingBottom: 5,
          }}
        >
          <Container>
            <Flex
              sx={{
                flexDirection: ["column", "row"],
                alignItems: "flex-start",
              }}
            >
              <Aside post={post} />

              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    maxWidth: 800,
                  }}
                >
                  <Heading
                    ref={ref}
                    as="h1"
                    sx={{
                      fontSize: [4, 6],
                      marginBottom: 4,
                    }}
                  >
                    {post.headline}
                  </Heading>

                  <Box
                    sx={{
                      position: "fixed",
                      zIndex: 10,
                      top: 0,
                      left: 0,
                      width: "100%",
                      boxShadow: "0px 2px 8px hsla(0,0%,0%,.2)",
                      backgroundColor: "background",
                      padding: 3,
                      transition: "transform 0.2s ease",
                      transform: inView ? "translateY(-100%)" : "translateY(0)",
                    }}
                  >
                    <Text as="time" variant="label" title={post.publishedAt}>
                      {format(new Date(post.publishedAt), "MMMM do, yyyy")}
                    </Text>
                    <Heading
                      as="h1"
                      sx={{
                        fontSize: 2,
                        marginBottom: 2,
                      }}
                    >
                      {post.headline}
                    </Heading>
                  </Box>

                  {post.subheading && (
                    <Heading
                      as="h2"
                      sx={{
                        fontSize: [3, 4],
                        marginBottom: 4,
                      }}
                    >
                      {post.subheading}
                    </Heading>
                  )}
                </Box>

                <Content post={post} />
              </Box>
            </Flex>
          </Container>
        </Box>
      </Page>
    </>
  );
};

export default Entry;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const post = await getPost(
    Array.isArray(query.slug) ? query.slug[0] : query.slug
  );

  return {
    props: {
      post,
    },
  };
};
