import { Roboto_Condensed } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import Navbar from "../components/client/Layout/Navbar";
import Footer from "../components/client/Layout/Footer";
import LenisProvider from "../components/LenisProvider";

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"],
    weight: ["500"],
    display: "swap",
});

const nexa = localFont({
    src: [
        {
            path: "../../public/fonts/nexa/Nexa-Book.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/nexa/Nexa-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-nexa",
    display: "swap",
});

export const metadata: Metadata = {
    title: "V.J. Mistry & Company Ltd.",
    description: "Engineering Excellence Built on Trust & Legacy",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${nexa.variable} antialiased ${robotoCondensed.className}`}>
                <LenisProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </LenisProvider>
            </body>
        </html>
    );
}
