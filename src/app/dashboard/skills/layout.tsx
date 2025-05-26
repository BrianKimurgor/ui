import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Footer component import

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Fixed Header */}
            <Header />

            <div className="flex flex-1 overflow-hidden">
                {/* Fixed Sidebar */}
                <Sidebar />

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">{children}</main>
            </div>

            {/* Fixed Footer */}
            <Footer />
        </div>
    );
}