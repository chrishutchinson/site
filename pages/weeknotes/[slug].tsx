import { GetServerSideProps } from "next";

export default function Page() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    redirect: {
      destination: `/journal/entry/${Array.isArray(params?.slug) ? params.slug[0] : params?.slug}`,
      permanent: true,
    },
  };
};
