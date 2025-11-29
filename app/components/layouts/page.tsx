'use client';

import React, { useState, useEffect } from 'react';
import FullPageLayout from './FullPageLayout';
import SidebarMainLayout from './SidebarMainLayout';
import ThreeColumnLayout from './ThreeColumnLayout';
import FourColumnLayout from './FourColumnLayout';
import FiveColumnLayout from './FiveColumnLayout';
import SixColumnLayout from './SixColumnLayout';
import LayoutTabs, { LayoutType } from '../LayoutTabs';
import { ClinicalTrialForm } from './ClinicalTrialForm';
import { Toaster } from '@/components/ui/toaster';

// Mock function to fetch page-specific data
async function getPageData(menuItem: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    if (menuItem === 'sales') {
        return { title: 'Sales Performance', content: 'Here are the latest sales figures...' };
    }
    if (menuItem === 'marketing') {
        return { title: 'Marketing Campaigns', content: 'Here is the performance of recent campaigns...' };
    }
    return { title: `Page: ${menuItem}`, content: 'This is the default page content.' };
}

interface PageProps {
    params: { menuItem: string };
}

export default function Page({ params }: PageProps) {
    const [layout, setLayout] = useState<LayoutType>('1-col');
    const [data, setData] = useState<{ title: string; content: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // If we are not on the create-study page, fetch data as before
        if (params.menuItem !== 'create-study') {
            setIsLoading(true);
            getPageData(params.menuItem).then(pageData => {
                setData(pageData);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false); // No data to load for the form page
        }
    }, [params.menuItem]);

    // If the route is for creating a study, render the form directly.
    if (params.menuItem === 'create-study') {
        return (
            <div className="flex flex-col items-center justify-center p-4 md:p-12 bg-slate-50 dark:bg-background">
                <ClinicalTrialForm />
                <Toaster />
            </div>
        );
    }

    const pageContent = (
        <div>
            {isLoading ? (
                <p>Loading content...</p>
            ) : (
                <>
                    <h2>{data?.title}</h2>
                    <p>{data?.content}</p>
                </>
            )}
        </div>
    );

    const renderLayout = () => {
        switch (layout) {
            case '2-col':
                return <SidebarMainLayout>{pageContent}</SidebarMainLayout>;
            case '3-col':
                return <ThreeColumnLayout>{pageContent}</ThreeColumnLayout>;
            case '4-col':
                return <FourColumnLayout>{pageContent}</FourColumnLayout>;
            case '5-col':
                return <FiveColumnLayout>{pageContent}</FiveColumnLayout>;
            case '6-col':
                return <SixColumnLayout>{pageContent}</SixColumnLayout>;
            case '1-col':
            default:
                return <FullPageLayout>{pageContent}</FullPageLayout>;
        }
    };

    return (
        <div>
            <LayoutTabs activeLayout={layout} onLayoutChange={setLayout} />
            {renderLayout()}
        </div>
    );
}