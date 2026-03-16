import React from 'react';
import './Landing.css'; // Reusing landing styles for consistency
import { Heart, CreditCard, Gift } from 'lucide-react';

const Donation = () => {
    return (
        <div className="page-container" style={{ paddingTop: '80px', minHeight: '80vh', background: 'var(--bg-cream)' }}>
            <div className="container text-center">
                <h1 className="section-title">Support Our Mission</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto 40px', fontSize: '1.2rem', color: 'var(--text-light)' }}>
                    Your generous contributions help us rescue, rehabilitate, and rehome animals in need. Every penny goes directly to their care.
                </p>

                <div className="features-grid" style={{ justifyContent: 'center', marginBottom: '60px' }}>
                    <div className="feature-item" style={{ flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                        <Heart className="feature-icon" size={40} style={{ color: 'var(--secondary)' }} />
                        <h3>Medical Care</h3>
                        <p>Provides emergency surgeries and vaccinations.</p>
                    </div>
                    <div className="feature-item" style={{ flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                        <Gift className="feature-icon" size={40} style={{ color: 'var(--secondary)' }} />
                        <h3>Food & Shelter</h3>
                        <p>Keeps our furry friends fed and warm.</p>
                    </div>
                </div>

                <div className="donation-card" style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '24px',
                    maxWidth: '500px',
                    margin: '0 auto',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Make a Donation</h2>
                    <button className="btn btn-primary btn-block" style={{ width: '100%', marginBottom: '15px' }}>
                        <CreditCard size={18} style={{ marginRight: '10px' }} /> Donate ₹50
                    </button>
                    <button className="btn btn-primary btn-block" style={{ width: '100%', marginBottom: '15px', background: 'var(--primary)' }}>
                        Donate ₹100
                    </button>
                    <button className="btn btn-secondary btn-block" style={{ width: '100%' }}>
                        Custom Amount
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Donation;
