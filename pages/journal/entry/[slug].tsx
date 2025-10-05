import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Error from "next/error";
import Head from "next/head";
import { Box, Flex, Heading, Text } from "theme-ui";

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
                  as="h1"
                  sx={{
                    fontSize: [4, 5],
                    marginBottom: 4,
                  }}
                >
                  {type === "post" ? document.headline : document.subheading}
                </Heading>

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
