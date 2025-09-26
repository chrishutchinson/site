import { GetStaticProps } from "next";
import NextLink from "next/link";
import { Flex, Link } from "theme-ui";
import { ExternalPost, getAllDocuments, Post, Weeknote } from "../api/prismic";
import { Container } from "../components/Container";
import { Page } from "../components/Page";
import { ExternalPostCard } from "../components/post-cards/ExternalPostCard";
import { PostCard } from "../components/post-cards/PostCard";
import { WeeknoteCard } from "../components/post-cards/WeeknoteCard";

const Home: React.FC<{
  content: Array<
    | {
        type: "weeknote";
        document: Weeknote;
      }
    | {
        type: "post";
        document: Post;
      }
    | {
        type: "externalPost";
        document: ExternalPost;
      }
  >;
}> = ({ content }) => {
  return (
    <>
      <Page>
        <Container
          sx={{
            py: 3,
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
              gap: 4,
            }}
          >
            {content.map(({ type, document }) => {
              if (type === "post") {
                return <PostCard key={document.id} document={document} />;
              }

              if (type === "weeknote") {
                return <WeeknoteCard key={document.id} document={document} />;
              }

              if (type === "externalPost") {
                return (
                  <ExternalPostCard key={document.id} document={document} />
                );
              }
            })}

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
              <NextLink href="/journal" passHref legacyBehavior>
                <Link>Read older entries...</Link>
              </NextLink>
            </Flex>
          </Flex>
        </Container>
      </Page>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const content = await getAllDocuments();

  return {
    props: {
      content,
    },
    revalidate: 60,
  };
};
