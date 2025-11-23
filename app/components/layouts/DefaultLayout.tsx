import React from 'react';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ border: '2px solid gray', padding: '16px' }}>
            <header>
                <h1>Default Application Layout</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}