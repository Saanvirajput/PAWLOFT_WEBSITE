
"use client";

import React, { useEffect } from 'react';
import './pitch.css';

export default function PitchPage() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    
    return () => obs.disconnect();
  }, []);

  return (
    <div className="pitch-page">
      <div className="pitch-page-content">
        

{/*  NAV  */}
<nav className="nav">
  <div className="nav-logo">Paw<span>loft</span></div>
  <ul className="nav-links">
    <li><a href="#problem">Problem</a></li>
    <li><a href="#what">Product</a></li>
    <li><a href="#pipeline">Pipeline</a></li>
    <li><a href="#tech">Tech</a></li>
    <li><a href="#ai">AI Layer</a></li>
    <li><a href="#volunteers">Volunteers</a></li>
    <li><a href="#financials">Revenue</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#vision">Vision</a></li>
  </ul>
</nav>

{/*  ═══ COVER ═══  */}
<section className="cover" id="cover">
  <div className="cover-pattern"></div>
  <div className="cover-left">
    <div>
      <div className="cover-eyebrow">Rescue-tech · India · 2024</div>
      <div className="cover-title">
        Paw<span className="highlight">loft</span>
      </div>
      <p className="cover-tagline">
        The structured rescue coordination and alert platform that closes the gap between an injured animal's cry for help and the people who can answer it.
      </p>
    </div>
    <div className="cover-meta">
      <div className="cover-meta-item">
        <label>Founder</label>
        <span>Saanvi Rajput</span>
      </div>
      <div className="cover-meta-item">
        <label>Category</label>
        <span>Rescue-tech / Social Impact</span>
      </div>
      <div className="cover-meta-item">
        <label>Model</label>
        <span>Data + Intelligence SaaS</span>
      </div>
      <div className="cover-meta-item">
        <label>Market</label>
        <span>Consumer Mass Market</span>
      </div>
    </div>
  </div>
  <div className="cover-right">
    <div className="cover-stat-pills">
      <div className="stat-pill"><strong>30M+</strong> stray dogs in India</div>
      <div className="stat-pill"><strong>8 min</strong> critical rescue window</div>
      <div className="stat-pill"><strong>5km</strong> geo-matched alerts</div>
      <div className="stat-pill"><strong>0</strong> structured rescue OS exists today</div>
    </div>
    <div className="cover-visual">
      <div className="paw-ring"></div>
      <div className="paw-ring"></div>
      <div className="paw-ring"></div>
      <div className="paw-center">🐾</div>
    </div>
  </div>
</section>

{/*  ═══ PROBLEM ═══  */}
<section id="problem" className="problem-bg">
  <div className="section-wrap">
    <div className="section-label reveal">01 — The Problem</div>
    <h1 className="h1 reveal" style={{color: 'var(--warm-white)', }}>Every rescue starts in chaos.</h1>
    <p className="lead reveal">Someone sees an injured dog on the road. They want to help. And then: nothing. No clear number to call. No system. No coordination. Just WhatsApp groups, dead lines, and an animal that keeps waiting.</p>

    <div className="stat-grid reveal">
      <div className="stat-box">
        <div className="stat-number">30M+</div>
        <div className="stat-desc">Stray dogs in India — the highest concentration of street dogs in the world</div>
      </div>
      <div className="stat-box">
        <div className="stat-number">62%</div>
        <div className="stat-desc">Of rescue attempts fail before a responder physically reaches the animal</div>
      </div>
      <div className="stat-box">
        <div className="stat-number">∞</div>
        <div className="stat-desc">NGO contacts scattered across unstructured WhatsApp groups with no tracking, no accountability</div>
      </div>
    </div>

    <ul className="chaos-list reveal">
      <li>
        <div className="chaos-icon">✕</div>
        <div><strong style={{color: 'rgba(255,249,242,0.9)', }}>No structured alert system.</strong> NGOs are overwhelmed and rescue contacts live in fragmented WhatsApp groups. Response times are unpredictable and slow.</div>
      </li>
      <li>
        <div className="chaos-icon">✕</div>
        <div><strong style={{color: 'rgba(255,249,242,0.9)', }}>No case accountability.</strong> Once a rescue is "handed off," there's zero tracking. Animals fall through the cracks with no documentation, no proof, no follow-up.</div>
      </li>
      <li>
        <div className="chaos-icon">✕</div>
        <div><strong style={{color: 'rgba(255,249,242,0.9)', }}>No trust layer for donations.</strong> The ecosystem has been burned by fake rescue fundraisers. Donors have no visibility into where money actually goes.</div>
      </li>
      <li>
        <div className="chaos-icon">✕</div>
        <div><strong style={{color: 'rgba(255,249,242,0.9)', }}>No intelligence for governments.</strong> Municipal corporations and state authorities have animal welfare mandates but zero data systems to execute or prove compliance.</div>
      </li>
    </ul>
  </div>
</section>

{/*  ═══ WHAT IS IT ═══  */}
<section id="what" style={{background: 'var(--parchment)', }}>
  <div className="section-wrap">
    <div className="section-label reveal">02 — What Pawloft Is</div>
    <h1 className="h1 reveal">An emergency dispatch system — for animals.</h1>

    <div className="definition-box reveal">
      Pawloft is a structured rescue coordination and alert platform — the connective tissue between the person who spots an injured animal and the verified network of people who can actually help it. Not a charity. Not a social media page. Emergency dispatch, powered by community.
    </div>

    <div className="what-grid reveal">
      <div>
        <h3 className="h3" style={{color: 'var(--red)', marginBottom: '1rem', }}>Pawloft is NOT</h3>
        <ul className="is-not-list">
          <li><span className="tag-no">✕</span> A pet-selling platform</li>
          <li><span className="tag-no">✕</span> A breeder marketplace</li>
          <li><span className="tag-no">✕</span> Guaranteed rescue assurance</li>
          <li><span className="tag-no">✕</span> Guaranteed treatment funding</li>
          <li><span className="tag-no">✕</span> A wildlife authority</li>
          <li><span className="tag-no">✕</span> A replacement for veterinary advice</li>
        </ul>
      </div>
      <div>
        <h3 className="h3" style={{color: 'var(--teal)', marginBottom: '1rem', }}>Pawloft IS</h3>
        <ul className="is-list">
          <li><span className="tag-yes">✓</span> A proof-based rescue coordination pipeline</li>
          <li><span className="tag-yes">✓</span> A geo-intelligent volunteer alert network</li>
          <li><span className="tag-yes">✓</span> A transparent, auditable donation system</li>
          <li><span className="tag-yes">✓</span> A live animal welfare data platform</li>
          <li><span className="tag-yes">✓</span> A structured NGO and vet partner directory</li>
          <li><span className="tag-yes">✓</span> A government-ready compliance intelligence layer</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/*  ═══ PIPELINE ═══  */}
