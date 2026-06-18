"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PawPrint, Mail, Lock, User, Phone, ShieldCheck, HeartPulse, Building2, ChevronRight, ShieldAlert } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [loginType, setLoginType] = useState<'user' | 'admin'>('user');
    const [signupStep, setSignupStep] = useState<1 | 2>(1); // 1: Role, 2: Details
    const [role, setRole] = useState<'Reporter' | 'Volunteer' | 'NGO'>('Reporter');
    
    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const supabase = createClient();
    const router = useRouter();

    const handleGoogleAuth = async () => {
        setLoading(true);
        setError('');
        
        if (mode === 'signup') {
            localStorage.setItem('pawloft_pending_role', role);
        }
        
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

    const handleManualAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (mode === 'signup') {
            if (!email || !password || !name || !phone) {
                setError("All fields are required.");
                setLoading(false);
                return;
            }
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        phone: phone
                    }
                }
            });

            if (signUpError) {
                setError(signUpError.message);
            } else {
                if (data.user) {
                    await supabase.from('users').upsert([{
                        id: data.user.id,
                        name,
                        email,
                        phone,
                        role
                    }]);
                    router.push('/dashboard');
                }
            }
        } else {
            if (!email || !password) {
                setError("Email and password required.");
                setLoading(false);
                return;
            }
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (signInError) {
                setError(signInError.message);
            } else if (data.user) {
                // Check Role for Admin Login
                const { data: userData } = await supabase.from('users').select('role').eq('id', data.user.id).single();
                
                if (loginType === 'admin') {
                    if (userData?.role === 'Admin') {
                        // Redirect to separate Pawloft Admin portal
                        window.location.href = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001';
                    } else {
                        setError("Access Denied: You do not have Admin privileges.");
                        await supabase.auth.signOut();
                    }
                } else {
                    if (userData?.role === 'Admin') {
                        setError("Admins must use the Admin Login portal.");
                        await supabase.auth.signOut();
                    } else {
                        router.push('/dashboard');
                    }
                }
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B2E49]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2C2825]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-[32px] p-8 md:p-10 shadow-2xl border border-[#2C2825]/10 relative z-10"
            >
                <div className="flex justify-between items-center mb-8">
                    <Link href="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#2C2825]/10 text-[#5C5753] hover:text-[#2C2825] hover:bg-[#EFECE5] transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex bg-[#FDFBF7] border border-[#2C2825]/10 p-1 rounded-full">
                        <button 
                            onClick={() => {setMode('login'); setError(''); setLoginType('user');}}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'login' && loginType === 'user' ? 'bg-white shadow-sm text-[#2C2825]' : 'text-[#5C5753] hover:text-[#2C2825]'}`}
                        >
                            Log In
                        </button>
                        <button 
                            onClick={() => {setMode('signup'); setSignupStep(1); setError(''); setLoginType('user');}}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'signup' ? 'bg-white shadow-sm text-[#2C2825]' : 'text-[#5C5753] hover:text-[#2C2825]'}`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <PawPrint size={28} className="text-[#8B2E49]" />
                    </div>
                    <h2 className="text-3xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                        {mode === 'login' ? (loginType === 'admin' ? 'Admin Access' : 'Welcome Back') : signupStep === 1 ? 'Choose Your Path' : 'Create Account'}
                    </h2>
                    <p className="text-[#5C5753] font-light text-sm">
                        {mode === 'login' ? (loginType === 'admin' ? 'Secure backend portal for system administrators.' : 'Sign in securely to access your dashboard.') : signupStep === 1 ? 'How do you want to use Pawloft?' : 'Join the rescue network.'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* SIGNUP STEP 1: ROLE SELECTION */}
                {mode === 'signup' && signupStep === 1 && (
                    <div className="space-y-3 mb-6">
                        {[
                            { id: 'Reporter', icon: ShieldCheck, title: 'General Reporter', desc: 'Report injured animals & track cases.' },
                            { id: 'Volunteer', icon: HeartPulse, title: 'Volunteer Responder', desc: 'Receive alerts & rescue animals nearby.' },
                            { id: 'NGO', icon: Building2, title: 'NGO / Shelter', desc: 'Manage shelter intake and operations.' }
                        ].map((r) => (
                            <button 
                                key={r.id}
                                onClick={() => { setRole(r.id as any); setSignupStep(2); }}
                                className="w-full text-left p-4 rounded-[20px] border border-[#2C2825]/10 hover:border-[#8B2E49] hover:bg-[#FDFBF7] transition-all group bg-white shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center shadow-inner border border-[#2C2825]/5 group-hover:bg-white transition-colors">
                                            <r.icon size={20} className={r.id === 'Volunteer' ? 'text-green-600' : 'text-[#8B2E49]'} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#2C2825]">{r.title}</h3>
                                            <p className="text-xs text-[#5C5753] mt-0.5">{r.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-[#5C5753] group-hover:text-[#8B2E49]" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* LOGIN OR SIGNUP STEP 2: DETAILS */}
                {((mode === 'login') || (mode === 'signup' && signupStep === 2)) && (
                    <AnimatePresence mode="wait">
                        <motion.form 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleManualAuth} 
                            className="space-y-4"
                        >
                            {mode === 'signup' && (
                                <div className="flex items-center justify-between bg-[#FDFBF7] p-3 rounded-xl border border-[#2C2825]/10 mb-4">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#5C5753]">Role</span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#8B2E49] bg-[#8B2E49]/10 px-2 py-1 rounded">{role}</span>
                                </div>
                            )}

                            {mode === 'signup' && (
                                <>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2825]/40" />
                                        <input 
                                            type="text" placeholder="Full Name or Organization" required
                                            value={name} onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-[#FDFBF7] border border-[#2C2825]/10 rounded-xl focus:ring-2 focus:ring-[#8B2E49]/20 focus:border-[#8B2E49] outline-none text-[#2C2825]"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2825]/40" />
                                        <input 
                                            type="tel" placeholder="Phone Number" required
                                            value={phone} onChange={(e) => setPhone(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-[#FDFBF7] border border-[#2C2825]/10 rounded-xl focus:ring-2 focus:ring-[#8B2E49]/20 focus:border-[#8B2E49] outline-none text-[#2C2825]"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2825]/40" />
                                <input 
                                    type="email" placeholder="Email Address" required
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-[#FDFBF7] border border-[#2C2825]/10 rounded-xl focus:ring-2 focus:ring-[#8B2E49]/20 focus:border-[#8B2E49] outline-none text-[#2C2825]"
                                />
                            </div>
                            
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2825]/40" />
                                <input 
                                    type="password" placeholder="Password" required minLength={6}
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-[#FDFBF7] border border-[#2C2825]/10 rounded-xl focus:ring-2 focus:ring-[#8B2E49]/20 focus:border-[#8B2E49] outline-none text-[#2C2825]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3.5 px-6 rounded-full bg-[#2C2825] text-white font-bold tracking-wider hover:bg-[#8B2E49] transition-colors shadow-md mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Processing...' : mode === 'login' ? (loginType === 'admin' ? 'Login as Admin' : 'Log In') : 'Create Account'}
                            </button>
                        </motion.form>
                    </AnimatePresence>
                )}

                {((mode === 'login' && loginType === 'user') || (mode === 'signup' && signupStep === 2)) && (
                    <>
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-[#2C2825]/10"></div>
                            <span className="flex-shrink-0 mx-4 text-[#5C5753] text-xs uppercase tracking-widest font-bold">OR</span>
                            <div className="flex-grow border-t border-[#2C2825]/10"></div>
                        </div>

                        <button
                            onClick={handleGoogleAuth}
                            disabled={loading}
                            className={`w-full flex justify-center items-center gap-3 py-3.5 px-6 border border-[#2C2825]/20 rounded-full bg-white text-sm font-bold text-[#2C2825] hover:bg-[#FDFBF7] transition-all shadow-sm ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-md'}`}
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>
                    </>
                )}

                {/* Admin Portal Toggle */}
                {mode === 'login' && (
                    <div className="mt-8 text-center border-t border-[#2C2825]/10 pt-6">
                        {loginType === 'user' ? (
                            <button 
                                onClick={() => { setLoginType('admin'); setError(''); }}
                                className="flex items-center justify-center gap-2 mx-auto text-xs font-bold text-[#8B2E49] uppercase tracking-widest hover:underline"
                            >
                                <ShieldAlert size={14} /> System Admin Portal
                            </button>
                        ) : (
                            <button 
                                onClick={() => { setLoginType('user'); setError(''); }}
                                className="flex items-center justify-center gap-2 mx-auto text-xs font-bold text-[#5C5753] uppercase tracking-widest hover:underline"
                            >
                                <User size={14} /> Back to User Login
                            </button>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
