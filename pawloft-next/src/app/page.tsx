"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlertCircle, Heart, HandHeart, Home, Search, Calendar, Users, Activity } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px]" style={{ background: 'var(--secondary)' }}></span>
              <span className="uppercase tracking-[0.3em] text-xs font-semibold" style={{ color: 'var(--secondary)' }}>Rescuing Humanity</span>
            </div>
            <h1 className="hero-title">Every Paw Deserves a Safe Place to Call Home.</h1>
            <p className="hero-subtitle mb-10">
              PawLoft connects rescuers, shelters, and adopters to save animals who cannot save themselves. Committed to professional care and rehabilitation.
            </p>
            <div className="hero-buttons flex gap-6">
              <Link href="/login" className="btn btn-primary">Join the Cause</Link>
              <Link href="/donation" className="btn btn-outline">Support Rescues</Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <Image
              src="/assets/hero.png"
              alt="Happy dog and cat"
              className="hero-image"
              width={600}
              height={800}
              priority
            />
            <div className="absolute -left-12 bottom-20">
              <span className="vertical-label">Est. 2026 • Mumbai</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Animals Rescued</p>
            </div>
            <div className="stat-item">
              <h3>1,200+</h3>
              <p>Volunteers Joined</p>
            </div>
            <div className="stat-item">
              <h3>850</h3>
              <p>Happy Adoptions</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Partner Shelters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-premium">
        <div className="container">
          <h2 className="section-title">A Vision for Coexistence</h2>
          <div className="problem-grid grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="problem-card">
              <div className="mb-8">
                <AlertCircle size={40} className="text-secondary" />
              </div>
              <h3>Thousands Abandoned</h3>
              <p className="text-text-light leading-relaxed">Countless animals are injured, abandoned, or ignored every single day in our growing urban landscapes.</p>
            </div>
            <div className="problem-card">
              <div className="mb-8">
                <Search size={40} className="text-secondary" />
              </div>
              <h3>Lack of Visibility</h3>
              <p className="text-text-light leading-relaxed">Rescuers and verified shelters often lack the institutional resources and platform to reach those who can help.</p>
            </div>
            <div className="problem-card">
              <div className="mb-8">
                <HandHeart size={40} className="text-secondary" />
              </div>
              <h3>Bridging the Gap</h3>
              <p className="text-text-light leading-relaxed">Pawloft provides the professional infrastructure to connect compassionate people with vetted rescue operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-premium bg-white">
        <div className="container">
          <h2 className="section-title">The Rehabilitation Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-black/5">
            <div className="how-card" data-number="01">
              <h3 className="text-xl font-bold mb-4">Report</h3>
              <p className="text-sm text-text-light">Instant location-based reporting for animals in distress.</p>
            </div>
            <div className="how-card" data-number="02">
              <h3 className="text-xl font-bold mb-4">Rescue</h3>
              <p className="text-sm text-text-light">Mobilizing nearby verified rescuers and professional handlers.</p>
            </div>
            <div className="how-card" data-number="03">
              <h3 className="text-xl font-bold mb-4">Heal</h3>
              <p className="text-sm text-text-light">Top-tier medical care, proper nutrition, and rehabilitation therapy.</p>
            </div>
            <div className="how-card" data-number="04">
              <h3 className="text-xl font-bold mb-4">Adopt</h3>
              <p className="text-sm text-text-light">Finding perfect matches for loving, permanent families.</p>
            </div>
          </div>
        </div>
      </section>



      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text-premium">
              <div className="mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px]" style={{ background: 'var(--secondary)' }}></span>
                <span className="uppercase tracking-[0.3em] text-xs font-semibold" style={{ color: 'var(--secondary)' }}>Success Stories</span>
              </div>
              <h3>From Streets to Safety: Rusty's Story</h3>
              <p className="text-lg leading-relaxed mb-8 opacity-80">
                Rusty was found alone on a busy street corner, scared and hungry. Through the PawLoft network, a local professional rescue team was dispatched. Today, Rusty thrives in a home that appreciates his true spirit.
              </p>
              <Link href="/donation" className="btn btn-primary" style={{ background: '#FDF8F0', color: '#1A3C34' }}>Help More Like Rusty</Link>
            </div>
            <div>
              <Image
                src="/assets/story_after.png"
                alt="Dog thriving"
                className="story-img-main"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>You Can Be Someone’s Hero Today.</h2>
          <div className="flex justify-center gap-8">
            <Link href="/login" className="btn btn-primary">Adopt Now</Link>
            <Link href="/donation" className="btn btn-outline">Become a Donor</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper for icon
const PawPrintIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

export default Landing;
