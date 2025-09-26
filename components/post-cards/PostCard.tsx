import { FunctionComponent } from "react";
import { Post } from "../../api/prismic";
import { BasePostCard } from "./BasePostCard";

export const PostCard: FunctionComponent<{
  document: Post;
}> = ({ document }) => {
  return (
    <BasePostCard
      id={document.id}
      link={`/journal/entry/${document.slug}`}
      headline={document.headline}
      publishedAt={new Date(document.publishedAt)}
    />
  );
};
