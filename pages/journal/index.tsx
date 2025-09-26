import { GetStaticProps } from "next";
import { Flex } from "theme-ui";
import {
  ExternalPost,
  getAllDocuments,
  Post,
  Weeknote,
} from "../../api/prismic";
import { Container } from "../../components/Container";
import { Page } from "../../components/Page";
import { ExternalPostCard } from "../../components/post-cards/ExternalPostCard";
import { PostCard } from "../../components/post-cards/PostCard";
import { WeeknoteCard } from "../../components/post-cards/WeeknoteCard";

const Journal: React.FC<{
  documents: Array<
    | {
        type: "post";
        document: Post;
      }
    | {
        type: "weeknote";
        document: Weeknote;
      }
    | {
        type: "externalPost";
        document: ExternalPost;
      }
  >;
}> = ({ documents }) => {
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
            {documents.map(({ type, document }) => {
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
          </Flex>
        </Container>
      </Page>
    </>
  );
};

export default Journal;

export const getStaticProps: GetStaticProps = async () => {
  const documents = await getAllDocuments({
    count: 100,
  });

  return {
    props: {
      documents,
    },
    revalidate: 1,
  };
};
