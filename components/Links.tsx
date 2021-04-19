import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Link } from "theme-ui";

const BigLink: React.FC<{
  to: string;
  name: string;
  size?: "small" | "large";
}> = ({ to, name, size = "small", children }) => {
  return (
    <Link
      rel="noopener noreferrer"
      href={to}
      aria-label={name}
      sx={{
        display: "flex",
        borderBottom: "2px solid",
        padding: size === "small" ? 0 : 1,
        borderColor: "primary",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s ease, color 0.15s ease",
        fontSize: size === "small" ? 3 : 4,
        color: "text",
      }}
    >
      {children}
    </Link>
  );
};

export const Links: React.FC<{
  size?: "small" | "large";
}> = ({ size = "large" }) => {
  return (
    <Flex>
      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: size === "small" ? 150 : 180,
        }}
      >
        <BigLink
          size={size}
          to="/to/twitter"
          name="Chris Hutchinson's Twitter profile"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </BigLink>
        <BigLink
          size={size}
          to="/to/github"
          name="Chris Hutchinson's GitHub profile"
        >
          <FontAwesomeIcon icon={faGithub} />
        </BigLink>
        <BigLink
          size={size}
          to="/to/linkedin"
          name="Chris Hutchinson's LinkedIn profile"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </BigLink>
        <BigLink
          size={size}
          to="/api/feed.xml"
          name="RSS XML feed for Chris Hutchinson's journal and weeknotes"
        >
          <FontAwesomeIcon icon={faRss} />
        </BigLink>
      </Flex>
    </Flex>
  );
};
