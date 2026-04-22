import "./globals.css";

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
}
