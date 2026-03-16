import React from 'react';
import { Activity, Thermometer, AlertTriangle } from 'lucide-react';

const FirstAid = () => {
    const EmergencyCard = ({ icon: Icon, title, steps, color }) => (
        <div className="emergency-card" style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: `5px solid ${color}`
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <Icon size={32} style={{ color: color }} />
                <h3 style={{ margin: 0, color: 'var(--primary)' }}>{title}</h3>
            </div>
            <ol style={{ paddingLeft: '20px', color: 'var(--text-light)', lineHeight: '1.6' }}>
                {steps.map((step, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>{step}</li>
                ))}
            </ol>
        </div>
    );

    return (
        <div className="page-container" style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--bg-cream)' }}>
            <div className="container">
                <h1 className="section-title text-center">First Aid Guidance</h1>
                <p className="text-center" style={{ maxWidth: '700px', margin: '0 auto 50px', color: 'var(--text-light)' }}>
                    Basic emergency steps to stabilize an animal before professional veterinary help arrives.
                    <strong> Always contact a vet immediately.</strong>
                </p>

                <div className="emergency-grid" style={{ display: 'grid', gap: '30px' }}>
                    <EmergencyCard
                        icon={Thermometer}
                        title="Heatstroke"
                        color="#ef4444"
                        steps={[
                            "Move the animal to a shaded, cool area immediately.",
                            "Offer small amounts of cool (not ice-cold) water to drink.",
                            "Pour cool water over their body, focusing on paws and ears.",
                            "Do not cover them with wet towels as it can trap heat.",
                            "Transport to a vet with air conditioning on."
                        ]}
                    />

                    <EmergencyCard
                        icon={AlertTriangle}
                        title="Bleeding / Wounds"
                        color="#f59e0b"
                        steps={[
                            "Apply direct pressure to the wound with a clean cloth or gauze.",
                            "Elevate the injured limb if possible.",
                            "Do not remove embedded objects; stabilize them instead.",
                            "Keep the animal calm and warm to prevent shock.",
                            "Seek veterinary attention immediately."
                        ]}
                    />

                    <EmergencyCard
                        icon={Activity}
                        title="Suspected Poisoning"
                        color="#8b5cf6"
                        steps={[
                            "Identify the toxin if possible (take the packaging).",
                            "Do NOT induce vomiting unless instructed by a vet.",
                            "Wash any poison off the fur with mild soap and water.",
                            "Keep samples of vomit or stool if available for testing.",
                            "Call your local vet or poison control center ASAP."
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default FirstAid;
