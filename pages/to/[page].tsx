import { GetServerSideProps } from "next";
import Error from "next/error";

type Page = {
  destination: string;
  title: string;
};

const pages: { [key: string]: Page } = {
  twitter: {
    destination: "https://www.twitter.com/chrishutchinson",
    title: "Twitter",
  },
  linkedin: {
    destination: "https://www.linkedin.com/in/chris-hutchinson-32b76237/",
    title: "LinkedIn",
  },
  github: {
    destination: "https://www.github.com/chrishutchinson",
    title: "GitHub",
  },
};

const GoTo = () => {
  return <Error statusCode={404} />;
};

export default GoTo;

export const getServerSideProps: GetServerSideProps<
  {},
  { page: string }
> = async ({ params }) => {
  const page = pages[params.page];

  if (!page) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      permanent: true,
      destination: page.destination,
    },
    props: {},
  };
};
