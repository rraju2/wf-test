import React from 'react';
import ZincLayout from '../../layouts/ZincLayout';

// In a real application, these would likely be more complex components
// imported from their own files.
const SalesDashboardTemplate = () => (
    <div>
        <h2>Sales Dashboard</h2>
        <p>This template shows sales metrics and performance.</p>
    </div>
);

const MarketingDashboardTemplate = () => (
    <div>
        <h2>Marketing Dashboard</h2>
        <p>This template displays marketing campaign data and lead status.</p>
    </div>
);

const DefaultTemplate = ({ name }: { name: string }) => (
    <div>
        <h2>Dashboard: {name}</h2>
        <p>No specific template found. Displaying default view.</p>
    </div>
);

interface DynamicPageProps {
    params: { dashboardName: string };
}

function DynamicDashboardPage({ params }: DynamicPageProps) {
    const { dashboardName } = params;

    const renderTemplate = () => {
        switch (dashboardName) {
            case 'sales':
                return <SalesDashboardTemplate />;
            case 'marketing':
                return <MarketingDashboardTemplate />;
            default:
                return <DefaultTemplate name={dashboardName} />;
        }
    };

    return <ZincLayout>{renderTemplate()}</ZincLayout>;
}

export default DynamicDashboardPage;