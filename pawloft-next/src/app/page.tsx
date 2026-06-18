"use client";
import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

const initiatives = [
  {
    title: "Rapid Response",
    description: "At Pawloft, every second counts. When an injured animal is reported, our system instantly alerts the nearest verified responders. We coordinate rapid deployment with precise location tracking to ensure immediate on-ground support, minimizing trauma and securing the animal swiftly.",
    media: "/assets/pawloft3.mp4"
  },
  {
    title: "Veterinary Network",
    description: "We connect injured animals with a verified network of local veterinary clinics and specialists. Our infrastructure ensures that responders know exactly where to take the animal for immediate, species-appropriate medical care, completely eliminating the guesswork in critical moments.",
    media: "/assets/pawloft4.mp4"
  },
  {
    title: "Verified Responders",
    description: "Our community of volunteers and NGOs is rigorously verified for safety and competence. By empowering passionate individuals with the right tools and training resources, Pawloft builds a reliable, decentralized workforce ready to handle animal emergencies across the city.",
    media: "/assets/pawloft5.mp4"
  },
  {
    title: "Intelligent Dispatch",
    description: "Say goodbye to chaotic WhatsApp groups. Our real-time dispatch protocol acts as the digital backbone for animal rescue, routing the right people to the right place. We track cases from the first report all the way to recovery, bringing unprecedented transparency to rescue operations.",
    media: "/assets/pawloft6.mp4"
  }
];

const insights = [
  {
    title: "HOW TO USE PAWLOFT",
    description: "A quick walkthrough on reporting an injured animal using our real-time dispatch protocol.",
    video: "/assets/pawloft1.mp4",
  },
  {
    title: "WILDLIFE FIRST AID",
    description: "Essential steps to take immediately when you find an injured bird or mammal before help arrives.",
    video: "/assets/pawloft7.mp4",
  },
  {
    title: "UNDERSTANDING CANINE PARVO",
    description: "How to identify Parvovirus symptoms in street dogs and when to call for immediate veterinary support.",
    video: "/assets/pawloft8.mp4",
  },
  {
    title: "URBAN WILDLIFE CONFLICTS",
    description: "Daily insights on how to safely navigate encounters with urban wildlife without causing stress.",
    video: "/assets/pawloft9.mp4",
  },
];

