"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, PawPrint, ShieldCheck, HeartPulse, Building2, ChevronRight } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<'Reporter' | 'Volunteer' | 'Admin' | null>(null);
    const [phone, setPhone] = useState('');
    const [quizAnswers, setQuizAnswers] = useState({ q1: '', q2: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    // Check if already logged in
    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                router.push('/dashboard');
            }
        };
        checkUser();
    }, [router, supabase.auth]);

    const handleRoleSelect = (selectedRole: 'Reporter' | 'Volunteer' | 'Admin') => {
        setRole(selectedRole);
        setStep(selectedRole === 'Volunteer' ? 2 : 3);
    };

    const handleQuizSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!quizAnswers.q1 || !quizAnswers.q2) {
            setError('Please answer all quiz questions.');
            return;
        }
        setError('');
        setStep(3);
    };

    const handleGoogleLogin = async () => {
        if (!phone || phone.length < 10) {
            setError('A valid phone number is required to coordinate rescues.');
            return;
        }

        setLoading(true);
        setError('');
        
        // Save pending details to localStorage so the dashboard can pick them up and create the Postgres row
        localStorage.setItem('pawloft_pending_signup', JSON.stringify({
            role,
            phone
        }));

        const { error: supaError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            }
        });
        
        if (supaError) {
            setError(supaError.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-light flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="inline-flex items-center text-text-secondary hover:text-text-primary transition-colors mb-6">
                    <ArrowLeft size={20} className="mr-2" /> Back to Home
                </Link>

                <div className="flex items-center gap-2 mb-8">
                    <PawPrint size={32} className="text-secondary-accent" />
                    <span className="text-2xl font-bold tracking-tight text-text-primary">PAWLOFT</span>
                </div>
                
                <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-2">
                    {step === 1 ? "Join the Network" : step === 2 ? "Volunteer Assessment" : "Complete Profile"}
                </h2>
                <p className="text-text-secondary">
                    {step === 1 ? "Select your role to get started." : step === 2 ? "A quick check to ensure animal safety." : "Final step before joining."}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-premium sm:rounded-2xl sm:px-10 border border-border-subtle">
                    
                    {error && (
                        <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {/* STEP 1: ROLE SELECTION */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <button 
                                onClick={() => handleRoleSelect('Reporter')}
                                className="w-full text-left p-4 rounded-xl border border-border-subtle hover:border-primary-accent hover:shadow-md transition-all group bg-surface"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                            <ShieldCheck size={20} className="text-primary-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-primary">General Reporter</h3>
                                            <p className="text-xs text-text-secondary mt-1">Report injured animals & track cases.</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-text-tertiary group-hover:text-primary-accent" />
                                </div>
                            </button>

                            <button 
                                onClick={() => handleRoleSelect('Volunteer')}
                                className="w-full text-left p-4 rounded-xl border border-border-subtle hover:border-success hover:shadow-md transition-all group bg-surface"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                            <HeartPulse size={20} className="text-success" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-primary">Volunteer Responder</h3>
                                            <p className="text-xs text-text-secondary mt-1">Receive alerts & rescue animals nearby.</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-text-tertiary group-hover:text-success" />
                                </div>
                            </button>

                            <button 
                                onClick={() => handleRoleSelect('Admin')}
                                className="w-full text-left p-4 rounded-xl border border-border-subtle hover:border-text-primary hover:shadow-md transition-all group bg-surface"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                            <Building2 size={20} className="text-text-secondary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-primary">NGO / Admin</h3>
                                            <p className="text-xs text-text-secondary mt-1">Manage shelters & verify volunteers.</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-text-tertiary group-hover:text-text-primary" />
                                </div>
                            </button>
                        </div>
                    )}

                    {/* STEP 2: VOLUNTEER QUIZ */}
                    {step === 2 && (
                        <form onSubmit={handleQuizSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-text-primary mb-2">
                                    1. If you find a dog with a suspected spinal injury on the road, what is your immediate action?
                                </label>
                                <select 
                                    className="w-full p-3 border border-border-subtle rounded-lg bg-surface text-text-primary"
                                    value={quizAnswers.q1}
                                    onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})}
                                >
                                    <option value="">Select an answer...</option>
                                    <option value="wrong1">Pick them up immediately and run to a vet.</option>
                                    <option value="correct">Do not move them unless in traffic; slide a flat board under them to transport.</option>
                                    <option value="wrong2">Give them food and water immediately.</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-text-primary mb-2">
                                    2. Are you willing to be dispatched at odd hours for emergencies in your 5km radius?
                                </label>
                                <select 
                                    className="w-full p-3 border border-border-subtle rounded-lg bg-surface text-text-primary"
                                    value={quizAnswers.q2}
                                    onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})}
                                >
                                    <option value="">Select an answer...</option>
                                    <option value="yes">Yes, I am fully committed.</option>
                                    <option value="no">No, only on weekends.</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full btn btn-primary">
                                Continue
                            </button>
                        </form>
                    )}

                    {/* STEP 3: PHONE & GOOGLE AUTH */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="bg-surface p-4 rounded-xl border border-border-subtle mb-6">
                                <p className="text-sm font-medium text-text-primary flex justify-between">
                                    Selected Role: <span className="text-primary-accent font-bold">{role}</span>
                                </p>
                                <button onClick={() => setStep(1)} className="text-xs text-text-secondary underline mt-1">Change Role</button>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-text-primary mb-2">
                                    Phone Number (Required for coordination)
                                </label>
                                <input 
                                    type="tel"
                                    placeholder="+91 99999 99999"
                                    className="w-full p-3 border border-border-subtle rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary-accent outline-none"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="pt-4 border-t border-border-subtle">
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    className={`w-full flex justify-center items-center gap-3 py-3 px-4 border border-border-subtle rounded-xl shadow-sm bg-white text-base font-bold text-text-primary hover:bg-surface transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <span className="text-text-secondary">Authenticating...</span>
                                    ) : (
                                        <>
                                            <svg className="h-6 w-6" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                            </svg>
                                            Continue with Google
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                    
                </div>
                <p className="text-center text-xs text-text-tertiary mt-8">
                    By proceeding, you agree to Pawloft's Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default Signup;
