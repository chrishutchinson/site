import React from "react";
import { Elements } from "prismic-reactjs";
import { Box, Link, Text } from "theme-ui";

import { Image } from "../components/content-blocks/Image";
import { linkResolver } from "./link-resolver";

export const htmlSerializer = (type, element, content, children, key) => {
  switch (type) {
    case Elements.paragraph:
      return (
        <Box
          key={key}
          sx={{
            marginBottom: 3,
            maxWidth: 800,
            ":last-of-type": {
              marginBottom: 0,
            },
          }}
        >
          <Text as="p" variant="body">
            {children}
          </Text>
        </Box>
      );

    case Elements.image:
      return (
        <Link href={element.url}>
          <Image key={key} url={element.url} alt={element.alt} />
        </Link>
      );

    case Elements.hyperlink:
      const targetAttr = element.data.target
        ? { target: element.data.target }
        : {};

      const relAttr = element.data.target ? { rel: "noopener" } : {};

      return (
        <Link
          key={key}
          href={element.data.url || linkResolver(element.data)}
          {...{
            ...targetAttr,
            ...relAttr,
          }}
        >
          {children}
        </Link>
      );

    case Elements.preformatted:
      return (
        <Text
          as="pre"
          sx={{
            marginBottom: 3,
            width: "100%",
            overflow: "auto",
          }}
        >
          {children}
        </Text>
      );

    default:
      return null;
  }
};
