import { Box, Text, Image as ImageElement } from "theme-ui";

const addWidth = (url: string, width: number) => `${url}&w=${width}`;

export const Image: React.FC<{
  url: string;
  alt: string;
}> = ({ url, alt }) => {
  return (
    <Box
      sx={{
        marginBottom: 4,
        textAlign: "center",
        maxWidth: 1200,
      }}
    >
      <ImageElement
        src={addWidth(url, 1200)}
        srcSet={`${addWidth(url, 1200)} 1x, ${addWidth(url, 2400)} 2x`}
        loading="lazy"
        alt={alt}
      />
      <Text as="cite">{alt}</Text>
    </Box>
  );
};
