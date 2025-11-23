"use client";

import { useState } from "react";
import Megamenu from "./Megamenu";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="bg-white dark:bg-black border-b border-border shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <span className="font-bold text-xl text-black dark:text-zinc-50">
                                TREFOIL Platform
                            </span>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                                aria-label="Main menu"
                                aria-expanded={isMenuOpen}
                            >
                                {/* Megamenu Icon (Hamburger) */}
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {isMenuOpen && <Megamenu onClose={() => setIsMenuOpen(false)} />}
        </>
    );
}
