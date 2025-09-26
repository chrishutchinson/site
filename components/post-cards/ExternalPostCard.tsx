import { FunctionComponent } from "react";
import { ExternalPost } from "../../api/prismic";
import { BasePostCard } from "./BasePostCard";

export const ExternalPostCard: FunctionComponent<{
  document: ExternalPost;
}> = ({ document }) => {
  return (
    <BasePostCard
      id={document.id}
      link={document.url}
      headline={document.headline}
      publishedAt={new Date(document.publishedAt)}
      isExternal
    />
  );
};
