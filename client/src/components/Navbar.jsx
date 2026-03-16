import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">
                    <PawPrint size={28} className="logo-icon" />
                    <span>PawLoft</span>
                </Link>

                <div className="nav-links">
                    <Link to="/">About</Link>
                    <Link to="/">Adopt</Link>
                    <Link to="/">Volunteer</Link>
                    <Link to="/donate">Donate</Link>
                    <Link to="/feeding-chart">Feeding Chart</Link>
                    <Link to="/first-aid">First Aid</Link>
                    <Link to="/login" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Login</Link>
                    <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
