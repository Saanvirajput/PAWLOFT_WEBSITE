import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Calendar, Clock, AlertTriangle, Activity, Settings } from 'lucide-react';
import Link from 'next/link';

export default function ReporterDashboard({ user, cases }: { user: any, cases: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left Column: Past Reports */}
      <div className="lg:col-span-2 space-y-12">
        <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium text-[#2C2825]" style={{ fontFamily: 'var(--font-serif)' }}>Your Reports</h2>
              <span className="text-sm font-medium text-[#8B2E49] bg-[#8B2E49]/10 px-4 py-1.5 rounded-full">
                {cases.length} Total
              </span>
            </div>

            {cases.length === 0 ? (
                <div className="bg-white p-8 rounded-[24px] border border-[#2C2825]/10 text-center shadow-sm">
                    <p className="text-[#5C5753] font-light">You haven't reported any emergencies yet.</p>
                </div>
            ) : (
                cases.map((caseItem, idx) => (
                <motion.div 
                    key={caseItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="bg-white rounded-[24px] border border-[#2C2825]/10 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                >
                    <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                        <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-mono font-bold text-[#5C5753] bg-[#EFECE5] px-3 py-1 rounded-md">
                            CASE: {caseItem.case_number}
                            </span>
                            {(caseItem.status === 'Closed' || caseItem.status === 'Rescue Done') && (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-md">
                                <CheckCircle2 size={14} /> Rescue Completed
                            </span>
                            )}
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

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#FDFBF7] rounded-xl border border-[#2C2825]/5">
                        <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#5C5753] font-bold mb-1">Severity</p>
                        <p className="text-[#2C2825] font-medium text-sm flex items-center gap-1">
                            {caseItem.severity === 'Critical' || caseItem.severity === 'High' ? (
                            <AlertTriangle size={14} className="text-[#8B2E49]" />
                            ) : null}
                            {caseItem.severity}
                        </p>
                        </div>
                        <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#5C5753] font-bold mb-1">Status</p>
                        <p className="text-[#2C2825] font-medium text-sm">{caseItem.status}</p>
                        </div>
                        <div className="col-span-2">
                        <p className="text-[10px] uppercase tracking-wider text-[#5C5753] font-bold mb-1">Resolution Time</p>
                        <p className="text-[#2C2825] font-medium text-sm">
                            {caseItem.updated_at && caseItem.status === 'Closed' ? Math.max(1, Math.round((new Date(caseItem.updated_at).getTime() - new Date(caseItem.created_at).getTime()) / (1000 * 60 * 60))) + ' Hours' : 'In Progress'}
                        </p>
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
        <h2 className="text-2xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Actions</h2>
        
        <Link href="/report">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#8B2E49] p-6 rounded-[24px] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer mb-6 block"
          >
            <h3 className="text-xl font-medium text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Report Emergency</h3>
            <p className="text-white/80 text-sm font-light mb-6">Dispatch our rescue team instantly with GPS and photo data.</p>
            <span className="text-white text-sm font-bold tracking-wide uppercase">Open Scanner →</span>
          </motion.div>
        </Link>

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
    </div>
  );
}
