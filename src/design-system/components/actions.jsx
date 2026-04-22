"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  icon: Icon,
  iconRight: IconR,
  loading,
  disabled,
  fullWidth,
  onClick,
  type = "button",
}) => {
  const { c } = useTheme();
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const sizes = {
    xs: { h: 26, px: 10, fs: 12, gap: 4, iSize: 12 },
    sm: { h: 30, px: 12, fs: 13, gap: 6, iSize: 14 },
    md: { h: 36, px: 14, fs: 14, gap: 6, iSize: 15 },
    lg: { h: 42, px: 18, fs: 15, gap: 8, iSize: 16 },
  };

  const variants = {
    primary: {
      bg: c.p500,
      bgH: c.p600,
      bgA: c.p700,
      color: "#FFFFFF",
      border: "transparent",
    },
    secondary: {
      bg: c.n0,
      bgH: c.n100,
      bgA: c.n200,
      color: c.n900,
      border: c.n300,
    },
    outline: {
      bg: "transparent",
      bgH: c.n100,
      bgA: c.n200,
      color: c.n900,
      border: c.n300,
    },
    ghost: {
      bg: "transparent",
      bgH: c.n100,
      bgA: c.n200,
      color: c.n900,
      border: "transparent",
    },
    destructive: {
      bg: c.e500,
      bgH: c.e600,
      bgA: c.e600,
      color: "#FFFFFF",
      border: "transparent",
    },
    link: {
      bg: "transparent",
      bgH: "transparent",
      bgA: "transparent",
      color: c.p500,
      border: "transparent",
    },
  };

  const s = sizes[size];
  const v = variants[variant];
  const bg = disabled ? v.bg : active ? v.bgA : hover ? v.bgH : v.bg;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: `${s.gap}px`,
        height: `${s.h}px`,
        padding: `0 ${s.px}px`,
        fontSize: `${s.fs}px`,
        backgroundColor: bg,
        color: v.color,
        border: `1px solid ${v.border === "transparent" ? "transparent" : v.border}`,
        borderRadius: tokens.radius.md,
        fontWeight: 500,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.12s ease",
        fontFamily: "inherit",
        letterSpacing: "-0.01em",
        width: fullWidth ? "100%" : "auto",
        textDecoration: variant === "link" && hover ? "underline" : "none",
      }}
    >
      {loading ? (
        <Loader2 size={s.iSize} className="spin" />
      ) : (
        Icon && <Icon size={s.iSize} strokeWidth={2} />
      )}
      {children}
      {IconR && !loading && <IconR size={s.iSize} strokeWidth={2} />}
    </button>
  );
};

export const IconButton = ({
  icon: Icon,
  variant = "ghost",
  size = "md",
  onClick,
  label,
  disabled,
}) => {
  const { c } = useTheme();
  const [hover, setHover] = useState(false);
  const sizes = { sm: 28, md: 32, lg: 36 };
  const iconSizes = { sm: 14, md: 16, lg: 18 };
  const variants = {
    ghost: {
      bg: "transparent",
      bgH: c.n100,
      color: c.n700,
      border: "transparent",
    },
    secondary: { bg: c.n0, bgH: c.n100, color: c.n900, border: c.n300 },
    primary: {
      bg: c.p500,
      bgH: c.p600,
      color: "#FFFFFF",
      border: "transparent",
    },
  };
  const v = variants[variant];
  const s = sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: s,
        height: s,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: hover ? v.bgH : v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        borderRadius: tokens.radius.md,
        cursor: "pointer",
        transition: "all 0.12s ease",
        padding: 0,
      }}
    >
      <Icon size={iconSizes[size]} strokeWidth={2} />
    </button>
  );
};
