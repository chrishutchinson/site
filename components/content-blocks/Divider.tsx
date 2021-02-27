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
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <ThemeUiDivider />
      </Box>
    </Box>
  );
};
