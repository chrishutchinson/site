import React from "react";
import { Elements, HTMLSerializer } from "prismic-reactjs";
import { Box, Link, Text } from "theme-ui";

import { Image } from "../components/content-blocks/Image";
import { linkResolver } from "./link-resolver";

export const htmlSerializer: HTMLSerializer<React.ReactNode> = (
  type,
  element,
  content,
  children,
  key
) => {
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
          <style jsx global>{`
            .inline-code {
              font-family: monospace;
            }
          `}</style>
          <Text as="p" variant="body">
            {children}
          </Text>
        </Box>
      );

    case Elements.image:
      return (
        <Image
          key={key}
          url={element.url}
          alt={element.alt}
          dimensions={element.dimensions}
        />
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
