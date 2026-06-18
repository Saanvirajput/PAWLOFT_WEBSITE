"use client";

import React from 'react';
import { Mic } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InsightsContent() {
  const episodes = [
    {
      tag: "Episode 12",
      title: "Urban Logistics of Animal Rescue",
      desc: "Discussing route optimization, traffic constraints, and emergency dispatch protocols with veteran NGO leaders."
    },
    {
      tag: "Episode 11",
      title: "Building a Responder Network",
      desc: "How we scale our verified responder base across new cities while maintaining quality control and motivation."
    },
    {
      tag: "Field Interview",
      title: "Data-Driven Veterinary Care",
      desc: "Partnering with modern clinics to standardize emergency treatments and share post-op recovery data."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-40">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-medium text-[#2C2825] mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
            Voices From The Field
          </h1>
          <p className="text-xl text-[#5C5753] font-light leading-relaxed">
            Every conversation teaches us something about how rescue really works. We use these ground realities to shape our product decisions, optimize routing algorithms, and understand the emotional toll on responders.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {episodes.map((ep, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              className="rounded-[32px] overflow-hidden border border-[#2C2825]/10 bg-white group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <div className="h-64 bg-[#EFECE5] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#8B2E49]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-20 h-20 rounded-full border border-[#2C2825]/10 flex items-center justify-center bg-white group-hover:scale-110 transition-transform duration-700 relative z-10 shadow-sm">
                  <Mic size={28} strokeWidth={1.5} className="text-[#2C2825] group-hover:text-[#8B2E49] transition-colors duration-500" />
                </div>
              </div>
              <div className="p-10">
                <p className="text-[11px] text-[#8B2E49] font-bold uppercase tracking-[0.2em] mb-4">{ep.tag}</p>
                <h3 className="text-2xl font-medium text-[#2C2825] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>{ep.title}</h3>
                <p className="text-[#5C5753] text-[15px] font-light leading-relaxed">{ep.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
