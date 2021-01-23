import { Box } from "theme-ui";

export const Container: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        padding: [4, 5],
      }}
    >
      {children}
    </Box>
  );
};
