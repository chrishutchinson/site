import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import NextLink from "next/link";
import { PropsWithChildren } from "react";
import { Box, Flex, Heading, Link, SxProp, Text } from "theme-ui";
import { externalLinks } from "../data/links";
import { Container } from "./Container";

const metadata = {
  url: (path = "/") => `https://www.chrishutchinson.me${path}`,
  title: (i) => `${i ? `${i} • ` : ""}Chris Hutchinson`,
  description: (text?: string) =>
    text
      ? text
      : "Chris Hutchinson is an Edinburgh-based engineer and casual photographer.",
  image: () => "/share-image.png",
};

const getActiveLinkStyles = (pathname: string, href: string): SxProp => {
  return {
    sx: {
      textDecorationThickness: pathname === href ? "3px" : undefined,
      textDecorationSkipInk: "none",
    },
  };
};

export const Page: React.FC<
  PropsWithChildren<{
    title?: string;
    description?: string;
  }>
> = ({ title, description, children }) => {
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
          title="Chris Hutchinson (Journal)"
          href={metadata.url("/api/feed.xml")}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Chris Hutchinson (Journal) [Deprecated]"
          href={metadata.url("/api/journal/feed.xml")}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Chris Hutchinson (Weeknotes) [Deprecated]"
          href={metadata.url("/api/weeknotes/feed.xml")}
        />
      </Head>

      <Box
        sx={{
          mt: [2, 4],
          mx: [2, 4, 4, "auto"],
          border: "1px dotted #333",
          maxWidth: 768,
        }}
        as="header"
      >
        <Container
          sx={{
            backgroundColor: "buff",
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
              gap: 2,
              py: 3,
            }}
          >
            <NextLink href="/" passHref legacyBehavior>
              <Link variant="navLink">
                <Heading
                  as="h1"
                  sx={{
                    fontSize: [4, 5],
                  }}
                >
                  chrishutchinson.me
                </Heading>
              </Link>
            </NextLink>

            <Flex
              sx={{
                flexDirection: "row",
                gap: "2",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              as="nav"
            >
              <Flex
                sx={{
                  flexDirection: "row",
                  gap: "2",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <NextLink href="/about" passHref legacyBehavior>
                  <Link {...getActiveLinkStyles(router.pathname, "/about")}>
                    about
                  </Link>
                </NextLink>
                <NextLink href="/photography" passHref legacyBehavior>
                  <Link
                    {...getActiveLinkStyles(router.pathname, "/photography")}
                  >
                    photography
                  </Link>
                </NextLink>
              </Flex>
              <Flex
                sx={{
                  flexDirection: "row",
                  gap: "2",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <NextLink href="/api/feed.xml" passHref legacyBehavior>
                  <Link>rss</Link>
                </NextLink>
                <NextLink href={externalLinks.github} passHref legacyBehavior>
                  <Link>github</Link>
                </NextLink>
                <NextLink href={externalLinks.linkedin} passHref legacyBehavior>
                  <Link>linkedin</Link>
                </NextLink>
                <NextLink href={externalLinks.bluesky} passHref legacyBehavior>
                  <Link>bluesky</Link>
                </NextLink>
                <NextLink href={externalLinks.substack} passHref legacyBehavior>
                  <Link>substack</Link>
                </NextLink>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box
        sx={{
          mx: [2, 4, 4, "auto"],
          borderLeft: "1px dotted #333",
          borderRight: "1px dotted #333",
          maxWidth: 768,
        }}
        role="main"
      >
        <Box
          sx={{
            backgroundColor: "buff",
          }}
        >
          {children}
        </Box>
      </Box>

      <Box
        sx={{
          mb: [2, 4],
          mx: [2, 4, 4, "auto"],
          border: "1px dotted #333",
          borderTop: "none",
          maxWidth: 768,
        }}
        as="footer"
      >
        <Flex
          sx={{
            pt: 4,
            pb: 3,
            justifyContent: "flex-start",
            backgroundColor: "buff",
          }}
        >
          <Container>
            <Text>{new Date().getFullYear()} – Chris Hutchinson</Text>
          </Container>
        </Flex>
      </Box>
    </>
  );
};
