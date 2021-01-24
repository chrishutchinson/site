import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  useColorMode,
} from "theme-ui";
import { Container } from "./Container";
import { Links } from "./Links";

const metadata = {
  url: (path = "") => `https://www.chrishutchinson.me/${path}`,
  title: (i) => `${i ? `${i} | ` : ""}Chris Hutchinson`,
  description: () =>
    "Chris Hutchinson is a software engineer, working at The Times, and tinkering with Rapsberry Pis.",
  image: () => "/share-image.png",
};

export const Page: React.FC<{ title?: string }> = ({ title, children }) => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title(title)}</title>
        <meta name="description" content={metadata.description()} />
        <meta property="og:url" content={metadata.url()} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metadata.title(title)} />
        <meta property="og:description" content={metadata.description()} />
        <meta property="og:image" content={metadata.image()} />
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:site" content="chrishutchinson"></meta>
        <meta property="twitter:image" content={metadata.image()} />
      </Head>

      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <IconButton
          onClick={(e) => {
            setColorMode(colorMode === "default" ? "dark" : "default");
          }}
          aria-label="Toggle dark mode"
        >
          <FontAwesomeIcon icon={faLightbulb} size="2x" />
        </IconButton>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
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
              Software engineer, working at{" "}
              <Link href="https://www.thetimes.co.uk">The Times</Link>, and
              Raspberry Pi tinkerer.
            </Text>

            <Links />
          </Box>
        </Container>

        <Box>{children}</Box>

        <Flex
          sx={{
            backgroundColor: "muted",
            paddingTop: 5,
            paddingBottom: 5,
            justifyContent: "flex-start",
            color: "#FFF",
          }}
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
