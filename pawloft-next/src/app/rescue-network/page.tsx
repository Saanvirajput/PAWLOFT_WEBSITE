"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Activity } from 'lucide-react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const RescueMap = dynamic(() => import('@/components/RescueMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center bg-[#EFECE5]/50 border border-[#2C2825]/10 rounded-3xl text-[#5C5753]"><Activity className="animate-pulse mr-2" /> Initializing Geolocation Grid...</div>
});

export default function RescueNetworkPage() {
  return (
    <>
      <Head>
        <title>Live Rescue Network | Pawloft</title>
        <meta name="description" content="View the live Pawloft rescue operations center and active responders in your area." />
      </Head>
      <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12"
          >
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-medium text-[#2C2825] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Rescue Operations Center
              </h1>
              <p className="text-[#5C5753] text-lg font-light leading-relaxed">
                Real-time visibility into active cases, deployed responders, and verified medical facilities around your location.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <div className="flex items-center gap-3 bg-[#EFECE5] px-5 py-2.5 rounded-full border border-[#2C2825]/10 shadow-sm transition-all hover:bg-white cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs text-[#2C2825] font-semibold tracking-wide uppercase">Awaiting Response</span>
              </div>
              <div className="flex items-center gap-3 bg-[#EFECE5] px-5 py-2.5 rounded-full border border-[#2C2825]/10 shadow-sm transition-all hover:bg-white cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="text-xs text-[#2C2825] font-semibold tracking-wide uppercase">Responder Assigned</span>
              </div>
              <div className="flex items-center gap-3 bg-[#EFECE5] px-5 py-2.5 rounded-full border border-[#2C2825]/10 shadow-sm transition-all hover:bg-white cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-xs text-[#2C2825] font-semibold tracking-wide uppercase">Treatment Started</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full h-[700px] relative rounded-[32px] overflow-hidden shadow-2xl border border-[#2C2825]/10 bg-white"
          >
            <RescueMap />
            
            {/* Overlay Stats */}
            <div className="absolute bottom-8 left-8 z-[1000] bg-[#FDFBF7]/90 backdrop-blur-md p-8 rounded-3xl shadow-xl hidden md:block border border-[#2C2825]/10 min-w-[280px]">
              <p className="text-[10px] text-[#5C5753] font-bold tracking-[0.2em] uppercase mb-6 text-center">Grid Status</p>
              <div className="space-y-6">
                <div className="text-center border-b border-[#2C2825]/10 pb-6">
                  <p className="text-5xl font-medium text-[#2C2825] leading-none mb-2" style={{ fontFamily: 'var(--font-serif)' }}>24</p>
                  <p className="text-xs text-[#5C5753] font-medium tracking-wide uppercase">Active Responders</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-medium text-[#8B2E49] leading-none mb-2" style={{ fontFamily: 'var(--font-serif)' }}>12</p>
                  <p className="text-xs text-[#5C5753] font-medium tracking-wide uppercase">Ongoing Cases</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
