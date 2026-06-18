"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, MapPin, Share2, Copy, Check, Activity } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    fetchUser();
  }, [router, supabase]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Activity className="animate-pulse text-[#8B2E49]" size={32} />
      </div>
    );
  }

  if (!user) return null;

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'RESCUER';
  const referralCode = `PAW-${firstName.toUpperCase()}-${user.id.substring(0, 4).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-12">
            <Link href="/dashboard" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#2C2825]/10 text-[#5C5753] hover:text-[#2C2825] hover:bg-[#EFECE5] transition-colors mb-8 shadow-sm">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-4xl md:text-5xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Profile Settings
            </h1>
            <p className="text-[#5C5753] font-light">Manage your personal details and invite fellow responders.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#2C2825]/10 shadow-sm">
                <h2 className="text-2xl font-medium text-[#2C2825] mb-8" style={{ fontFamily: 'var(--font-serif)' }}>Personal Details</h2>
                
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-[#5C5753] uppercase tracking-[0.1em] mb-2">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User size={18} className="text-[#2C2825]/40" />
                        </div>
                        <input 
                          type="text" 
                          defaultValue={user.user_metadata?.full_name}
                          className="w-full pl-11 pr-4 py-3 bg-[#FDFBF7] border border-[#2C2825]/10 rounded-xl focus:ring-2 focus:ring-[#8B2E49]/20 focus:border-[#8B2E49] outline-none transition-all text-[#2C2825]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#5C5753] uppercase tracking-[0.1em] mb-2">Email Address</label>
                      <input 
                        type="email" 
                        disabled
                        defaultValue={user.email}
                        className="w-full px-4 py-3 bg-[#EFECE5]/50 border border-[#2C2825]/5 rounded-xl outline-none text-[#5C5753] cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-[#5C5753] uppercase tracking-[0.1em] mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone size={18} className="text-[#2C2825]/40" />
                        </div>
                        <input 
                          type="tel" 
                          placeholder="+91 98765 43210"
                          className="w-full pl-11 pr-4 py-3 bg-[#FDFBF7] border border-[#2C2825]/10 rounded-xl focus:ring-2 focus:ring-[#8B2E49]/20 focus:border-[#8B2E49] outline-none transition-all text-[#2C2825]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#5C5753] uppercase tracking-[0.1em] mb-2">Primary Operating Zone</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <MapPin size={18} className="text-[#2C2825]/40" />
                        </div>
                        <input 
                          type="text" 
                          placeholder="e.g. Bandra West, Mumbai"
                          className="w-full pl-11 pr-4 py-3 bg-[#FDFBF7] border border-[#2C2825]/10 rounded-xl focus:ring-2 focus:ring-[#8B2E49]/20 focus:border-[#8B2E49] outline-none transition-all text-[#2C2825]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#2C2825]/10">
                    <button 
                      type="submit"
                      disabled={saving}
                      className="px-8 py-3 bg-[#2C2825] text-white rounded-full font-medium hover:bg-[#8B2E49] transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {saving ? (
                         <><Activity size={18} className="animate-spin" /> Saving Changes...</>
                      ) : (
                         "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Referral */}
            <div>
              <div className="bg-[#8B2E49] rounded-[32px] p-8 shadow-xl relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20">
                    <Share2 size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-medium text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Invite Responders</h2>
                  <p className="text-white/80 font-light text-sm mb-8 leading-relaxed">
                    Build your network. Share your personal invite code with trusted friends and animal welfare volunteers to grant them expedited verified status.
                  </p>
                  
                  <div className="bg-black/20 border border-white/10 rounded-2xl p-4 backdrop-blur-sm mb-4">
                    <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-center">Your Invite Code</p>
                    <p className="text-white text-2xl font-mono font-bold text-center tracking-wider">{referralCode}</p>
                  </div>

                  <button 
                    onClick={() => handleCopyCode(referralCode)}
                    className="w-full py-3 bg-white text-[#8B2E49] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#FDFBF7] transition-colors shadow-sm"
                  >
                    {copied ? (
                      <><Check size={18} /> Copied to Clipboard</>
                    ) : (
                      <><Copy size={18} /> Copy Code</>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
