import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import {
  Sun,
  Moon,
  Search,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Home,
  Settings,
  User,
  Bell,
  Mail,
  FileText,
  BarChart3,
  Copy,
  Plus,
  Loader2,
  Heart,
  Palette,
  Type,
  Box,
  Layers,
  Sparkles,
  Menu,
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  Edit,
  MoreHorizontal,
  MoreVertical,
  Calendar,
  Clock,
  Filter,
  Star,
  Tag,
  Zap,
  Folder,
  Image,
  Hash,
  Grid,
  List,
  Command,
  ExternalLink,
  Share2,
  Bookmark,
  Lock,
  Globe,
  Users,
  Activity,
  TrendingUp,
  DollarSign,
  Package,
  MapPin,
  Phone,
  Send,
  Paperclip,
  Smile,
  Circle,
  Github,
  Twitter,
  Figma,
  Slack,
  ChevronsUpDown,
} from "lucide-react";

// ============================================================================
// DESIGN TOKENS
// ============================================================================
const palette = {
  light: {
    // Neutral scale (warm)
    n0: "#FFFFFF",
    n50: "#FAF9F6",
    n100: "#F3F1EC",
    n200: "#EDEAE3",
    n300: "#E5E1D8",
    n400: "#D4CEC1",
    n500: "#A39C8F",
    n600: "#6B655C",
    n700: "#4A453C",
    n800: "#2D2A24",
    n900: "#1C1A17",
    // Primary (warm terracotta)
    p50: "#FBF3EE",
    p100: "#F5E6DD",
    p200: "#EACBB8",
    p300: "#DBA78A",
    p400: "#CC8968",
    p500: "#C17B5C",
    p600: "#A86647",
    p700: "#8A5138",
    // Success
    s50: "#E8F0E8",
    s100: "#D4E4D4",
    s500: "#5C8A5C",
    s600: "#4A7049",
    // Warning
    w50: "#F7EFD6",
    w100: "#F0E3B8",
    w500: "#C49A3A",
    w600: "#A6812C",
    // Error
    e50: "#F5DDDB",
    e100: "#ECC2BF",
    e500: "#B85450",
    e600: "#9A4441",
    // Info
    i50: "#DDE5EE",
    i100: "#C4D2E0",
    i500: "#5C7A9A",
    i600: "#4A6380",
    // Shadow tint
    shadow: "139, 115, 85",
  },
  dark: {
    n0: "#0F0E0C",
    n50: "#1A1816",
    n100: "#232018",
    n200: "#2D2922",
    n300: "#3A362C",
    n400: "#4A453A",
    n500: "#6B655C",
    n600: "#A39C8F",
    n700: "#C4BDB0",
    n800: "#DCD5C7",
    n900: "#F0EBE0",
    p50: "#2E2219",
    p100: "#3D2C22",
    p200: "#5C4634",
    p300: "#8A6549",
    p400: "#B88670",
    p500: "#D89878",
    p600: "#E5AC8E",
    p700: "#F0C2A8",
    s50: "#1F2A1F",
    s100: "#2A3A2A",
    s500: "#8AB08A",
    s600: "#A0C4A0",
    w50: "#2E2818",
    w100: "#3D3520",
    w500: "#E0B85A",
    w600: "#EDC870",
    e50: "#2E1C1A",
    e100: "#3D2422",
    e500: "#D47976",
    e600: "#E08E8B",
    i50: "#1A242E",
    i100: "#22303D",
    i500: "#8AA8C4",
    i600: "#A0BBD4",
    shadow: "0, 0, 0",
  },
};

const tokens = {
  radius: {
    sm: "6px",
    md: "8px",
    lg: "10px",
    xl: "14px",
    "2xl": "20px",
    full: "9999px",
  },
  space: {
    0: "0",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
  },
  font: {
    xs: "11px",
    sm: "12px",
    base: "13px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "22px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
  },
  weight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  shadow: (c) => ({
    xs: `0 1px 2px rgba(${c.shadow}, 0.04)`,
    sm: `0 1px 3px rgba(${c.shadow}, 0.06), 0 1px 2px rgba(${c.shadow}, 0.04)`,
    md: `0 4px 8px rgba(${c.shadow}, 0.06), 0 2px 4px rgba(${c.shadow}, 0.04)`,
    lg: `0 12px 24px rgba(${c.shadow}, 0.08), 0 4px 8px rgba(${c.shadow}, 0.04)`,
    xl: `0 24px 48px rgba(${c.shadow}, 0.12), 0 8px 16px rgba(${c.shadow}, 0.06)`,
  }),
};

// ============================================================================
// THEME
// ============================================================================
const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

// ============================================================================
// PRIMITIVES
// ============================================================================

