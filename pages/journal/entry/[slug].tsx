import { faCalendar, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

import { GetServerSideProps } from "next";
import { RichText } from "prismic-reactjs";
import { Box, Divider, Flex, Heading, Link, Text } from "theme-ui";
import { getPost, Post } from "../../../api/prismic";
import { Container } from "../../../components/Container";
import { Page } from "../../../components/Page";
import { htmlSerializer } from "../../../utils/html-serializer";
import { linkResolver } from "../../../utils/link-resolver";

const Content: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Box>
      {post.body.map((slice) => {
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
          return <Divider />;
        }

        if (slice.type === "blockquote") {
          return (
            <Text as="blockquote">
              <RichText
                render={slice.primary.text}
                linkResolver={linkResolver}
                htmlSerializer={htmlSerializer}
              />
            </Text>
          );
        }

        if (slice.type === "video" || slice.type === "gist") {
          if (!slice.primary.embed) {
            return null;
          }
          console.log(slice.primary.embed.html);
          return (
            <>
              {" "}
              <Box
                dangerouslySetInnerHTML={{
                  __html: slice.primary.embed.html,
                }}
              />
              <Box>GIST!</Box>
            </>
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
        minWidth: 350,
        maxWidth: 350,
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

            <Box>
              <Box
                sx={{
                  maxWidth: 800,
                }}
              >
                <Heading
                  as="h1"
                  sx={{
                    fontSize: [4, 6],
                    marginBottom: 4,
                  }}
                >
                  {post.headline}
                </Heading>

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
