import {
  faAngleDoubleRight,
  faCheck,
  faNewspaper,
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
import { getPosts, getWeeknotes, Post, Weeknote } from "../api/prismic";
import { BlogPostCard } from "../components/BlogPostCard";
import { Container } from "../components/Container";

const projects = [
  {
    title: "Slack Testing Library",
    link: "https://www.github.com/chrishutchinson/slack-testing-library",
    icon: faCheck,
    children: (
      <>
        <Text as="p">
          Test your Slack apps like a human would – a super fast Slack intercept
          server and testing framework.
        </Text>
        <Text
          as="p"
          sx={{
            marginTop: 2,
          }}
        >
          <Link
            href="https://www.github.com/chrishutchinson/slack-testing-library"
            rel="noopener"
          >
            <strong>More on GitHub</strong>
          </Link>
        </Text>
      </>
    ),
  },
  {
    title: "Tomorrow's Papers Today",
    link: "https://www.tomorrowspapers.app",
    icon: faNewspaper,
    children: (
      <>
        <Text as="p">
          An iPhone and iPad app for the latest UK newspaper front pages, all in
          once place, as soon as they're published.{" "}
        </Text>
        <Text
          as="p"
          sx={{
            marginTop: 2,
          }}
        >
          <Link href="https://www.tomorrowspapers.app" rel="noopener">
            <strong>Beta wait list now open!</strong>
          </Link>
        </Text>
      </>
    ),
  },
  {
    title: "To Do × RSS",
    link: "https://todo.hutch.tf",
    icon: faCheck,
    children: (
      <>
        <Text as="p">
          Turn Microsoft To Do lists into RSS feeds, for quick and easy reading
          lists!
        </Text>
      </>
    ),
  },
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
        <Text
          as="p"
          sx={{
            marginTop: 2,
          }}
        >
          <Link
            href="https://magpi.raspberrypi.org/articles/uk-train-departure-screen"
            rel="noopener noreferrer"
          >
            <strong>MagPi magazine write up</strong>
          </Link>
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

const Home: React.FC<{ posts: Post[]; latestWeeknote: Weeknote | null }> = ({
  posts,
  latestWeeknote,
}) => {
  return (
    <>
      <Page>
        {latestWeeknote && (
          <Box
            sx={{
              paddingTop: 5,
              paddingBottom: 3,
            }}
          >
            <Container>
              <Text
                as="h2"
                variant="heading"
                sx={{
                  display: "inline-block",
                  fontSize: 2,
                }}
              >
                Latest weeknote
              </Text>{" "}
              –{" "}
              <NextLink href={`/weeknotes/${latestWeeknote.slug}`}>
                <Link href={`/weeknotes/${latestWeeknote.slug}`}>
                  <strong>{latestWeeknote.subheading}</strong>
                </Link>
              </NextLink>
              , {latestWeeknote.weekBeginningDate}
            </Container>
          </Box>
        )}

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
  const weeknotes = await getWeeknotes();

  return {
    props: {
      posts: posts.slice(0, 4),
      latestWeeknote: weeknotes.length > 0 ? weeknotes[0] : null,
    },
    revalidate: 60,
  };
};
