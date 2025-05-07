import { ReactNode} from "react";

export default function ProjectsLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
 }