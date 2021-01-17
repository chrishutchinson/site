import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Link } from "theme-ui";

const LinkCircle: React.FC<{ to: string }> = ({ to, children }) => {
  return (
    <Link
      href={to}
      sx={{
        display: "flex",
        borderRadius: "50%",
        width: 40,
        height: 40,
        border: "2px solid",
        fontWeight: "bold",
        borderColor: "primary",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s ease, color 0.15s ease",
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
          justifyContent: "space-evenly",
          width: 200,
        }}
      >
        <LinkCircle to="/to/twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </LinkCircle>
        <LinkCircle to="/to/github">
          <FontAwesomeIcon icon={faGithub} />
        </LinkCircle>
        <LinkCircle to="/to/linkedin">
          <FontAwesomeIcon icon={faLinkedin} />
        </LinkCircle>
      </Flex>
    </Flex>
  );
};
