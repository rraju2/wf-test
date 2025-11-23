import React from 'react';

export default function FiveColumnLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', border: '2px dashed green', padding: '16px' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Col 1</div>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Col 2</div>
            <main>{children}</main>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Col 4</div>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: '#fafafa' }}>Col 5</div>
        </div>
    );
}