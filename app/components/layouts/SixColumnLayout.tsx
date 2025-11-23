import React from 'react';

export default function SixColumnLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', border: '2px dashed brown', padding: '10px' }}>
            <div style={{ border: '1px solid #ccc', padding: '5px', background: '#fafafa' }}>C1</div>
            <div style={{ border: '1px solid #ccc', padding: '5px', background: '#fafafa' }}>C2</div>
            <main>{children}</main>
            <div style={{ border: '1px solid #ccc', padding: '5px', background: '#fafafa' }}>C4</div>
            <div style={{ border: '1px solid #ccc', padding: '5px', background: '#fafafa' }}>C5</div>
            <div style={{ border: '1px solid #ccc', padding: '5px', background: '#fafafa' }}>C6</div>
        </div>
    );
}