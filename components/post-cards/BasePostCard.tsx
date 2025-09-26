import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
} from "date-fns";
import NextLink from "next/link";
import { FunctionComponent } from "react";
import { Flex, Heading, Link, Text } from "theme-ui";

const getRelativeDate = (publishedDate: Date) => {
  const ONE_YEAR_IN_DAYS = 365;

  const days = differenceInDays(new Date(), publishedDate);

  if (days > ONE_YEAR_IN_DAYS) {
    const years = differenceInYears(new Date(), publishedDate);

    return `Over ${years} year${years === 1 ? "" : "s"} ago`;
  }

  if (days > 30) {
    const months = differenceInMonths(new Date(), publishedDate);

    return `Over ${months} month${months === 1 ? "" : "s"} ago`;
  }

  return format(new Date(publishedDate), "PPP 'at' p");
};

export const BasePostCard: FunctionComponent<{
  id: string;
  link: string;
  headline: string;
  publishedAt: Date;
  isExternal?: boolean;
}> = ({ id, link, headline, publishedAt, isExternal = false }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        gap: 1,
      }}
      key={id}
    >
      <NextLink href={link} passHref legacyBehavior>
        <Link>
          <Heading
            as="h2"
            sx={{
              fontSize: [2, 3],
            }}
          >
            {headline}
            {isExternal ? (
              <>
                {" "}
                <FontAwesomeIcon icon={faExternalLink} size="2xs" />
              </>
            ) : null}
          </Heading>
        </Link>
      </NextLink>
      <Text as="time" title={format(new Date(publishedAt), "PPP 'at' p")}>
        {getRelativeDate(new Date(publishedAt))}
      </Text>
    </Flex>
  );
};
