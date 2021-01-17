import Head from "next/head";
import { Box, Flex, Heading } from "theme-ui";
import { Links } from "./Links";

export const Page: React.FC<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title ? `${title} | ` : ""}Chris Hutchinson</title>
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        <Box
          as="header"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: [4, 5],
            minHeight: "60vh",
            marginBottom: 3,
          }}
        >
          <Heading
            sx={{
              fontFamily: "title",
              fontSize: [7, 7, 9],
              lineHeight: "title",
              textAlign: "center",
              maxWidth: ["initial", 500, 800],
              marginBottom: [3, 4],
            }}
          >
            Chris Hutchinson
          </Heading>

          <Links />
        </Box>

        <Box>{children}</Box>
      </Box>
    </>
  );
};
