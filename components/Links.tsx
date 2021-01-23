import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Link } from "theme-ui";

const BigLink: React.FC<{ to: string }> = ({ to, children }) => {
  return (
    <Link
      href={to}
      sx={{
        display: "flex",
        borderBottom: "3px solid",
        padding: 1,
        fontWeight: "bold",
        borderColor: "primary",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s ease, color 0.15s ease",
        fontSize: 4,
        color: "text",
        ":hover": {
          backgroundColor: "primary",
          color: "background",
        },
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
        <BigLink to="/to/twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </BigLink>
        <BigLink to="/to/github">
          <FontAwesomeIcon icon={faGithub} />
        </BigLink>
        <BigLink to="/to/linkedin">
          <FontAwesomeIcon icon={faLinkedin} />
        </BigLink>
      </Flex>
    </Flex>
  );
};
