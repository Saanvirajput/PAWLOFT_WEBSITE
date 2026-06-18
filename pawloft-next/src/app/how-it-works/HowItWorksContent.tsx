"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HowItWorksContent() {
  const steps = [
    {
      num: "01",
      title: "Spot",
      desc: "You find an injured animal on the street needing medical attention. Do not attempt to move the animal unless it is in immediate danger (like traffic)."
    },
    {
      num: "02",
      title: "Report",
      desc: "Take a clear photo of the injury. Our system automatically captures your exact GPS location using your browser to ensure responders know exactly where to go."
    },
    {
      num: "03",
      title: "Dispatch",
      desc: "Nearby verified responders, local NGOs, and veterinary partners receive instant priority alerts based on their proximity (5km, 10km radius)."
    },
    {
      num: "04",
      title: "Rescue",
      desc: "A volunteer claims the case and navigates to your location. Treatment begins significantly faster through coordinated routing."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-40">
      <div className="container mx-auto px-6 lg:px-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-24"
        >
          <h1 className="text-5xl md:text-6xl font-medium text-[#2C2825] mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
            Standardized Rescue Flow
          </h1>
          <p className="text-xl text-[#5C5753] font-light leading-relaxed">
            Every day, thousands of injured animals are seen by people willing to help. The problem isn't compassion, it's coordination. Here is how Pawloft solves this with a structured, real-time dispatch protocol.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 relative mb-32 pt-10">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute left-[10%] right-[10%] h-[1px] bg-[#2C2825]/15 z-0" style={{ top: '60px' }}></div>

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative z-10 flex flex-col"
            >
              <div className="h-12 flex items-center mb-12 relative">
                {/* Number Background */}
                <span className="text-[120px] font-medium text-[#8B2E49]/5 absolute -left-8 z-0 leading-none pointer-events-none select-none tracking-tighter" style={{ fontFamily: 'var(--font-serif)', top: '50%', transform: 'translateY(-50%)' }}>
                  {step.num}
                </span>
                
                {/* Dot */}
                <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border border-[#2C2825]/10 flex items-center justify-center relative z-10 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-[#8B2E49]"></div>
                </div>
              </div>
              
              <div className="pl-2">
                <h3 className="text-2xl font-medium text-[#2C2825] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>{step.title}</h3>
                <p className="text-[#5C5753] leading-relaxed font-light text-[15px]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card-beige p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B2E49]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-medium text-[#2C2825] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Ready to be part of the solution?
            </h2>
            <p className="text-lg text-[#5C5753] font-light mb-12 max-w-2xl mx-auto">
              Whether you want to report an animal in need or sign up as a volunteer responder to save lives, your action starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/report" className="btn-pill">
                Report An Animal
              </Link>
              <Link href="/signup" className="btn-pill bg-transparent border border-[#8B2E49] text-[#8B2E49] hover:bg-[#8B2E49] hover:text-white">
                Become a Volunteer
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
