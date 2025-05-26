export default function EducationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    );
}