"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bookmark,
  Box,
  Calendar,
  Check,
  Clock,
  ChevronDown,
  ChevronRight,
  Command,
  Copy,
  DollarSign,
  Download,
  Edit,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Folder,
  Globe,
  Grid,
  Hash,
  Heart,
  Home,
  Image,
  Info,
  Layers,
  List,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Menu,
  Moon,
  MoreHorizontal,
  Package,
  Palette,
  Paperclip,
  Phone,
  Plus,
  Search,
  Send,
  Share2,
  Settings,
  Smile,
  Sparkles,
  Star,
  Sun,
  Tag,
  Trash2,
  TrendingUp,
  Type,
  Upload,
  User,
  Users,
  Zap,
} from "lucide-react";
import { palette, tokens } from "@/src/design-system/tokens";
import { ThemeCtx } from "@/src/design-system/theme/context";
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  Drawer,
  EmptyState,
  Field,
  IconButton,
  Input,
  Kbd,
  Menu as DsMenu,
  Modal,
  Pagination,
  Progress,
  Radio,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Stat,
  Switch,
  Table,
  Tabs,
  Text,
  Textarea,
  Toast,
  Tooltip,
} from "@/src/design-system/components";

export default function DesignSystemShowcase() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

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

        <main style={{ flex: 1, minWidth: 0 }}>

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
              <IconButton icon={Globe} label="Repository" />
              <IconButton icon={Palette} label="Tokens" />
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
                <Button variant="secondary" icon={Globe}>
                  View repository
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
                        name="plan"
                        value="personal"
                        checked={radio === "personal"}
                        onChange={() => setRadio("personal")}
                        label="Personal"
                        description="개인 사용자용"
                      />
                      <Radio
                        name="plan"
                        value="team"
                        checked={radio === "team"}
                        onChange={() => setRadio("team")}
                        label="Team"
                        description="소규모 팀에 적합"
                      />
                      <Radio
                        name="plan"
                        value="enterprise"
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
                        onClick={() => setTg1(!tg1)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
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
                        onClick={() => setTg2(!tg2)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <Switch checked={tg2} onChange={setTg2} size="sm" />
                        <span style={{ fontSize: "14px" }}>
                          2단계 인증 (Small)
                        </span>
                      </div>
                      <div
                        onClick={() => {}}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
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
                    <DsMenu
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

            <S id="pagination" title="Pagination" description="페이지 이동.">
              <Demo>
                <Pagination current={page} total={10} onChange={setPage} />
              </Demo>
            </S>

            <S
              id="menu"
              title="Menu"
              description="드롭다운 메뉴 / 컨텍스트 메뉴."
            >
              <Demo>
                <div style={{ display: "flex", gap: "12px" }}>
                  <DsMenu
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
                  <DsMenu
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
                        name="visibility"
                        value="private"
                        checked
                        onChange={() => {}}
                        label="Private"
                        description="초대받은 사람만 볼 수 있습니다"
                      />
                      <Radio
                        name="visibility"
                        value="public"
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
                        onClick={() => {}}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
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
                        onClick={() => {}}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
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
                <IconButton icon={Globe} />
                <IconButton icon={Palette} />
                <IconButton icon={Users} />
                <IconButton icon={Send} />
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
