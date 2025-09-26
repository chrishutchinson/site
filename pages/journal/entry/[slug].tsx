import { faCalendar, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Error from "next/error";
import Head from "next/head";
import NextLink from "next/link";
import { useInView } from "react-intersection-observer";
import { Box, Flex, Heading, Link, Text } from "theme-ui";

import { useRouter } from "next/router";
import {
  getAllDocumentSlugs,
  getDocument,
  Post,
  Weeknote,
} from "../../../api/prismic";
import { Container } from "../../../components/Container";
import { Content } from "../../../components/Content";
import { Page } from "../../../components/Page";

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
        <NextLink href="/journal" passHref={true} legacyBehavior>
          <Link>Back to all entries</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

const Entry: React.FC<
  | {
      type: "post";
      document: Post;
    }
  | {
      type: "weeknote";
      document: Weeknote;
    }
> = ({ type, document }) => {
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

  if (!document) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url: `https://www.chrishutchinson.me/journal/entry/${document.slug}`,
            headline: type === "post" ? document.headline : document.subheading,
            alternativeHeadline:
              type === "post" ? document.subheading : document.headline,
            dateCreated: document.publishedAt,
            datePublished: document.publishedAt,
            dateModified: document.publishedAt,
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
        title={type === "post" ? document.headline : document.subheading}
        description={type === "post" ? document.subheading : document.headline}
      >
        <Container
          sx={{
            py: 3,
          }}
        >
          <Flex
            sx={{
              flexDirection: ["column", "row"],
              alignItems: "flex-start",
            }}
          >
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
                <Text as="time" variant="label" title={document.publishedAt}>
                  {format(new Date(document.publishedAt), "MMMM do, yyyy")}
                </Text>
                <Heading
                  ref={ref}
                  as="h1"
                  sx={{
                    fontSize: [4, 5],
                    marginBottom: 4,
                  }}
                >
                  {type === "post" ? document.headline : document.subheading}
                </Heading>

                <Box
                  sx={{
                    position: "fixed",
                    zIndex: 10,
                    top: 0,
                    left: 0,
                    width: "100%",
                    borderBottom: "1px dotted",
                    backgroundColor: "background",
                    padding: 3,
                    transition: "transform 0.2s ease",
                    transform: inView ? "translateY(-150%)" : "translateY(0)",
                  }}
                >
                  <Text as="time" variant="label" title={document.publishedAt}>
                    {format(new Date(document.publishedAt), "MMMM do, yyyy")}
                  </Text>
                  <Heading
                    as="h1"
                    sx={{
                      fontSize: 2,
                      marginBottom: 2,
                    }}
                  >
                    {type === "post" ? document.headline : document.subheading}
                  </Heading>
                </Box>

                {type === "post" && document.subheading && (
                  <Heading
                    as="h2"
                    sx={{
                      fontSize: [3, 4],
                      marginBottom: 4,
                    }}
                  >
                    {document.subheading}
                  </Heading>
                )}
              </Box>

              <Content body={document.body} />
            </Box>
          </Flex>
        </Container>
      </Page>
    </>
  );
};

export default Entry;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { type, document } = await getDocument(
      Array.isArray(params.slug) ? params.slug[0] : params.slug,
    );

    return {
      props: {
        type,
        document,
      },
      revalidate: 1,
    };
  } catch (e) {
    return {
      props: {
        type: null,
        document: null,
      },
      revalidate: 1,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllDocumentSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  };
};
