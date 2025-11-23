import React from 'react';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ border: '2px solid green', padding: '16px' }}>
            <header>
                <h1>Marketing Team Layout</h1>
                <nav>Campaigns | Analytics | SEO</nav>
            </header>
            <main>{children}</main>
        </div>
    );
}