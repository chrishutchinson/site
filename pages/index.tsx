import {
  faAngleDoubleRight,
  faTasks,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { faRaspberryPi } from "@fortawesome/free-brands-svg-icons";
import { Box, Flex, Link, Text } from "theme-ui";
import { GetStaticProps } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";

import { Page } from "../components/Page";
import { Rail } from "../components/Rail";
import { Card } from "../components/Card";
import { getPosts, Post } from "../api/prismic";
import { BlogPostCard } from "../components/BlogPostCard";
const projects = [
  {
    title: "Train departure board",
    link: "https://github.com/chrishutchinson/train-departure-screen",
    icon: faRaspberryPi,
    children: (
      <>
        <Text as="p">
          A python script to display replica real-time UK railway station
          departure screens for SSD13xx devices
        </Text>
      </>
    ),
  },
  {
    title: "Talk: React Testing Library",
    link: "https://github.com/chrishutchinson/talk-react-testing-library",
    icon: faTasks,
    children: (
      <>
        <Text as="p">
          A talk given in July 2019 giving a high level introduction to React
          Testing Library
        </Text>
      </>
    ),
  },
  {
    title: "Paint your own Christmas tree",
    link: "https://github.com/chrishutchinson/christmas-tree-painter",
    icon: faRaspberryPi,
    children: (
      <>
        <Text as="p">
          TypeScript UI and Node.js API for remotely controlling WS2811 LEDs on
          a Christmas tree
        </Text>
      </>
    ),
  },
  {
    title: "UK Air Quality Alexa Skill",
    link: "https://github.com/chrishutchinson/air-quality-alexa-skill",
    icon: faWind,
    children: (
      <>
        <Text as="p">
          Alexa Skill for finding out about your local air quality. Ask: "Alexa,
          what's the air quality like in London?"
        </Text>
      </>
    ),
  },
];

const Home: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Page>
        <Box
          sx={{
            paddingTop: 5,
            paddingBottom: 3,
          }}
        >
          <Rail title="Projects">
            {projects.map((project, index) => (
              <Card
                key={index}
                title={project.title}
                href={project.link}
                icon={project.icon}
                radiusIndex={index % 3}
              >
                {project.children}
              </Card>
            ))}
          </Rail>
        </Box>

        <Box
          sx={{
            paddingTop: 3,
            paddingBottom: 5,
          }}
        >
          <Rail title="Journal">
            {posts.map((post) => (
              <BlogPostCard post={post} key={post.id} />
            ))}

            <Flex
              sx={{
                overflow: "visible",
                width: [260, 300],
                marginRight: [4, 5],
                justifyContent: "flex-start",
                alignItems: "center",
                flexShrink: 0,
                ":last-child": {
                  width: [260 + 32, 300 + 64],
                  paddingRight: [4, 5],
                },
              }}
            >
              <NextLink href="/journal" passHref={true}>
                <Link variant="blockUnderline">
                  Read older entries{" "}
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Link>
              </NextLink>
            </Flex>
          </Rail>
        </Box>
      </Page>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts: posts.slice(0, 4),
    },
  };
};
