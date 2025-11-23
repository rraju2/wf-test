import React from 'react';

export type LayoutType = '1-col' | '2-col' | '3-col' | '4-col' | '5-col' | '6-col';
interface LayoutTabsProps {
    activeLayout: LayoutType;
    onLayoutChange: (layout: LayoutType) => void;
}

const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 15px',
    border: '1px solid var(--tab-border-color)',
    borderBottom: isActive ? 'none' : '1px solid var(--tab-border-color)',
    backgroundColor: isActive ? 'var(--tab-active-bg)' : 'var(--tab-bg)',
    color: isActive ? 'var(--tab-active-color)' : 'var(--tab-color)',
    cursor: 'pointer',
    marginBottom: '-1px',
    transition: 'background-color 0.3s, color 0.3s',
});



interface LayoutTabsProps {
    activeLayout: LayoutType;
    onLayoutChange: (layout: LayoutType) => void;
}

export default function LayoutTabs({ activeLayout, onLayoutChange }: LayoutTabsProps) {
    const layouts: { id: LayoutType; label: string }[] = [
        { id: '1-col', label: 'Full Page' },
        { id: '2-col', label: '2 Column' },
        { id: '3-col', label: '3 Column' },
        { id: '4-col', label: '4 Column' },
        { id: '5-col', label: '5 Column' },
        { id: '6-col', label: '6 Column' },
    ];

    return (
        <div style={{ display: 'flex', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
            {layouts.map(({ id, label }) => (
                <button key={id} style={tabButtonStyle(activeLayout === id)} onClick={() => onLayoutChange(id)}>
                    {label}
                </button>
            ))}
        </div>
    );
}