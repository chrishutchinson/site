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

export const Page: React.FC<{ title?: string }> = ({ title, children }) => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Chris Hutchinson is a software engineer, working at The Times, and tinkering with Rapsberry Pis."
        />
        <title>{title ? `${title} | ` : ""}Chris Hutchinson</title>
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
              sx={{
                fontFamily: "title",
                fontSize: [6, 7, 9],
                lineHeight: "title",
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
                color: "muted",
                fontSize: [1, 2],
                marginBottom: [4, 5],
              }}
            >
              Software engineer, working at{" "}
              <Link href="https://www.thetimes.co.uk">The Times</Link>, and
              tinkering with Rapsberry Pis.
            </Text>

            <Links />
          </Box>
        </Container>

        <Box>{children}</Box>

        <Flex
          sx={{
            backgroundColor: "highlight",
            paddingTop: 5,
            paddingBottom: 5,
            justifyContent: "flex-start",
            color: "#FFF",
          }}
        >
          <Container>
            <Heading
              sx={{
                display: "inline",
                fontFamily: "title",
                fontSize: 2,
                lineHeight: "title",
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
