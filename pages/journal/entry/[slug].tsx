import { faCalendar, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { RichText } from "prismic-reactjs";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Box, Divider, Flex, Heading, Link, Text } from "theme-ui";

import { getPost, Post } from "../../../api/prismic";
import { Container } from "../../../components/Container";
import { GistEmbed } from "../../../components/GistEmbed";
import { Page } from "../../../components/Page";
import { htmlSerializer } from "../../../utils/html-serializer";
import { linkResolver } from "../../../utils/link-resolver";

const Content: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Box>
      {post.body.map((slice, index) => {
        if (slice.type === "text") {
          return (
            <RichText
              render={slice.primary.text}
              linkResolver={linkResolver}
              htmlSerializer={htmlSerializer}
            />
          );
        }

        if (slice.type === "divider") {
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
                maxWidth: 800,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: ["80%", 400],
                  margin: "auto",
                  marginTop: 4,
                  marginBottom: 4,
                }}
              >
                <Divider />
              </Box>
            </Box>
          );
        }

        if (slice.type === "blockquote") {
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
                maxWidth: 800,
                marginBottom: 3,
              }}
            >
              <Text as="blockquote" variant="blockquote">
                <RichText
                  render={slice.primary.text}
                  linkResolver={linkResolver}
                  htmlSerializer={htmlSerializer}
                />
              </Text>
            </Box>
          );
        }

        if (slice.type === "gist") {
          if (!slice.primary.embed) {
            return null;
          }

          const [gist] = slice.primary.embed.gist.split("#");

          return (
            <Box
              key={index}
              sx={{
                width: "100%",
              }}
            >
              <GistEmbed gist={gist} />
            </Box>
          );
        }

        if (slice.type === "tweet") {
          if (!slice.primary.embed) {
            return null;
          }

          return (
            <Box
              key={index}
              sx={{
                width: "100%",
              }}
            >
              <Box
                dangerouslySetInnerHTML={{ __html: slice.primary.embed.html }}
              />
            </Box>
          );
        }

        return null;
      })}
    </Box>
  );
};

const Aside: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        minWidth: ["100%", 200, 350],
        maxWidth: ["100%", 200, 350],
      }}
    >
      <Box
        as="aside"
        sx={{
          padding: [3, 4],
          backgroundColor: "buff",
          marginBottom: 3,
          marginRight: [0, 4],
        }}
      >
        <Box
          sx={{
            marginBottom: 3,
          }}
        >
          <Text as="p">
            <FontAwesomeIcon icon={faCalendar} />
            <br />
            First published on{" "}
            <Text as="time" title={post.publishedAt}>
              {format(new Date(post.publishedAt), "MMMM do, yyyy")}
            </Text>
          </Text>
        </Box>

        <Box>
          <Text as="p">
            <FontAwesomeIcon icon={faLink} />
            <br />
            <Text
              as="code"
              sx={{
                wordBreak: "break-word",
              }}
            >
              chrishutchinson.me/journal/entry/{post.slug}
            </Text>
          </Text>
        </Box>
      </Box>
      <Box
        sx={{
          marginBottom: 5,
        }}
      >
        <Link href="/journal">Back to all entries</Link>
      </Box>
    </Flex>
  );
};

const Entry: React.FC<{ post: Post }> = ({ post }) => {
  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0.5,
  });

  return (
    <Page title={post.headline} headerLayout="inline">
      <Box
        sx={{
          paddingBottom: 5,
        }}
      >
        <Container>
          <Flex
            sx={{
              flexDirection: ["column", "row"],
              alignItems: "flex-start",
            }}
          >
            <Aside post={post} />

            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  maxWidth: 800,
                }}
              >
                <Heading
                  ref={ref}
                  as="h1"
                  sx={{
                    fontSize: [4, 6],
                    marginBottom: 4,
                  }}
                >
                  {post.headline}
                </Heading>

                <Box
                  sx={{
                    position: "fixed",
                    zIndex: 10,
                    top: 0,
                    left: 0,
                    width: "100%",
                    boxShadow: "0px 2px 8px hsla(0,0%,0%,.2)",
                    backgroundColor: "background",
                    padding: 3,
                    transition: "transform 0.2s ease",
                    transform: inView ? "translateY(-100%)" : "translateY(0)",
                  }}
                >
                  <Text as="time" variant="label" title={post.publishedAt}>
                    {format(new Date(post.publishedAt), "MMMM do, yyyy")}
                  </Text>
                  <Heading
                    as="h1"
                    sx={{
                      fontSize: 2,
                      marginBottom: 2,
                    }}
                  >
                    {post.headline}
                  </Heading>
                </Box>

                {post.subheading && (
                  <Heading
                    as="h2"
                    sx={{
                      fontSize: [3, 4],
                      marginBottom: 4,
                    }}
                  >
                    {post.subheading}
                  </Heading>
                )}
              </Box>

              <Content post={post} />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Page>
  );
  // return RichText.render(slice.primary.rich_text, linkResolver);
};

export default Entry;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const post = await getPost(
    Array.isArray(query.slug) ? query.slug[0] : query.slug
  );

  return {
    props: {
      post,
    },
  };
};
