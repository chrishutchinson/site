import { Box } from "theme-ui";

import { Post } from "../api/prismic";

import { Blockquote } from "./content-blocks/Blockquote";
import { Divider } from "./content-blocks/Divider";
import { Gist } from "./content-blocks/Gist";
import { Tweet } from "./content-blocks/Tweet";
import { Text as TextContentBlock } from "./content-blocks/Text";

export const Content: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Box>
      {post.body.map((slice, index) => {
        if (slice.type === "text") {
          return <TextContentBlock slice={slice} />;
        }

        if (slice.type === "divider") {
          return <Divider key={index} />;
        }

        if (slice.type === "blockquote") {
          return <Blockquote slice={slice} />;
        }

        if (slice.type === "gist") {
          return <Gist slice={slice} />;
        }

        if (slice.type === "tweet") {
          return <Tweet slice={slice} />;
        }

        return null;
      })}
    </Box>
  );
};
