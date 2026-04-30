import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import ClientSideLink from "../client-side-link";
import AdminNavbar from "@/app/components/AdminNavbar/Index";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col h-screen overflow-y-auto">
        <div className="flex-1 px-3 py-4">
          <div className="mb-6 px-4 flex flex-col gap-2 py-2">
            <div className="flex items-center">
              <Image
                src="/assets/logo/logo-black.svg"
                alt="Logo"
                width={150}
                height={150}
              />
            </div>
          </div>

          <nav className="space-y-1">
            <AdminNavbar />
          </nav>
        </div>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-200">
          <ClientSideLink
            href="/admin/logout"
            name="Logout"
            icon={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Fixed Top Bar */}
        {/* <div className="grid grid-cols-2 w-[calc(100vw-256px)]  shadow-sm py-4 px-8 fixed top-0 left-64 z-10 border-b">
          <h2 className="font-bold text-primary">English Version</h2>
          <h2 className="font-bold text-primary text-right">Arabic Version</h2>
        </div> */}

        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto p-8 bg-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
}
