import { Box } from "theme-ui";
import { PrismicSlice } from "../../api/prismic";

export const Tweet: React.FC<{ slice: PrismicSlice<"tweet"> }> = ({
  slice,
}) => {
  if (!slice.primary.embed) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box dangerouslySetInnerHTML={{ __html: slice.primary.embed.html }} />
    </Box>
  );
};
