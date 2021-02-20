import React from "react";
import { Elements } from "prismic-reactjs";
import { Box, Link, Text } from "theme-ui";

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
          }}
        >
          <Text as="p" variant="body" {...propsWithUniqueKey({}, key)}>
            {children}
          </Text>
        </Box>
      );

    // // Don't wrap images in a <p> tag
    // case Elements.image:
    //   props = { src: element.url, alt: element.alt || "" };
    //   return React.createElement("img", propsWithUniqueKey(props, key));

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
