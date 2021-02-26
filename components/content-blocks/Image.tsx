import { Box, Text, Image as ImageElement } from "theme-ui";

const addWidth = (url: string, width: number) => `${url}&w=${width}`;

export const Image: React.FC<{
  url: string;
  alt: string;
  dimensions: {
    width: number;
    height: number;
  };
}> = ({ url, alt, dimensions }) => {
  const retinaWidth = Math.min(dimensions.width, 2400);
  const width = retinaWidth / 2;

  return (
    <Box
      sx={{
        marginBottom: 4,
        maxWidth: 1200,
      }}
    >
      <ImageElement
        sx={{
          display: "block",
        }}
        width={dimensions.width}
        height={dimensions.height}
        src={addWidth(url, width)}
        srcSet={`${addWidth(url, width)} 1x, ${addWidth(url, retinaWidth)} 2x`}
        loading="lazy"
        alt={alt}
      />
      <Text as="cite">{alt}</Text>
    </Box>
  );
};
