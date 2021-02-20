import { Box } from "theme-ui";

import { Page } from "../../components/Page";
import { Rail } from "../../components/Rail";
import { GetServerSideProps } from "next";
import { getPosts, Post } from "../../api/prismic";
import { BlogPostCard } from "../../components/BlogPostCard";

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
              return <BlogPostCard post={post} key={post.id} />;
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
