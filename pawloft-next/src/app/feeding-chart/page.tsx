"use client";

import React from 'react';
import { Bone, Fish } from 'lucide-react';

const FeedingChart = () => {
    return (
        <div className="page-container section-premium" style={{ background: 'var(--bg-ivory)', minHeight: '100vh' }}>
            <div className="container">
                <div className="mb-6 flex justify-center items-center gap-4">
                    <span className="w-12 h-[1px]" style={{ background: 'var(--secondary)' }}></span>
                    <span className="uppercase tracking-[0.3em] text-xs font-semibold" style={{ color: 'var(--secondary)' }}>Nutritional Science</span>
                </div>
                <h1 className="section-title text-center">Advanced Feeding Guide</h1>
                <p className="text-center max-w-[700px] mx-auto mb-16 text-text-light leading-relaxed">
                    Proper nutrition is the cornerstone of rehabilitation. We follow species-specific dietary protocols to ensure every rescued animal recovers their strength Safely.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Dog Feeding Guide */}
                    <div className="card-premium" style={{ background: 'white' }}>
                        <div className="flex items-center gap-6 mb-8">
                            <Bone size={32} style={{ color: 'var(--secondary)' }} />
                            <h2 className="text-2xl" style={{ color: 'var(--primary)' }}>Canine Protocols</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="uppercase tracking-widest text-xs font-bold mb-3" style={{ color: 'var(--secondary)' }}>Recommended</h4>
                                <ul className="space-y-2 text-text-main opacity-80">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Boiled Poultry & Brown Rice</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Garden Fresh Carrots & Pumpkin</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Natural Probiotcs (Yogurt)</li>
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-black/5">
                                <h4 className="uppercase tracking-widest text-xs font-bold mb-3 text-red-800">Dangerous (Strictly Prohibited)</h4>
                                <ul className="space-y-2 text-text-main opacity-80">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-800"></span> Chocolate & Caffeine</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-800"></span> Onions, Garlic & Grapes</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-800"></span> Splintering Cooked Bones</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Cat Feeding Guide */}
                    <div className="card-premium" style={{ background: 'white' }}>
                        <div className="flex items-center gap-6 mb-8">
                            <Fish size={32} style={{ color: 'var(--secondary)' }} />
                            <h2 className="text-2xl" style={{ color: 'var(--primary)' }}>Feline Nutrition</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="uppercase tracking-widest text-xs font-bold mb-3" style={{ color: 'var(--secondary)' }}>Recommended</h4>
                                <ul className="space-y-2 text-text-main opacity-80">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Lean Protein (Cooked Meat)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> High-Taurine Commercial Blends</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Pureed Vegetables (Fiber)</li>
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-black/5">
                                <h4 className="uppercase tracking-widest text-xs font-bold mb-3 text-red-800">Dangerous (Strictly Prohibited)</h4>
                                <ul className="space-y-2 text-text-main opacity-80">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-800"></span> Dairy Products (System Stress)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-800"></span> Dog Food (Nutritional Gaps)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-800"></span> Allium Family (Onions/Garlic)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedingChart;
