import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { Box, Flex, Heading, Link, Text } from "theme-ui";
import NextLink from "next/link";

import { Container } from "./Container";
import { Links } from "./Links";

const metadata = {
  url: (path = "/") => `https://www.chrishutchinson.me${path}`,
  title: (i) => `${i ? `${i} • ` : ""}Chris Hutchinson`,
  description: (text?: string) =>
    text
      ? text
      : "Chris Hutchinson is a software engineer and Rapsberry Pi tinkerer.",
  image: () => "/share-image.png",
};

export const Page: React.FC<{
  title?: string;
  description?: string;
  headerLayout?: "default" | "inline";
}> = ({ title, description, headerLayout = "default", children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title(title)}</title>
        <meta name="description" content={metadata.description(description)} />
        <meta property="og:url" content={metadata.url(router.asPath)} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metadata.title(title)} />
        <meta
          property="og:description"
          content={metadata.description(description)}
        />
        <meta property="og:image" content={metadata.image()} />
        <meta property="twitter:card" content="summary"></meta>
        <meta property="twitter:site" content="chrishutchinson"></meta>
        <meta property="twitter:image" content={metadata.image()} />

        
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Chris Hutchinson (Journal & Weeknotes)"
          href={metadata.url("/api/feed.xml")}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Chris Hutchinson (Journal)"
          href={metadata.url("/api/journal/feed.xml")}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Chris Hutchinson (Weeknotes)"
          href={metadata.url("/api/weeknotes/feed.xml")}
        />
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        {headerLayout === "default" && (
          <Container>
            <Box
              as="header"
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                height: "60vh",
                maxHeight: 700,
                marginBottom: 3,
              }}
            >
              <Heading
                as="h1"
                sx={{
                  fontSize: [6, 7, 9],
                  textAlign: "left",
                  maxWidth: ["initial", 500, 800],
                  marginBottom: [3, 4],
                }}
              >
                Chris Hutchinson
              </Heading>
              <Text
                as="p"
                sx={{
                  color: "subtle",
                  fontSize: [1, 2],
                  marginBottom: [4, 5],
                }}
              >
                Software engineer and Raspberry Pi tinkerer.
              </Text>

              <Links />
            </Box>
          </Container>
        )}

        {headerLayout === "inline" && (
          <Container>
            <Flex
              as="header"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: [4, 5],
                paddingTop: 4,
              }}
            >
              <Text
                as="p"
                variant="heading"
                sx={{
                  fontSize: [3, 3, 4],
                  textAlign: "left",
                  maxWidth: ["initial", 500, 800],
                  marginRight: 4,
                }}
              >
                <NextLink href="/" passHref={true}>
                  <Link>Chris Hutchinson</Link>
                </NextLink>
              </Text>

              <Links size="small" />
            </Flex>
          </Container>
        )}

        <Box role="main">{children}</Box>

        <Flex
          sx={{
            backgroundColor: "muted",
            paddingTop: 5,
            paddingBottom: 5,
            justifyContent: "flex-start",
            color: "#FFF",
          }}
          as="footer"
        >
          <Container>
            <Heading
              as="h2"
              sx={{
                display: "inline",
                fontSize: 2,
                textAlign: "left",
              }}
            >
              Chris Hutchinson
            </Heading>{" "}
            &bull; {new Date().getFullYear()}
          </Container>
        </Flex>
      </Box>
    </>
  );
};
