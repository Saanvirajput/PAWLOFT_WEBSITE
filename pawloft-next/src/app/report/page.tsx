"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Camera, MapPin, BrainCircuit, Activity, CheckCircle2, Navigation, UploadCloud, X, AlertTriangle, Crosshair } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReportFlow() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Real Data States
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [assignedVolunteer, setAssignedVolunteer] = useState<any>(null);
  const [generatedCaseNumber, setGeneratedCaseNumber] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  // STEP 1: Handle Real Photo Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For this prototype, we'll just generate a local preview URL
    // In production, this would upload to Supabase Storage
    const localUrl = URL.createObjectURL(file);
    setPhotoUrl(localUrl);
    
    setIsProcessing(true);
    // Simulate AI Triage analysis time
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 1500);
  };

  // STEP 2 & 3: Handle GPS and Database Assignment
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (step === 2) {
      // 1. Get Real Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            // Proceed to assignment after locking GPS
            setTimeout(() => setStep(3), 2000);
          },
          (error) => {
            console.error("GPS Error:", error);
            // Fallback mock location if permission denied
            setLocation({ lat: 19.0760, lng: 72.8777 });
            setTimeout(() => setStep(3), 2000);
          },
          { enableHighAccuracy: true }
        );
      } else {
        setLocation({ lat: 19.0760, lng: 72.8777 });
        setTimeout(() => setStep(3), 2000);
      }
    } else if (step === 3) {
      const processRescue = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          const userId = session?.user?.id;

          // 0. Ensure user exists in public.users to satisfy foreign key constraint
          if (userId) {
            await supabase.from('users').upsert([{
              id: userId,
              name: session.user.user_metadata?.full_name || 'Responder',
              email: session.user.email,
              phone: userId, // Use userId as phone to avoid UNIQUE NOT NULL constraint violation for OAuth users
              role: 'Reporter'
            }], { onConflict: 'id' });
          }

          // 1. Find an available volunteer (Real Database Query)
          const { data: volunteers } = await supabase
            .from('volunteers')
            .select('*, users(name, phone)')
            .eq('is_available', true)
            .limit(1);
          
          let volunteer = null;
          if (volunteers && volunteers.length > 0) {
            volunteer = volunteers[0];
            setAssignedVolunteer(volunteer);
          }

          // 2. Insert the Case into the Database
          const caseNum = 'PW-' + Math.floor(1000 + Math.random() * 9000);
          setGeneratedCaseNumber(caseNum);

          const { error } = await supabase.from('cases').insert([{
            case_number: caseNum,
            reporter_id: userId || null, 
            animal_type: 'Unknown (Pending Triage)', 
            severity: 'High',
            status: volunteer ? 'Accepted' : 'Reported',
            location: location ? `POINT(${location.lng} ${location.lat})` : 'POINT(72.8777 19.0760)',
            assigned_volunteer: volunteer ? volunteer.id : null
          }]);

          if (error) {
              console.error("Error creating case:", error, error.details, error.message);
          }


          // We don't advance to step 4 automatically here anymore.
          // The UI rendering of Step 3 will handle the timeout animations for expanding radius.
        } catch (e) {
          console.error("Rescue processing error", e);
        }
      };

      processRescue();
    }

    return () => clearTimeout(timeout);
  }, [step, location, supabase]);

  // Expanding Radius Animation State
  const [searchRadius, setSearchRadius] = useState(5);
  
  useEffect(() => {
    if (step === 3) {
      const timer1 = setTimeout(() => setSearchRadius(10), 2000);
      const timer2 = setTimeout(() => setSearchRadius(20), 4000);
      
      const proceed = setTimeout(() => {
          if (assignedVolunteer) {
              setStep(4); // Found a real volunteer
          } else {
              setStep(5); // No volunteers found fallback
          }
      }, 6000);

      return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(proceed);
      };
    }
  }, [step, assignedVolunteer]);


  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center items-center text-center p-8"
          >
            <div className="mb-8">
              <span className="px-4 py-1.5 bg-[#8B2E49]/10 text-[#8B2E49] text-xs font-bold uppercase tracking-widest rounded-full border border-[#8B2E49]/20">
                Emergency Flow Active
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-[#2C2825] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Report Injured Animal</h2>
            <p className="text-[#5C5753] mb-10 font-light">Take a clear photo. We will handle triage and dispatch automatically.</p>
            
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />

            <div 
              className={`w-full max-w-sm aspect-[4/3] rounded-[32px] border-2 border-dashed ${isProcessing ? 'border-[#8B2E49] bg-[#8B2E49]/5' : 'border-[#2C2825]/20 bg-white hover:border-[#8B2E49] hover:bg-[#FDFBF7]'} flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative shadow-sm`}
              onClick={() => !isProcessing && fileInputRef.current?.click()}
            >
              {photoUrl ? (
                <>
                  <img src={photoUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="relative z-10 flex flex-col items-center bg-white/80 backdrop-blur-md p-6 rounded-2xl">
                    <Activity className="text-[#8B2E49] animate-pulse mb-3" size={32} />
                    <p className="text-[#2C2825] font-bold text-sm tracking-widest uppercase">Analyzing Image</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center p-6 text-center">
                  <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center mb-4 shadow-sm border border-[#2C2825]/5">
                    <Camera className="text-[#8B2E49]" size={28} />
                  </div>
                  <p className="text-[#2C2825] font-medium text-lg mb-1">Tap to Open Camera</p>
                  <p className="text-sm text-[#5C5753] font-light">Real-time image capture</p>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col justify-center items-center text-center p-8 relative overflow-hidden"
          >
            {/* Map Grid Background Effect */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#2C2825 1px, transparent 1px), linear-gradient(90deg, #2C2825 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(139,46,73,0.15)] border border-[#8B2E49]/20 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-[#8B2E49] animate-ping opacity-20"></div>
                    <Crosshair className="text-[#8B2E49] animate-pulse" size={40} />
                </div>
                <h2 className="text-3xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Acquiring Location</h2>
                <p className="text-[#5C5753] mb-10 font-mono text-xs tracking-widest uppercase">Connecting to GPS Satellites...</p>
                
                <div className="w-full bg-white rounded-[24px] p-6 border border-[#2C2825]/10 shadow-sm text-left space-y-4">
                <div className="flex justify-between items-center border-b border-[#2C2825]/5 pb-4">
                    <span className="text-xs text-[#5C5753] uppercase font-bold tracking-wider">Latitude</span>
                    <span className="font-mono text-[#2C2825] font-medium">{location ? location.lat.toFixed(4) + '° N' : 'Detecting...'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#2C2825]/5 pb-4">
                    <span className="text-xs text-[#5C5753] uppercase font-bold tracking-wider">Longitude</span>
                    <span className="font-mono text-[#2C2825] font-medium">{location ? location.lng.toFixed(4) + '° E' : 'Detecting...'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-[#5C5753] uppercase font-bold tracking-wider">Accuracy</span>
                    <span className="font-mono text-green-700 font-bold flex items-center gap-1"><CheckCircle2 size={14}/> High</span>
                </div>
                </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col justify-center items-center text-center p-8"
          >
            <div className="relative mb-6">
                <Activity className="text-[#8B2E49] relative z-10" size={48} />
                <div className="absolute inset-0 bg-[#8B2E49] blur-xl opacity-20 rounded-full animate-pulse"></div>
            </div>
            
            <h2 className="text-3xl font-medium text-[#2C2825] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Dispatching</h2>
            <p className="text-[#5C5753] mb-12 h-12">
              Pinging closest verified volunteers in <span className="font-bold text-[#8B2E49]">{searchRadius}km</span> radius...
            </p>

            <div className="w-full max-w-sm bg-white border border-[#2C2825]/10 p-2 rounded-full shadow-sm flex items-center relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 bg-[#8B2E49]/5 w-full"></div>
               <div className="w-8 h-8 rounded-full bg-[#8B2E49]/10 flex items-center justify-center mr-3 relative z-10">
                   <div className="w-2 h-2 rounded-full bg-[#8B2E49] animate-ping"></div>
               </div>
               <span className="text-sm font-medium text-[#2C2825] relative z-10 flex-1 text-left">Searching {searchRadius}km Zone</span>
               <span className="text-xs font-mono font-bold text-[#8B2E49] bg-[#8B2E49]/10 px-3 py-1 rounded-full relative z-10">LIVE</span>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center items-center text-center p-8"
          >
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 border border-green-200 shadow-sm relative">
                <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
                <CheckCircle2 className="text-green-600 relative z-10" size={48} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-medium text-[#2C2825] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Responder Assigned</h2>
            <p className="text-[#5C5753] mb-10 font-light">Help is on the way. Please stay with the animal if it is safe to do so.</p>

            <div className="w-full max-w-sm bg-white rounded-[24px] border border-[#2C2825]/10 p-8 text-left mb-8 shadow-md">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#2C2825]/10">
                <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center border border-[#2C2825]/10 shadow-sm">
                  <span className="font-bold text-[#8B2E49] text-xl">
                    {assignedVolunteer?.users?.name ? assignedVolunteer.users.name.charAt(0).toUpperCase() : 'V'}
                  </span>
                </div>
                <div>
                  <p className="text-[#2C2825] font-bold text-lg mb-1">{assignedVolunteer?.users?.name || 'Verified Volunteer'}</p>
                  <p className="text-xs text-[#8B2E49] font-bold tracking-widest uppercase bg-[#8B2E49]/10 px-2 py-0.5 rounded-full inline-block">Pawloft Rescue Network</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#2C2825]/5">
                   <p className="text-[10px] text-[#5C5753] uppercase font-bold tracking-widest mb-1">ETA</p>
                   <p className="text-[#2C2825] font-mono text-xl font-medium">12 MINS</p>
                 </div>
                 <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#2C2825]/5">
                   <p className="text-[10px] text-[#5C5753] uppercase font-bold tracking-widest mb-1">Case ID</p>
                   <p className="text-[#2C2825] font-mono text-xl font-medium">{generatedCaseNumber.split('-')[1] || 'WAIT'}</p>
                 </div>
              </div>
            </div>

            <div className="flex gap-4 w-full max-w-sm">
              <button className="flex-1 bg-white border border-[#2C2825]/20 py-4 rounded-full text-[#2C2825] font-bold flex items-center justify-center gap-2 hover:bg-[#FDFBF7] shadow-sm transition-all">
                <Navigation size={18}/> Track
              </button>
              <Link href="/dashboard" className="flex-1 bg-[#2C2825] text-white py-4 rounded-full font-bold text-center hover:bg-[#8B2E49] shadow-md transition-all">
                Dashboard
              </Link>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center items-center text-center p-8"
          >
            <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-8 border border-amber-200 shadow-sm">
                <AlertTriangle className="text-amber-600" size={48} />
            </div>
            
            <h2 className="text-3xl font-medium text-[#2C2825] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>No Volunteers Nearby</h2>
            <p className="text-[#5C5753] mb-10 font-light max-w-sm">We couldn't find an available responder within a 20km radius. Your report has been routed to the central municipal shelter.</p>

            <div className="w-full max-w-sm bg-white rounded-[24px] border border-[#2C2825]/10 p-8 text-left mb-8 shadow-md">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#2C2825]/10">
                <span className="text-xs text-[#5C5753] uppercase font-bold tracking-widest">Routing</span>
                <span className="text-xs text-amber-700 bg-amber-100 px-3 py-1 rounded-full font-bold">Municipal Shelter</span>
              </div>
              <div className="flex justify-between items-center">
                   <p className="text-[10px] text-[#5C5753] uppercase font-bold tracking-widest mb-1">Case ID</p>
                   <p className="text-[#2C2825] font-mono text-lg font-medium">{generatedCaseNumber}</p>
              </div>
            </div>

            <Link href="/dashboard" className="w-full max-w-sm bg-[#2C2825] text-white py-4 rounded-full font-bold text-center hover:bg-[#8B2E49] shadow-md transition-all block">
              Return to Dashboard
            </Link>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <header className="p-6 border-b border-[#2C2825]/10 bg-white/80 backdrop-blur-md flex justify-between items-center fixed top-0 w-full z-50">
        <Link href="/" className="text-[#2C2825] font-bold text-xl tracking-widest uppercase flex items-center gap-2">
          Pawloft
          <span className="px-2 py-0.5 bg-[#8B2E49]/10 text-[#8B2E49] text-[10px] font-bold uppercase rounded">Dispatch Center</span>
        </Link>
        <Link href="/">
          <div className="w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center hover:bg-[#EFECE5] transition-colors border border-[#2C2825]/10">
            <X className="text-[#5C5753]" size={20}/>
          </div>
        </Link>
      </header>
      
      <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-3xl">
          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto mb-8 h-1.5 bg-[#2C2825]/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#8B2E49] transition-all duration-700 ease-in-out rounded-full" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
          
          <AnimatePresence mode="wait">
             <div key={step} className="w-full">
                {renderStep()}
             </div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
