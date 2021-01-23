import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Link } from "theme-ui";

const BigLink: React.FC<{ to: string; name: string }> = ({
  to,
  name,
  children,
}) => {
  return (
    <Link
      rel="noopener noreferrer"
      href={to}
      aria-label={name}
      sx={{
        display: "flex",
        borderBottom: "3px solid",
        padding: 1,
        borderColor: "primary",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s ease, color 0.15s ease",
        fontSize: 4,
        color: "text",
      }}
    >
      {children}
    </Link>
  );
};

export const Links = () => {
  return (
    <Flex>
      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 150,
        }}
      >
        <BigLink to="/to/twitter" name="Chris Hutchinson's Twitter profile">
          <FontAwesomeIcon icon={faTwitter} />
        </BigLink>
        <BigLink to="/to/github" name="Chris Hutchinson's GitHub profile">
          <FontAwesomeIcon icon={faGithub} />
        </BigLink>
        <BigLink to="/to/linkedin" name="Chris Hutchinson's LinkedIn profile">
          <FontAwesomeIcon icon={faLinkedin} />
        </BigLink>
      </Flex>
    </Flex>
  );
};
