import React, { useCallback, useEffect, useState } from "react";

const registerCallback = (id: string, callback: (gist: any) => void) => {
  window[`gist_callback_${id}`] = callback;
};

export const GistEmbed: React.FC<{ gist: string }> = ({ gist }) => {
  const [loadingState, setLoadingState] = useState<
    "pending" | "complete" | "error"
  >("pending");
  const [gistData, setGistData] = useState(null);

  const handleGistError = useCallback(() => {
    setLoadingState("error");
  }, []);

  const handleGetGist = useCallback(async (gist: string) => {
    const id = gist.split("/")[1];

    if (!id) {
      throw new Error(`${gist} is not valid format`);
    }

    registerCallback(id, (data) => {
      setGistData({
        title: data.description,
        content: data.div.replace(/href=/g, 'target="_blank" href='),
      });

      if (document.head.innerHTML.indexOf(data.stylesheet) === -1) {
        let stylesheet = document.createElement("link");

        stylesheet.type = "text/css";
        stylesheet.rel = "stylesheet";
        stylesheet.href = data.stylesheet;

        document.head.appendChild(stylesheet);
      }

      setLoadingState("complete");
    });

    const script = document.createElement("script");

    const url = `https://gist.github.com/${gist}.json?callback=gist_callback_${id}`;

    script.type = "text/javascript";
    script.src = url;
    script.onerror = handleGistError;

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    (async () => {
      setLoadingState("pending");

      await handleGetGist(gist);
    })();
  }, [gist]);

  if (!gistData || loadingState !== "complete") {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: gistData.content }} />;
};
