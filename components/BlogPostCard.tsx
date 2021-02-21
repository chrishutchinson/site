import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Link, Text } from "theme-ui";
import { Post } from "../api/prismic";
import { Card } from "./Card";

export const BlogPostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Card
      title={post.headline}
      label={
        <Text as="time" variant="label" title={post.publishedAt}>
          {format(new Date(post.publishedAt), "MMMM yyyy")}
        </Text>
      }
      href={`/journal/entry/${post.slug}`}
      showReadLink
      radiusIndex={2}
    >
      <Text
        as="p"
        sx={{
          WebkitLineClamp: 4,
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          lineHeight: 1.69,
        }}
      >
        {post.summary}
      </Text>
    </Card>
  );
};
