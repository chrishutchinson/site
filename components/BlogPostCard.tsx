import { format } from "date-fns";
import { Text } from "theme-ui";

import { Post, Weeknote } from "../api/prismic";

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
          WebkitBoxOrient: "vertical",
          lineHeight: 1.69,
        }}
      >
        {post.summary}
      </Text>
    </Card>
  );
};

export const WeeknoteCard: React.FC<{ weeknote: Weeknote }> = ({
  weeknote,
}) => {
  return (
    <Card
      title={weeknote.headline}
      label={
        <Text as="time" variant="label" title={weeknote.publishedAt}>
          {format(new Date(weeknote.publishedAt), "MMMM yyyy")}
        </Text>
      }
      href={`/weeknotes/${weeknote.slug}`}
      showReadLink
      radiusIndex={2}
    >
      <Text
        as="p"
        sx={{
          WebkitLineClamp: 4,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          lineHeight: 1.69,
        }}
      >
        {weeknote.subheading}
      </Text>
    </Card>
  );
};
