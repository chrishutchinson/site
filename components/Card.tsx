import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Box, Heading, Link } from "theme-ui";

const getRadius = (index: number) => {
  const radii = [
    "255px 15px 225px 15px/15px 225px 15px 255px",
    "15px 120px 15px 200px/120px 15px 200px 15px",
    "100px 15px 225px 15px/15px 225px 15px 100px",
  ];

  if (!radii[index]) {
    return radii[0];
  }

  return radii[index];
};

export const Card: React.FC<{
  title: string;
  href: string;
  label?: JSX.Element;
  icon?: IconProp;
  radiusIndex?: number;
}> = ({ title, href, icon, label, radiusIndex = 0, children }) => {
  const radius = getRadius(radiusIndex);

  return (
    <Box
      sx={{
        overflow: "visible",
        width: [260, 300],
        marginRight: [4, 5],
        flexShrink: 0,
        ":last-child": {
          width: [260 + 32, 300 + 64],
          paddingRight: [4, 5],
        },
      }}
    >
      <Box
        sx={{
          boxShadow: "20px 28px 34px -26px hsla(0,0%,0%,.2)",
          borderRadius: radius,
          padding: ["30px 30px 20px", "40px 50px 20px"],
          border: radius ? "solid 3px #41403E" : "none",
          height: "100%",
        }}
      >
        {icon && (
          <Box
            sx={{
              marginBottom: 2,
              backgroundColor: "accent",
              color: "#FFF",
              display: "inline-flex",
              width: 55,
              height: 55,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <FontAwesomeIcon icon={icon} size="2x" />
          </Box>
        )}

        {label && (
          <Box
            sx={{
              marginBottom: 1,
            }}
          >
            {label}
          </Box>
        )}

        <Box>
          <Link
            href={href}
            sx={{
              color: "text",
              display: "inline",
            }}
          >
            <Heading
              as="h2"
              sx={{
                fontSize: [2, 3],
                display: "inline",
              }}
            >
              {title}
            </Heading>
          </Link>
        </Box>

        <Box
          sx={{
            color: "subtle",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
