"use client";

import React from 'react';
import Link from 'next/link';
import { PawPrint } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link href="/" className="logo">
                    <PawPrint size={28} className="logo-icon" />
                    <span>PawLoft</span>
                </Link>

                <div className="nav-links">
                    <Link href="/">About</Link>
                    <Link href="/">Adopt</Link>
                    <Link href="/">Volunteer</Link>
                    <Link href="/donation">Donate</Link>
                    <Link href="/feeding-chart">Feeding Chart</Link>
                    <Link href="/first-aid">First Aid</Link>
                    <Link href="/login" className="btn btn-outline nav-btn">Login</Link>
                    <Link href="/signup" className="btn btn-primary nav-btn">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
