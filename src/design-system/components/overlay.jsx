"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";

export const Tooltip = ({ content, children, position = "top" }) => {
  const { c } = useTheme();
  const [show, setShow] = useState(false);
  const positions = {
    top: {
      bottom: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)",
    },
    bottom: {
      top: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)",
    },
    left: {
      right: "calc(100% + 6px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
    right: {
      left: "calc(100% + 6px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
  };
  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          style={{
            position: "absolute",
            ...positions[position],
            padding: "6px 9px",
            fontSize: "12px",
            backgroundColor: c.n900,
            color: c.n0,
            borderRadius: tokens.radius.sm,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            fontWeight: 500,
            zIndex: 100,
            boxShadow: tokens.shadow(c).md,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}) => {
  const { c } = useTheme();
  const sizes = { sm: 380, md: 480, lg: 640, xl: 800 };
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(28, 26, 23, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "20px",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: c.n0,
          borderRadius: tokens.radius["2xl"],
          maxWidth: sizes[size],
          width: "100%",
          border: `1px solid ${c.n300}`,
          boxShadow: tokens.shadow(c).xl,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {(title || onClose) && (
          <div
            style={{
              padding: "20px 24px",
              borderBottom: `1px solid ${c.n200}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <div>
              {title && (
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: c.n900,
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h3>
              )}
              {description && (
                <p
                  style={{
                    fontSize: "13px",
                    color: c.n600,
                    margin: "4px 0 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </p>
              )}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: c.n600,
                  padding: "4px",
                  display: "flex",
                  flexShrink: 0,
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {children}
        </div>
        {footer && (
          <div
            style={{
              padding: "16px 24px",
              borderTop: `1px solid ${c.n200}`,
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const Drawer = ({ isOpen, onClose, title, children, side = "right" }) => {
  const { c } = useTheme();
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(28, 26, 23, 0.4)",
        zIndex: 100,
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [side]: 0,
          width: "400px",
          maxWidth: "90vw",
          backgroundColor: c.n0,
          boxShadow: tokens.shadow(c).xl,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${c.n200}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 600,
              margin: 0,
              color: c.n900,
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: c.n600,
              padding: "4px",
              display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};
