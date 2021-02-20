import { Box, Link, Text } from "theme-ui";

import { Page } from "../../components/Page";
import { Rail } from "../../components/Rail";
import { Card } from "../../components/Card";
import { GetServerSideProps } from "next";
import { getPosts, Post } from "../../api/prismic";
import { format } from "date-fns";
import {
  faAngleDoubleRight,
  faRssSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "../../components/Container";

const Journal: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Page headerLayout="inline">
        <Box
          sx={{
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Rail title="Journal">
            {posts.map((post) => {
              return (
                <Card
                  key={post.id}
                  title={post.headline}
                  label={
                    <Text as="time" variant="label" title={post.publishedAt}>
                      {format(new Date(post.publishedAt), "MMMM yyyy")}
                    </Text>
                  }
                  href={`/journal/${post.slug}`}
                  radius="100px 15px 225px 15px/15px 225px 15px 100px"
                >
                  <p>{post.summary}</p>

                  <Text
                    as="p"
                    sx={{
                      marginTop: 4,
                    }}
                  >
                    <Link
                      variant="blockUnderline"
                      href={`/journal/${post.slug}`}
                    >
                      Read <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Link>
                  </Text>
                </Card>
              );
            })}
          </Rail>
        </Box>
      </Page>
    </>
  );
};

export default Journal;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};
