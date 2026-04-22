"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";

export const Accordion = ({ items }) => {
  const { c } = useTheme();
  const [open, setOpen] = useState(null);
  return (
    <div
      style={{
        border: `1px solid ${c.n300}`,
        borderRadius: tokens.radius.md,
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            borderBottom: i < items.length - 1 ? `1px solid ${c.n200}` : "none",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: open === i ? c.n50 : "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              color: c.n900,
              fontFamily: "inherit",
              textAlign: "left",
              transition: "background 0.12s ease",
            }}
          >
            {item.title}
            <ChevronDown
              size={16}
              style={{
                transform: open === i ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease",
                color: c.n600,
              }}
            />
          </button>
          {open === i && (
            <div
              style={{
                padding: "0 16px 14px",
                fontSize: "13px",
                color: c.n700,
                lineHeight: 1.6,
              }}
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const Table = ({ columns, data, hoverable = true }) => {
  const { c } = useTheme();
  return (
    <div
      style={{
        overflow: "auto",
        border: `1px solid ${c.n300}`,
        borderRadius: tokens.radius.md,
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}
      >
        <thead style={{ backgroundColor: c.n50 }}>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  padding: "10px 14px",
                  textAlign: "left",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: c.n600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  borderBottom: `1px solid ${c.n300}`,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom:
                  i < data.length - 1 ? `1px solid ${c.n200}` : "none",
              }}
              onMouseEnter={(e) =>
                hoverable && (e.currentTarget.style.backgroundColor = c.n50)
              }
              onMouseLeave={(e) =>
                hoverable &&
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {columns.map((col, j) => (
                <td
                  key={j}
                  style={{
                    padding: "12px 14px",
                    color: c.n900,
                    verticalAlign: "middle",
                  }}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Divider = ({ label, vertical }) => {
  const { c } = useTheme();
  if (vertical)
    return (
      <div
        style={{ width: "1px", alignSelf: "stretch", backgroundColor: c.n200 }}
      />
    );
  if (label)
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ flex: 1, height: "1px", backgroundColor: c.n200 }} />
        <span style={{ fontSize: "12px", color: c.n500, fontWeight: 500 }}>
          {label}
        </span>
        <div style={{ flex: 1, height: "1px", backgroundColor: c.n200 }} />
      </div>
    );
  return <div style={{ height: "1px", backgroundColor: c.n200 }} />;
};
