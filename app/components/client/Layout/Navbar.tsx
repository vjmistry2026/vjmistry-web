"use client";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <DesktopNavbar />
            </div>

            {/* Mobile */}
            <div className="block lg:hidden">
                <MobileNavbar />
            </div>
        </>
    );
}
