import { Box } from "theme-ui";

import { Page } from "../../components/Page";
import { Rail } from "../../components/Rail";
import { GetServerSideProps } from "next";
import { getPosts, Post } from "../../api/prismic";
import { BlogPostCard } from "../../components/BlogPostCard";
import { getYear } from "date-fns";

const Journal: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const groupedPosts = posts.reduce(
    (acc, post) => {
      const publicationYear = getYear(new Date(post.publishedAt));

      return {
        ...acc,
        [publicationYear]: [...(acc[publicationYear] || []), post],
      };
    },
    {} as {
      [key: number]: Post[];
    }
  );

  return (
    <>
      <Page headerLayout="inline">
        <Box
          sx={{
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          {Object.keys(groupedPosts)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((year, index) => {
              const posts = groupedPosts[year];

              return (
                <Rail title={`${index === 0 ? "Journal " : ""}${year}`}>
                  {posts.map((post) => {
                    return <BlogPostCard post={post} key={post.id} />;
                  })}
                </Rail>
              );
            })}
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
