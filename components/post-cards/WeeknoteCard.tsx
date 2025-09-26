import { FunctionComponent } from "react";
import { Weeknote } from "../../api/prismic";
import { BasePostCard } from "./BasePostCard";

export const WeeknoteCard: FunctionComponent<{
  document: Weeknote;
}> = ({ document }) => {
  return (
    <BasePostCard
      id={document.id}
      link={`/journal/entry/${document.slug}`}
      headline={document.subheading}
      publishedAt={new Date(document.publishedAt)}
    />
  );
};
