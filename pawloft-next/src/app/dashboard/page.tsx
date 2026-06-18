"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Activity } from 'lucide-react';
import ReporterDashboard from './ReporterDashboard';
import VolunteerDashboard from './VolunteerDashboard';
import NGODashboard from './NGODashboard';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [cases, setCases] = useState<any[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        router.push('/login');
        return;
      } 
      
      setUser(session.user);

      // Fetch user role from public.users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userError || !userData) {
        const pendingRole = localStorage.getItem('pawloft_pending_role') || 'Reporter';
        
        const { data: newUserData, error: upsertError } = await supabase
            .from('users')
            .upsert([{
                id: session.user.id,
                name: session.user.user_metadata?.full_name || 'Pawloft User',
                email: session.user.email,
                phone: session.user.id, // Fallback phone
                role: pendingRole
            }])
            .select()
            .single();
            
        if (!upsertError && newUserData) {
            setDbUser(newUserData);
            localStorage.removeItem('pawloft_pending_role');
            fetchCasesForRole(newUserData.role, session.user.id);
        } else {
            console.error("Upsert error:", upsertError);
            setErrorState(upsertError?.message || "Failed to create user profile. Please check database permissions.");
            setLoading(false);
        }
      } else {
        setDbUser(userData);
        fetchCasesForRole(userData.role, session.user.id);
      }
    };

    checkUserAndFetchData();
  }, [router, supabase]);

  const fetchCasesForRole = async (role: string, userId: string) => {
      let query = supabase.from('cases').select('*').order('created_at', { ascending: false });

      if (role === 'Reporter') {
          query = query.eq('reporter_id', userId);
      } else if (role === 'Volunteer') {
          const { data: volunteerProfile } = await supabase.from('volunteers').select('id').eq('user_id', userId).single();
          if (volunteerProfile) {
              query = query.eq('assigned_volunteer', volunteerProfile.id);
          } else {
              setCases([]);
              setLoading(false);
              return;
          }
      } else if (role === 'NGO') {
          // NGOs see all recent local cases
          query = query.limit(20);
      }

      const { data: casesData, error } = await query;
      
      if (error) {
          console.error("Fetch cases error:", error);
      } else if (casesData) {
        setCases(casesData);
      }
      setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Activity className="animate-pulse text-[#8B2E49]" size={32} />
      </div>
    );
  }

  if (errorState) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-2">Error Loading Dashboard</h2>
            <p className="text-sm mb-4">{errorState}</p>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold">Sign Out & Try Again</button>
        </div>
      </div>
    );
  }

  if (!user || !dbUser) return null;

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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#2C2825]/10 pb-8">
            <div className="flex items-center gap-6">
              {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#EFECE5] border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-[#8B2E49]">
                  {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)}
                </div>
              )}
              
              <div>
                <p className="text-[#8B2E49] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                    {dbUser.role === 'NGO' ? 'NGO / Shelter Operations' : dbUser.role === 'Volunteer' ? 'Responder Portal' : 'Reporter Profile'}
                </p>
                <h1 className="text-4xl md:text-5xl font-medium text-[#2C2825] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                  Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || dbUser.name?.split(' ')[0] || 'User'}
                </h1>
                <p className="text-[#5C5753] font-light">{user.email}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#2C2825]/20 text-[#2C2825] hover:bg-[#2C2825] hover:text-white transition-colors"
            >
              <LogOut size={16} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>

          {/* Role-Based Rendering */}
          {dbUser.role === 'Reporter' && <ReporterDashboard user={dbUser} cases={cases} />}
          {dbUser.role === 'Volunteer' && <VolunteerDashboard user={dbUser} cases={cases} volunteerProfile={null} />}
          {dbUser.role === 'NGO' && <NGODashboard />}

        </motion.div>
      </div>
    </div>
  );
}
