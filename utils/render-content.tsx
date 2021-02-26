import ReactDOMServer from "react-dom/server";

import { Post } from "../api/prismic";
import { Content } from "../components/Content";

export const renderPostAsHtml = (post: Post) => {
  return ReactDOMServer.renderToStaticMarkup(<Content post={post} />);
};