// Text
const Text = ({
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

// Button
const Button = ({
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

// IconButton
const IconButton = ({
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

// Input
const Input = ({
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

// Textarea
const Textarea = ({ placeholder, value, onChange, rows = 4, error }) => {
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

// Label / Field
const Field = ({ label, hint, error, required, children }) => {
  const { c } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
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
      {children}
      {(hint || error) && (
        <div
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

// Select
const Select = ({ options, value, onChange, placeholder = "Select..." }) => {
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
        onClick={() => setOpen(!open)}
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

// Checkbox
const Checkbox = ({ checked, onChange, label, description, disabled }) => {
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
      <div
        onClick={() => !disabled && onChange(!checked)}
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

// Radio
const Radio = ({ checked, onChange, label, description, disabled }) => {
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
      <div
        onClick={() => !disabled && onChange()}
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

// Switch
const Switch = ({ checked, onChange, size = "md", disabled }) => {
  const { c } = useTheme();
  const sizes = {
    sm: { w: 28, h: 16, k: 12 },
    md: { w: 36, h: 20, k: 16 },
    lg: { w: 44, h: 24, k: 20 },
  };
  const s = sizes[size];
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
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

// Slider
const Slider = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
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

// Badge
const Badge = ({
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

// Card
const Card = ({
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

// Alert
const Alert = ({
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

// Banner
const Banner = ({
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

// Avatar
const Avatar = ({ initials, size = "md", color, status, src }) => {
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

// AvatarGroup
const AvatarGroup = ({ avatars, max = 4, size = "md" }) => {
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

// Tabs
const Tabs = ({ tabs, activeTab, onChange, variant = "underline" }) => {
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

// Progress
const Progress = ({
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

// CircularProgress
const CircularProgress = ({ value = 0, size = 60, strokeWidth = 4, label }) => {
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

// Tooltip
const Tooltip = ({ content, children, position = "top" }) => {
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

// Modal
const Modal = ({
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

// Drawer
const Drawer = ({ isOpen, onClose, title, children, side = "right" }) => {
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

// Popover / Menu
const Menu = ({ trigger, items, align = "left" }) => {
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

// Kbd
const Kbd = ({ children }) => {
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

// Breadcrumb
const Breadcrumb = ({ items }) => {
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

// Pagination
const Pagination = ({ current, total, onChange }) => {
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

// Skeleton
const Skeleton = ({ width = "100%", height = "16px", circle, style = {} }) => {
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

// EmptyState
const EmptyState = ({ icon: Icon = FileText, title, description, action }) => {
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

// Accordion
const Accordion = ({ items }) => {
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

// Table
const Table = ({ columns, data, hoverable = true }) => {
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

// Toast
const Toast = ({ toasts, onDismiss }) => {
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

// Divider
const Divider = ({ label, vertical }) => {
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

// Stat
const Stat = ({
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

// Spinner
const Spinner = ({ size = 16, color }) => {
  const { c } = useTheme();
  return <Loader2 size={size} className="spin" color={color || c.p500} />;
};

// ============================================================================
// SHOWCASE APP
// ============================================================================
export default function DesignSystem() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  // States for demos
  const [cb1, setCb1] = useState(true);
  const [cb2, setCb2] = useState(false);
  const [cb3, setCb3] = useState(true);
  const [radio, setRadio] = useState("team");
  const [tg1, setTg1] = useState(true);
  const [tg2, setTg2] = useState(false);
  const [tab1, setTab1] = useState("Overview");
  const [tab2, setTab2] = useState("all");
  const [tab3, setTab3] = useState("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [slider, setSlider] = useState(42);
  const [select1, setSelect1] = useState("apple");
  const [page, setPage] = useState(3);
  const [inputVal, setInputVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  const c = isDark ? palette.dark : palette.light;

  const addToast = (t) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((x) => x.id !== id)),
      4000,
    );
  };

  const nav = [
    {
      g: "Getting Started",
      items: [
        { id: "intro", label: "Introduction", icon: Sparkles },
        { id: "foundation", label: "Foundation", icon: Palette },
        { id: "typography", label: "Typography", icon: Type },
      ],
    },
    {
      g: "Inputs",
      items: [
        { id: "buttons", label: "Buttons", icon: Box },
        { id: "form-inputs", label: "Form Inputs", icon: Edit },
        { id: "selection", label: "Selection", icon: Check },
      ],
    },
    {
      g: "Data Display",
      items: [
        { id: "badges", label: "Badges", icon: Tag },
        { id: "avatars", label: "Avatars", icon: User },
        { id: "cards", label: "Cards", icon: Layers },
        { id: "table", label: "Table", icon: Grid },
        { id: "stats", label: "Stats", icon: BarChart3 },
      ],
    },
    {
      g: "Navigation",
      items: [
        { id: "tabs", label: "Tabs", icon: Folder },
        { id: "breadcrumb", label: "Breadcrumb", icon: ChevronRight },
        { id: "pagination", label: "Pagination", icon: MoreHorizontal },
        { id: "menu", label: "Menu", icon: List },
      ],
    },
    {
      g: "Feedback",
      items: [
        { id: "alerts", label: "Alerts", icon: Bell },
        { id: "progress", label: "Progress", icon: Activity },
        { id: "skeleton", label: "Skeleton", icon: Loader2 },
        { id: "empty", label: "Empty State", icon: Box },
      ],
    },
    {
      g: "Overlays",
      items: [
        { id: "modal", label: "Modal", icon: Layers },
        { id: "drawer", label: "Drawer", icon: Menu },
        { id: "tooltip", label: "Tooltip", icon: Info },
        { id: "toast", label: "Toast", icon: Send },
      ],
    },
    {
      g: "Utility",
      items: [
        { id: "accordion", label: "Accordion", icon: ChevronDown },
        { id: "divider", label: "Divider", icon: MoreHorizontal },
        { id: "kbd", label: "Keyboard", icon: Command },
      ],
    },
    {
      g: "Patterns",
      items: [
        { id: "forms", label: "Forms", icon: FileText },
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
      ],
    },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Section wrapper
  const S = ({ id, title, description, children }) => (
    <section id={id} style={{ marginBottom: "64px", scrollMarginTop: "80px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Text
          as="h2"
          size="2xl"
          weight="semibold"
          color={c.n900}
          style={{ marginBottom: "6px" }}
        >
          {title}
        </Text>
        {description && (
          <Text size="md" color={c.n600} style={{ lineHeight: 1.6 }}>
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  );

  // Subsection
  const SS = ({ title, description, children }) => (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: c.n600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: description ? "4px" : 0,
          }}
        >
          {title}
        </div>
        {description && (
          <div style={{ fontSize: "13px", color: c.n600 }}>{description}</div>
        )}
      </div>
      {children}
    </div>
  );

  // Demo box
  const Demo = ({ children, padding = "20px" }) => (
    <div
      style={{
        padding,
        backgroundColor: c.n50,
        border: `1px solid ${c.n200}`,
        borderRadius: tokens.radius.lg,
      }}
    >
      {children}
    </div>
  );

  return (
    <ThemeCtx.Provider value={{ c, isDark, setIsDark }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .spin { animation: spin 1s linear infinite; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${c.n300}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${c.n400}; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: c.n50,
          color: c.n900,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
          transition: "background-color 0.3s ease, color 0.3s ease",
          display: "flex",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: "240px",
            borderRight: `1px solid ${c.n200}`,
            padding: "20px 14px",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            backgroundColor: c.n50,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 8px 16px",
              marginBottom: "8px",
              borderBottom: `1px solid ${c.n200}`,
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: tokens.radius.md,
                background: `linear-gradient(135deg, ${c.p400}, ${c.p600})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={15} color="#FFFFFF" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                V2 Design System
              </div>
              <div style={{ fontSize: "11px", color: c.n600 }}>
                v2.0 · Production
              </div>
            </div>
          </div>

          {nav.map((group, gi) => (
            <div key={gi} style={{ marginBottom: "16px" }}>
              <div
                style={{
                  padding: "6px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: c.n500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {group.g}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1px" }}
              >
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      onMouseEnter={(e) =>
                        !active &&
                        (e.currentTarget.style.backgroundColor = c.n100)
                      }
                      onMouseLeave={(e) =>
                        !active &&
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        padding: "6px 10px",
                        fontSize: "13px",
                        fontWeight: active ? 600 : 500,
                        color: active ? c.n900 : c.n700,
                        backgroundColor: active ? c.n100 : "transparent",
                        border: "none",
                        borderRadius: tokens.radius.sm,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.12s ease",
                        fontFamily: "inherit",
                      }}
                    >
                      <Icon size={14} strokeWidth={2} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Topbar */}
          <header
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: `${c.n50}ee`,
              backdropFilter: "blur(12px)",
              borderBottom: `1px solid ${c.n200}`,
              padding: "12px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 30,
            }}
          >
            <Breadcrumb items={["Design System", "Components", "All"]} />
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  padding: "6px 10px",
                  backgroundColor: c.n100,
                  borderRadius: tokens.radius.md,
                  fontSize: "12px",
                  color: c.n600,
                }}
              >
                <Command size={12} />
                <span>K</span>
              </div>
              <IconButton icon={Github} label="Github" />
              <IconButton icon={Figma} label="Figma" />
              <Divider vertical />
              <IconButton
                icon={isDark ? Sun : Moon}
                onClick={() => setIsDark(!isDark)}
                label="Toggle theme"
                variant="secondary"
              />
            </div>
          </header>

          <div style={{ padding: "48px 32px", maxWidth: "1040px" }}>
            {/* Introduction */}
            <section
              id="intro"
              style={{ marginBottom: "72px", scrollMarginTop: "80px" }}
            >
              <Badge variant="primary">v2.0.0 · April 2026</Badge>
              <Text
                as="h1"
                size="5xl"
                weight="semibold"
                style={{
                  marginTop: "16px",
                  marginBottom: "16px",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                }}
              >
                A production-ready
                <br />
                design system.
              </Text>
              <Text
                size="lg"
                color={c.n600}
                style={{
                  maxWidth: "580px",
                  marginBottom: "28px",
                  lineHeight: 1.6,
                }}
              >
                35+ fully accessible components with warm neutral aesthetics.
                Built for modern web apps — light/dark modes, extensive tokens,
                and drop-in React components.
              </Text>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Button icon={Zap}>Get started</Button>
                <Button variant="secondary" icon={Github}>
                  View on GitHub
                </Button>
                <Button variant="ghost" iconRight={ArrowUpRight}>
                  Documentation
                </Button>
              </div>

              <div
                style={{
                  marginTop: "40px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                }}
              >
                {[
                  { label: "Components", value: "35+", icon: Box },
                  { label: "Design tokens", value: "120+", icon: Palette },
                  { label: "Theme modes", value: "2", icon: Sun },
                  { label: "Bundle size", value: "12kb", icon: Package },
                ].map((item, i) => (
                  <Card key={i} padding="14px">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: tokens.radius.md,
                          backgroundColor: c.p50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <item.icon size={15} color={c.p500} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: c.n600,
                            fontWeight: 500,
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Foundation */}
            <S
              id="foundation"
              title="Foundation"
              description="디자인 토큰은 전체 시스템의 기초입니다. 색상, 간격, 반경, 그림자 등이 일관된 룰로 정의됩니다."
            >
              <SS title="Neutral scale (warm)">
                <Demo padding="16px">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(90px, 1fr))",
                      gap: "8px",
                    }}
                  >
                    {[
                      "n0",
                      "n50",
                      "n100",
                      "n200",
                      "n300",
                      "n400",
                      "n500",
                      "n600",
                      "n700",
                      "n800",
                      "n900",
                    ].map((k) => (
                      <div key={k}>
                        <div
                          style={{
                            height: "56px",
                            backgroundColor: c[k],
                            borderRadius: tokens.radius.md,
                            border: `1px solid ${c.n200}`,
                          }}
                        />
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            marginTop: "6px",
                            color: c.n900,
                          }}
                        >
                          {k}
                        </div>
                        <div
                          style={{
                            fontSize: "10px",
                            color: c.n600,
                            fontFamily: "ui-monospace, monospace",
                          }}
                        >
                          {c[k]}
                        </div>
                      </div>
                    ))}
                  </div>
                </Demo>
              </SS>

              <SS title="Primary (terracotta)">
                <Demo padding="16px">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(90px, 1fr))",
                      gap: "8px",
                    }}
                  >
                    {[
                      "p50",
                      "p100",
                      "p200",
                      "p300",
                      "p400",
                      "p500",
                      "p600",
                      "p700",
                    ].map((k) => (
                      <div key={k}>
                        <div
                          style={{
                            height: "56px",
                            backgroundColor: c[k],
                            borderRadius: tokens.radius.md,
                          }}
                        />
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            marginTop: "6px",
                            color: c.n900,
                          }}
                        >
                          {k}
                        </div>
                        <div
                          style={{
                            fontSize: "10px",
                            color: c.n600,
                            fontFamily: "ui-monospace, monospace",
                          }}
                        >
                          {c[k]}
                        </div>
                      </div>
                    ))}
                  </div>
                </Demo>
              </SS>

              <SS title="Semantic">
                <Demo padding="16px">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "12px",
                    }}
                  >
                    {[
                      {
                        name: "Success",
                        keys: ["s50", "s100", "s500", "s600"],
                      },
                      {
                        name: "Warning",
                        keys: ["w50", "w100", "w500", "w600"],
                      },
                      { name: "Error", keys: ["e50", "e100", "e500", "e600"] },
                      { name: "Info", keys: ["i50", "i100", "i500", "i600"] },
                    ].map((sem) => (
                      <div key={sem.name}>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            marginBottom: "6px",
                            color: c.n700,
                          }}
                        >
                          {sem.name}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            borderRadius: tokens.radius.md,
                            overflow: "hidden",
                          }}
                        >
                          {sem.keys.map((k) => (
                            <div
                              key={k}
                              style={{
                                flex: 1,
                                height: "40px",
                                backgroundColor: c[k],
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Demo>
              </SS>

              <SS title="Spacing scale">
                <Demo padding="16px">
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "flex-end",
                      flexWrap: "wrap",
                    }}
                  >
                    {Object.entries(tokens.space)
                      .filter(([k]) => k !== "0")
                      .map(([k, v]) => (
                        <div key={k} style={{ textAlign: "center" }}>
                          <div
                            style={{
                              width: v,
                              height: v,
                              backgroundColor: c.p500,
                              borderRadius: "2px",
                              marginBottom: "6px",
                            }}
                          />
                          <div
                            style={{
                              fontSize: "10px",
                              color: c.n600,
                              fontFamily: "ui-monospace, monospace",
                            }}
                          >
                            {k}
                          </div>
                          <div style={{ fontSize: "10px", color: c.n500 }}>
                            {v}
                          </div>
                        </div>
                      ))}
                  </div>
                </Demo>
              </SS>

              <SS title="Border radius">
                <Demo padding="16px">
                  <div
                    style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
                  >
                    {Object.entries(tokens.radius).map(([k, v]) => (
                      <div key={k} style={{ textAlign: "center" }}>
                        <div
                          style={{
                            width: "56px",
                            height: "56px",
                            backgroundColor: c.p100,
                            border: `1px solid ${c.p200}`,
                            borderRadius: v,
                          }}
                        />
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            marginTop: "6px",
                            color: c.n900,
                          }}
                        >
                          {k}
                        </div>
                        <div
                          style={{
                            fontSize: "10px",
                            color: c.n600,
                            fontFamily: "ui-monospace, monospace",
                          }}
                        >
                          {v}
                        </div>
                      </div>
                    ))}
                  </div>
                </Demo>
              </SS>

              <SS title="Shadows">
                <Demo padding="24px">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(120px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {Object.entries(tokens.shadow(c)).map(([k, v]) => (
                      <div key={k} style={{ textAlign: "center" }}>
                        <div
                          style={{
                            height: "64px",
                            backgroundColor: c.n0,
                            border: `1px solid ${c.n200}`,
                            borderRadius: tokens.radius.md,
                            boxShadow: v,
                          }}
                        />
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            marginTop: "8px",
                            color: c.n900,
                          }}
                        >
                          shadow.{k}
                        </div>
                      </div>
                    ))}
                  </div>
                </Demo>
              </SS>
            </S>

            {/* Typography */}
            <S
              id="typography"
              title="Typography"
              description="System UI 폰트 기반의 일관된 타이포그래피 스케일."
            >
              <Demo>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  {[
                    {
                      label: "Display 5xl",
                      size: "5xl",
                      weight: "semibold",
                      text: "Design with intention",
                    },
                    {
                      label: "Display 4xl",
                      size: "4xl",
                      weight: "semibold",
                      text: "Design with intention",
                    },
                    {
                      label: "Heading 3xl",
                      size: "3xl",
                      weight: "semibold",
                      text: "Design with intention",
                    },
                    {
                      label: "Heading 2xl",
                      size: "2xl",
                      weight: "semibold",
                      text: "Design with intention",
                    },
                    {
                      label: "Heading xl",
                      size: "xl",
                      weight: "semibold",
                      text: "Design with intention",
                    },
                    {
                      label: "Body lg",
                      size: "lg",
                      weight: "normal",
                      text: "The quick brown fox jumps over the lazy dog",
                    },
                    {
                      label: "Body md",
                      size: "md",
                      weight: "normal",
                      text: "The quick brown fox jumps over the lazy dog",
                    },
                    {
                      label: "Body base",
                      size: "base",
                      weight: "normal",
                      text: "The quick brown fox jumps over the lazy dog",
                    },
                    {
                      label: "Caption sm",
                      size: "sm",
                      weight: "medium",
                      text: "The quick brown fox",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 70px 1fr",
                        gap: "16px",
                        alignItems: "baseline",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          color: c.n600,
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: c.n500,
                          fontFamily: "ui-monospace, monospace",
                        }}
                      >
                        {tokens.font[item.size]}
                      </div>
                      <Text size={item.size} weight={item.weight}>
                        {item.text}
                      </Text>
                    </div>
                  ))}
                </div>
              </Demo>
            </S>

            {/* Buttons */}
            <S
              id="buttons"
              title="Buttons"
              description="6개 variant × 4개 size. 아이콘, 로딩 상태, disabled 상태를 모두 지원합니다."
            >
              <SS title="Variants">
                <Demo>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </Demo>
              </SS>
              <SS title="Sizes">
                <Demo>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button size="xs">Extra small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </Demo>
              </SS>
              <SS title="With icons">
                <Demo>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <Button icon={Plus}>New project</Button>
                    <Button variant="secondary" iconRight={ArrowRight}>
                      Continue
                    </Button>
                    <Button variant="outline" icon={Download}>
                      Download
                    </Button>
                    <Button variant="ghost" icon={Heart}>
                      Favorite
                    </Button>
                    <Button variant="destructive" icon={Trash2}>
                      Delete
                    </Button>
                  </div>
                </Demo>
              </SS>
              <SS title="States">
                <Demo>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant="secondary" disabled>
                      Secondary disabled
                    </Button>
                  </div>
                </Demo>
              </SS>
              <SS title="Icon buttons">
                <Demo>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <IconButton icon={Bell} label="Notifications" />
                    <IconButton
                      icon={Settings}
                      label="Settings"
                      variant="secondary"
                    />
                    <IconButton icon={Plus} label="Add" variant="primary" />
                    <IconButton icon={Edit} label="Edit" size="sm" />
                    <IconButton
                      icon={Share2}
                      label="Share"
                      size="lg"
                      variant="secondary"
                    />
                  </div>
                </Demo>
              </SS>
            </S>

            {/* Form Inputs */}
            <S
              id="form-inputs"
              title="Form Inputs"
              description="텍스트 입력, 패스워드, 검색 등 다양한 입력 필드."
            >
              <Demo>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <Field
                    label="Email"
                    required
                    hint="업무용 이메일을 사용해주세요."
                  >
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      icon={Mail}
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                    />
                  </Field>
                  <Field label="Password" required>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      icon={Lock}
                    />
                  </Field>
                  <Field label="Search">
                    <Input
                      placeholder="Search anything..."
                      icon={Search}
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                    />
                  </Field>
                  <Field
                    label="Username"
                    error="이 사용자명은 이미 사용 중입니다."
                  >
                    <Input placeholder="username" icon={User} error />
                  </Field>
                  <Field label="Sizes - Small">
                    <Input placeholder="Small input" size="sm" />
                  </Field>
                  <Field label="Sizes - Large">
                    <Input placeholder="Large input" size="lg" />
                  </Field>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Field
                      label="Description"
                      hint="최대 200자까지 입력 가능합니다."
                    >
                      <Textarea placeholder="Write something thoughtful..." />
                    </Field>
                  </div>
                  <Field label="Framework">
                    <Select
                      value={select1}
                      onChange={setSelect1}
                      options={[
                        { value: "apple", label: "Apple" },
                        { value: "banana", label: "Banana" },
                        { value: "cherry", label: "Cherry" },
                        { value: "date", label: "Date" },
                      ]}
                    />
                  </Field>
                  <Field label="Volume">
                    <div style={{ paddingTop: "10px" }}>
                      <Slider value={slider} onChange={setSlider} />
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: c.n600,
                        marginTop: "4px",
                      }}
                    >
                      {slider}%
                    </div>
                  </Field>
                </div>
              </Demo>
            </S>

            {/* Selection */}
            <S
              id="selection"
              title="Selection controls"
              description="Checkbox, Radio, Switch — 선택형 컨트롤."
            >
              <Demo>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: c.n600,
                        marginBottom: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Checkbox
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Checkbox
                        checked={cb1}
                        onChange={setCb1}
                        label="이메일 알림 받기"
                        description="중요한 업데이트와 주간 요약을 받습니다."
                      />
                      <Checkbox
                        checked={cb2}
                        onChange={setCb2}
                        label="마케팅 이메일"
                      />
                      <Checkbox
                        checked={cb3}
                        onChange={setCb3}
                        label="이용약관 동의"
                      />
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        label="Disabled option"
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: c.n600,
                        marginBottom: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Radio
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Radio
                        checked={radio === "personal"}
                        onChange={() => setRadio("personal")}
                        label="Personal"
                        description="개인 사용자용"
                      />
                      <Radio
                        checked={radio === "team"}
                        onChange={() => setRadio("team")}
                        label="Team"
                        description="소규모 팀에 적합"
                      />
                      <Radio
                        checked={radio === "enterprise"}
                        onChange={() => setRadio("enterprise")}
                        label="Enterprise"
                        description="대규모 조직용"
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: c.n600,
                        marginBottom: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Switch
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Switch checked={tg1} onChange={setTg1} />
                        <div>
                          <div style={{ fontSize: "14px" }}>공개 프로필</div>
                          <div style={{ fontSize: "12px", color: c.n600 }}>
                            다른 사용자가 볼 수 있습니다
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Switch checked={tg2} onChange={setTg2} size="sm" />
                        <span style={{ fontSize: "14px" }}>
                          2단계 인증 (Small)
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Switch checked={true} onChange={() => {}} size="lg" />
                        <span style={{ fontSize: "14px" }}>
                          자동 저장 (Large)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Demo>
            </S>

            {/* Badges */}
            <S
              id="badges"
              title="Badges"
              description="상태, 카테고리, 카운트 등을 표시."
            >
              <SS title="Variants">
                <Demo>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <Badge>Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </Demo>
              </SS>
              <SS title="With dot indicator">
                <Demo>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <Badge variant="success" dot>
                      Active
                    </Badge>
                    <Badge variant="warning" dot>
                      Pending
                    </Badge>
                    <Badge variant="error" dot>
                      Failed
                    </Badge>
                    <Badge variant="info" dot>
                      Processing
                    </Badge>
                  </div>
                </Demo>
              </SS>
              <SS title="Removable tags">
                <Demo>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <Badge variant="primary" onRemove={() => {}}>
                      design
                    </Badge>
                    <Badge variant="primary" onRemove={() => {}}>
                      typescript
                    </Badge>
                    <Badge variant="primary" onRemove={() => {}}>
                      react
                    </Badge>
                    <Badge variant="primary" onRemove={() => {}}>
                      ui-kit
                    </Badge>
                  </div>
                </Demo>
              </SS>
            </S>

            {/* Avatars */}
            <S
              id="avatars"
              title="Avatars"
              description="사용자 표시. 이니셜, 상태 인디케이터, 그룹 지원."
            >
              <SS title="Sizes">
                <Demo>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar initials="XS" size="xs" />
                    <Avatar initials="SM" size="sm" />
                    <Avatar initials="MD" size="md" />
                    <Avatar initials="LG" size="lg" color={c.i500} />
                    <Avatar initials="XL" size="xl" color={c.s500} />
                  </div>
                </Demo>
              </SS>
              <SS title="With status">
                <Demo>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar initials="JD" size="lg" status="online" />
                    <Avatar
                      initials="MK"
                      size="lg"
                      status="away"
                      color={c.i500}
                    />
                    <Avatar
                      initials="SL"
                      size="lg"
                      status="busy"
                      color={c.s500}
                    />
                    <Avatar
                      initials="AW"
                      size="lg"
                      status="offline"
                      color={c.n500}
                    />
                  </div>
                </Demo>
              </SS>
              <SS title="Avatar group">
                <Demo>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <AvatarGroup
                      avatars={[
                        { initials: "JD", color: c.p500 },
                        { initials: "MK", color: c.i500 },
                        { initials: "SL", color: c.s500 },
                        { initials: "AW", color: c.w500 },
                        { initials: "BR", color: c.e500 },
                        { initials: "CD" },
                        { initials: "EF" },
                      ]}
                      max={4}
                    />
                  </div>
                </Demo>
              </SS>
            </S>

            {/* Cards */}
            <S
              id="cards"
              title="Cards"
              description="컨텐츠 그룹을 위한 컨테이너."
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "12px",
                }}
              >
                <Card>
                  <Text
                    size="sm"
                    color={c.n600}
                    style={{ marginBottom: "4px" }}
                  >
                    Basic card
                  </Text>
                  <Text
                    size="md"
                    weight="medium"
                    style={{ marginBottom: "8px" }}
                  >
                    Simple container
                  </Text>
                  <Text size="base" color={c.n600}>
                    재사용 가능한 기본 카드 컴포넌트입니다.
                  </Text>
                </Card>

                <Card interactive>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "10px",
                    }}
                  >
                    <Avatar initials="JD" size="md" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", fontWeight: 600 }}>
                        Jane Doe
                      </div>
                      <div style={{ fontSize: "11px", color: c.n600 }}>
                        Product designer
                      </div>
                    </div>
                    <Badge variant="success" size="sm" dot>
                      Active
                    </Badge>
                  </div>
                  <div
                    style={{ fontSize: "13px", color: c.n600, lineHeight: 1.5 }}
                  >
                    Hover me — interactive card with lift effect.
                  </div>
                </Card>

                <Card>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                    }}
                  >
                    <Text size="sm" weight="semibold">
                      Project alpha
                    </Text>
                    <Menu
                      trigger={<IconButton icon={MoreHorizontal} size="sm" />}
                      items={[
                        { label: "Edit", icon: Edit },
                        { label: "Duplicate", icon: Copy },
                        "divider",
                        { label: "Delete", icon: Trash2, danger: true },
                      ]}
                      align="right"
                    />
                  </div>
                  <Progress value={72} showLabel />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "12px",
                      fontSize: "12px",
                      color: c.n600,
                    }}
                  >
                    <span>18 of 25 tasks</span>
                    <AvatarGroup
                      size="sm"
                      avatars={[
                        { initials: "A" },
                        { initials: "B", color: c.i500 },
                        { initials: "C", color: c.s500 },
                      ]}
                      max={3}
                    />
                  </div>
                </Card>
              </div>
            </S>

            {/* Table */}
            <S id="table" title="Table" description="구조화된 데이터 표시.">
              <Table
                columns={[
                  {
                    label: "User",
                    render: (r) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Avatar
                          initials={r.initials}
                          size="sm"
                          color={r.color}
                        />
                        <div>
                          <div style={{ fontWeight: 500 }}>{r.name}</div>
                          <div style={{ fontSize: "11px", color: c.n600 }}>
                            {r.email}
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    label: "Role",
                    render: (r) => <Badge variant="outline">{r.role}</Badge>,
                  },
                  {
                    label: "Status",
                    render: (r) => (
                      <Badge
                        variant={r.status === "Active" ? "success" : "default"}
                        dot
                      >
                        {r.status}
                      </Badge>
                    ),
                  },
                  { label: "Last active", key: "lastActive" },
                  {
                    label: "",
                    render: () => (
                      <IconButton icon={MoreHorizontal} size="sm" />
                    ),
                  },
                ]}
                data={[
                  {
                    initials: "JD",
                    name: "Jane Doe",
                    email: "jane@example.com",
                    role: "Admin",
                    status: "Active",
                    lastActive: "2 min ago",
                    color: c.p500,
                  },
                  {
                    initials: "MK",
                    name: "Mike Kim",
                    email: "mike@example.com",
                    role: "Editor",
                    status: "Active",
                    lastActive: "5 min ago",
                    color: c.i500,
                  },
                  {
                    initials: "SL",
                    name: "Sarah Lee",
                    email: "sarah@example.com",
                    role: "Viewer",
                    status: "Inactive",
                    lastActive: "3 days ago",
                    color: c.s500,
                  },
                  {
                    initials: "AW",
                    name: "Alex Wong",
                    email: "alex@example.com",
                    role: "Editor",
                    status: "Active",
                    lastActive: "1 hour ago",
                    color: c.w500,
                  },
                ]}
              />
            </S>

            {/* Stats */}
            <S
              id="stats"
              title="Stats"
              description="메트릭 카드 — KPI, 숫자 지표 표시."
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                }}
              >
                <Stat
                  label="Total revenue"
                  value="$48,293"
                  change="+12.5% vs last month"
                  icon={DollarSign}
                />
                <Stat
                  label="Active users"
                  value="2,847"
                  change="+8.2% vs last month"
                  icon={Users}
                />
                <Stat
                  label="Conversion rate"
                  value="3.42%"
                  change="-0.8% vs last month"
                  changeType="negative"
                  icon={TrendingUp}
                />
                <Stat
                  label="Avg. session"
                  value="4m 23s"
                  change="Same as before"
                  changeType="neutral"
                  icon={Clock}
                />
              </div>
            </S>

            {/* Tabs */}
            <S
              id="tabs"
              title="Tabs"
              description="3가지 variant: underline, pill, segmented."
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Demo>
                  <Tabs
                    tabs={[
                      { value: "Overview", label: "Overview", icon: Home },
                      {
                        value: "Analytics",
                        label: "Analytics",
                        icon: BarChart3,
                        count: 12,
                      },
                      { value: "Reports", label: "Reports", icon: FileText },
                      { value: "Settings", label: "Settings", icon: Settings },
                    ]}
                    activeTab={tab1}
                    onChange={setTab1}
                  />
                </Demo>
                <Demo>
                  <Tabs
                    variant="pill"
                    tabs={[
                      { value: "all", label: "All" },
                      { value: "active", label: "Active" },
                      { value: "archived", label: "Archived" },
                    ]}
                    activeTab={tab2}
                    onChange={setTab2}
                  />
                </Demo>
                <Demo>
                  <Tabs
                    variant="segmented"
                    tabs={[
                      { value: "grid", label: "Grid", icon: Grid },
                      { value: "list", label: "List", icon: List },
                    ]}
                    activeTab={tab3}
                    onChange={setTab3}
                  />
                </Demo>
              </div>
            </S>

            {/* Breadcrumb */}
            <S
              id="breadcrumb"
              title="Breadcrumb"
              description="계층적 네비게이션."
            >
              <Demo>
                <Breadcrumb
                  items={["Home", "Projects", "Design system", "Components"]}
                />
              </Demo>
            </S>

            {/* Pagination */}
            <S id="pagination" title="Pagination" description="페이지 이동.">
              <Demo>
                <Pagination current={page} total={10} onChange={setPage} />
              </Demo>
            </S>

            {/* Menu */}
            <S
              id="menu"
              title="Menu"
              description="드롭다운 메뉴 / 컨텍스트 메뉴."
            >
              <Demo>
                <div style={{ display: "flex", gap: "12px" }}>
                  <Menu
                    trigger={
                      <Button variant="secondary" iconRight={ChevronDown}>
                        Actions
                      </Button>
                    }
                    items={[
                      { label: "New file", icon: FileText, shortcut: "⌘N" },
                      { label: "New folder", icon: Folder, shortcut: "⌘⇧N" },
                      "divider",
                      { label: "Share", icon: Share2 },
                      { label: "Download", icon: Download },
                      "divider",
                      {
                        label: "Delete",
                        icon: Trash2,
                        danger: true,
                        shortcut: "⌫",
                      },
                    ]}
                  />
                  <Menu
                    trigger={
                      <IconButton icon={MoreHorizontal} variant="secondary" />
                    }
                    items={[
                      { label: "Edit", icon: Edit },
                      { label: "Duplicate", icon: Copy },
                      { label: "Archive", icon: Bookmark },
                    ]}
                    align="right"
                  />
                </div>
              </Demo>
            </S>

            {/* Alerts */}
            <S
              id="alerts"
              title="Alerts"
              description="인라인 메시지 — 정보, 성공, 경고, 오류."
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Alert variant="info" title="New version available">
                  v2.1.0에서 새로운 컴포넌트가 추가되었습니다.
                </Alert>
                <Alert variant="success" title="Changes saved">
                  모든 변경사항이 성공적으로 저장되었습니다.
                </Alert>
                <Alert variant="warning" title="Action required">
                  구독이 7일 후 만료됩니다. 갱신해주세요.
                </Alert>
                <Alert variant="error" title="Something went wrong">
                  파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.
                </Alert>
                <Banner
                  variant="primary"
                  icon={Zap}
                  action={
                    <Button size="sm" variant="ghost">
                      Upgrade
                    </Button>
                  }
                  onClose={() => {}}
                >
                  Pro 플랜으로 업그레이드하고 프리미엄 기능을 이용하세요.
                </Banner>
              </div>
            </S>

            {/* Progress */}
            <S
              id="progress"
              title="Progress"
              description="Linear & circular progress indicators."
            >
              <SS title="Linear">
                <Demo>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      maxWidth: "400px",
                    }}
                  >
                    <Progress value={30} />
                    <Progress value={60} variant="success" />
                    <Progress
                      value={75}
                      variant="warning"
                      size="lg"
                      showLabel
                    />
                    <Progress value={45} variant="error" size="sm" />
                  </div>
                </Demo>
              </SS>
              <SS title="Circular">
                <Demo>
                  <div
                    style={{
                      display: "flex",
                      gap: "24px",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress value={25} />
                    <CircularProgress value={50} size={72} />
                    <CircularProgress value={75} size={84} strokeWidth={6} />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Spinner />
                      <Text size="base" color={c.n600}>
                        Loading...
                      </Text>
                    </div>
                  </div>
                </Demo>
              </SS>
            </S>

            {/* Skeleton */}
            <S id="skeleton" title="Skeleton" description="로딩 플레이스홀더.">
              <Demo>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Skeleton width="60%" height="20px" />
                    <Skeleton height="14px" />
                    <Skeleton height="14px" />
                    <Skeleton width="80%" height="14px" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <Skeleton width="40px" height="40px" circle />
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <Skeleton width="40%" height="14px" />
                      <Skeleton height="12px" />
                      <Skeleton width="70%" height="12px" />
                    </div>
                  </div>
                </div>
              </Demo>
            </S>

            {/* Empty state */}
            <S
              id="empty"
              title="Empty State"
              description="데이터가 없을 때 표시할 상태."
            >
              <Card padding="0">
                <EmptyState
                  icon={FileText}
                  title="아직 프로젝트가 없습니다"
                  description="첫 번째 프로젝트를 만들어 시작해보세요. 템플릿도 준비되어 있어요."
                  action={<Button icon={Plus}>Create project</Button>}
                />
              </Card>
            </S>

            {/* Modal */}
            <S id="modal" title="Modal" description="오버레이 다이얼로그.">
              <Demo>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button onClick={() => setModalOpen(true)} icon={Sparkles}>
                    Open modal
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setConfirmOpen(true)}
                    icon={Trash2}
                  >
                    Delete item
                  </Button>
                </div>
              </Demo>
              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="새 프로젝트 만들기"
                description="프로젝트의 기본 정보를 입력해주세요."
                size="md"
                footer={
                  <>
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setModalOpen(false);
                        addToast({
                          variant: "success",
                          title: "프로젝트 생성 완료",
                          description: "My awesome project가 생성되었습니다.",
                        });
                      }}
                    >
                      Create
                    </Button>
                  </>
                }
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <Field label="Project name" required>
                    <Input placeholder="My awesome project" />
                  </Field>
                  <Field label="Description">
                    <Textarea
                      placeholder="What is this project about?"
                      rows={3}
                    />
                  </Field>
                  <Field label="Visibility">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Radio
                        checked
                        onChange={() => {}}
                        label="Private"
                        description="초대받은 사람만 볼 수 있습니다"
                      />
                      <Radio
                        checked={false}
                        onChange={() => {}}
                        label="Public"
                        description="모든 사람이 볼 수 있습니다"
                      />
                    </div>
                  </Field>
                </div>
              </Modal>
              <Modal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                title="정말 삭제하시겠어요?"
                description="이 작업은 되돌릴 수 없습니다. 항목이 영구적으로 삭제됩니다."
                size="sm"
                footer={
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setConfirmOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setConfirmOpen(false);
                        addToast({
                          variant: "error",
                          title: "삭제됨",
                          description: "항목이 삭제되었습니다.",
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </>
                }
              ></Modal>
            </S>

            {/* Drawer */}
            <S
              id="drawer"
              title="Drawer"
              description="사이드 패널 — 설정, 상세 정보 등."
            >
              <Demo>
                <Button onClick={() => setDrawerOpen(true)} icon={Menu}>
                  Open drawer
                </Button>
              </Demo>
              <Drawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="Settings"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Field label="Display name">
                    <Input defaultValue="Jane Doe" />
                  </Field>
                  <Field label="Email">
                    <Input defaultValue="jane@example.com" icon={Mail} />
                  </Field>
                  <Divider />
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        marginBottom: "12px",
                      }}
                    >
                      Preferences
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "14px" }}>
                            Email notifications
                          </div>
                          <div style={{ fontSize: "12px", color: c.n600 }}>
                            업데이트 이메일 받기
                          </div>
                        </div>
                        <Switch checked={true} onChange={() => {}} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "14px" }}>
                            Marketing emails
                          </div>
                          <div style={{ fontSize: "12px", color: c.n600 }}>
                            마케팅 정보 받기
                          </div>
                        </div>
                        <Switch checked={false} onChange={() => {}} />
                      </div>
                    </div>
                  </div>
                </div>
              </Drawer>
            </S>

            {/* Tooltip */}
            <S
              id="tooltip"
              title="Tooltip"
              description="호버 시 표시되는 힌트."
            >
              <Demo>
                <div
                  style={{ display: "flex", gap: "12px", padding: "20px 0" }}
                >
                  <Tooltip content="Copy to clipboard">
                    <IconButton icon={Copy} variant="secondary" />
                  </Tooltip>
                  <Tooltip content="Add to favorites" position="bottom">
                    <IconButton icon={Heart} variant="secondary" />
                  </Tooltip>
                  <Tooltip content="Share this" position="right">
                    <IconButton icon={Share2} variant="secondary" />
                  </Tooltip>
                  <Tooltip content="More options" position="left">
                    <IconButton icon={MoreHorizontal} variant="secondary" />
                  </Tooltip>
                </div>
              </Demo>
            </S>

            {/* Toast */}
            <S id="toast" title="Toast" description="임시 알림 메시지.">
              <Demo>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      addToast({
                        variant: "info",
                        title: "Heads up!",
                        description: "새로운 업데이트가 있습니다.",
                      })
                    }
                  >
                    Info toast
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      addToast({
                        variant: "success",
                        title: "Success!",
                        description: "저장이 완료되었습니다.",
                      })
                    }
                  >
                    Success
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      addToast({
                        variant: "warning",
                        title: "Warning",
                        description: "주의가 필요합니다.",
                      })
                    }
                  >
                    Warning
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      addToast({
                        variant: "error",
                        title: "Error",
                        description: "문제가 발생했습니다.",
                      })
                    }
                  >
                    Error
                  </Button>
                </div>
              </Demo>
            </S>

            {/* Accordion */}
            <S
              id="accordion"
              title="Accordion"
              description="접을 수 있는 컨텐츠."
            >
              <Accordion
                items={[
                  {
                    title: "이 디자인 시스템은 어떻게 사용하나요?",
                    content:
                      "각 컴포넌트는 독립적으로 사용 가능하며, ThemeCtx를 통해 테마를 주입하면 됩니다. 모든 컴포넌트는 tree-shakeable합니다.",
                  },
                  {
                    title: "다크 모드는 어떻게 지원되나요?",
                    content:
                      "ThemeCtx의 isDark 상태를 토글하면 palette.light 또는 palette.dark가 자동으로 적용됩니다. localStorage와 연동하여 유저 선호를 저장할 수 있습니다.",
                  },
                  {
                    title: "커스텀 테마를 만들 수 있나요?",
                    content:
                      "네. palette 객체를 복사해서 원하는 색상으로 커스터마이징하면 됩니다. 모든 컴포넌트는 토큰 기반으로 스타일링되어 있어 일관성이 유지됩니다.",
                  },
                  {
                    title: "접근성은 어떻게 보장되나요?",
                    content:
                      "WCAG AA 기준 대비비 준수, 키보드 네비게이션, aria-label 등을 기본 지원합니다. 스크린 리더 호환성도 테스트되어 있습니다.",
                  },
                ]}
              />
            </S>

            {/* Divider */}
            <S id="divider" title="Divider" description="섹션 구분.">
              <Demo>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Divider />
                  <Divider label="OR" />
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      height: "40px",
                    }}
                  >
                    <span>Left</span>
                    <Divider vertical />
                    <span>Middle</span>
                    <Divider vertical />
                    <span>Right</span>
                  </div>
                </div>
              </Demo>
            </S>

            {/* Kbd */}
            <S id="kbd" title="Keyboard" description="키보드 키 표시.">
              <Demo>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                    <span
                      style={{
                        fontSize: "13px",
                        color: c.n600,
                        marginLeft: "4px",
                      }}
                    >
                      Open search
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <Kbd>⌘</Kbd>
                    <Kbd>⇧</Kbd>
                    <Kbd>P</Kbd>
                    <span
                      style={{
                        fontSize: "13px",
                        color: c.n600,
                        marginLeft: "4px",
                      }}
                    >
                      Command palette
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <Kbd>Esc</Kbd>
                    <span
                      style={{
                        fontSize: "13px",
                        color: c.n600,
                        marginLeft: "4px",
                      }}
                    >
                      Close
                    </span>
                  </div>
                </div>
              </Demo>
            </S>

            {/* Forms pattern */}
            <S
              id="forms"
              title="Form Pattern"
              description="실제 앱에서 폼을 구성하는 예시."
            >
              <Card padding="28px">
                <div style={{ marginBottom: "20px" }}>
                  <Text
                    as="h3"
                    size="xl"
                    weight="semibold"
                    style={{ marginBottom: "4px" }}
                  >
                    Account settings
                  </Text>
                  <Text size="base" color={c.n600}>
                    프로필 정보를 업데이트하세요.
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar initials="JD" size="xl" color={c.p500} />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginBottom: "6px",
                        }}
                      >
                        <Button size="sm" variant="secondary" icon={Upload}>
                          Upload photo
                        </Button>
                        <Button size="sm" variant="ghost">
                          Remove
                        </Button>
                      </div>
                      <Text size="sm" color={c.n600}>
                        JPG, PNG — 최대 2MB
                      </Text>
                    </div>
                  </div>
                  <Divider />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "14px",
                    }}
                  >
                    <Field label="First name" required>
                      <Input placeholder="Jane" />
                    </Field>
                    <Field label="Last name" required>
                      <Input placeholder="Doe" />
                    </Field>
                  </div>
                  <Field label="Email" required>
                    <Input placeholder="jane@example.com" icon={Mail} />
                  </Field>
                  <Field
                    label="Bio"
                    hint="간단한 자기소개를 작성해주세요 (최대 160자)."
                  >
                    <Textarea placeholder="Tell us about yourself..." />
                  </Field>
                  <Field label="Timezone">
                    <Select
                      value="kr"
                      onChange={() => {}}
                      options={[
                        { value: "kr", label: "🇰🇷 Seoul (UTC+9)" },
                        { value: "us", label: "🇺🇸 New York (UTC-5)" },
                        { value: "uk", label: "🇬🇧 London (UTC+0)" },
                      ]}
                    />
                  </Field>
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "8px",
                    }}
                  >
                    <Button variant="ghost">Cancel</Button>
                    <Button>Save changes</Button>
                  </div>
                </div>
              </Card>
            </S>

            {/* Dashboard pattern */}
            <S
              id="dashboard"
              title="Dashboard Pattern"
              description="실제 대시보드 구성 예시."
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <Text
                      as="h3"
                      size="xl"
                      weight="semibold"
                      style={{ marginBottom: "4px" }}
                    >
                      Overview
                    </Text>
                    <Text size="base" color={c.n600}>
                      지난 30일 요약
                    </Text>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button variant="secondary" icon={Filter} size="sm">
                      Filter
                    </Button>
                    <Button variant="secondary" icon={Download} size="sm">
                      Export
                    </Button>
                    <Button icon={Plus} size="sm">
                      New report
                    </Button>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <Stat
                    label="Revenue"
                    value="$48.2K"
                    change="+12.5%"
                    icon={DollarSign}
                  />
                  <Stat
                    label="Users"
                    value="2,847"
                    change="+8.2%"
                    icon={Users}
                  />
                  <Stat
                    label="Orders"
                    value="342"
                    change="-2.4%"
                    changeType="negative"
                    icon={Package}
                  />
                  <Stat
                    label="Conversion"
                    value="3.42%"
                    change="+0.8%"
                    icon={TrendingUp}
                  />
                </div>

                <Card>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Text size="md" weight="semibold">
                      Recent activity
                    </Text>
                    <Tabs
                      variant="pill"
                      tabs={["Today", "Week", "Month"]}
                      activeTab="Week"
                      onChange={() => {}}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {[
                      {
                        user: "Jane Doe",
                        action: "created a new project",
                        time: "2 min ago",
                        initials: "JD",
                        color: c.p500,
                      },
                      {
                        user: "Mike Kim",
                        action: "commented on Design Review",
                        time: "15 min ago",
                        initials: "MK",
                        color: c.i500,
                      },
                      {
                        user: "Sarah Lee",
                        action: "completed 3 tasks",
                        time: "1 hour ago",
                        initials: "SL",
                        color: c.s500,
                      },
                      {
                        user: "Alex Wong",
                        action: "uploaded 5 files",
                        time: "3 hours ago",
                        initials: "AW",
                        color: c.w500,
                      },
                    ].map((a, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "10px",
                          borderRadius: tokens.radius.md,
                          backgroundColor: c.n50,
                        }}
                      >
                        <Avatar
                          initials={a.initials}
                          size="md"
                          color={a.color}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "13px" }}>
                            <span style={{ fontWeight: 600 }}>{a.user}</span>{" "}
                            <span style={{ color: c.n700 }}>{a.action}</span>
                          </div>
                          <div style={{ fontSize: "11px", color: c.n500 }}>
                            {a.time}
                          </div>
                        </div>
                        <IconButton icon={ChevronRight} size="sm" />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </S>

            {/* Footer */}
            <div
              style={{
                marginTop: "48px",
                paddingTop: "32px",
                borderTop: `1px solid ${c.n200}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <Text
                  size="base"
                  weight="semibold"
                  style={{ marginBottom: "2px" }}
                >
                  V2 Design System
                </Text>
                <Text size="sm" color={c.n600}>
                  v2.0.0 · Built with React · Production ready
                </Text>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <IconButton icon={Github} />
                <IconButton icon={Figma} />
                <IconButton icon={Twitter} />
                <IconButton icon={Slack} />
              </div>
            </div>
          </div>
        </main>

        <Toast
          toasts={toasts}
          onDismiss={(id) =>
            setToasts((prev) => prev.filter((x) => x.id !== id))
          }
        />
      </div>
    </ThemeCtx.Provider>
  );
}
