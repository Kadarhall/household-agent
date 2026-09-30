import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hearth — household coordination",
  description: "A thoughtful assistant for your household calendar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
