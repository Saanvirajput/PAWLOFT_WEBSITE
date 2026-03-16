import React from 'react';
import { Heart, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#fff', padding: '60px 0', borderTop: '1px solid #eee' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <Heart size={24} fill="#A08375" color="#A08375" />
                    <h3 style={{ fontSize: '1.5rem' }}>PawLoft</h3>
                </div>
                <p style={{ color: 'var(--text-light)', marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
                    Built with compassion, for those without a voice. Connecting rescuers, adopters, and animal lovers to create a safer world for our furry friends.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                    <Facebook color="#757575" />
                    <Twitter color="#757575" />
                    <Instagram color="#757575" />
                </div>

                <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
                    &copy; {new Date().getFullYear()} PawLoft. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
