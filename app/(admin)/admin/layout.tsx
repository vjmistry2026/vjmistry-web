import type { Metadata } from "next";
import "../../../app/globals.css";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "VJ | Backend Console",
  description: "VJ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden overflow-y-hidden`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}