<section id="pipeline" style={{background: 'var(--warm-white)', }}>
  <div className="section-wrap narrow">
    <div className="section-label reveal">03 — The Rescue Pipeline</div>
    <h1 className="h1 reveal">Report → Verify → Alert → Coordinate → Close with proof.</h1>
    <p className="lead reveal">Every rescue flows through a defined, accountable pipeline. No case can fall through the cracks.</p>

    <div className="pipeline reveal">
      <div className="pipeline-line"></div>

      <div className="pipeline-step">
        <div className="step-badge"><span className="step-num">1</span><span>Report</span></div>
        <div className="step-content">
          <h3 className="h3">Public Report — Under 60 seconds</h3>
          <p>Anyone can file a report. Required inputs: photo or video (mandatory), GPS location, animal type, condition description, and OTP-verified phone number. The proof and OTP requirements exist specifically to deter fake reports, which erode trust and waste responder energy.</p>
          <span className="step-tag tag-trust">Anti-fake protection</span>
        </div>
      </div>

      <div className="pipeline-step">
        <div className="step-badge"><span className="step-num">2</span><span>Triage</span></div>
        <div className="step-content">
          <h3 className="h3">AI Visual Triage + Case Categorisation</h3>
          <p>The uploaded photo or video is analyzed by a multimodal AI model. Species, injury type, severity, approachability, and safe handling guidance are returned in under 3 seconds. Standard domestic animals trigger immediate alerts. Wildlife, snakes, aggressive animals, or legally sensitive cases are held for admin review — because sending an untrained volunteer toward a cobra is dangerous, not helpful.</p>
          <span className="step-tag tag-auto">AI-powered · Admin review for wildlife</span>
        </div>
      </div>

      <div className="pipeline-step">
        <div className="step-badge"><span className="step-num">3</span><span>Alert</span></div>
        <div className="step-content">
          <h3 className="h3">Geo-Based Alert — 5km Radius Expansion</h3>
          <p>Pawloft alerts verified volunteers and NGOs within a 5km radius via WhatsApp (SMS as fallback). If nobody accepts within the time window, the radius automatically expands to 10km and escalation begins. If the case still stalls, a Pawloft admin manually takes over. No case simply falls through the cracks.</p>
          <span className="step-tag tag-auto">Auto-escalation · PostGIS powered</span>
        </div>
      </div>

      <div className="pipeline-step">
        <div className="step-badge"><span className="step-num">4</span><span>Respond</span></div>
        <div className="step-content">
          <h3 className="h3">Primary Responder + Backup Support Model</h3>
          <p>The first qualified person to accept becomes the Primary Responder. Others can join as Backup Support. If the primary responder needs more hands — say, an injured bull — they call for backup and the radius expansion restarts. This model prevents a rescue from failing just because one person is overwhelmed.</p>
          <span className="step-tag tag-critical">Volunteer privacy protected until acceptance</span>
        </div>
      </div>

      <div className="pipeline-step">
        <div className="step-badge"><span className="step-num">5</span><span>Track</span></div>
        <div className="step-content">
          <h3 className="h3">Live Case Tracking + Live Relay Mode</h3>
          <p>Every case moves through defined statuses: Alert Sent → Responder On The Way → Reached Location → Shifted to Vet → Closed. Reporters get real-time updates. A structured live relay keeps the reporter as the eyes of the responder in transit — dramatically reducing the "arrived at empty location" failure that demoralizes volunteers.</p>
          <span className="step-tag tag-auto">WebSocket-powered live relay</span>
        </div>
      </div>

      <div className="pipeline-step">
        <div className="step-badge"><span className="step-num">6</span><span>Close</span></div>
        <div className="step-content">
          <h3 className="h3">Proof-Based Closure — Accountability by Default</h3>
          <p>A case cannot be marked closed without uploading a final photo or video, a condition summary, and (if treatment happened) a prescription or bill. This single requirement is what makes Pawloft accountable — it's not just about getting someone to show up. It's about documenting that the animal actually received help.</p>
          <span className="step-tag tag-trust">Tamper-evident · Donor-visible</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ═══ TECH STACK ═══  */}
