import React from 'react';

export default function SidebarMainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', gap: '16px', border: '2px dashed orange', padding: '16px' }}>
            <aside style={{ width: '250px', border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Sidebar</aside>
            <main style={{ flex: 1 }}>{children}</main>
        </div>
    );
}