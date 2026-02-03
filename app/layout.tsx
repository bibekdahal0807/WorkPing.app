import "./globals.css";
import type { Metadata } from "next";

export const metadata = {
  title: "WorkPing", // Ensure correct title is displayed
  description: "Client updates from GitHub activity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
