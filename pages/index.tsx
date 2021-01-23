import { Box, Flex, Heading, Link } from "theme-ui";
import { Page } from "../components/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faWind } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRaspberryPi } from "@fortawesome/free-brands-svg-icons";

const Card: React.FC<{
  icon: IconProp;
  title: string;
  href: string;
  radius?: string;
}> = ({
  icon,
  title,
  href,
  radius = "255px 15px 225px 15px/15px 225px 15px 255px",
  children,
}) => {
  return (
    <Box
      sx={{
        overflow: "visible",
        width: [260, 300],
        marginRight: [4, 5],
        flexShrink: 0,
        ":last-child": {
          width: [260 + 32, 300 + 64],
          paddingRight: [3, 5],
        },
      }}
    >
      <Box
        sx={{
          boxShadow: "20px 28px 34px -26px hsla(0,0%,0%,.2)",
          borderRadius: radius,
          padding: ["30px 30px 20px", "40px 50px 20px"],
          border: "solid 3px #41403E",
          height: "100%",
        }}
      >
        <Box
          sx={{
            marginBottom: 2,
            backgroundColor: "accent",
            color: "#FFF",
            display: "inline-flex",
            width: 55,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          <FontAwesomeIcon icon={icon} size="2x" />
        </Box>

        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href={href}
            sx={{
              color: "text",
            }}
          >
            <Heading
              as="h2"
              sx={{
                fontSize: [2, 3],
              }}
            >
              {title}
            </Heading>
          </Link>
        </Flex>

        <Box
          sx={{
            color: "muted",
          }}
        >
          {children}
        </Box>
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
        paddingLeft: [4, 5],
        paddingBottom: 30,
        marginBottom: [4, 5],
      }}
    >
      {children}
    </Flex>
  );
};

export default function Home() {
  return (
    <>
      <Page>
        <Rail>
          <Card
            title="Train departure board"
            href="https://github.com/chrishutchinson/train-departure-screen"
            icon={faRaspberryPi}
            radius="100px 15px 225px 15px/15px 225px 15px 100px"
          >
            <p>
              A python script to display replica real-time UK railway station
              departure screens for SSD13xx devices
            </p>
          </Card>

          <Card
            title="Talk: React Testing Library"
            href="https://github.com/chrishutchinson/talk-react-testing-library"
            icon={faTasks}
          />

          <Card
            title="Paint your own Christmas tree"
            href="https://github.com/chrishutchinson/christmas-tree-painter"
            icon={faRaspberryPi}
            radius="15px 120px 15px 200px/120px 15px 200px 15px"
          />

          <Card
            title="UK Air Quality Alexa Skill"
            href="https://github.com/chrishutchinson/air-quality-alexa-skill"
            icon={faWind}
          />
        </Rail>
      </Page>
    </>
  );
}
