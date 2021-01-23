import { Flex } from "theme-ui";

export const Rail: React.FC = ({ children }) => {
  return (
    <Flex
      sx={{
        flexWrap: "nowrap",
        overflowX: "auto",
        paddingLeft: [4, 5],
        paddingBottom: 30,
        marginBottom: [4, 5],
      }}
    >
      {children}
    </Flex>
  );
};
