import Navbar from "../components/client/Layout/Navbar";
import Footer from "../components/client/Layout/Footer";
import LenisProvider from "../components/LenisProvider";

export const dynamic = 'force-dynamic';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LenisProvider>
            <Navbar />
            {children}
            <Footer />
        </LenisProvider>
    );
}
