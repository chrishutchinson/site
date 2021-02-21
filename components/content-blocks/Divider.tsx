import { Box, Divider as ThemeUiDivider } from "theme-ui";

export const Divider = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: ["80%", 400],
          margin: "auto",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <ThemeUiDivider />
      </Box>
    </Box>
  );
};
