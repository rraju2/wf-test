import React from 'react';

export default function FullPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ border: '2px dashed red', padding: '16px' }}>
            <main>{children}</main>
        </div>
    );
}