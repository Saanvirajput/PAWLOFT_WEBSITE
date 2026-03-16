"use client";

import React from 'react';
import { Activity, Thermometer, AlertTriangle, LucideIcon } from 'lucide-react';

interface EmergencyCardProps {
    icon: LucideIcon;
    title: string;
    steps: string[];
    color: string;
}

const EmergencyCard = ({ icon: Icon, title, steps, color }: EmergencyCardProps) => (
    <div
        className="emergency-card bg-white p-8 rounded-[20px] shadow-sm"
        style={{ borderLeft: `5px solid ${color}` }}
    >
        <div className="flex items-center gap-4 mb-4">
            <Icon size={32} style={{ color: color }} />
            <h3 className="text-xl font-bold text-[#84A98C]">{title}</h3>
        </div>
        <ol className="list-decimal pl-5 text-[#52796F] leading-relaxed">
            {steps.map((step, idx) => (
                <li key={idx} className="mb-2">{step}</li>
            ))}
        </ol>
    </div>
);

const FirstAid = () => {
    return (
        <div className="page-container section-premium" style={{ background: 'var(--bg-ivory)', minHeight: '100vh' }}>
            <div className="container">
                <div className="mb-6 flex justify-center items-center gap-4">
                    <span className="w-12 h-[1px]" style={{ background: 'var(--secondary)' }}></span>
                    <span className="uppercase tracking-[0.3em] text-xs font-semibold" style={{ color: 'var(--secondary)' }}>Medical Response</span>
                </div>
                <h1 className="section-title text-center">First Aid Protocol</h1>
                <p className="text-center max-w-[700px] mx-auto mb-16 text-text-light leading-relaxed">
                    Immediate stabilization protocols for animals in distress. These steps are designed to bridge the gap until professional veterinary intervention is available.
                </p>

                <div className="grid grid-cols-1 gap-12 max-w-[900px] mx-auto">
                    <div className="card-premium flex gap-8" style={{ borderLeft: '1px solid var(--secondary)', borderRadius: '4px' }}>
                        <div className="hidden md:block">
                            <span className="vertical-label">Crisis Level 01</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Thermometer size={32} style={{ color: 'var(--secondary)' }} />
                                <h3 className="text-2xl" style={{ color: 'var(--primary)' }}>Thermoregulation (Heatstroke)</h3>
                            </div>
                            <ol className="space-y-3 text-text-main opacity-80 list-decimal pl-5">
                                <li>Transition the subject to a shaded, ventilated environment immediately.</li>
                                <li>Administer controlled amounts of cool (not refrigerated) water if possible.</li>
                                <li>Apply cool water to standard heat-exchange sites (paws, ears, belly).</li>
                                <li>Maintain ventilation; do not restrict airflow with wet fabrics.</li>
                                <li>Professional transport with active cooling required immediately.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="card-premium flex gap-8" style={{ borderLeft: '1px solid var(--secondary)', borderRadius: '4px' }}>
                        <div className="hidden md:block">
                            <span className="vertical-label">Crisis Level 02</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <AlertTriangle size={32} style={{ color: 'var(--secondary)' }} />
                                <h3 className="text-2xl" style={{ color: 'var(--primary)' }}>Hemorrhage Management</h3>
                            </div>
                            <ol className="space-y-3 text-text-main opacity-80 list-decimal pl-5">
                                <li>Apply sustained direct pressure using sterile or purified cloth.</li>
                                <li>Maintain elevation of the affected extremity where physiological feasible.</li>
                                <li>Stabilize foreign objects; do not attempt extraction in the field.</li>
                                <li>Monitor for shock; maintain ambient warmth and minimize external stimuli.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="card-premium flex gap-8" style={{ borderLeft: '1px solid var(--secondary)', borderRadius: '4px' }}>
                        <div className="hidden md:block">
                            <span className="vertical-label">Crisis Level 03</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Activity size={32} style={{ color: 'var(--secondary)' }} />
                                <h3 className="text-2xl" style={{ color: 'var(--primary)' }}>Toxicological Emergency</h3>
                            </div>
                            <ol className="space-y-3 text-text-main opacity-80 list-decimal pl-5">
                                <li>Attempt identification of the toxin source for medical analysis.</li>
                                <li>Do NOT induce emesis (vomiting) without expert veterinary guidance.</li>
                                <li>Decontaminate coat/skin using PH-neutral surfactants if necessary.</li>
                                <li>Preserve samples of biologic matter for clinical testing.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstAid;
