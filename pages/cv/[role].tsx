import { GetStaticPaths, GetStaticProps } from "next";
import Error from "next/error";
import { Flex, Heading, Link, Text } from "theme-ui";
import { Container } from "../../components/Container";
import { Page } from "../../components/Page";
import { externalLinks } from "../../data/links";

export default function RolePage({ roleId }: { roleId: string | null }) {
  const role = roles.find((r) => r.id === roleId);

  if (!role) {
    return <Error statusCode={404} />;
  }

  return (
    <Page>
      <Container
        sx={{
          py: 3,
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Heading
            as="h1"
            sx={{
              fontSize: [2, 3],
            }}
          >
            {role.roleTitle} at {role.companyName}
          </Heading>
          <Text variant="label">{role.dates}</Text>

          <Text variant="article">{role.summary}</Text>
        </Flex>
      </Container>
    </Page>
  );
}

const roles = [
  {
    id: "learnerbly",
    companyName: "Learnerbly",
    roleTitle: "Head of Technology",
    dates: "2022 - 2025",
    summary: (
      <>
        <Link href={externalLinks.learnerbly}>Learnerbly</Link> is an learning
        and development marketplace aimed at knowledge businesses. My time was
        focused on improving product development processes, developing automated
        testing and infrastructure pipelines, reviewing and enhancing security
        practices, and supporting the development of the data platform.
      </>
    ),
  },
  {
    id: "made-tech",
    companyName: "Made Tech",
    roleTitle: "Lead Engineer",
    dates: "2021 - 2022",
    summary: (
      <>
        <Link href={externalLinks.madeTech}>Made Tech</Link> is a consultancy
        focused on public sector digital transformation. I was the Technical
        Lead for the Hackney Council account, working across a number of
        projects including their social care system, document management, and
        data platform.
      </>
    ),
  },
  {
    id: "the-times",
    companyName: "The Times",
    roleTitle: "Principal Engineer",
    dates: "2015 - 2021",
    summary: (
      <>
        <Link href={externalLinks.theTimes}>
          The Times and The Sunday Times
        </Link>{" "}
        are leading UK newspapers. I held a number of roles there, starting out
        in the newsroom building interactive, visual, and data-led stories,
        alongside developing internal tools to support editors. Later, I moved
        into the product and technology department as Principal Engineer,
        leading the development of the web and mobile apps, and launching Times
        Radio.
      </>
    ),
  },
  {
    id: "mystery-stealth-start-up",
    companyName: "A Stealth Start Up",
    roleTitle: "I do the tech stuff",
    dates: "2025 onwards",
    summary: (
      <>
        Coming soon! That said, if you're interested in working with me, and
        joining a really early-stage start up, I am hiring for a Data Engineer,
        a Forward Deployed Engineer, and Full Stack Software Engineer. If you're
        interested, please reach out by email at{" "}
        <Link href="mailto:hello@chrishutchinson.me">
          hello@chrishutchinson.me
        </Link>
        .
      </>
    ),
  },
];

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      roleId: params?.role || null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: roles.map((role) => `/cv/${role.id}`),
    fallback: false, // can also be true or 'blocking'
  };
};
