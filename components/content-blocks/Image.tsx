import { Box, Image as ImageElement, Text } from "theme-ui";

const MAX_PHYSICAL_IMAGE_WIDTH = 800;

const addWidth = (url: string, width: number) => `${url}&w=${width}`;

export const Image: React.FC<{
  url: string;
  alt: string;
  dimensions: {
    width: number;
    height: number;
  };
}> = ({ url, alt, dimensions }) => {
  const retinaWidth = Math.min(dimensions.width, MAX_PHYSICAL_IMAGE_WIDTH * 2);
  const width = Math.max(retinaWidth / 2, MAX_PHYSICAL_IMAGE_WIDTH);

  return (
    <Box
      sx={{
        maxWidth: MAX_PHYSICAL_IMAGE_WIDTH,
      }}
    >
      <ImageElement
        sx={{
          display: "block",
          marginBottom: 2,
        }}
        width={dimensions.width}
        height={dimensions.height}
        src={addWidth(url, width)}
        srcSet={`${addWidth(url, width)} 1x, ${addWidth(url, retinaWidth)} 2x`}
        loading="lazy"
        alt={alt}
      />
      <Box
        sx={{
          borderLeft: "2px solid",
          borderColor: "text",
          paddingLeft: 2,
        }}
      >
        <Text as="cite" variant="body">
          {alt}
        </Text>
      </Box>
    </Box>
  );
};
