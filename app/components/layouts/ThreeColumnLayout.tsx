import React from 'react';

export default function ThreeColumnLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', gap: '16px', border: '2px dashed purple', padding: '16px' }}>
            <aside style={{ width: '200px', border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Sidebar Left</aside>
            <main style={{ flex: 1 }}>{children}</main>
            <aside style={{ width: '200px', border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Sidebar Right</aside>
        </div>
    );
}