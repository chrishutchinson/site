import { PropsWithChildren } from "react";
import { Box, Theme, ThemeUIStyleObject } from "theme-ui";

export const Container: React.FC<
  PropsWithChildren<{
    sx?: ThemeUIStyleObject<Theme<{}>>;
  }>
> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        px: 3,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
