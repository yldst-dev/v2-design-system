import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "design-system2.tsx");
const source = fs.readFileSync(sourcePath, "utf8");
const lines = source.split("\n");

const ensureDir = (target) => fs.mkdirSync(target, { recursive: true });
const writeFile = (target, content) => {
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, `${content.trim()}\n`);
};

const cleanText = (text) =>
  text
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/^\s*{\/\*.*?\*\/}\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const slice = (start, end) => cleanText(lines.slice(start - 1, end).join("\n"));

const toExport = (name, text) =>
  text.replace(new RegExp(`^const\\s+${name}\\s+=`, "m"), `export const ${name} =`);

const writeGroup = ({ file, imports, sections }) => {
  const body = sections
    .map(({ name, start, end }) => toExport(name, slice(start, end)))
    .join("\n\n");
  writeFile(path.join(root, file), `"use client";\n\n${imports}\n\n${body}`);
};

writeFile(
  path.join(root, "package.json"),
  JSON.stringify(
    {
      name: "v2-design-system",
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        next: "16.2.4",
        react: "19.2.5",
        "react-dom": "19.2.5",
        "lucide-react": "1.8.0",
      },
    },
    null,
    2,
  ),
);

writeFile(
  path.join(root, "jsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        baseUrl: ".",
        paths: {
          "@/*": ["./*"],
        },
      },
    },
    null,
    2,
  ),
);

writeFile(
  path.join(root, "app/layout.jsx"),
  `import "./globals.css";

export const metadata = {
  title: "V2 Design System",
  description: "Extracted Next.js design system from design-system2.tsx",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}`,
);

writeFile(
  path.join(root, "app/page.jsx"),
  `import DesignSystemShowcase from "@/src/features/showcase/DesignSystemShowcase";

export default function Page() {
  return <DesignSystemShowcase />;
}`,
);

writeFile(
  path.join(root, "app/globals.css"),
  `* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

a {
  color: inherit;
}

button,
input,
textarea,
select {
  font: inherit;
}`,
);

writeFile(
  path.join(root, "src/design-system/tokens/palette.js"),
  `export const palette = ${slice(87, 171).replace(/^const palette = /, "").replace(/;$/, "")};`,
);

writeFile(
  path.join(root, "src/design-system/tokens/tokens.js"),
  `export const tokens = ${slice(173, 215).replace(/^const tokens = /, "").replace(/;$/, "")};`,
);

writeFile(
  path.join(root, "src/design-system/tokens/index.js"),
  `export { palette } from "./palette";
export { tokens } from "./tokens";`,
);

writeFile(
  path.join(root, "src/design-system/theme/context.jsx"),
  `"use client";

import { createContext, useContext } from "react";

export const ThemeCtx = createContext();

export const useTheme = () => useContext(ThemeCtx);`,
);

writeGroup({
  file: "src/design-system/components/typography.jsx",
  imports: `import React from "react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";`,
  sections: [{ name: "Text", start: 228, end: 263 }],
});

writeGroup({
  file: "src/design-system/components/actions.jsx",
  imports: `import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";`,
  sections: [
    { name: "Button", start: 264, end: 381 },
    { name: "IconButton", start: 382, end: 439 },
  ],
});

writeGroup({
  file: "src/design-system/components/forms.jsx",
  imports: `import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown, Eye, EyeOff } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";`,
  sections: [
    { name: "Input", start: 440, end: 528 },
    { name: "Textarea", start: 529, end: 562 },
    { name: "Field", start: 563, end: 598 },
    { name: "Select", start: 599, end: 696 },
  ],
});

writeGroup({
  file: "src/design-system/components/selection.jsx",
  imports: `import React from "react";
import { Check } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";`,
  sections: [
    { name: "Checkbox", start: 697, end: 746 },
    { name: "Radio", start: 747, end: 804 },
    { name: "Switch", start: 805, end: 847 },
    { name: "Slider", start: 848, end: 912 },
  ],
});

