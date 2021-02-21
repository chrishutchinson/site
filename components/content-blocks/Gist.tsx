import { Box } from "theme-ui";
import { PrismicSlice } from "../../api/prismic";
import { GistEmbed } from "../GistEmbed";

export const Gist: React.FC<{ slice: PrismicSlice<"gist"> }> = ({ slice }) => {
  if (!slice.primary.embed) {
    return null;
  }

  const [gist] = slice.primary.embed.gist.split("#");

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <GistEmbed gist={gist} />
    </Box>
  );
};
