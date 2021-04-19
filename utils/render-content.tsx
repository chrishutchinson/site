import ReactDOMServer from "react-dom/server";

import { PrismicBody } from "../api/prismic";
import { Content } from "../components/Content";

export const renderPrismicBodyAsHtml = (body: PrismicBody) => {
  return ReactDOMServer.renderToStaticMarkup(<Content body={body} />);
};
