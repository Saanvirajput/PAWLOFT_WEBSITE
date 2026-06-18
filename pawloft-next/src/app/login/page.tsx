"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PawPrint, Users } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [inviteCode, setInviteCode] = useState('');
    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        
        if (inviteCode.trim()) {
            sessionStorage.setItem('pawloft_invite_code', inviteCode.trim().toUpperCase());
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

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B2E49]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2C2825]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-[32px] p-10 md:p-14 shadow-2xl border border-[#2C2825]/10 relative z-10"
            >
                <Link href="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#2C2825]/10 text-[#5C5753] hover:text-[#2C2825] hover:bg-[#EFECE5] transition-colors mb-10">
                    <ArrowLeft size={20} />
                </Link>

                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <PawPrint size={28} className="text-[#8B2E49]" />
                        <span className="text-xl font-bold tracking-widest text-[#2C2825] uppercase">Pawloft</span>
                    </div>
                    <h2 className="text-4xl font-medium text-[#2C2825] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Welcome Back</h2>
                    <p className="text-[#5C5753] font-light text-sm">Sign in securely to access your dashboard.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <label className="block text-[11px] font-bold text-[#5C5753] uppercase tracking-[0.1em] mb-2">Have an Invite Code? (Optional)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Users size={18} className="text-[#2C2825]/40" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="e.g. PAW-ARJUN-1234"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-[#FDFBF7] border border-[#2C2825]/10 rounded-xl focus:ring-2 focus:ring-[#8B2E49]/20 focus:border-[#8B2E49] outline-none transition-all text-[#2C2825] uppercase font-mono"
                            />
                        </div>
                    </div>

                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-[#2C2825]/10"></div>
                        <span className="flex-shrink-0 mx-4 text-[#5C5753] text-xs uppercase tracking-widest font-bold">OR</span>
                        <div className="flex-grow border-t border-[#2C2825]/10"></div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className={`w-full flex justify-center items-center gap-4 py-4 px-6 border border-[#2C2825]/20 rounded-full bg-white text-[15px] font-medium text-[#2C2825] hover:bg-[#FDFBF7] focus:outline-none transition-all shadow-sm ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md hover:-translate-y-0.5'}`}
                    >
                        {loading ? (
                            <span className="text-[#5C5753]">Connecting to Google...</span>
                        ) : (
                            <>
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Continue with Google
                            </>
                        )}
                    </button>
                </div>
                
                <p className="text-center text-xs text-[#5C5753]/60 mt-10 leading-relaxed">
                    By proceeding, you agree to Pawloft's <br/>Terms of Service and Privacy Policy.
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
