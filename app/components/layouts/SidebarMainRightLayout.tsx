const SidebarMainRightLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6">
        {children}
    </div>
);

export default SidebarMainRightLayout;