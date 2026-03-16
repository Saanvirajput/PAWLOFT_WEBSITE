import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Heart, HandHeart, Home, Search, Calendar, Users, Activity } from 'lucide-react';
import heroImg from '../assets/hero.png';
import storyBefore from '../assets/story_before.png';
import storyAfter from '../assets/story_after.png';
import './Landing.css';

const Landing = () => {
    const [isVisible, setIsVisible] = React.useState({});
    const observerRef = React.useRef(null);

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
                        <h1 className="hero-title">Every Paw Deserves a Safe Place to Call Home.</h1>
                        <p className="hero-subtitle">
                            PawLoft connects rescuers, shelters, and adopters to save animals who cannot save themselves.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/" className="btn btn-primary btn-lg">Adopt a Friend</Link>
                            <Link to="/" className="btn btn-secondary btn-lg">Report Animal</Link>
                        </div>
                    </div>
                    <div className="hero-image-wrapper">
                        <img src={heroImg} alt="Happy dog and cat" className="hero-image" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section fade-in-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>500+</h3>
                            <p>Animals Rescued</p>
                        </div>
                        <div className="stat-item">
                            <h3>1,200+</h3>
                            <p>Volunteers</p>
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
            <section className="problem-section section fade-in-section">
                <div className="container">
                    <h2 className="section-title">Why We Exist</h2>
                    <div className="problem-grid">
                        <div className="problem-card">
                            <AlertCircle size={48} className="problem-icon" />
                            <h3>Thousands Abandoned</h3>
                            <p>Countless animals are injured, abandoned, or ignored every single day in our cities.</p>
                        </div>
                        <div className="problem-card">
                            <Search size={48} className="problem-icon" />
                            <h3>Lack of Visibility</h3>
                            <p>Rescuers and verified shelters lack the resources and platform to be seen.</p>
                        </div>
                        <div className="problem-card">
                            <HandHeart size={48} className="problem-icon" />
                            <h3>Desire to Help</h3>
                            <p>People want to help but don’t know how or where to start. Pawloft bridges this gap.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works section fade-in-section">
                <div className="container">
                    <h2 className="section-title">How PawLoft Works</h2>
                    <div className="how-cards">
                        <div className="how-card">
                            <div className="icon-circle"><AlertCircle /></div>
                            <h3>Report</h3>
                            <p>Spot an injured or abandoned animal and report it instantly with location.</p>
                        </div>
                        <div className="how-card">
                            <div className="icon-circle"><Activity /></div>
                            <h3>Rescue</h3>
                            <p>Nearby rescuers and verified shelters get notified to take action.</p>
                        </div>
                        <div className="how-card">
                            <div className="icon-circle"><Heart /></div>
                            <h3>Heal</h3>
                            <p>Animals receive medical care, food, and rehabilitation.</p>
                        </div>
                        <div className="how-card">
                            <div className="icon-circle"><Home /></div>
                            <h3>Adopt</h3>
                            <p>Find loving forever homes for healthy, happy pets.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section section fade-in-section">
                <div className="container">
                    <h2 className="section-title">Core Features</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <Search className="feature-icon" />
                            <div>
                                <h4>Rescue Reporting</h4>
                                <p>Location-based alerts for swift action.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <PawPrintIcon className="feature-icon" />
                            <div>
                                <h4>Verified Listings</h4>
                                <p>Adoption profiles you can trust.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <Users className="feature-icon" />
                            <div>
                                <h4>Volunteer Onboarding</h4>
                                <p>Join a community of compassionate heroes.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <Calendar className="feature-icon" />
                            <div>
                                <h4>Donation Tracking</h4>
                                <p>Transparent support for medical care.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section section fade-in-section">
                <div className="container">
                    <h2 className="section-title">From Streets to Safety</h2>
                    <div className="story-content">
                        <div className="story-image-box">
                            <img src={storyBefore} alt="Dog before rescue" className="story-img" />
                            <span className="story-label label-before">Before</span>
                        </div>
                        <div className="story-text">
                            <h3>Meet Rusty</h3>
                            <p>Rusty was found alone on a busy street corner, scared and hungry. Thanks to a report on PawLoft, a local rescuer found him, treated his injuries, and gave him a warm bed.</p>
                            <p className="story-transition">Now, look at him thriving!</p>
                        </div>
                        <div className="story-image-box">
                            <img src={storyAfter} alt="Dog after rescue" className="story-img" />
                            <span className="story-label label-after">After</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section fade-in-section">
                <div className="container">
                    <h2>You Can Be Someone’s Hero Today.</h2>
                    <div className="cta-buttons">
                        <Link to="/" className="btn btn-primary btn-lg">Adopt Now</Link>
                        <Link to="/" className="btn btn-outline btn-lg cta-outline-btn">Volunteer With Us</Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section section fade-in-section">
                <div className="container about-container">
                    <div className="about-content">
                        <h2>About PawLoft</h2>
                        <p>PawLoft started as a student-led, purpose-driven initiative. We are mission-focused, not profit-driven. Our long-term vision is to build a safe ecosystem where every animal has a chance at a happy life.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper for icon since Lucide PawPrint might conflict if imported twice or needs specific styling
const PawPrintIcon = ({ className }) => (
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
