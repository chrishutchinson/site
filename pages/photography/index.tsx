import Image from "next/image";
import { Box, Flex, Link, Text } from "theme-ui";
import { Container } from "../../components/Container";
import { Page } from "../../components/Page";
import { externalLinks } from "../../data/links";

export default function PhotographyIndexPage() {
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
          <Link
            href="/photography/DSCF5996.jpeg"
            sx={{
              float: "left",
              marginRight: 3,
              maxWidth: ["80%", "40%"],
            }}
          >
            <Image
              src="/photography/DSCF5996.jpeg"
              alt="A photo of Chris"
              width={854}
              height={1280}
              layout="responsive"
            />
          </Link>

          <Text variant="article">
            I do a mix of urban street and nature photography, shooting with
            either with my Sony A7III, my Fujifilm X100V, or my iPhone (usually
            using <Link href="https://halide.cam/">Halide</Link>
            ). I post most of my shots on my photography{" "}
            <Link href={externalLinks.instagramPhotography}>
              Instagram
            </Link>{" "}
            account.
          </Text>

          <Text variant="article">
            Since 2024, I've spent more time focusing on street photography as
            part of the{" "}
            <Link href="https://streetphoto.social/">
              Edinburgh Street Photo Social
            </Link>{" "}
            group. I enjoy observing other photographers, learning from them,
            and finding new ways to look at somewhere familiar.
          </Text>

          <Text variant="article">
            I've shared a handful of my favourite photographs below. If you like
            any of my photos, or have comments, I'd love you to share them via
            Instagram (above) or you can email me at{" "}
            <Link href="mailto:hello@chrishutchinson.me">
              hello@chrishutchinson.me
            </Link>
            .
          </Text>

          <Box
            sx={{
              maxWidth: ["100%", "80%"],
            }}
          >
            <Link href="/photography/DSCF4213.jpg">
              <Image
                alt="A market stall holder freshening up before their next customer"
                src="/photography/DSCF4213.jpg"
                width={1366}
                height={2048}
                layout="responsive"
                loading="lazy"
              />
            </Link>
          </Box>

          <Box
            sx={{
              maxWidth: ["100%", "80%"],
            }}
          >
            <Link href="/photography/DSCF3256.jpeg">
              <Image
                alt="Customers queuing up and being served at a bakery"
                src="/photography/DSCF3256.jpeg"
                width={1365}
                height={2048}
                layout="responsive"
                loading="lazy"
              />
            </Link>
          </Box>

          <Box
            sx={{
              maxWidth: ["100%", "80%"],
            }}
          >
            <Link href="/photography/DSC02072.jpg">
              <Image
                alt="Someone sitting on some steps, taking a break, and looking off into the distance (black and white)"
                src="/photography/DSC02072.jpg"
                width={987}
                height={1280}
                layout="responsive"
                loading="lazy"
              />
            </Link>
          </Box>

          <Box
            sx={{
              maxWidth: ["100%", "80%"],
            }}
          >
            <Link href="/photography/DSCF5570.jpg">
              <Image
                alt="A market stall holder (black and white)"
                src="/photography/DSCF5570.jpg"
                width={1365}
                height={2048}
                layout="responsive"
                loading="lazy"
              />
            </Link>
          </Box>

          <Box
            sx={{
              maxWidth: ["100%", "80%"],
            }}
          >
            <Link href="/photography/DSCF5297.jpeg">
              <Image
                alt="Mount Fuji"
                src="/photography/DSCF5297.jpeg"
                width={1365}
                height={2048}
                layout="responsive"
                loading="lazy"
              />
            </Link>
          </Box>

          <Box
            sx={{
              maxWidth: ["100%", "80%"],
            }}
          >
            <Link href="/photography/DSCF3290.jpeg">
              <Image
                alt="An empty barbershop"
                src="/photography/DSCF3290.jpeg"
                width={1365}
                height={2048}
                layout="responsive"
                loading="lazy"
              />
            </Link>
          </Box>

          <Box
            sx={{
              maxWidth: ["100%", "80%"],
            }}
          >
            <Link href="/photography/DSCF3356.jpg">
              <Image
                alt="The silhouette of a person overlooking The Thames and St Paul's Cathedral (black and white)"
                src="/photography/DSCF3356.jpg"
                width={1365}
                height={2048}
                layout="responsive"
                loading="lazy"
              />
            </Link>
          </Box>
        </Flex>
      </Container>
    </Page>
  );
}
