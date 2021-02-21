import { Box, Flex, Text } from "theme-ui";
import { Container } from "./Container";

export const Rail: React.FC<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          marginBottom: 4,
          ":before": {
            content: "''",
            borderTop: "2px solid",
            borderBottom: "2px solid",
            borderColor: "primary",
            position: "absolute",
            top: "50%",
            right: 0,
            height: "4px",
            transform: "translateY(-4px)",
            width: "100%",
          },
        }}
      >
        <Container>
          {title && (
            <Text
              as="h2"
              variant="heading"
              sx={{
                display: "inline-block",
                backgroundColor: "background",
                transition: "background 0.15s ease, color 0.15s ease",
                position: "relative",
                zIndex: 10,
                paddingLeft: 2,
                paddingRight: 2,
              }}
            >
              {title}
            </Text>
          )}
        </Container>
      </Box>

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
    </>
  );
};
