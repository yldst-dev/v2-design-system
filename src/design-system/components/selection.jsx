"use client";

import React from "react";
import { Check } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";

export const Checkbox = ({
  checked,
  onChange,
  label,
  description,
  disabled,
  id,
  name,
  value,
}) => {
  const { c } = useTheme();
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      />
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: tokens.radius.sm,
          border: `1.5px solid ${checked ? c.p500 : c.n400}`,
          backgroundColor: checked ? c.p500 : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.12s ease",
          flexShrink: 0,
          marginTop: "2px",
        }}
      >
        {checked && <Check size={11} strokeWidth={3} color="#FFFFFF" />}
      </div>
      {(label || description) && (
        <div>
          {label && (
            <div style={{ fontSize: "14px", color: c.n900, lineHeight: 1.4 }}>
              {label}
            </div>
          )}
          {description && (
            <div style={{ fontSize: "12px", color: c.n600, marginTop: "2px" }}>
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
};

export const Radio = ({
  checked,
  onChange,
  label,
  description,
  disabled,
  id,
  name,
  value,
}) => {
  const { c } = useTheme();
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange()}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      />
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          border: `1.5px solid ${checked ? c.p500 : c.n400}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.12s ease",
          flexShrink: 0,
          marginTop: "2px",
        }}
      >
        {checked && (
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: c.p500,
            }}
          />
        )}
      </div>
      {(label || description) && (
        <div>
          {label && (
            <div style={{ fontSize: "14px", color: c.n900, lineHeight: 1.4 }}>
              {label}
            </div>
          )}
          {description && (
            <div style={{ fontSize: "12px", color: c.n600, marginTop: "2px" }}>
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
};

export const Switch = ({ checked, onChange, size = "md", disabled }) => {
  const { c } = useTheme();
  const sizes = {
    sm: { w: 28, h: 16, k: 12 },
    md: { w: 36, h: 20, k: 16 },
    lg: { w: 44, h: 24, k: 20 },
  };
  const s = sizes[size];
  const handleToggle = (event) => {
    event.stopPropagation();
    if (!disabled) onChange(!checked);
  };
  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      style={{
        width: s.w,
        height: s.h,
        borderRadius: s.h / 2,
        backgroundColor: checked ? c.p500 : c.n400,
        border: "none",
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.2s ease",
        padding: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        style={{
          width: s.k,
          height: s.k,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          position: "absolute",
          top: "2px",
          left: checked ? `${s.w - s.k - 2}px` : "2px",
          transition: "left 0.2s ease",
          boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
        }}
      />
    </button>
  );
};

export const Slider = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
  const { c } = useTheme();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div
      style={{
        position: "relative",
        height: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: c.n200,
          borderRadius: "2px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          width: `${pct}%`,
          height: "4px",
          backgroundColor: c.p500,
          borderRadius: "2px",
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          opacity: 0,
          cursor: "pointer",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `calc(${pct}% - 8px)`,
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          border: `2px solid ${c.p500}`,
          boxShadow: tokens.shadow(c).sm,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
