import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACCA Campaign",
  description: "Petition campaign landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
