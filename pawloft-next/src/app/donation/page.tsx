"use client";

import React from 'react';
import { Heart, CreditCard, Gift } from 'lucide-react';

const Donation = () => {
    return (
        <div className="page-container section-premium" style={{ background: 'var(--bg-ivory)', minHeight: '100vh' }}>
            <div className="container text-center">
                <div className="mb-6 flex justify-center items-center gap-4">
                    <span className="w-12 h-[1px]" style={{ background: 'var(--secondary)' }}></span>
                    <span className="uppercase tracking-[0.3em] text-xs font-semibold" style={{ color: 'var(--secondary)' }}>Philanthropy</span>
                </div>
                <h1 className="section-title">Support the Mission</h1>
                <p style={{ maxWidth: '700px', margin: '0 auto 60px', fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                    Your contributions provide the institutional resources required for professional rescue, high-end medical rehabilitation, and permanent rehoming of animals in distress.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 max-w-[900px] mx-auto">
                    <div className="card-premium flex flex-col items-center">
                        <Heart className="mb-6" size={48} style={{ color: 'var(--secondary)' }} />
                        <h3 className="text-2xl mb-4">Medical Rehabilitation</h3>
                        <p className="text-text-light">Funding for emergency procedures, advanced diagnostics, and long-term recovery care.</p>
                    </div>
                    <div className="card-premium flex flex-col items-center">
                        <Gift className="mb-6" size={48} style={{ color: 'var(--secondary)' }} />
                        <h3 className="text-2xl mb-4">Nutritional Science</h3>
                        <p className="text-text-light">Ensuring every animal receives species-specific, balanced nutrition during their stay.</p>
                    </div>
                </div>

                <div className="card-premium max-w-[500px] mx-auto" style={{ background: 'white' }}>
                    <h2 className="text-3xl mb-8" style={{ color: 'var(--primary)' }}>Contribute Now</h2>
                    <div className="space-y-4">
                        <button className="btn btn-primary w-full flex items-center justify-center">
                            <CreditCard size={18} className="mr-2" /> Support with ₹500
                        </button>
                        <button className="btn btn-outline w-full">
                            Support with ₹1,000
                        </button>
                        <button className="btn btn-outline w-full" style={{ border: 'none', color: 'var(--secondary)', textDecoration: 'underline' }}>
                            Specify Custom Amount
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donation;
