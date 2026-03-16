import React from 'react';
import { Bone, Fish } from 'lucide-react';

const FeedingChart = () => {
    return (
        <div className="page-container" style={{ paddingTop: '80px', paddingBottom: '80px', background: 'white' }}>
            <div className="container">
                <h1 className="section-title text-center">Feeding Guide</h1>
                <p className="text-center" style={{ maxWidth: '700px', margin: '0 auto 50px', color: 'var(--text-light)' }}>
                    Proper nutrition is vital for the health of stray and pet animals. Follow this guide to ensure you are feeding them safely.
                </p>

                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                    {/* Dog Feeding Guide */}
                    <div className="guide-card" style={{
                        background: 'var(--bg-cream)',
                        padding: '30px',
                        borderRadius: '24px',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div className="icon-circle" style={{ width: '50px', height: '50px', fontSize: '1.2rem', margin: 0 }}>
                                <Bone />
                            </div>
                            <h2 style={{ color: 'var(--primary)', margin: 0 }}>For Dogs</h2>
                        </div>

                        <h4 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>✅ Safe to Feed</h4>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px', color: 'var(--text-main)' }}>
                            <li>Boiled Chicken & Rice (No bones)</li>
                            <li>Carrots, Green Beans, Pumpkin</li>
                            <li>Plain Yogurt (in moderation)</li>
                            <li>Commercial Dog Food</li>
                        </ul>

                        <h4 style={{ color: '#ef4444', marginBottom: '10px' }}>❌ Dangerous (Do Not Feed)</h4>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-main)' }}>
                            <li><strong>Chocolate</strong> (Toxic)</li>
                            <li>Grapes & Raisins</li>
                            <li>Onions & Garlic</li>
                            <li>Cooked Bones (Splinter hazard)</li>
                        </ul>
                    </div>

                    {/* Cat Feeding Guide */}
                    <div className="guide-card" style={{
                        background: 'var(--bg-cream)',
                        padding: '30px',
                        borderRadius: '24px',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div className="icon-circle" style={{ width: '50px', height: '50px', fontSize: '1.2rem', margin: 0, background: 'var(--accent)' }}>
                                <Fish />
                            </div>
                            <h2 style={{ color: 'var(--primary)', margin: 0 }}>For Cats</h2>
                        </div>

                        <h4 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>✅ Safe to Feed</h4>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px', color: 'var(--text-main)' }}>
                            <li>Cooked Meat (Chicken, Turkey)</li>
                            <li>Canned Tuna (in water, occasionally)</li>
                            <li>Commercial Cat Food</li>
                            <li>Pumpkins & Peas (Small amounts)</li>
                        </ul>

                        <h4 style={{ color: '#ef4444', marginBottom: '10px' }}>❌ Dangerous (Do Not Feed)</h4>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-main)' }}>
                            <li><strong>Milk/Dairy</strong> (Most cats are lactose intolerant)</li>
                            <li>Chocolate & Caffeine</li>
                            <li>Dog Food (Lacks essential taurine)</li>
                            <li>Onions & Garlic</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeedingChart;
