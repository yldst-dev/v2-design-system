"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";
import { Badge } from "./display";

export const Tabs = ({ tabs, activeTab, onChange, variant = "underline" }) => {
  const { c } = useTheme();

  if (variant === "pill" || variant === "segmented") {
    return (
      <div
        style={{
          display: "inline-flex",
          gap: "2px",
          padding: "3px",
          backgroundColor: c.n100,
          borderRadius: tokens.radius.md,
        }}
      >
        {tabs.map((tab) => {
          const isStr = typeof tab === "string";
          const val = isStr ? tab : tab.value;
          const label = isStr ? tab : tab.label;
          const active = activeTab === val;
          return (
            <button
              key={val}
              onClick={() => onChange(val)}
              style={{
                padding: "6px 12px",
                fontSize: "13px",
                fontWeight: 500,
                backgroundColor: active ? c.n0 : "transparent",
                color: active ? c.n900 : c.n600,
                border: "none",
                borderRadius: tokens.radius.sm,
                cursor: "pointer",
                transition: "all 0.12s ease",
                fontFamily: "inherit",
                boxShadow: active ? tokens.shadow(c).xs : "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {!isStr && tab.icon && <tab.icon size={13} />}
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        borderBottom: `1px solid ${c.n300}`,
      }}
    >
      {tabs.map((tab) => {
        const isStr = typeof tab === "string";
        const val = isStr ? tab : tab.value;
        const label = isStr ? tab : tab.label;
        const active = activeTab === val;
        return (
          <button
            key={val}
            onClick={() => onChange(val)}
            style={{
              padding: "10px 0",
              fontSize: "14px",
              fontWeight: 500,
              backgroundColor: "transparent",
              color: active ? c.n900 : c.n600,
              border: "none",
              borderBottom: `2px solid ${active ? c.p500 : "transparent"}`,
              cursor: "pointer",
              transition: "all 0.12s ease",
              marginBottom: "-1px",
              fontFamily: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {!isStr && tab.icon && <tab.icon size={14} />}
            {label}
            {!isStr && tab.count != null && (
              <Badge size="sm" variant={active ? "primary" : "default"}>
                {tab.count}
              </Badge>
            )}
          </button>
        );
      })}
    </div>
  );
};

export const Menu = ({ trigger, items, align = "left" }) => {
  const { c } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            [align]: 0,
            minWidth: "180px",
            backgroundColor: c.n0,
            border: `1px solid ${c.n300}`,
            borderRadius: tokens.radius.md,
            boxShadow: tokens.shadow(c).lg,
            padding: "4px",
            zIndex: 50,
          }}
        >
          {items.map((item, i) =>
            item === "divider" ? (
              <div
                key={i}
                style={{
                  height: "1px",
                  backgroundColor: c.n200,
                  margin: "4px 0",
                }}
              />
            ) : (
              <button
                key={i}
                onClick={() => {
                  item.onClick && item.onClick();
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
                  padding: "7px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "transparent",
                  border: "none",
                  borderRadius: tokens.radius.sm,
                  fontSize: "13px",
                  color: item.danger ? c.e500 : c.n900,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                {item.icon && <item.icon size={14} />}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && <Kbd>{item.shortcut}</Kbd>}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export const Kbd = ({ children }) => {
  const { c } = useTheme();
  return (
    <kbd
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "18px",
        height: "18px",
        padding: "0 5px",
        fontSize: "11px",
        fontFamily: "ui-monospace, monospace",
        fontWeight: 500,
        backgroundColor: c.n100,
        color: c.n700,
        border: `1px solid ${c.n300}`,
        borderRadius: "4px",
      }}
    >
      {children}
    </kbd>
  );
};

export const Breadcrumb = ({ items }) => {
  const { c } = useTheme();
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
      }}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight size={13} color={c.n500} />}
          <a
            href="#"
            style={{
              color: i === items.length - 1 ? c.n900 : c.n600,
              textDecoration: "none",
              fontWeight: i === items.length - 1 ? 500 : 400,
            }}
          >
            {item}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
};

export const Pagination = ({ current, total, onChange }) => {
  const { c } = useTheme();
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1))
      pages.push(i);
    else if (i === current - 2 || i === current + 2) pages.push("...");
  }

  const PageBtn = ({ children, active, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: "32px",
        height: "32px",
        padding: "0 8px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: active ? c.n900 : "transparent",
        color: active ? c.n0 : c.n900,
        border: `1px solid ${active ? c.n900 : c.n300}`,
        borderRadius: tokens.radius.md,
        fontSize: "13px",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.12s ease",
      }}
    >
      {children}
    </button>
  );

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <PageBtn onClick={() => onChange(current - 1)} disabled={current === 1}>
        <ChevronLeft size={14} />
      </PageBtn>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} style={{ padding: "0 4px", color: c.n500 }}>
            ...
          </span>
        ) : (
          <PageBtn key={i} active={p === current} onClick={() => onChange(p)}>
            {p}
          </PageBtn>
        ),
      )}
      <PageBtn
        onClick={() => onChange(current + 1)}
        disabled={current === total}
      >
        <ChevronRight size={14} />
      </PageBtn>
    </div>
  );
};
