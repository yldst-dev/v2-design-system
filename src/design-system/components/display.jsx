"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  TrendingUp,
  X,
} from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";

export const Badge = ({
  variant = "default",
  size = "md",
  dot,
  children,
  onRemove,
}) => {
  const { c } = useTheme();
  const variants = {
    default: { bg: c.n200, color: c.n900 },
    primary: { bg: c.p100, color: c.p600 },
    success: { bg: c.s100, color: c.s600 },
    warning: { bg: c.w100, color: c.w600 },
    error: { bg: c.e100, color: c.e600 },
    info: { bg: c.i100, color: c.i600 },
    outline: { bg: "transparent", color: c.n700, border: c.n300 },
  };
  const sizes = { sm: { px: 6, py: 1, fs: 11 }, md: { px: 8, py: 2, fs: 12 } };
  const v = variants[variant];
  const s = sizes[size];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: `${s.py}px ${s.px}px`,
        fontSize: `${s.fs}px`,
        fontWeight: 500,
        backgroundColor: v.bg,
        color: v.color,
        borderRadius: tokens.radius.sm,
        border: v.border ? `1px solid ${v.border}` : "none",
        letterSpacing: "-0.01em",
      }}
    >
      {dot && (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: v.color,
          }}
        />
      )}
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
            padding: 0,
            display: "flex",
            marginLeft: "2px",
          }}
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
};

export const Card = ({
  children,
  interactive,
  style = {},
  onClick,
  padding = "20px",
}) => {
  const { c } = useTheme();
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: c.n0,
        border: `1px solid ${interactive && hover ? c.n400 : c.n300}`,
        borderRadius: tokens.radius.xl,
        padding,
        transition: "all 0.15s ease",
        cursor: interactive ? "pointer" : "default",
        boxShadow: interactive && hover ? tokens.shadow(c).md : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Alert = ({
  variant = "info",
  title,
  children,
  onClose,
  icon: CustomIcon,
}) => {
  const { c } = useTheme();
  const variants = {
    info: { bg: c.i50, border: c.i500, color: c.i500, icon: Info },
    success: { bg: c.s50, border: c.s500, color: c.s500, icon: CheckCircle2 },
    warning: { bg: c.w50, border: c.w500, color: c.w500, icon: AlertTriangle },
    error: { bg: c.e50, border: c.e500, color: c.e500, icon: AlertCircle },
  };
  const v = variants[variant];
  const Icon = CustomIcon || v.icon;
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "12px 14px",
        backgroundColor: v.bg,
        borderRadius: tokens.radius.md,
        border: `1px solid ${v.color}30`,
      }}
    >
      <Icon
        size={18}
        color={v.color}
        style={{ flexShrink: 0, marginTop: "1px" }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: c.n900,
              marginBottom: "2px",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </div>
        )}
        <div style={{ fontSize: "13px", color: c.n700, lineHeight: 1.5 }}>
          {children}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: c.n500,
            padding: 0,
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export const Banner = ({
  variant = "primary",
  children,
  icon: Icon,
  onClose,
  action,
}) => {
  const { c } = useTheme();
  const variants = {
    primary: { bg: c.p50, color: c.p600 },
    neutral: { bg: c.n100, color: c.n900 },
    success: { bg: c.s50, color: c.s600 },
    warning: { bg: c.w50, color: c.w600 },
  };
  const v = variants[variant];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 16px",
        backgroundColor: v.bg,
        borderRadius: tokens.radius.md,
      }}
    >
      {Icon && <Icon size={16} color={v.color} />}
      <div style={{ flex: 1, fontSize: "13px", color: c.n900 }}>{children}</div>
      {action}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: c.n600,
            padding: 0,
            display: "flex",
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export const Avatar = ({ initials, size = "md", color, status, src }) => {
  const { c } = useTheme();
  const sizes = { xs: 20, sm: 26, md: 32, lg: 40, xl: 56 };
  const fontSizes = { xs: 9, sm: 11, md: 12, lg: 15, xl: 20 };
  const statusSizes = { xs: 5, sm: 7, md: 8, lg: 10, xl: 12 };
  const s = sizes[size];
  const statusColors = {
    online: c.s500,
    away: c.w500,
    busy: c.e500,
    offline: c.n500,
  };

  return (
    <div style={{ position: "relative", width: s, height: s, flexShrink: 0 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundColor: color || c.p500,
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: fontSizes[size],
          fontWeight: 600,
          letterSpacing: "-0.02em",
          backgroundImage: src ? `url(${src})` : "none",
          backgroundSize: "cover",
        }}
      >
        {!src && initials}
      </div>
      {status && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: statusSizes[size],
            height: statusSizes[size],
            borderRadius: "50%",
            backgroundColor: statusColors[status],
            border: `2px solid ${c.n0}`,
          }}
        />
      )}
    </div>
  );
};

export const AvatarGroup = ({ avatars, max = 4, size = "md" }) => {
  const { c } = useTheme();
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;
  const sizes = { sm: 26, md: 32, lg: 40 };

  return (
    <div style={{ display: "flex" }}>
      {visible.map((a, i) => (
        <div
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : "-8px",
            border: `2px solid ${c.n0}`,
            borderRadius: "50%",
            position: "relative",
            zIndex: visible.length - i,
          }}
        >
          <Avatar {...a} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          style={{
            marginLeft: "-8px",
            border: `2px solid ${c.n0}`,
            borderRadius: "50%",
            width: sizes[size],
            height: sizes[size],
            backgroundColor: c.n200,
            color: c.n900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export const Stat = ({
  label,
  value,
  change,
  changeType = "positive",
  icon: Icon,
}) => {
  const { c } = useTheme();
  const changeColors = { positive: c.s500, negative: c.e500, neutral: c.n600 };
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: c.n600,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </div>
        {Icon && (
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: tokens.radius.md,
              backgroundColor: c.n100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={14} color={c.n700} />
          </div>
        )}
      </div>
      <div
        style={{
          fontSize: "26px",
          fontWeight: 600,
          color: c.n900,
          letterSpacing: "-0.025em",
          marginBottom: "6px",
        }}
      >
        {value}
      </div>
      {change && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            color: changeColors[changeType],
            fontWeight: 500,
          }}
        >
          {changeType === "positive" && <TrendingUp size={12} />}
          {change}
        </div>
      )}
    </Card>
  );
};

export const Spinner = ({ size = 16, color }) => {
  const { c } = useTheme();
  return <Loader2 size={size} className="spin" color={color || c.p500} />;
};
