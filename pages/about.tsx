import NextLink from "next/link";
import { Flex, Link, Text } from "theme-ui";
import { Container } from "../components/Container";
import { Page } from "../components/Page";
import { externalLinks } from "../data/links";

export default function AboutPage() {
  return (
    <Page>
      <Container
        sx={{
          py: 3,
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Text variant="article">
            Hey everyone, I'm Chris Hutchinson, a human and engineer living in
            Edinburgh, Scotland. I have been making computers do things for a
            long time, and I write about it on this blog, as well as
            occasionally on my{" "}
            <NextLink href={externalLinks.substack} passHref legacyBehavior>
              <Link>Substack</Link>
            </NextLink>
            .
          </Text>

          <Text variant="article">
            I've previously worked on{" "}
            <NextLink href="/cv/learnerbly" passHref legacyBehavior>
              <Link>L&D products for knowledge businesses</Link>
            </NextLink>
            , on{" "}
            <NextLink href="/cv/made-tech" passHref legacyBehavior>
              <Link>local and central government</Link>
            </NextLink>{" "}
            projects, and in{" "}
            <NextLink href="/cv/the-times" passHref legacyBehavior>
              <Link>media</Link>
            </NextLink>
            . I'm currently working on a stealth start up (
            <NextLink
              href="/cv/mystery-stealth-start-up"
              passHref
              legacyBehavior
            >
              <Link>work with me!</Link>
            </NextLink>
            ), where I spend most of my time listening to customers, building
            products, and thinking about how to build things better.
          </Text>

          <Text variant="article">
            I also love to build things for myself – usually, but not
            exclusively, for fun rather than function – including a{" "}
            <NextLink
              href={externalLinks.raspberryPiTrainDepartureScreenArticle}
              passHref
              legacyBehavior
            >
              <Link>miniature UK train departure screen</Link>
            </NextLink>{" "}
            (
            <NextLink
              href={externalLinks.raspberryPiTrainDepartureScreenRepo}
              passHref
              legacyBehavior
            >
              <Link>GitHub</Link>
            </NextLink>
            ), and{" "}
            <NextLink
              href={externalLinks.christmasTreePainterLightsRepo}
              passHref
              legacyBehavior
            >
              <Link>an app for "painting" your Christmas tree lights</Link>
            </NextLink>
            . I'm actively working on building a household Star Wars-inspired
            droid, and an app to counteract the potentially negative cognitive
            effects of generative AI.
          </Text>

          <Text variant="article">
            If you'd like to get in touch, you can email me at{" "}
            <Link href="mailto:hello@chrishutchinson.me">
              hello@chrishutchinson.me
            </Link>{" "}
            or message me on{" "}
            <NextLink href={externalLinks.linkedin} passHref legacyBehavior>
              <Link>LinkedIn</Link>
            </NextLink>
            . Whether it's about something I've written, one of my projects, or
            just to say hi, please do reach out – hearing from readers and
            fellow makers is part of why I do all this!
          </Text>

          <Text variant="article">
            I have one favour to ask of you – I'm prioritising reading more
            books over the next twelve months (fiction, non-fiction – I'm not
            fussy!), so if you have any recommendations, please do send them my
            way!
          </Text>
        </Flex>
      </Container>
    </Page>
  );
}
