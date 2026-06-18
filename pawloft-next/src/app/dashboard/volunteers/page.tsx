"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, ShieldAlert, ShieldCheck, Activity, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ManageVolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'verified'>('pending');
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchVolunteers = async () => {
      // 1. Verify Authentication & Role
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      
      const { data: userData } = await supabase.from('users').select('role').eq('id', session.user.id).single();
      if (userData?.role !== 'NGO' && userData?.role !== 'Admin') {
          router.push('/dashboard');
          return;
      }

      // 2. Fetch Volunteers alongside their User data
      const { data, error } = await supabase
        .from('volunteers')
        .select(`
          *,
          user:user_id (
            name,
            email,
            phone,
            created_at
          )
        `)
        .order('last_location_update', { ascending: false });

      if (data) {
          setVolunteers(data);
      }
      setLoading(false);
    };

    fetchVolunteers();
  }, [router, supabase]);

  const handleVerify = async (volunteerId: string, approve: boolean) => {
      setProcessingId(volunteerId);
      
      const newStatus = approve ? 'Verified' : 'Rejected';
      
      const { error } = await supabase
        .from('volunteers')
        .update({ verification_status: newStatus })
        .eq('id', volunteerId);
        
      if (!error) {
          setVolunteers(prev => 
              prev.map(v => v.id === volunteerId ? { ...v, verification_status: newStatus } : v)
          );
      }
      
      setProcessingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Activity className="animate-pulse text-[#8B2E49]" size={32} />
      </div>
    );
  }

  const pendingVolunteers = volunteers.filter(v => v.verification_status === 'Pending');
  const verifiedVolunteers = volunteers.filter(v => v.verification_status === 'Verified');
  const displayList = activeTab === 'pending' ? pendingVolunteers : verifiedVolunteers;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 relative">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-[#2C2825]/10 pb-8">
            <div>
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#5C5753] hover:text-[#2C2825] transition-colors mb-4">
                  <ArrowLeft size={16} /> Back to Dashboard
              </Link>
              <h1 className="text-4xl md:text-5xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                Volunteer Management
              </h1>
              <p className="text-[#5C5753] font-light">Review and verify responder credentials to ensure network safety.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setActiveTab('pending')}
                className={`px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${activeTab === 'pending' ? 'bg-[#2C2825] text-white shadow-lg' : 'bg-white text-[#5C5753] border border-[#2C2825]/10 hover:bg-[#EFECE5]'}`}
              >
                  Pending Approvals <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'pending' ? 'bg-[#8B2E49] text-white' : 'bg-[#EFECE5] text-[#5C5753]'}`}>{pendingVolunteers.length}</span>
              </button>
              <button 
                onClick={() => setActiveTab('verified')}
                className={`px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${activeTab === 'verified' ? 'bg-[#2C2825] text-white shadow-lg' : 'bg-white text-[#5C5753] border border-[#2C2825]/10 hover:bg-[#EFECE5]'}`}
              >
                  Active Squad <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'verified' ? 'bg-[#8B2E49] text-white' : 'bg-[#EFECE5] text-[#5C5753]'}`}>{verifiedVolunteers.length}</span>
              </button>
          </div>

          {/* List */}
          <div className="space-y-6">
              {displayList.length === 0 ? (
                  <div className="bg-white p-12 rounded-[24px] border border-[#2C2825]/10 text-center shadow-sm">
                      <div className="w-16 h-16 rounded-full bg-[#EFECE5] flex items-center justify-center mx-auto mb-4">
                          {activeTab === 'pending' ? <ShieldCheck size={24} className="text-[#5C5753]" /> : <Activity size={24} className="text-[#5C5753]" />}
                      </div>
                      <h3 className="text-xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                          {activeTab === 'pending' ? 'No Pending Applications' : 'No Verified Volunteers'}
                      </h3>
                      <p className="text-[#5C5753] font-light max-w-sm mx-auto">
                          {activeTab === 'pending' ? 'All volunteer applications have been reviewed.' : 'Verified volunteers will appear here.'}
                      </p>
                  </div>
              ) : (
                  <AnimatePresence>
                      {displayList.map((volunteer) => (
                          <motion.div 
                              key={volunteer.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="bg-white rounded-[24px] p-6 md:p-8 border border-[#2C2825]/10 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
                          >
                              <div className="flex gap-6 items-center">
                                  <div className="w-16 h-16 rounded-full bg-[#FDFBF7] border border-[#2C2825]/10 flex items-center justify-center text-2xl font-bold text-[#8B2E49] shadow-inner shrink-0">
                                      {volunteer.user?.name?.charAt(0) || 'V'}
                                  </div>
                                  
                                  <div>
                                      <div className="flex items-center gap-3 mb-1">
                                          <h3 className="text-xl font-medium text-[#2C2825]" style={{ fontFamily: 'var(--font-serif)' }}>
                                              {volunteer.user?.name || 'Unknown User'}
                                          </h3>
                                          {volunteer.verification_status === 'Verified' ? (
                                              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                                                  <ShieldCheck size={12} /> Verified
                                              </span>
                                          ) : (
                                              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                                                  <ShieldAlert size={12} /> Action Required
                                              </span>
                                          )}
                                      </div>
                                      
                                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#5C5753] mt-2">
                                          <span className="flex items-center gap-1.5"><Mail size={14} /> {volunteer.user?.email}</span>
                                          <span className="flex items-center gap-1.5"><Phone size={14} /> {volunteer.user?.phone || 'No phone'}</span>
                                          <span className="flex items-center gap-1.5"><Clock size={14} /> Joined {new Date(volunteer.user?.created_at).toLocaleDateString()}</span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="w-full md:w-auto flex items-center gap-3 border-t border-[#2C2825]/5 pt-4 md:pt-0 md:border-t-0">
                                  {activeTab === 'pending' ? (
                                      <>
                                          <button 
                                              onClick={() => handleVerify(volunteer.id, false)}
                                              disabled={processingId === volunteer.id}
                                              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 transition-colors disabled:opacity-50"
                                          >
                                              <XCircle size={16} /> Reject
                                          </button>
                                          <button 
                                              onClick={() => handleVerify(volunteer.id, true)}
                                              disabled={processingId === volunteer.id}
                                              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-[#2C2825] text-white font-bold text-sm hover:bg-[#8B2E49] transition-colors shadow-md disabled:opacity-50"
                                          >
                                              <CheckCircle2 size={16} /> Approve
                                          </button>
                                      </>
                                  ) : (
                                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FDFBF7] border border-[#2C2825]/5 text-sm">
                                          <Activity size={16} className={volunteer.is_available ? "text-green-600" : "text-[#5C5753]"} />
                                          <span className="font-bold text-[#2C2825]">{volunteer.is_available ? 'Available for Dispatch' : 'Currently Offline'}</span>
                                      </div>
                                  )}
                              </div>
                          </motion.div>
                      ))}
                  </AnimatePresence>
              )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
