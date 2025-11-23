const MainRightLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {children}
    </div>
);

export default MainRightLayout;