import { Box } from "theme-ui";

import { PrismicBody } from "../api/prismic";

import { Blockquote } from "./content-blocks/Blockquote";
import { Divider } from "./content-blocks/Divider";
import { Gist } from "./content-blocks/Gist";
import { Text as TextContentBlock } from "./content-blocks/Text";
import { Tweet } from "./content-blocks/Tweet";

export const Content: React.FC<{ body: PrismicBody }> = ({ body }) => {
  return (
    <Box>
      {body.map((slice, index) => {
        if (slice.type === "text") {
          return <TextContentBlock key={index} slice={slice} />;
        }

        if (slice.type === "divider") {
          return <Divider key={index} />;
        }

        if (slice.type === "blockquote") {
          return <Blockquote key={index} slice={slice} />;
        }

        if (slice.type === "gist") {
          return <Gist key={index} slice={slice} />;
        }

        if (slice.type === "tweet") {
          return <Tweet key={index} slice={slice} />;
        }

        return null;
      })}
    </Box>
  );
};
