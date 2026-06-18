import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, AlertCircle, ShieldCheck, Activity } from 'lucide-react';
import Link from 'next/link';

export default function NGODashboard({ metrics }: { metrics?: any }) {
  // Use mock metrics for the prototype, since admin aggregations aren't in Supabase yet
  const displayMetrics = metrics || {
    totalRescues: 0,
    activeVolunteers: 0,
    criticalCases: 0,
    pendingVerifications: 0
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <h2 className="text-2xl font-medium text-[#2C2825]" style={{ fontFamily: 'var(--font-serif)' }}>System Overview</h2>
        
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-[24px] border border-[#2C2825]/10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#EFECE5] flex items-center justify-center">
                <BarChart3 size={18} className="text-[#2C2825]" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5C5753]">Total Rescues</h3>
            </div>
            <p className="text-4xl font-medium text-[#2C2825]" style={{ fontFamily: 'var(--font-serif)' }}>{displayMetrics.totalRescues}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-[24px] border border-[#2C2825]/10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <Users size={18} className="text-green-700" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5C5753]">Active Volunteers</h3>
            </div>
            <p className="text-4xl font-medium text-[#2C2825]" style={{ fontFamily: 'var(--font-serif)' }}>{displayMetrics.activeVolunteers}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#8B2E49]/5 p-6 rounded-[24px] border border-[#8B2E49]/20 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#8B2E49]/10 flex items-center justify-center">
                <AlertCircle size={18} className="text-[#8B2E49]" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#8B2E49]">Critical Cases</h3>
            </div>
            <p className="text-4xl font-medium text-[#8B2E49]" style={{ fontFamily: 'var(--font-serif)' }}>{displayMetrics.criticalCases}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-[24px] border border-[#2C2825]/10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#EFECE5] flex items-center justify-center">
                <ShieldCheck size={18} className="text-[#2C2825]" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5C5753]">Pending Approvals</h3>
            </div>
            <p className="text-4xl font-medium text-[#2C2825]" style={{ fontFamily: 'var(--font-serif)' }}>{displayMetrics.pendingVerifications}</p>
          </motion.div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Control Center</h2>
        
        <Link href="/dashboard/volunteers">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#2C2825] p-6 rounded-[24px] shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer mb-6 block"
          >
            <h3 className="text-xl font-medium text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Manage Volunteers</h3>
            <p className="text-white/80 text-sm font-light mb-6">Review applications and verify responder credentials.</p>
            <span className="text-white text-sm font-bold tracking-wide uppercase">Open Portal →</span>
          </motion.div>
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-[24px] border border-[#2C2825]/10 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-[#EFECE5] flex items-center justify-center mb-4">
            <Activity size={18} className="text-[#8B2E49]" />
          </div>
          <h3 className="text-lg font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Global Map</h3>
          <p className="text-[#5C5753] text-sm font-light mb-4">View all platform activity and dispatch density.</p>
          <Link href="/rescue-network" className="text-[#8B2E49] text-sm font-semibold hover:underline">Open Live Map →</Link>
        </motion.div>
      </div>
    </div>
  );
}
