"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PawPrint } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
            <div className={`container-fluid max-w-[1600px] mx-auto flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-lg rounded-full px-8 py-3 mx-4 lg:mx-auto border border-[#2C2825]/10' : 'px-4 lg:px-8'}`}>
                
                <Link href="/" className={`flex items-center gap-2 text-2xl font-black tracking-tight transition-colors ${scrolled ? 'text-[#8B2E49]' : 'text-white'}`}>
                    <PawPrint size={28} className={scrolled ? 'text-[#8B2E49]' : 'text-white'} />
                    <span>PAWLOFT</span>
                </Link>

                <div className={`hidden md:flex items-center gap-8 font-medium text-sm tracking-wide ${scrolled ? 'text-[#5C5753]' : 'text-white/90'}`}>
                    <Link href="/how-it-works" className="hover:text-[#8B2E49] transition-colors">How It Works</Link>
                    <Link href="/rescue-network" className="hover:text-[#8B2E49] transition-colors">Network</Link>
                    <Link href="/insights" className="hover:text-[#8B2E49] transition-colors">Insights</Link>
                    <Link href="/roadmap" className="hover:text-[#8B2E49] transition-colors">Roadmap</Link>
                    <div className="w-px h-4 bg-current opacity-20"></div>
                    <Link href="/login" className="hover:text-[#8B2E49] transition-colors">Login</Link>
                    <Link href="/report" className={`btn-pill px-6 py-2 text-sm`}>
                        Report Animal
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
