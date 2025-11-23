import React from 'react';
import Link from 'next/link';

const menuStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '15px 20px',
    background: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
    gap: '20px',
    position: 'relative',
};

const menuItemStyles: React.CSSProperties = {
    position: 'relative',
    padding: '10px 0',
};

const dropdownStyles: React.CSSProperties = {
    display: 'none',
    position: 'absolute',
    top: '100%',
    left: 0,
    background: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '15px',
    borderRadius: '4px',
    minWidth: '200px',
    zIndex: 1000,
};

const dropdownLinkStyles: React.CSSProperties = {
    display: 'block',
    padding: '8px 10px',
    textDecoration: 'none',
    color: '#333',
};

// A simple CSS-in-JS solution for hover effects
const hoverStyles = `
    .menu-item:hover .dropdown {
        display: block;
    }
    .dropdown-link:hover {
        background-color: #f1f1f1;
    }
`;

export function MegaMenu() {
    return (
        <nav style={menuStyles}>
            <style>{hoverStyles}</style>
            <Link href="/">Home</Link>

            {/* Designer Section */}
            <div className="menu-item" style={menuItemStyles}>
                <span>Designer</span>
                <div className="dropdown" style={dropdownStyles}>
                    <Link href="/study-designer" className="dropdown-link" style={dropdownLinkStyles}>Study Designer</Link>
                    <Link href="/form-designer" className="dropdown-link" style={dropdownLinkStyles}>Form Designer</Link>
                    <Link href="/workflow-designer" className="dropdown-link" style={dropdownLinkStyles}>Workflow Designer</Link>
                </div>
            </div>

            {/* Protocol Section */}
            <div className="menu-item" style={menuItemStyles}>
                <span>Protocol</span>
                <div className="dropdown" style={dropdownStyles}>
                    <Link href="/protocol-view" className="dropdown-link" style={dropdownLinkStyles}>Protocol View</Link>
                    <Link href="/amendments" className="dropdown-link" style={dropdownLinkStyles}>Amendments</Link>
                    <Link href="/version-history" className="dropdown-link" style={dropdownLinkStyles}>Version History</Link>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="menu-item" style={menuItemStyles}>
                <span>Analytics</span>
                <div className="dropdown" style={dropdownStyles}>
                    <Link href="/patient-enrollment" className="dropdown-link" style={dropdownLinkStyles}>Patient Enrollment</Link>
                    <Link href="/data-quality" className="dropdown-link" style={dropdownLinkStyles}>Data Quality</Link>
                    <Link href="/safety-monitoring" className="dropdown-link" style={dropdownLinkStyles}>Safety Monitoring</Link>
                </div>
            </div>

            {/* Site Admin Section */}
            <div className="menu-item" style={menuItemStyles}>
                <span>Site Admin</span>
                <div className="dropdown" style={dropdownStyles}>
                    <Link href="/site-management" className="dropdown-link" style={dropdownLinkStyles}>Site Management</Link>
                    <Link href="/user-access" className="dropdown-link" style={dropdownLinkStyles}>User Access</Link>
                    <Link href="/audit-trail" className="dropdown-link" style={dropdownLinkStyles}>Audit Trail</Link>
                </div>
            </div>
        </nav>
    );
}