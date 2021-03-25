import { faCalendar, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import { useInView } from "react-intersection-observer";
import { Box, Flex, Heading, Link, Text } from "theme-ui";
import Head from "next/head";
import Error from "next/error";
import NextLink from "next/link";

import { getAllPostSlugs, getPost, Post } from "../../../api/prismic";
import { Container } from "../../../components/Container";
import { Page } from "../../../components/Page";
import { Content } from "../../../components/Content";
import { useRouter } from "next/router";

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
        <NextLink href="/journal" passHref={true}>
          <Link>Back to all entries</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

const Entry: React.FC<{ post: Post }> = ({ post }) => {
  const { isFallback } = useRouter();

  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0.5,
  });

  if (isFallback) {
    return (
      <Page title="Loading">
        <Box
          sx={{
            paddingBottom: 5,
          }}
        >
          <Container>
            <Heading as="h1">Loading...</Heading>
          </Container>
        </Box>
      </Page>
    );
  }

  if (!post) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url: "https://www.chrishutchinson.me/journal/entry/${post.slug}",
            headline: post.headline,
            alternativeHeadline: post.subheading,
            dateCreated: post.publishedAt,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            inLanguage: "en-GB",
            isFamilyFriendly: "true",
            copyrightYear: new Date().getFullYear().toString(),
            copyrightHolder: {
              "@type": "Person",
              name: "Chris Hutchinson",
              url: "https://www.chrishutchinson.me",
            },
            author: {
              "@type": "Person",
              name: "Chris Hutchinson",
              url: "https://www.chrishutchinson.me",
            },
          })}
        </script>
      </Head>

      <Page
        title={post.headline}
        description={post.subheading}
        headerLayout="inline"
      >
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
                      fontSize: [5, 6, 7],
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
                      transform: inView ? "translateY(-150%)" : "translateY(0)",
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const post = await getPost(
      Array.isArray(params.slug) ? params.slug[0] : params.slug
    );

    return {
      props: {
        post,
      },
      revalidate: 1,
    };
  } catch (e) {
    return {
      props: {
        post: null,
      },
      revalidate: 1,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  };
};
