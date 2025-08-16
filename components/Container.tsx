import { PropsWithChildren } from "react";
import { Box } from "theme-ui";

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
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
