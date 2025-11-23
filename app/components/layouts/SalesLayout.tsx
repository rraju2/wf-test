import React from 'react';

export default function SalesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ border: '2px solid blue', padding: '16px' }}>
            <header>
                <h1>Sales Team Layout</h1>
                <nav>Sales Nav | Reports | Goals</nav>
            </header>
            <main>{children}</main>
        </div>
    );
}