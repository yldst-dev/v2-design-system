"use client";

import React from "react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";

export const Text = ({
  as: Tag = "p",
  size = "md",
  weight = "normal",
  color,
  children,
  style = {},
  ...rest
}) => {
  const { c } = useTheme();
  return (
    <Tag
      style={{
        fontSize: tokens.font[size],
        fontWeight: tokens.weight[weight],
        color: color || c.n900,
        margin: 0,
        lineHeight: 1.5,
        letterSpacing:
          size === "4xl" || size === "5xl"
            ? "-0.035em"
            : size === "3xl" || size === "2xl"
              ? "-0.025em"
              : size === "xl" || size === "lg"
                ? "-0.015em"
                : "-0.005em",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
