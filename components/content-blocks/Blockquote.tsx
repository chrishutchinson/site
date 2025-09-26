import { RichText } from "prismic-reactjs";
import { Box, Text } from "theme-ui";
import { PrismicSlice } from "../../api/prismic";
import { htmlSerializer } from "../../utils/html-serializer";
import { linkResolver } from "../../utils/link-resolver";

export const Blockquote: React.FC<{ slice: PrismicSlice<"blockquote"> }> = ({
  slice,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        marginBottom: 4,
      }}
    >
      <Text as="blockquote" variant="blockquote">
        <RichText
          render={slice.primary.text}
          linkResolver={linkResolver}
          htmlSerializer={htmlSerializer}
        />
      </Text>
    </Box>
  );
};
