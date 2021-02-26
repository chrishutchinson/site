import React from "react";
import { Elements, HTMLSerializer } from "prismic-reactjs";
import { Box, Link, Text } from "theme-ui";

import { Image } from "../components/content-blocks/Image";
import { linkResolver } from "./link-resolver";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <Text as="p" variant="article">
            {children}
          </Text>
        </Box>
      );

    case Elements.image:
      return (
        <Box
          sx={{
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Image
            key={key}
            url={element.url}
            alt={element.alt}
            dimensions={element.dimensions}
          />
        </Box>
      );

    case Elements.hyperlink:
      const isExternal =
        element.data.url.includes("https://") ||
        element.data.url.includes("http://");

      return (
        <Link
          key={key}
          href={element.data.url || linkResolver(element.data)}
          target={element.data.target}
          rel={isExternal ? "noopener" : undefined}
        >
          {children}
          {element.data.url.includes("https://") && (
            <Box
              as="span"
              sx={{
                marginLeft: "0.5ch",
              }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
            </Box>
          )}
        </Link>
      );

    case Elements.preformatted:
      return (
        <Text
          as="pre"
          variant="article"
          sx={{
            marginBottom: 3,
            width: "100%",
            overflow: "auto",
          }}
        >
          {children}
        </Text>
      );

    case Elements.list:
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
          {children}
        </Box>
      );

    case Elements.listItem:
      return (
        <Box
          as="li"
          key={key}
          sx={{
            marginBottom: 2,
          }}
        >
          <style jsx global>{`
            .inline-code {
              font-family: monospace;
            }
          `}</style>
          <Text as="p" variant="article">
            {children}
          </Text>
        </Box>
      );

    default:
      return null;
  }
};