const Landing = () => {
  const [activeInitiative, setActiveInitiative] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FDFBF7] text-[#2C2825] min-h-screen">
      
      {/* SECTION 1: HERO (Cinematic Video) */}
      <section className="relative w-full h-screen overflow-hidden flex items-center bg-[#8B2E49]">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-80"
          >
            <source src="/assets/pawloft10.mp4" type="video/mp4" />
          </video>
          {/* Deep teal to black cinematic overlay */}
          <div className="absolute inset-0 cinematic-overlay-teal"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-16 h-full flex flex-col justify-end pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-huge font-medium mb-6 text-white" style={{ fontFamily: 'var(--font-serif)', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              Advancing the frontier of animal rescue.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-10 max-w-2xl leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              When an injured animal is found, every minute matters. We connect people who spot injured animals with nearby responders through a real-time dispatch network.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/report" className="btn-pill bg-[#FDFBF7] text-[#2C2825] hover:bg-white px-10 py-4 text-lg">
                Report Emergency
              </Link>
              <Link href="/rescue-network" className="text-white hover:text-white/80 font-medium text-lg flex items-center gap-3 transition-colors">
                <PlayCircle size={24} className="opacity-90" /> View Live Network
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE REALITY (Cream + Beige Cards) */}
      <section className="py-32 relative z-20 bg-[#FDFBF7]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-medium mb-6 text-[#2C2825]" style={{ fontFamily: 'var(--font-serif)' }}>
              Core Initiatives
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
            
            {/* Left Col - Text Cards */}
            <div className="flex flex-col gap-4">
              {initiatives.map((item, idx) => {
                const isActive = activeInitiative === idx;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveInitiative(idx)}
                    className={`p-6 md:p-8 rounded-xl transition-all duration-500 ease-in-out cursor-pointer ${
                      isActive 
                        ? 'bg-[#EFECE5] shadow-sm' 
                        : 'bg-transparent hover:bg-[#EFECE5]/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-[#8B2E49]/10' : 'bg-transparent border border-[#2C2825]/20'}`}>
                        <div className={`transition-all duration-500 ${isActive ? 'w-3 h-3 bg-[#8B2E49] rotate-45' : 'w-2 h-2 bg-[#2C2825] rounded-full'}`}></div>
                      </div>
                      <h3 className={`text-xl font-medium transition-colors duration-500 ${isActive ? 'text-[#2C2825]' : 'text-[#5C5753]'}`} style={{ fontFamily: 'var(--font-sans)' }}>{item.title}</h3>
                    </div>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <p className="text-[#2C2825] text-sm leading-relaxed pl-12 font-medium">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Col - Visuals */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[500px] lg:h-[650px] rounded-[24px] overflow-hidden sticky top-32"
            >
              <AnimatePresence mode="wait">
                <motion.video 
                  key={activeInitiative}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={initiatives[activeInitiative].media} type="video/mp4" />
                </motion.video>
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2.5: EDUCATIONAL INSIGHTS (Video Carousel) */}
      <section className="py-32 bg-[#FDFBF7] relative z-20 overflow-hidden border-t border-[#2C2825]/5">
        <div className="container mx-auto px-6 lg:px-16 mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-medium text-[#2C2825] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Wildlife Insights
            </h2>
            <p className="text-xl text-[#5C5753] font-light">
              Watch guides on how to use Pawloft, daily insights on wildlife conservation, and crucial first-aid steps directly from Saanvi.
            </p>
          </div>
          <div className="flex gap-4 hidden md:flex">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-[#2C2825]/20 flex items-center justify-center hover:bg-[#2C2825] hover:text-white transition-all text-[#2C2825]">
              ←
            </button>
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-[#2C2825]/20 flex items-center justify-center hover:bg-[#2C2825] hover:text-white transition-all text-[#2C2825]">
              →
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-6 lg:px-16 pb-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {insights.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[320px] md:min-w-[420px] flex-shrink-0 snap-start flex flex-col rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-[#2C2825]/10"
            >
              <div className="relative h-[250px] overflow-hidden bg-black">
                <video 
                  src={item.video} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  muted 
                  loop 
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <PlayCircle size={28} className="text-white opacity-90" />
                  </div>
                </div>
              </div>
              <div className="bg-[#8B2E49] text-white p-8 flex-1 flex flex-col">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-white/60 mb-3">{item.title}</span>
                <p className="text-[15px] text-white/90 leading-relaxed font-light">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          ::-webkit-scrollbar { display: none; }
        `}} />
      </section>

      {/* SECTION 3: DEEP TEAL ENGINE */}
      <section className="relative py-40 bg-[#8B2E49]">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/assets/pawloft8.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#8B2E49]/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-[500px] rounded-[32px] overflow-hidden">
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/assets/pawloft2.mp4" type="video/mp4" />
            </video>
            
            {/* Stat Overlay Box */}
            <div className="absolute bottom-8 left-8 card-beige p-8 shadow-2xl">
              <span className="text-xs font-bold tracking-widest uppercase text-[#5C5753] mb-4 block">
                Verified Coverage
              </span>
              <div className="text-4xl font-serif text-[#2C2825] mb-4">5km+</div>
              <Link href="/rescue-network" className="btn-pill px-6 py-2 text-sm bg-transparent border border-[#8B2E49] text-[#8B2E49] hover:bg-[#8B2E49] hover:text-white">
                See Area
              </Link>
            </div>
          </div>

          <div className="max-w-xl lg:pl-10">
            <h2 className="text-5xl font-medium mb-8 text-white" style={{ fontFamily: 'var(--font-serif)' }}>
              The Rescue Infrastructure
            </h2>
            <p className="text-lg text-white/80 font-light mb-10 leading-relaxed">
              Amid the noise of the city, injured animals are often left waiting because people don't know who to call. Pawloft changes this. Through an intelligent dispatch network and a community of verified responders, we bridge the gap between compassion and action, giving every animal the immediate help they deserve.
            </p>
            <Link href="/how-it-works" className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors">
              About The Protocol <span className="text-lg">→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

const Footer = () => {
  const [formData, setFormData] = React.useState({
    requestType: 'General Inquiry',
    name: '',
    email: '',
    message: '',
    agreed: false
  });
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
      setFormData({ requestType: 'General Inquiry', name: '', email: '', message: '', agreed: false });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-[#8B2E49] text-white pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Top Logo Center */}
        <div className="flex flex-col items-center justify-center mb-20">
          <h2 className="text-4xl font-serif tracking-widest uppercase mb-2">Pawloft.</h2>
          <p className="text-sm tracking-[0.2em] uppercase text-white/60">Every Second Matters</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20">
          
          {/* Left Column - Info & Links */}
          <div className="flex flex-col gap-16">
            
            <div>
              <h3 className="text-xl mb-3 font-serif">The Pawloft Network</h3>
              <p className="text-sm text-white/60 max-w-sm mb-6">
                An initiative to organize, dispatch, and coordinate rapid rescue operations for street and wild animals.
              </p>
              
              <div className="flex gap-4">
                <a href="https://www.instagram.com/pawloft.co/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  IG
                </a>
                <a href="https://www.linkedin.com/company/pawloft" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  IN
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase text-white/50 mb-2">For General Inquiries</h4>
                  <a href="mailto:dogsinourlife08@gmail.com" className="text-sm hover:text-white/80 transition-colors">dogsinourlife08@gmail.com</a>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase text-white/50 mb-2">For Partnerships</h4>
                  <a href="mailto:dogsinourlife08@gmail.com" className="text-sm hover:text-white/80 transition-colors">dogsinourlife08@gmail.com</a>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase text-white/50 mb-2">For Volunteer Ops</h4>
                  <a href="mailto:dogsinourlife08@gmail.com" className="text-sm hover:text-white/80 transition-colors">dogsinourlife08@gmail.com</a>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] tracking-widest uppercase text-white/50 mb-4">Pages</h4>
                <ul className="flex flex-col gap-3">
                  <li><Link href="/" className="text-sm font-medium hover:text-white/80">Home</Link></li>
                  <li><Link href="/resources" className="text-sm font-medium hover:text-white/80">Resources</Link></li>
                  <li><Link href="/about" className="text-sm font-medium hover:text-white/80">About</Link></li>
                  <li><Link href="/contact" className="text-sm font-medium hover:text-white/80">Contact Us</Link></li>
                  <li><Link href="/join" className="text-sm font-medium hover:text-white/80">Join Network</Link></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-[#6E2238] rounded-2xl p-8 lg:p-12 border border-white/5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              <div className="flex flex-col border-b border-white/20 pb-2">
                <select 
                  className="bg-transparent text-white outline-none appearance-none cursor-pointer"
                  value={formData.requestType}
                  onChange={(e) => setFormData({...formData, requestType: e.target.value})}
                  required
                >
                  <option value="General Inquiry" className="text-black">General Inquiry</option>
                  <option value="Volunteer Application" className="text-black">Volunteer Application</option>
                  <option value="Partnership" className="text-black">Partnership</option>
                  <option value="Feedback" className="text-black">Feedback</option>
                </select>
              </div>

              <div className="flex flex-col border-b border-white/20 pb-2">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="bg-transparent text-white outline-none placeholder:text-white/40"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col border-b border-white/20 pb-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-transparent text-white outline-none placeholder:text-white/40"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col border-b border-white/20 pb-2 relative">
                <input 
                  type="text" 
                  placeholder="Message" 
                  className="bg-transparent text-white outline-none placeholder:text-white/40 pr-16"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <span className="absolute right-0 top-0 text-xs text-white/40">Optional</span>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  className="mt-1 bg-transparent border-white/30"
                  checked={formData.agreed}
                  onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
                  required
                />
                <label htmlFor="privacy" className="text-xs text-white/50 leading-relaxed">
                  By submitting this form, I agree to the collection and use of my personal data as per Privacy Policy for communication purposes, including receiving updates on Pawloft network activities.
                </label>
              </div>

              <div className="flex justify-end mt-4">
                <button 
                  type="submit" 
                  disabled={!formData.agreed || status === 'submitting'}
                  className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full text-sm transition-colors"
                >
                  {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent Successfully' : 'Send Message'}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-right mt-2">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex justify-between items-center text-white/40 text-xs">
          <span>© {new Date().getFullYear()} Pawloft Systems</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Operational</span>
        </div>
      </div>
    </footer>
  );
};

export default Landing;