<section id="tech" className="tech-bg">
  <div className="section-wrap">
    <div className="section-label reveal">04 — Technology Architecture</div>
    <h1 className="h1 reveal" style={{color: 'var(--warm-white)', }}>6-layer system architecture built for scale.</h1>
    <p className="lead reveal" style={{color: 'rgba(255,249,242,0.6)', }}>Every layer exists to serve one moment: the 8-minute window between when someone spots an injured animal and when a volunteer arrives.</p>

    <div className="tech-stack-grid reveal">
      <div className="tech-col">
        <div className="tech-col-title">Frontend</div>
        <div className="tech-chip"><div className="tech-chip-dot blue"></div>React PWA</div>
        <div className="tech-chip"><div className="tech-chip-dot blue"></div>Progressive Web App</div>
        <div className="tech-chip"><div className="tech-chip-dot blue"></div>TypeScript</div>
        <div className="tech-chip"><div className="tech-chip-dot blue"></div>Tailwind CSS</div>
        <div className="tech-chip"><div className="tech-chip-dot blue"></div>React Query</div>
        <div className="tech-chip"><div className="tech-chip-dot blue"></div>Mapbox GL</div>
      </div>
      <div className="tech-col">
        <div className="tech-col-title">Backend</div>
        <div className="tech-chip"><div className="tech-chip-dot amber"></div>Node.js + Express</div>
        <div className="tech-chip"><div className="tech-chip-dot amber"></div>WebSocket (Socket.io)</div>
        <div className="tech-chip"><div className="tech-chip-dot amber"></div>REST API</div>
        <div className="tech-chip"><div className="tech-chip-dot amber"></div>Bull (Job Queues)</div>
        <div className="tech-chip"><div className="tech-chip-dot amber"></div>JWT Auth</div>
        <div className="tech-chip"><div className="tech-chip-dot amber"></div>OTP via Twilio</div>
      </div>
      <div className="tech-col">
        <div className="tech-col-title">Data & Infra</div>
        <div className="tech-chip"><div className="tech-chip-dot"></div>PostgreSQL + PostGIS</div>
        <div className="tech-chip"><div className="tech-chip-dot"></div>Redis (cache + pub/sub)</div>
        <div className="tech-chip"><div className="tech-chip-dot"></div>AWS S3 (media storage)</div>
        <div className="tech-chip"><div className="tech-chip-dot"></div>Cloudflare CDN</div>
        <div className="tech-chip"><div className="tech-chip-dot"></div>Docker + PM2</div>
        <div className="tech-chip"><div className="tech-chip-dot"></div>GitHub Actions CI/CD</div>
      </div>
      <div className="tech-col">
        <div className="tech-col-title">AI & Integrations</div>
        <div className="tech-chip"><div className="tech-chip-dot pink"></div>GPT-4o Vision API</div>
        <div className="tech-chip"><div className="tech-chip-dot pink"></div>WhatsApp Business API</div>
        <div className="tech-chip"><div className="tech-chip-dot pink"></div>Twilio SMS</div>
        <div className="tech-chip"><div className="tech-chip-dot pink"></div>Razorpay Payments</div>
        <div className="tech-chip"><div className="tech-chip-dot pink"></div>Google Maps API</div>
        <div className="tech-chip"><div className="tech-chip-dot pink"></div>Firebase Push</div>
      </div>
    </div>

    <h3 className="h3" style={{color: 'var(--warm-white)', margin: '3rem 0 1rem', }}>System layers at a glance</h3>
    <div style={{border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden', position: 'relative', zIndex: '2', }}>
      <div className="arch-row" style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', }}>
        <div className="arch-layer-label">Layer 1<br  />Presentation</div>
        <div className="arch-chips">
          <span className="arch-chip">React PWA</span>
          <span className="arch-chip">Volunteer App</span>
          <span className="arch-chip">Admin Dashboard</span>
          <span className="arch-chip">Reporter Interface</span>
          <span className="arch-chip">Partner Directory</span>
        </div>
      </div>
      <div className="arch-row" style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', }}>
        <div className="arch-layer-label">Layer 2<br  />API Gateway</div>
        <div className="arch-chips">
          <span className="arch-chip">REST Endpoints</span>
          <span className="arch-chip">WebSocket Hub</span>
          <span className="arch-chip">Auth Middleware</span>
          <span className="arch-chip">Rate Limiting</span>
        </div>
      </div>
      <div className="arch-row" style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', }}>
        <div className="arch-layer-label">Layer 3<br  />Core Logic</div>
        <div className="arch-chips">
          <span className="arch-chip">Geo-Radius Matching</span>
          <span className="arch-chip">AI Triage Engine</span>
          <span className="arch-chip">Alert Escalation</span>
          <span className="arch-chip">Status Machine</span>
          <span className="arch-chip">Live Relay</span>
        </div>
      </div>
      <div className="arch-row" style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', }}>
        <div className="arch-layer-label">Layer 4<br  />Notifications</div>
        <div className="arch-chips">
          <span className="arch-chip">WhatsApp Business</span>
          <span className="arch-chip">Twilio SMS</span>
          <span className="arch-chip">Firebase Push</span>
          <span className="arch-chip">Bull Job Queue</span>
        </div>
      </div>
      <div className="arch-row" style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', }}>
        <div className="arch-layer-label">Layer 5<br  />Data</div>
        <div className="arch-chips">
          <span className="arch-chip">PostgreSQL + PostGIS</span>
          <span className="arch-chip">Redis Cache</span>
          <span className="arch-chip">AWS S3 Media</span>
          <span className="arch-chip">Time-series Welfare Data</span>
        </div>
      </div>
      <div className="arch-row" style={{padding: '1.25rem 1.5rem', }}>
        <div className="arch-layer-label">Layer 6<br  />Intelligence</div>
        <div className="arch-chips">
          <span className="arch-chip">Welfare Heatmaps</span>
          <span className="arch-chip">City Ranking Engine</span>
          <span className="arch-chip">Gov Compliance Reports</span>
          <span className="arch-chip">Donor Transparency Ledger</span>
        </div>
      </div>
    </div>

    <div style={{marginTop: '2rem', padding: '1.5rem 2rem', background: 'rgba(224,122,31,0.1)', border: '1px solid rgba(224,122,31,0.2)', borderRadius: '12px', position: 'relative', zIndex: '2', }}>
      <p style={{fontSize: '0.88rem', color: 'rgba(255,249,242,0.7)', lineHeight: '1.6', }}><strong style={{color: 'var(--amber-light)', }}>The most critical technical decision:</strong> PostgreSQL + PostGIS for the database. The entire alert system depends on geo-radius queries — "find all volunteers within 5km of this coordinate." PostGIS does this natively, efficiently, and is the industry standard for exactly this kind of spatial intelligence. Every architecture decision flows from the 8-minute rescue window.</p>
    </div>
  </div>
</section>

{/*  ═══ AI FEATURES ═══  */}
<section id="ai" style={{background: 'var(--parchment)', }}>
  <div className="section-wrap">
    <div className="section-label reveal">05 — The AI Layer</div>
    <h1 className="h1 reveal">Three technologies that close the rescue gap.</h1>
    <p className="lead reveal">The gap between "report submitted" and "responder on the way" is where rescues fail. These three AI-powered features fill that gap — and they don't exist anywhere in animal rescue today.</p>

    <div className="features-grid reveal">
      <div className="feature-card amber">
        <div className="feature-icon amber">🔍</div>
        <div className="feature-title">AI Visual Triage</div>
        <div className="feature-body">The moment someone uploads a photo or video, a multimodal vision model instantly assesses: species, visible injury type, estimated severity, whether the animal is aggressive or approachable, and safe handling guidance. In under 3 seconds the reporter gets told exactly what they're looking at and what to do while waiting. This also auto-sets urgency level — critical cases jump the queue immediately instead of being processed in order.</div>
        <div className="feature-impact">→ GPT-4o Vision · 3-second response · Auto-triage routing</div>
      </div>

      <div className="feature-card teal">
        <div className="feature-icon teal">📡</div>
        <div className="feature-title">Live Relay Mode</div>
        <div className="feature-body">Once a case is accepted, reporter and responder enter a structured live relay — not free chat, but a guided coordination layer. The system prompts the reporter: "Is the animal still in the same position? Take a fresh photo." The responder sees a live-updating case file rather than stale initial photos. If the animal moves, the reporter tracks it. This directly eliminates the single most demoralizing volunteer outcome: arriving at an empty location.</div>
        <div className="feature-impact">→ WebSocket-powered · Guided prompts · Real-time sync</div>
      </div>

      <div className="feature-card blue">
        <div className="feature-icon blue">🏥</div>
        <div className="feature-title">Pre-Arrival Vet Routing</div>
        <div className="feature-body">The moment a responder accepts a case, the system simultaneously queries nearby veterinary partners and pre-confirms an intake slot — not just alerting them, but actually locking in where the animal is going. The volunteer knows before they leave: animal goes to this vet, here is the fastest combined pickup-and-dropoff route, here is the emergency contact. Right now this happens manually after rescue, burning critical time.</div>
        <div className="feature-impact">→ Vet API integration · Route optimization · Pre-confirmed intake</div>
      </div>
    </div>

    <div className="definition-box reveal" style={{background: '#e8f5f1', borderLeftColor: 'var(--teal)', }}>
      <strong>Why this goes viral:</strong> "This app told me my dog had a spinal injury and exactly how to keep him still until help arrived." That story, shared by a single user, has the potential to reach millions. No rescue platform in the world currently does AI visual triage. The feature alone is enough to make Pawloft a household name in animal welfare.
    </div>
  </div>
</section>

{/*  ═══ VOLUNTEERS ═══  */}
<section id="volunteers" style={{background: 'var(--warm-white)', }}>
  <div className="section-wrap">
    <div className="section-label reveal">06 — The Volunteer System</div>
    <h1 className="h1 reveal">Intelligent matching, not mass blasting.</h1>
    <p className="lead reveal">Pawloft's two-tier volunteer network allows case-to-responder matching based on capability, proximity, and availability — not just "who's nearest."</p>

    <div className="volunteer-grid reveal">
      <div className="tier-card">
        <div className="tier-badge one">Level 1 · Community Volunteer</div>
        <h3 className="h3">Lower-risk support roles</h3>
        <p style={{fontSize: '0.9rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: '1.6', }}>Location verification, feeding support, coordination assistance, basic on-ground help. Accessible onboarding — anyone with a verified phone number and OTP can join at this level.</p>
        <div className="capability-tags">
          <span className="cap-tag">Location verification</span>
          <span className="cap-tag">Feeding support</span>
          <span className="cap-tag">Coordination</span>
          <span className="cap-tag">Monitoring</span>
          <span className="cap-tag">Night availability</span>
        </div>
      </div>

      <div className="tier-card">
        <div className="tier-badge two">Level 2 · Verified Rescuer / NGO Partner</div>
        <h3 className="h3">High-impact rescue roles</h3>
        <p style={{fontSize: '0.9rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: '1.6', }}>Serious injuries, accident cases, transport coordination, vet handoff. Requires ID verification and manual approval. These are the responders who close cases.</p>
        <div className="capability-tags">
          <span className="cap-tag">Serious injuries</span>
          <span className="cap-tag">Transport</span>
          <span className="cap-tag">Large animal handling</span>
          <span className="cap-tag">Vet coordination</span>
          <span className="cap-tag">Foster placement</span>
        </div>
      </div>
    </div>

    <h3 className="h3 reveal" style={{marginTop: '2rem', }}>Volunteer availability states</h3>
    <div className="status-chips reveal">
      <div className="status-chip avail"><div className="dot"></div>Available — ready for any case</div>
      <div className="status-chip emerg"><div className="dot"></div>Emergency Only — critical cases only</div>
      <div className="status-chip busy"><div className="dot"></div>Busy — in an active rescue</div>
      <div className="status-chip offline"><div className="dot"></div>Offline — not available</div>
    </div>

    <hr className="divider" />

    <div className="section-label reveal">Animal Routing Intelligence</div>
    <h2 className="h2 reveal">Different animals, different networks.</h2>

    <table className="routing-table reveal">
      <thead>
        <tr>
          <th>Animal Type</th>
          <th>Routed To</th>
          <th>Special Handling</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><div className="route-animal">🐕 Dogs & Cats</div></td>
          <td><div className="route-to">Standard volunteer pool + NGO network</div></td>
          <td><div className="route-note">Immediate automated alert. Primary / backup responder model.</div></td>
        </tr>
        <tr>
          <td><div className="route-animal">🐄 Cows & Bulls</div></td>
          <td><div className="route-to">Gaushalas + large-animal handlers</div></td>
          <td><div className="route-note">Backup expansion triggered immediately due to size. Specialist transport required.</div></td>
        </tr>
        <tr>
          <td><div className="route-animal">🦜 Birds</div></td>
          <td><div className="route-to">Certified bird rescue partners</div></td>
          <td><div className="route-note">Species-specific handling protocols. Wing/fracture triage by AI.</div></td>
        </tr>
        <tr>
          <td><div className="route-animal">🐱 Puppies & Kittens</div></td>
          <td><div className="route-to">Foster network + adoption partners</div></td>
          <td><div className="route-note">Urgency flagged high due to vulnerability. Foster pre-confirmation attempted.</div></td>
        </tr>
        <tr>
          <td><div className="route-animal">🐍 Wildlife & Snakes</div></td>
          <td><div className="route-to">Authorized wildlife handlers only</div></td>
          <td><div className="route-note">Admin review mandatory before any alert. Never sent to untrained volunteers.</div></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

{/*  ═══ FINANCIALS ═══  */}
<section id="financials" className="fin-bg">
  <div className="section-wrap">
    <div className="section-label reveal">07 — Financial Model & Revenue</div>
    <h1 className="h1 reveal">Transparent by architecture. Sustainable by design.</h1>
    <p className="lead reveal">Donations are not Pawloft's business income. Every rupee spent is publicly visible — case ID, area, amount required, raised, spent, proof verification status.</p>

    <h3 className="h3 reveal" style={{marginBottom: '0.5rem', }}>Rescue Fund Caps — by urgency tier</h3>
    <p style={{fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '1.5rem', }} className="reveal">Financial support depends on available rescue funds and has explicit caps. Anything beyond these moves to case-specific fundraising, NGO escalation, or direct donor-to-vet payment.</p>

    <div className="fund-caps reveal">
      <div className="fund-cap-card low">
        <div className="fund-amount">₹500</div>
        <div className="fund-label">Low Urgency</div>
        <div className="fund-sub">Minor injuries, stable condition, monitoring cases</div>
      </div>
      <div className="fund-cap-card med">
        <div className="fund-amount">₹1,500</div>
        <div className="fund-label">Medium Urgency</div>
        <div className="fund-sub">Fractures, wounds, illness requiring vet visit</div>
      </div>
      <div className="fund-cap-card crit">
        <div className="fund-amount">₹3,000</div>
        <div className="fund-label">Critical Urgency</div>
        <div className="fund-sub">Accident cases, severe trauma, emergency surgery</div>
      </div>
    </div>

    <div style={{background: 'var(--warm-white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem 2rem', margin: '1rem 0', }} className="reveal">
      <p style={{fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.65', }}>Donor names can be public, anonymous, or accompanied by an Instagram shoutout. The transparency model is what makes the donation system trustworthy in an ecosystem that's been burned by fake rescue fundraisers. Every transaction is logged with case ID, area, amount required, amount raised, amount spent, and proof verification status.</p>
    </div>

    <hr className="divider" />

    <h2 className="h2 reveal">Revenue Streams</h2>
    <p className="lead reveal" style={{fontSize: '1rem', marginBottom: '1.5rem', }}>Pawloft's revenue does not depend on donations. Three stacked streams reinforce each other.</p>

    <div className="revenue-streams reveal">
      <div className="revenue-card">
        <div className="rev-num">Stream 1</div>
        <div className="rev-label">Freemium Partner Directory</div>
        <div className="rev-desc">Vets, clinics, NGOs, transport providers, groomers, trainers, boarding services. Free listings get basic visibility. Paid verified listings get featured placement, a verified badge, photos, reviews, a booking button, and priority recommendation.</div>
      </div>
      <div className="revenue-card">
        <div className="rev-num">Stream 2</div>
        <div className="rev-label">Booking Commissions</div>
        <div className="rev-desc">As the platform matures and vet appointment booking goes live, Pawloft earns a commission on every successfully booked appointment or service. Natural extension of the partner directory once volume is established.</div>
      </div>
      <div className="revenue-card">
        <div className="rev-num">Stream 3</div>
        <div className="rev-label">Government SaaS (B2G)</div>
        <div className="rev-desc">Welfare compliance dashboards, ABC program tracking, and city-level animal health reports for municipal corporations and state governments. Priced per city monitored. The intelligence layer becomes the product.</div>
      </div>
    </div>
  </div>
</section>

{/*  ═══ ROADMAP ═══  */}
<section id="roadmap" className="road-bg">
  <div className="section-wrap">
    <div className="section-label reveal">08 — Build Roadmap</div>
    <h1 className="h1 reveal" style={{color: 'var(--warm-white)', }}>4 phases. 12 months. MVP to intelligence platform.</h1>
    <p className="lead reveal">Built in layers. Never add complexity before the core rescue loop is proven.</p>

    <div className="roadmap-phases reveal">
      <div className="phase">
        <div className="phase-label">Month 1–2 · Foundation</div>
        <div className="phase-title">Core MVP</div>
        <ul className="phase-items">
          <li>Report form (photo + GPS + OTP)</li>
          <li>PostgreSQL + PostGIS database</li>
          <li>WhatsApp alert via Twilio</li>
          <li>Basic volunteer onboarding</li>
          <li>Case status tracking</li>
          <li>Admin dashboard v1</li>
        </ul>
      </div>
      <div className="phase">
        <div className="phase-label">Month 3–4 · Connection</div>
        <div className="phase-title">Live Relay</div>
        <ul className="phase-items">
          <li>WebSocket live relay system</li>
          <li>Reporter ↔ responder coordination</li>
          <li>Real-time case file updates</li>
          <li>Volunteer availability states</li>
          <li>Geo-radius auto-expansion</li>
          <li>Proof-based case closure</li>
        </ul>
      </div>
      <div className="phase">
        <div className="phase-label">Month 5–6 · Intelligence</div>
        <div className="phase-title">AI Triage</div>
        <ul className="phase-items">
          <li>GPT-4o Vision integration</li>
          <li>Injury severity classification</li>
          <li>Safe handling instructions</li>
          <li>Auto-urgency assignment</li>
          <li>Pre-arrival vet routing</li>
          <li>Vet partner API integration</li>
        </ul>
      </div>
      <div className="phase">
        <div className="phase-label">Month 7–12 · Scale</div>
        <div className="phase-title">Platform OS</div>
        <ul className="phase-items">
          <li>Donation system + Razorpay</li>
          <li>Transparent fund ledger</li>
          <li>Partner directory (freemium)</li>
          <li>City welfare leaderboards</li>
          <li>Government compliance reports</li>
          <li>B2G dashboard v1</li>
        </ul>
      </div>
    </div>

    <div style={{padding: '1.5rem 2rem', background: 'rgba(224,122,31,0.1)', border: '1px solid rgba(224,122,31,0.2)', borderRadius: '12px', marginTop: '2rem', }} className="reveal">
      <p style={{fontSize: '0.88rem', color: 'rgba(255,249,242,0.75)', lineHeight: '1.6', }}><strong style={{color: 'var(--amber-light)', }}>The guiding principle:</strong> Every feature decision must be evaluated against the 8-minute rescue window. If it doesn't make that window shorter, safer, or more likely to succeed — it is not MVP. Complexity is earned, not assumed.</p>
    </div>
  </div>
</section>

{/*  ═══ VISION OS ═══  */}
<section id="vision" className="vision-bg">
  <div className="section-wrap">
    <div className="section-label reveal">09 — Pawloft Sentience OS</div>
    <h1 className="h1 reveal" style={{color: 'var(--warm-white)', }}>The intelligence layer that India's animal welfare governance runs on.</h1>
    <p className="lead reveal">Every existing animal welfare solution is a tool. Pawloft Sentience OS is infrastructure. Tools get replaced. Infrastructure gets embedded into how governments and institutions operate — and then becomes impossible to remove.</p>

    <div className="vision-pillars reveal">
      <div className="pillar-card">
        <div className="pillar-num">01</div>
        <div className="pillar-title">Civic Participation → National Dataset</div>
        <div className="pillar-desc">Modeled on Aarogya Setu and CoWIN. Every person who reports an injured dog is unknowingly contributing to a national animal welfare intelligence layer. Public participation becomes the data collection engine.</div>
      </div>
      <div className="pillar-card">
        <div className="pillar-num">02</div>
        <div className="pillar-title">City Leaderboards → Public Pressure</div>
        <div className="pillar-desc">Modeled on Zomato's hygiene scores. A city welfare ranking that updates monthly gets picked up by local press every single time. Civic performance becomes visible and emotionally resonant to ordinary people — which forces institutions to act.</div>
      </div>
      <div className="pillar-card">
        <div className="pillar-num">03</div>
        <div className="pillar-title">Ground Truth → Government Intelligence</div>
        <div className="pillar-desc">Modeled on Palantir's B2G dashboards — but the mission is compassion, not surveillance. Municipal corporations have ABC program mandates with zero data systems. Pawloft sells clarity into ground-truth animal welfare data to institutions currently flying blind.</div>
      </div>
    </div>

    <div style={{marginTop: '3rem', padding: '2rem 2.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', position: 'relative', zIndex: '2', }} className="reveal">
      <h3 className="h3" style={{color: 'var(--warm-white)', marginBottom: '1rem', }}>Why India. Why now.</h3>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', }}>
        <div>
          <p style={{fontSize: '0.88rem', color: 'rgba(255,249,242,0.6)', lineHeight: '1.65', }}>The Supreme Court has been increasingly active on animal welfare. Municipal corporations are under pressure to show ABC program data. NGOs are struggling to demonstrate impact to donors who now demand proof. State governments have welfare mandates but zero data systems to execute them.</p>
        </div>
        <div>
          <p style={{fontSize: '0.88rem', color: 'rgba(255,249,242,0.6)', lineHeight: '1.65', }}>There is a structural vacuum, and Pawloft is perfectly positioned to fill it — because Pawloft is already generating the only real-time, ground-truth animal welfare data in the country. Every rescue report, every case closure, every verified volunteer interaction is a data point that compounds over time into an irreplaceable national dataset.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ═══ WHY NOW ═══  */}
<section style={{background: 'var(--parchment)', }}>
  <div className="section-wrap">
    <div className="section-label reveal">10 — Why Now</div>
    <h1 className="h1 reveal">Four structural tailwinds making this the right moment.</h1>

    <div className="why-grid reveal">
      <div className="why-card">
        <div className="why-icon">⚖️</div>
        <div>
          <h3 className="h3">Supreme Court Momentum</h3>
          <p style={{fontSize: '0.88rem', color: 'var(--muted)', marginTop: '0.25rem', lineHeight: '1.6', }}>India's Supreme Court has been increasingly active on animal welfare cases and institutional accountability. This creates top-down mandate pressure that Pawloft's compliance reporting directly serves.</p>
        </div>
      </div>
      <div className="why-card">
        <div className="why-icon">📱</div>
        <div>
          <h3 className="h3">WhatsApp as Infrastructure</h3>
          <p style={{fontSize: '0.88rem', color: 'var(--muted)', marginTop: '0.25rem', lineHeight: '1.6', }}>India has 500M+ WhatsApp users. The rescue alert system is built on a channel that every volunteer, NGO, and vet already uses daily — zero adoption friction for the notification layer.</p>
        </div>
      </div>
      <div className="why-card">
        <div className="why-icon">🤖</div>
        <div>
          <h3 className="h3">Multimodal AI Maturity</h3>
          <p style={{fontSize: '0.88rem', color: 'var(--muted)', marginTop: '0.25rem', lineHeight: '1.6', }}>GPT-4o and Gemini Vision APIs can now perform reliable visual injury triage at consumer scale. Three years ago this wasn't feasible. Today it's an API call. The AI triage feature is now buildable in months, not years.</p>
        </div>
      </div>
      <div className="why-card">
        <div className="why-icon">💝</div>
        <div>
          <h3 className="h3">Post-COVID Civic Surge</h3>
          <p style={{fontSize: '0.88rem', color: 'var(--muted)', marginTop: '0.25rem', lineHeight: '1.6', }}>Animal adoption and welfare awareness in India increased sharply post-2020. A generation of potential volunteers exists but lacks a structured platform to channel their intent into action. Pawloft is that platform.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ═══ FOUNDER ═══  */}
<section className="founder-section">
  <div className="section-wrap narrow">
    <div className="section-label reveal" style={{color: 'var(--amber-light)', }}>11 — The Founder</div>
    <div className="founder-card reveal">
      <div>
        <div className="founder-avatar">SR</div>
      </div>
      <div>
        <div className="founder-name" style={{color: 'var(--warm-white)', }}>Saanvi Rajput</div>
        <div className="founder-title">Founder & Product Lead · Pawloft</div>
        <p className="founder-bio">
          Building Pawloft from scratch at 21 — which is exactly the right time. Saanvi brings the product thinking of someone who has lived with the problem firsthand: the chaos of trying to help an injured animal with no system, no contacts, and no accountability. Pawloft is built from that lived frustration into something structural.
        </p>
        <p className="founder-bio" style={{marginTop: '1rem', }}>
          Pawloft is not a weekend project. It is a systems-level product designed with architecture discipline — layer by layer, validation before complexity, ground truth before scale. The vision is to build the intelligence layer that India's animal welfare governance runs on.
        </p>
        <div style={{marginTop: '1.5rem', fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--amber-light)', }}>
          "Connecting paws with people."
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ═══ CLOSING ═══  */}
<section className="closing">
  <h1 className="h1">The rescue OS India has been waiting for.</h1>
  <p className="lead">Pawloft is the structured system between an injured animal's cry for help and the people who can answer it. One report. One verified alert. One closed case with proof. Scaled to every city in India.</p>
  <a href="mailto:hello@pawloft.in" className="closing-cta">Get in touch →</a>
</section>


      </div>
    </div>
  );
}
