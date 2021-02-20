import React from "react";
import { Elements } from "prismic-reactjs";
import { Box, Image, Link, Text } from "theme-ui";

import { linkResolver } from "./link-resolver";

const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key });
};

export const htmlSerializer = function (type, element, content, children, key) {
  switch (type) {
    case Elements.paragraph:
      return (
        <Box
          sx={{
            marginBottom: 3,
            maxWidth: 800,
          }}
        >
          <Text as="p" variant="body" {...propsWithUniqueKey({}, key)}>
            {children}
          </Text>
        </Box>
      );

    case Elements.image:
      return (
        <Box
          sx={{
            marginBottom: 4,
            textAlign: "center",
            maxWidth: 1200,
          }}
        >
          <Image
            {...propsWithUniqueKey(
              {
                src: element.url,
                alt: element.alt || "",
              },
              key
            )}
          />
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
          {...propsWithUniqueKey(
            {
              className: "link-class",
              href: element.data.url || linkResolver(element.data),
              ...targetAttr,
              ...relAttr,
            },
            key
          )}
        >
          {children}
        </Link>
      );

    default:
      return null;
  }
};
