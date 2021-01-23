import { Box } from "theme-ui";

export const Container: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        paddingLeft: [4, 5],
        paddingRight: [4, 5],
      }}
    >
      {children}
    </Box>
  );
};