writeGroup({
  file: "src/design-system/components/display.jsx",
  imports: `import React, { useState } from "react";
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
import { useTheme } from "@/src/design-system/theme/context";`,
  sections: [
    { name: "Badge", start: 913, end: 980 },
    { name: "Card", start: 981, end: 1011 },
    { name: "Alert", start: 1012, end: 1082 },
    { name: "Banner", start: 1083, end: 1131 },
    { name: "Avatar", start: 1132, end: 1184 },
    { name: "AvatarGroup", start: 1185, end: 1231 },
    { name: "Stat", start: 2192, end: 2267 },
    { name: "Spinner", start: 2268, end: 2275 },
  ],
});

writeGroup({
  file: "src/design-system/components/navigation.jsx",
  imports: `import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";
import { Badge } from "./display";`,
  sections: [
    { name: "Tabs", start: 1232, end: 1329 },
    { name: "Menu", start: 1680, end: 1761 },
    { name: "Kbd", start: 1762, end: 1787 },
    { name: "Breadcrumb", start: 1788, end: 1818 },
    { name: "Pagination", start: 1819, end: 1881 },
  ],
});

writeGroup({
  file: "src/design-system/components/feedback.jsx",
  imports: `import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, FileText, Info, X } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";`,
  sections: [
    { name: "Progress", start: 1330, end: 1383 },
    { name: "CircularProgress", start: 1384, end: 1432 },
    { name: "Skeleton", start: 1882, end: 1899 },
    { name: "EmptyState", start: 1900, end: 1947 },
    { name: "Toast", start: 2085, end: 2169 },
  ],
});

writeGroup({
  file: "src/design-system/components/overlay.jsx",
  imports: `import React, { useState } from "react";
import { X } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";`,
  sections: [
    { name: "Tooltip", start: 1433, end: 1489 },
    { name: "Modal", start: 1490, end: 1608 },
    { name: "Drawer", start: 1609, end: 1679 },
  ],
});

writeGroup({
  file: "src/design-system/components/data-display.jsx",
  imports: `import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { tokens } from "@/src/design-system/tokens";
import { useTheme } from "@/src/design-system/theme/context";`,
  sections: [
    { name: "Accordion", start: 1948, end: 2013 },
    { name: "Table", start: 2014, end: 2084 },
    { name: "Divider", start: 2170, end: 2191 },
  ],
});

writeFile(
  path.join(root, "src/design-system/components/index.js"),
  `export { Text } from "./typography";
export { Button, IconButton } from "./actions";
export { Input, Textarea, Field, Select } from "./forms";
export { Checkbox, Radio, Slider, Switch } from "./selection";
export { Alert, Avatar, AvatarGroup, Badge, Banner, Card, Spinner, Stat } from "./display";
export { Accordion, Divider, Table } from "./data-display";
export { CircularProgress, EmptyState, Progress, Skeleton, Toast } from "./feedback";
export { Breadcrumb, Kbd, Menu, Pagination, Tabs } from "./navigation";
export { Drawer, Modal, Tooltip } from "./overlay";`,
);

writeFile(
  path.join(root, "src/design-system/index.js"),
  `export * from "./tokens";
export * from "./theme/context";
export * from "./components";`,
);

const showcaseBody = cleanText(
  source
    .slice(source.indexOf("export default function DesignSystem()"))
    .replace("export default function DesignSystem()", "export default function DesignSystemShowcase()"),
);

const showcaseOutput = showcaseBody
  .replace(/<Menu\b/g, "<DsMenu")
  .replace(/<\/Menu>/g, "</DsMenu>")
  .replace(/icon=\{Github\}/g, "icon={Globe}")
  .replace(/icon=\{Figma\}/g, "icon={Palette}")
  .replace(/icon=\{Twitter\}/g, "icon={Users}")
  .replace(/icon=\{Slack\}/g, "icon={Send}")
  .replace(/label=\"Github\"/g, 'label="Repository"')
  .replace(/label=\"Figma\"/g, 'label="Tokens"')
  .replace(/View on GitHub/g, "View repository");

writeFile(
  path.join(root, "src/features/showcase/DesignSystemShowcase.jsx"),
  `"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
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

${showcaseOutput}`,
);
  Bookmark,
