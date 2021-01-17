import { Box, Flex, Heading, Link, useColorMode } from "theme-ui";
import { Page } from "../components/Page";

const radiuses = [
  "255px 15px 225px 15px/15px 225px 15px 255px",
  "180px 15px 225px 15px/15px 225px 15px 180px",
];

const getRandomRadius = () => {
  const index = Math.floor(Math.random() * radiuses.length);

  return radiuses[index];
};

const Card = () => {
  const radius = getRandomRadius();

  return (
    <Box
      sx={{
        overflow: "visible",
        width: "85%",
        maxWidth: 250,
        marginRight: 30,
        flexShrink: 0,
        ":last-child": {
          paddingRight: 20,
        },
      }}
    >
      <Box
        sx={{
          boxShadow: "20px 28px 34px -26px hsla(0,0%,0%,.2)",
          borderRadius: radius,
          padding: 30,
          border: "solid 3px #41403E",
        }}
      >
        <Heading as="h2">Title here</Heading>
        <p>
          This is a long description that could span a couple of lines and might
          have <strong>rich</strong> text formatting.
        </p>

        <Link>&gt;</Link>
      </Box>
    </Box>
  );
};

const Rail: React.FC = ({ children }) => {
  return (
    <Flex
      sx={{
        flexWrap: "nowrap",
        overflowX: "auto",
        paddingLeft: 20,
        paddingBottom: 30,
      }}
    >
      {children}
    </Flex>
  );
};

export default function Home() {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <>
      <Page>
        {/* <button
          onClick={(e) => {
            setColorMode(colorMode === "default" ? "dark" : "default");
          }}
        >
          Toggle {colorMode === "default" ? "Dark" : "Light"}
        </button> */}

        <Rail>
          <Card />
          <Card />
          <Card />
          <Card />
        </Rail>
      </Page>
    </>
  );
}
