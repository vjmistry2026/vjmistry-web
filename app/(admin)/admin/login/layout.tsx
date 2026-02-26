export const metadata = {
  title: "VJ | Backend Console",
  description: "VJ",
};

import "../../../globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}