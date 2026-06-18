"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function RoadmapContent() {
  const phases = [
    {
      phase: "Phase 1",
      title: "EMERGENCY REPORTING",
      desc: "Location-based reporting, automated GPS capture, and standardized photo data collection.",
      status: "completed"
    },
    {
      phase: "Phase 2",
      title: "RESPONDER DISPATCH",
      desc: "Smart routing, proximity-based alerts (5km/10km radius), and real-time live map operations center.",
      status: "completed"
    },
    {
      phase: "Phase 3",
      title: "NGO NETWORK",
      desc: "Unified enterprise dashboards for shelters to manage capacity, track incoming cases, and align medical resources.",
      status: "active"
    },
    {
      phase: "Phase 4",
      title: "AMBULANCE LAYER",
      desc: "Integrated fleet management, dedicated emergency transit, and dynamic routing for critical trauma cases.",
      status: "upcoming"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-40">
      <div className="container mx-auto px-6 lg:px-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mb-24"
        >
          <h1 className="text-5xl md:text-6xl font-medium text-[#2C2825] mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
            India's Rescue Infrastructure
          </h1>
          <p className="text-xl text-[#5C5753] font-light leading-relaxed">
            We are building the coordination layer for animal welfare. Here is our step-by-step execution roadmap to transform chaotic volunteer efforts into a streamlined, tech-driven dispatch engine.
          </p>
        </motion.div>

        <div className="relative mt-20">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[23px] left-[10%] right-[10%] h-[2px] bg-[#2C2825]/10 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 relative z-10">
            {phases.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="flex flex-col relative"
              >
                {/* Status Indicator */}
                <div className="h-12 flex items-center mb-8 relative">
                  {item.status === 'completed' ? (
                    <div className="w-12 h-12 rounded-full bg-[#8B2E49] border-[6px] border-[#FDFBF7] flex items-center justify-center relative z-10 shadow-sm mx-auto md:mx-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : item.status === 'active' ? (
                    <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border-[6px] border-[#FDFBF7] flex items-center justify-center relative z-10 shadow-sm mx-auto md:mx-0 ring-1 ring-[#2C2825]/20">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border-[6px] border-[#FDFBF7] flex items-center justify-center relative z-10 shadow-sm mx-auto md:mx-0 ring-1 ring-[#2C2825]/10">
                      <div className="w-2 h-2 rounded-full bg-[#2C2825]/20"></div>
                    </div>
                  )}
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>{item.phase}</h3>
                  <p className={`text-[10px] tracking-[0.2em] font-bold uppercase mb-4 ${item.status === 'completed' ? 'text-[#8B2E49]' : 'text-[#5C5753]/60'}`}>
                    {item.title}
                  </p>
                  <p className="text-[#5C5753] leading-relaxed font-light text-[15px]">
                    {item.desc}
                  </p>
                  {item.status === 'completed' && (
                    <span className="inline-block mt-4 text-xs font-semibold text-[#8B2E49] bg-[#8B2E49]/5 px-3 py-1 rounded-full">✓ Completed</span>
                  )}
                  {item.status === 'active' && (
                    <span className="inline-block mt-4 text-xs font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">In Progress</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
