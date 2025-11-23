import React from 'react';

export default function FourColumnLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', border: '2px dashed cyan', padding: '16px' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Col 1</div>
            <main>{children}</main>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Col 3</div>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Col 4</div>
        </div>
    );
}