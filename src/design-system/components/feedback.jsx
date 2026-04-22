"use client";

import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, FileText, Info, X } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";

export const Progress = ({
  value = 0,
  size = "md",
  variant = "primary",
  showLabel,
}) => {
  const { c } = useTheme();
  const heights = { sm: 4, md: 6, lg: 8 };
  const colors = {
    primary: c.p500,
    success: c.s500,
    warning: c.w500,
    error: c.e500,
  };
  return (
    <div>
      {showLabel && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: c.n600,
            marginBottom: "6px",
          }}
        >
          <span>Progress</span>
          <span>{value}%</span>
        </div>
      )}
      <div
        style={{
          width: "100%",
          height: heights[size],
          backgroundColor: c.n200,
          borderRadius: heights[size] / 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            backgroundColor: colors[variant],
            borderRadius: heights[size] / 2,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export const CircularProgress = ({ value = 0, size = 60, strokeWidth = 4, label }) => {
  const { c } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={c.n200}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={c.p500}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          fontWeight: 600,
          color: c.n900,
        }}
      >
        {label || `${value}%`}
      </div>
    </div>
  );
};

export const Skeleton = ({ width = "100%", height = "16px", circle, style = {} }) => {
  const { c } = useTheme();
  return (
    <div
      style={{
        width,
        height,
        borderRadius: circle ? "50%" : tokens.radius.sm,
        background: `linear-gradient(90deg, ${c.n200} 0%, ${c.n300} 50%, ${c.n200} 100%)`,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        ...style,
      }}
    />
  );
};

export const EmptyState = ({ icon: Icon = FileText, title, description, action }) => {
  const { c } = useTheme();
  return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: tokens.radius.lg,
          backgroundColor: c.n100,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "14px",
        }}
      >
        <Icon size={22} color={c.n600} />
      </div>
      <div
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: c.n900,
          marginBottom: "4px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            fontSize: "13px",
            color: c.n600,
            marginBottom: action ? "16px" : 0,
            maxWidth: "300px",
            margin: "0 auto 16px",
          }}
        >
          {description}
        </div>
      )}
      {action}
    </div>
  );
};

export const Toast = ({ toasts, onDismiss }) => {
  const { c } = useTheme();
  const variants = {
    success: { icon: CheckCircle2, color: c.s500 },
    error: { icon: AlertCircle, color: c.e500 },
    info: { icon: Info, color: c.i500 },
    warning: { icon: AlertTriangle, color: c.w500 },
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        zIndex: 200,
      }}
    >
      {toasts.map((t) => {
        const v = variants[t.variant || "info"];
        const Icon = v.icon;
        return (
          <div
            key={t.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "12px 14px",
              backgroundColor: c.n0,
              border: `1px solid ${c.n300}`,
              borderRadius: tokens.radius.md,
              boxShadow: tokens.shadow(c).lg,
              minWidth: "300px",
              maxWidth: "400px",
              animation: "slideIn 0.2s ease",
            }}
          >
            <Icon
              size={18}
              color={v.color}
              style={{ flexShrink: 0, marginTop: "1px" }}
            />
            <div style={{ flex: 1 }}>
              {t.title && (
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: c.n900,
                    marginBottom: "2px",
                  }}
                >
                  {t.title}
                </div>
              )}
              {t.description && (
                <div style={{ fontSize: "13px", color: c.n700 }}>
                  {t.description}
                </div>
              )}
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: c.n500,
                padding: 0,
                display: "flex",
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
