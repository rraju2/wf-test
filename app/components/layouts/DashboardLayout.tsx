import Navbar from "../Navbar";
import ThreeColumnLayout from "./ThreeColumnLayout";
import SidebarMainLayout from "./SidebarMainLayout";
import MainRightLayout from "./MainRightLayout";
import TwoColumnLayout from "./TwoColumnLayout";
import SidebarMainRightLayout from "./SidebarMainRightLayout";
import FourColumnLayout from "./FourColumnLayout";
import MainLayout from "./MainLayout";
import ZincLayout from "./ZincLayout";
import React from "react";

type LayoutType =
    | "sidebar-main-right"
    | "sidebar-main"
    | "main-right"
    | "main"
    | "2-column"
    | "3-column"
    | "4-column"
    | "zinc"
    | "modak";

interface DashboardLayoutProps {
    layoutType: LayoutType;
    title: string;
}

const Placeholder = ({ name }: { name: string }) => (
    <div className="bg-card border-border rounded-lg border p-4 h-full flex items-center justify-center text-muted-foreground min-h-[200px]">
        {name}
    </div>
);

const MainContent = ({ title }: { title: string }) => (
    <div className="bg-card border-border rounded-lg border p-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p>This is the main content area for the '{title}' page.</p>
        <div className="mt-4 h-64 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-muted-foreground">
            (Content goes here)
        </div>
    </div>
);

export default function DashboardLayout({ layoutType, title }: DashboardLayoutProps) {
    const renderLayout = () => {
        switch (layoutType) {
            case "sidebar-main-right":
                return (
                    <SidebarMainRightLayout>
                        <Placeholder name="Sidebar" />
                        <MainContent title={title} />
                        <Placeholder name="Right Panel" />
                    </SidebarMainRightLayout>
                );
            case "sidebar-main":
                return (
                    <SidebarMainLayout>
                        <Placeholder name="Sidebar" />
                        <MainContent title={title} />
                    </SidebarMainLayout>
                );
            case "main-right":
                return (
                    <MainRightLayout>
                        <MainContent title={title} />
                        <Placeholder name="Right Panel" />
                    </MainRightLayout>
                );
            case "2-column":
                return (
                    <TwoColumnLayout>
                        <Placeholder name="Column 1" />
                        <Placeholder name="Column 2" />
                    </TwoColumnLayout>
                );
            case "3-column":
                return (
                    <ThreeColumnLayout>
                        <Placeholder name="Column 1" />
                        <Placeholder name="Column 2" />
                        <Placeholder name="Column 3" />
                    </ThreeColumnLayout>
                );
            case "4-column":
                return (
                    <FourColumnLayout>
                        <Placeholder name="Column 1" />
                        <Placeholder name="Column 2" />
                        <Placeholder name="Column 3" />
                        <Placeholder name="Column 4" />
                    </FourColumnLayout>
                );
            case "zinc":
                return (
                    <ZincLayout>
                        <Placeholder name="Custom 'Zinc' Layout" />
                    </ZincLayout>
                );
            default: // 'main' layout
                return (
                    <MainLayout>
                        <MainContent title={title} />
                    </MainLayout>
                );
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />
            <main className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                    <p className="text-muted-foreground">Layout Type: {layoutType}</p>
                </div>
                {renderLayout()}
            </main>
        </div>
    );
}

