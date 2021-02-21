import React from "react";
import { Elements } from "prismic-reactjs";
import { Box, Image, Link, Text } from "theme-ui";

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
        <Box
          key={key}
          sx={{
            marginBottom: 4,
            textAlign: "center",
            maxWidth: 1200,
          }}
        >
          <Image src={element.url} alt={element.alt} />
          <Text as="cite">{element.alt}</Text>
        </Box>
      );

    // Add a class to hyperlinks
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

    default:
      return null;
  }
};
