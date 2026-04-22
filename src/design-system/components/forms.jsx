"use client";

import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Check, ChevronsUpDown, Eye, EyeOff } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";

export const Input = ({
  placeholder,
  type = "text",
  icon: Icon,
  iconRight,
  value,
  onChange,
  disabled,
  error,
  size = "md",
  fullWidth = true,
  ...rest
}) => {
  const { c } = useTheme();
  const [focus, setFocus] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const sizes = {
    sm: { h: 30, px: 10, fs: 13 },
    md: { h: 36, px: 12, fs: 14 },
    lg: { h: 42, px: 14, fs: 15 },
  };
  const s = sizes[size];
  const actualType = type === "password" && showPw ? "text" : type;
  const borderColor = error ? c.e500 : focus ? c.p500 : c.n300;

  return (
    <div style={{ position: "relative", width: fullWidth ? "100%" : "auto" }}>
      {Icon && (
        <Icon
          size={15}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: c.n500,
            pointerEvents: "none",
          }}
        />
      )}
      <input
        type={actualType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...rest}
        style={{
          width: "100%",
          height: `${s.h}px`,
          padding: `0 ${type === "password" ? "36px" : iconRight ? "36px" : `${s.px}px`} 0 ${Icon ? "32px" : `${s.px}px`}`,
          fontSize: `${s.fs}px`,
          backgroundColor: c.n0,
          color: c.n900,
          border: `1px solid ${borderColor}`,
          borderRadius: tokens.radius.md,
          outline: "none",
          transition: "all 0.12s ease",
          boxShadow: focus ? `0 0 0 3px ${error ? c.e50 : c.p50}` : "none",
          fontFamily: "inherit",
          opacity: disabled ? 0.5 : 1,
          boxSizing: "border-box",
        }}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPw(!showPw)}
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: c.n500,
            padding: "4px",
            display: "flex",
          }}
        >
          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      )}
    </div>
  );
};

export const Textarea = ({
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  ...rest
}) => {
  const { c } = useTheme();
  const [focus, setFocus] = useState(false);
  const borderColor = error ? c.e500 : focus ? c.p500 : c.n300;

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...rest}
      style={{
        width: "100%",
        padding: "10px 12px",
        fontSize: "14px",
        backgroundColor: c.n0,
        color: c.n900,
        border: `1px solid ${borderColor}`,
        borderRadius: tokens.radius.md,
        outline: "none",
        resize: "vertical",
        transition: "all 0.12s ease",
        boxShadow: focus ? `0 0 0 3px ${error ? c.e50 : c.p50}` : "none",
        fontFamily: "inherit",
        boxSizing: "border-box",
        lineHeight: 1.5,
      }}
    />
  );
};

export const Field = ({ label, hint, error, required, children }) => {
  const { c } = useTheme();
  const generatedId = useId();
  const childId = isValidElement(children) ? children.props.id : undefined;
  const controlId = childId || generatedId;
  const messageId = hint || error ? `${controlId}-message` : undefined;
  const child = isValidElement(children)
    ? cloneElement(children, {
        id: childId || controlId,
        "aria-describedby":
          children.props["aria-describedby"] || messageId || undefined,
      })
    : children;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          htmlFor={controlId}
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: c.n900,
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {label}
          {required && <span style={{ color: c.e500 }}>*</span>}
        </label>
      )}
      {child}
      {(hint || error) && (
        <div
          id={messageId}
          style={{
            fontSize: "12px",
            color: error ? c.e500 : c.n600,
            lineHeight: 1.4,
          }}
        >
          {error || hint}
        </div>
      )}
    </div>
  );
};

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  ...rest
}) => {
  const { c } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        {...rest}
        style={{
          width: "100%",
          height: "36px",
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: c.n0,
          color: c.n900,
          border: `1px solid ${open ? c.p500 : c.n300}`,
          borderRadius: tokens.radius.md,
          fontSize: "14px",
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: open ? `0 0 0 3px ${c.p50}` : "none",
          transition: "all 0.12s ease",
        }}
      >
        <span style={{ color: selected ? c.n900 : c.n500 }}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronsUpDown size={14} color={c.n500} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            backgroundColor: c.n0,
            border: `1px solid ${c.n300}`,
            borderRadius: tokens.radius.md,
            boxShadow: tokens.shadow(c).lg,
            padding: "4px",
            zIndex: 50,
            maxHeight: "240px",
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = c.n100)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              style={{
                width: "100%",
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "transparent",
                border: "none",
                borderRadius: tokens.radius.sm,
                fontSize: "13px",
                color: c.n900,
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
              }}
            >
              {opt.label}
              {opt.value === value && <Check size={14} color={c.p500} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
