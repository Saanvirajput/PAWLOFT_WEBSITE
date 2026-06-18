import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Activity, Settings, MapPin, Calendar, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import SquadChat from './SquadChat';

export default function VolunteerDashboard({ user, cases, volunteerProfile }: { user: any, cases: any[], volunteerProfile: any }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-12">
        
        {/* My Squad Module */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#2C2825] rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-xl"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B2E49]/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Users size={20} className="text-[#8B2E49]" />
                        <h2 className="text-2xl font-medium" style={{ fontFamily: 'var(--font-serif)' }}>Rescue Squad Network</h2>
                    </div>
                    <p className="text-white/60 text-sm font-light">Collaborate and respond to emergencies faster with your trusted network.</p>
                </div>
            </div>

            <div className="flex items-center gap-6 relative z-10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsChatOpen(true)}
                        className="flex items-center gap-2 bg-white text-[#2C2825] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#EFECE5] transition-colors"
                    >
                        <MessageCircle size={16} /> Open Squad Comms
                    </button>
                    <Link href="/settings" className="text-xs font-medium text-white/70 hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                        Manage Availability
                    </Link>
                </div>
            </div>
        </motion.div>

        {/* Assigned Missions */}
        <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium text-[#2C2825]" style={{ fontFamily: 'var(--font-serif)' }}>Assigned Missions</h2>
              <span className="text-sm font-medium text-[#8B2E49] bg-[#8B2E49]/10 px-4 py-1.5 rounded-full">
                {cases.length} Active
              </span>
            </div>

            {cases.length === 0 ? (
                <div className="bg-white p-8 rounded-[24px] border border-[#2C2825]/10 text-center shadow-sm">
                    <p className="text-[#5C5753] font-light">You have no active rescue assignments right now.</p>
                </div>
            ) : (
                cases.map((caseItem, idx) => (
                <motion.div 
                    key={caseItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="bg-white rounded-[24px] border border-[#2C2825]/10 shadow-sm overflow-hidden hover:border-[#8B2E49] transition-all duration-300"
                >
                    <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                        <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-mono font-bold text-[#8B2E49] bg-[#8B2E49]/10 px-3 py-1 rounded-md">
                            ACTIVE: {caseItem.case_number}
                            </span>
                        </div>
                        <h3 className="text-2xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                            {caseItem.animal_type}
                        </h3>
                        <p className="flex items-center gap-2 text-[#5C5753] text-sm">
                            <MapPin size={16} /> {caseItem.address || 'Location Recorded via GPS'}
                        </p>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end gap-2 text-sm text-[#5C5753]">
                        <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(caseItem.created_at).toLocaleDateString()}</span>
                        <span className="flex items-center gap-2"><Clock size={14} /> {new Date(caseItem.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-[#FDFBF7] rounded-xl border border-[#2C2825]/5">
                        <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#5C5753] font-bold mb-1">Severity</p>
                        <p className="text-[#2C2825] font-medium text-sm flex items-center gap-1">
                            <AlertTriangle size={14} className="text-[#8B2E49]" /> {caseItem.severity}
                        </p>
                        </div>
                        <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#5C5753] font-bold mb-1">Status</p>
                        <p className="text-[#2C2825] font-medium text-sm">{caseItem.status}</p>
                        </div>
                        <div className="flex justify-end items-center">
                            <button className="text-sm font-bold text-white bg-[#8B2E49] px-4 py-2 rounded-lg hover:bg-[#6E2238] transition-colors">Update Status</button>
                        </div>
                    </div>
                    </div>
                </motion.div>
                ))
            )}
        </div>
      </div>

      {/* Right Column: Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Quick Actions</h2>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#FDFBF7] p-6 rounded-[24px] border border-[#2C2825]/10 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
            <Activity size={18} className="text-[#8B2E49]" />
          </div>
          <h3 className="text-lg font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Live Radar</h3>
          <p className="text-[#5C5753] text-sm font-light mb-4">View real-time emergency pings in your radius.</p>
          <Link href="/rescue-network" className="text-[#8B2E49] text-sm font-semibold hover:underline">Open Live Map →</Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-[24px] border border-[#2C2825]/10 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-[#EFECE5] flex items-center justify-center mb-4">
            <Settings size={18} className="text-[#8B2E49]" />
          </div>
          <h3 className="text-lg font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Profile Settings</h3>
          <p className="text-[#5C5753] text-sm font-light mb-4">Manage notification preferences.</p>
          <Link href="/settings" className="text-[#8B2E49] text-sm font-semibold hover:underline">Manage Account →</Link>
        </motion.div>
      </div>

      <SquadChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        userName={user?.user_metadata?.full_name?.split(' ')[0] || 'Volunteer'} 
      />
    </div>
  );
}
