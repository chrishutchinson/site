import { RichText } from "prismic-reactjs";
import { PrismicSlice } from "../../api/prismic";
import { htmlSerializer } from "../../utils/html-serializer";
import { linkResolver } from "../../utils/link-resolver";

export const Text: React.FC<{ slice: PrismicSlice<"text"> }> = ({ slice }) => {
  return (
    <RichText
      render={slice.primary.text}
      linkResolver={linkResolver}
      htmlSerializer={htmlSerializer}
    />
  );
};
