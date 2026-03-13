import { useState, useEffect } from "react";

const LandingPage = ({ onGetStarted, onLogin }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div style={{ background: "var(--bg-dark)", color: "#fff", minHeight: "100vh", overflow: "hidden" }}>

            {/* ===== NAVBAR ===== */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "20px 48px",
                background: scrolled ? "rgba(13, 13, 16, 0.7)" : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 32, height: 32, background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                        borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <span style={{ fontSize: 16 }}>●</span>
                    </div>
                    <span className="logo-text" style={{ fontSize: "var(--fs-xl)", fontWeight: 700, letterSpacing: "-0.01em" }}>
                        ClipMantra
                    </span>
                </div>

                <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    <button onClick={() => scrollTo("features")} style={navLink}>Features</button>
                    <button onClick={() => scrollTo("how-it-works")} style={navLink}>How It Works</button>
                    <button onClick={() => scrollTo("pricing")} style={navLink}>Pricing</button>
                    <button onClick={() => scrollTo("faq")} style={navLink}>FAQ</button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <button onClick={onLogin} style={navLink}>Login</button>
                    <button onClick={onGetStarted} style={{
                        padding: "10px 24px", 
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        border: "none", borderRadius: 12,
                        color: "#fff", fontWeight: 600, fontSize: "var(--fs-sm)",
                        cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(99, 102, 241, 0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(99, 102, 241, 0.3)"; }}
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <section style={{
                position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", textAlign: "center",
                padding: "120px 24px 160px", background: "#050505", overflow: "hidden"
            }}>
                {/* Background Glow */}
                <div style={{
                    position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)",
                    width: "120%", height: "60%",
                    background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
                    filter: "blur(100px)", pointerEvents: "none", zIndex: 0
                }} />
                
                {/* Glow Arch */}
                <div style={{
                    position: "absolute", bottom: "5%", left: "50%", transform: "translateX(-50%)",
                    width: "80%", height: "40%",
                    borderRadius: "50%", 
                    background: "linear-gradient(to top, rgba(99, 102, 241, 0.4), transparent)",
                    filter: "blur(60px)", pointerEvents: "none", zIndex: 1, opacity: 0.6
                }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 900, animation: "fadeInScale 0.8s ease-out" }}>
                    {/* Badge */}
                    <div className="glass-pill" style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        padding: "6px 20px 6px 6px", marginBottom: 32,
                    }}>
                        <span style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700,
                            color: "#fff"
                        }}>2025</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>Next-Gen AI Studio</span>
                    </div>

                    <h1 className="text-gradient" style={{
                        fontSize: "clamp(48px, 8vw, 84px)", fontWeight: 700,
                        lineHeight: 1, margin: "0 0 32px", letterSpacing: "-0.03em"
                    }}>
                        AI-Driven Success<br />Redefining the Future.
                    </h1>

                    <p style={{
                        fontSize: "clamp(16px, 1.5vw, 18px)", color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.6, margin: "0 auto 48px", maxWidth: 540,
                    }}>
                        Creating latest solutions that redefine innovation.<br />
                        Stay ahead with AI-powered technology for the future.
                    </p>

                    <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                        <button className="glass" style={{
                            padding: "16px 36px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                        >
                            Connect With Us
                        </button>
                        <button style={{
                            padding: "16px 36px", borderRadius: 12, border: "none",
                            background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.8)",
                            fontWeight: 600, fontSize: 15, cursor: "pointer",
                            transition: "all 0.3s ease", backdropFilter: "blur(10px)"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                        >
                            What is ClipMantra?
                        </button>
                    </div>

                    {/* Client Logos */}
                    <div style={{
                        marginTop: 100, display: "flex", justifyContent: "center", gap: 60,
                        opacity: 0.3, filter: "grayscale(1)"
                    }}>
                        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 2 }}>LOGO</div>
                        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 2 }}>BRAND</div>
                        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 2 }}>IPSUM</div>
                        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 2 }}>CORP</div>
                    </div>
                </div>

                {/* Bottom Chip */}
                <div style={{
                    position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
                    animation: "float 3s ease-in-out infinite"
                }}>
                    <div className="glass-pill" style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "8px 20px", cursor: "pointer"
                    }}>
                        <div style={{
                            width: 24, height: 24, background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                            <span style={{ fontSize: 12 }}>ℹ</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>About Us</span>
                    </div>
                </div>
            </section>

            {/* ===== INNOVATION SECTION ===== */}
            <section id="innovation" style={{
                position: "relative", padding: "160px 24px", background: "#050505",
                overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center"
            }}>
                {/* Arc Container */}
                <div className="arc-container" style={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    width: "100%", height: "100%", pointerEvents: "none", zIndex: 0
                }}>
                    {[...Array(11)].map((_, i) => {
                        const angle = (i - 5) * 18; // -90 to 90 degrees
                        const radius = 600;
                        const x = Math.sin((angle * Math.PI) / 180) * radius;
                        const y = -Math.cos((angle * Math.PI) / 180) * radius + radius - 100;
                        
                        const images = [
                            "/Users/ayushsaxena/.gemini/antigravity/brain/14ab78d4-32b2-4817-8979-469e0b4018b9/innovation_card_1_1773379920684.png",
                            "/Users/ayushsaxena/.gemini/antigravity/brain/14ab78d4-32b2-4817-8979-469e0b4018b9/innovation_card_2_1773379935790.png",
                            "/Users/ayushsaxena/.gemini/antigravity/brain/14ab78d4-32b2-4817-8979-469e0b4018b9/innovation_card_3_1773379952408.png"
                        ];
                        
                        return (
                            <div key={i} style={{
                                position: "absolute", top: "40%", left: "50%",
                                width: 140, height: 140,
                                borderRadius: 24, overflow: "hidden",
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                                border: "1px solid rgba(255,255,255,0.1)",
                                background: "#111", opacity: 0.4,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                            }}>
                                <img src={images[i % images.length]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        );
                    })}
                </div>

                <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 700 }}>
                    {/* Badge */}
                    <div className="glass-pill" style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        padding: "8px 20px", marginBottom: 32,
                    }}>
                        <div style={{
                            width: 20, height: 20, background: "rgba(139, 92, 246, 0.2)",
                            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#8b5cf6", fontSize: 10
                        }}>🔥</div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Features</span>
                    </div>

                    <h2 style={{
                        fontSize: "clamp(42px, 6vw, 64px)", fontWeight: 700,
                        lineHeight: 1.1, margin: "0 0 24px", color: "#fff"
                    }}>
                        Packed with<br />Innovation.
                    </h2>

                    <p style={{
                        fontSize: "clamp(16px, 1.2vw, 18px)", color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.6, margin: "0 auto 48px", maxWidth: 480,
                    }}>
                        ClipMantra is packed with cutting-edge features designed to elevate your content creation workflow.
                    </p>

                    <button style={{
                        padding: "16px 48px", 
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        border: "none", borderRadius: 12,
                        color: "#fff", fontWeight: 700, fontSize: 16,
                        cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 15px 40px rgba(99, 102, 241, 0.5)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(99, 102, 241, 0.4)"; }}
                    >
                        Book an Appointment
                    </button>
                </div>
            </section>

            {/* ===== FEATURE CARDS SECTION ===== */}
            <section style={{ padding: "120px 48px", background: "#050505" }}>
                <div style={{
                    maxWidth: 1400, margin: "0 auto",
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40
                }}>
                    {/* Card 1: API Integrations */}
                    <div className="feature-card-wrapper">
                        <div className="icon-circle" style={{ background: "rgba(99, 102, 241, 0.2)", color: "#8b5cf6", boxShadow: "none", border: "1px solid rgba(139, 92, 246, 0.3)" }}>
                            <span style={{ fontSize: 24 }}>⚡</span>
                        </div>
                        <h3 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 20px", color: "#fff" }}>
                            Seamless API<br />Integrations
                        </h3>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginBottom: 60, lineHeight: 1.6 }}>
                            ClipMantra supports a wide range of<br />third-party integrations.
                        </p>
                        
                        <div style={{
                            width: "100%", height: 200, background: "rgba(99, 102, 241, 0.05)",
                            borderRadius: 24, padding: 32, position: "relative",
                            border: "1px solid rgba(255,255,255,0.03)"
                        }}>
                             <div style={{
                                display: "flex", justifyContent: "space-between", marginBottom: 40,
                                opacity: 0.6
                            }}>
                                {['🍎', '⚡', '🅰️', '🫐', '🐝', '✔️'].map((icon, i) => (
                                    <div key={i} style={{ fontSize: 20 }}>{icon}</div>
                                ))}
                            </div>
                            <div style={{
                                width: 48, height: 48, background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                borderRadius: 12, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)", position: "relative", zIndex: 2
                            }}>
                                <span style={{ fontSize: 20 }}>≡</span>
                            </div>
                            {/* Decorative lines */}
                            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                                <path d="M 50 60 Q 150 140 250 140" stroke="rgba(99, 102, 241, 0.1)" fill="none" strokeWidth="1" />
                                <path d="M 250 60 Q 150 140 50 140" stroke="rgba(99, 102, 241, 0.1)" fill="none" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>

                    {/* Card 2: Trusted Authentication */}
                    <div className="feature-card-wrapper">
                        <div className="icon-circle" style={{ background: "rgba(99, 102, 241, 0.2)", color: "#8b5cf6", boxShadow: "none", border: "1px solid rgba(139, 92, 246, 0.3)" }}>
                            <span style={{ fontSize: 24 }}>⚡</span>
                        </div>
                        <h3 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 20px", color: "#fff" }}>
                            Trusted<br />Authentication
                        </h3>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginBottom: 60, lineHeight: 1.6 }}>
                            Quickly integrate with major<br />platforms to workflows.
                        </p>

                        <div style={{ width: "100%", position: "relative", minHeight: 200 }}>
                            <div className="tag-cloud">
                                {['Data Analysis', 'Chatbots', 'Capture', 'Cognitive', 'Intelligent', 'Infrastructure', 'Mobile', 'Chatbots', 'Infrastructure', 'Content', 'Data Analysis'].map((tag, i) => (
                                    <div key={i} className="tag-item">{tag}</div>
                                ))}
                            </div>
                            <div style={{
                                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                                width: 72, height: 72, background: "rgba(99, 102, 241, 0.9)",
                                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 0 50px rgba(99, 102, 241, 0.7)", backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.2)", zIndex: 10
                            }}>
                                <span style={{ fontSize: 32, color: "#fff" }}>✓</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: AI-Speech Recognition */}
                    <div className="feature-card-wrapper">
                        <div className="icon-circle" style={{ background: "rgba(99, 102, 241, 0.2)", color: "#8b5cf6", boxShadow: "none", border: "1px solid rgba(139, 92, 246, 0.3)" }}>
                            <span style={{ fontSize: 24 }}>⚡</span>
                        </div>
                        <h3 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 20px", color: "#fff" }}>
                            AI-Speech<br />Recognition
                        </h3>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginBottom: 60, lineHeight: 1.6 }}>
                            Enable your user to control or<br />navigate your site using speech.
                        </p>

                        <div style={{
                            width: "100%", background: "rgba(99, 102, 241, 0.05)",
                            borderRadius: 24, padding: 32, textAlign: "left",
                            border: "1px solid rgba(255,255,255,0.03)", minHeight: 200
                        }}>
                             <div style={{
                                background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", padding: "8px 16px",
                                borderRadius: "12px 12px 0 12px", fontSize: 13, fontWeight: 600,
                                display: "inline-block", marginBottom: 20, marginLeft: 20,
                                boxShadow: "0 5px 15px rgba(99, 102, 241, 0.3)"
                            }}>
                                Speech Recognition
                            </div>

                            <div style={{
                                background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.05)",
                                borderRadius: 20, padding: "16px 24px", display: "flex", alignItems: "center", gap: 16
                            }}>
                                <div style={{
                                    width: 36, height: 36, background: "rgba(99, 102, 241, 0.2)",
                                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <span style={{ fontSize: 16 }}>🎤</span>
                                </div>
                                <div style={{ display: "flex", gap: 3, alignItems: "center", flex: 1, height: 30 }}>
                                    {[...Array(15)].map((_, i) => (
                                        <div key={i} className="wave-bar" style={{ 
                                            animationDelay: `${i * 0.1}s`,
                                            height: `${Math.random() * 20 + 10}px` 
                                        }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section id="features" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <p style={{ color: "var(--primary)", fontSize: "var(--fs-xs)", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
                        Features
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, margin: "0 0 16px" }}>
                        Everything You Need to Go Viral
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-lg)", maxWidth: 500, margin: "0 auto" }}>
                        From paste to post, ClipMantra handles the entire workflow.
                    </p>
                </div>

                <div className="features-grid" style={{
                    display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 24,
                }}>
                    {[
                        {
                            icon: "🤖", title: "Gemini AI Analysis",
                            desc: "Google's Gemini model analyzes transcripts to find the most viral, high-engagement moments with precision.",
                            color: "rgba(0, 229, 153, 0.15)",
                        },
                        {
                            icon: "⚡", title: "Lightning Fast Pipeline",
                            desc: "Download, transcribe, analyze, and render — the entire pipeline runs in under 3 minutes on average.",
                            color: "rgba(0, 170, 255, 0.15)",
                        },
                        {
                            icon: "🎬", title: "Ready-to-Post Clips",
                            desc: "Get perfectly trimmed MP4 clips ready for TikTok, Reels, Shorts, or any social platform.",
                            color: "rgba(168, 85, 247, 0.15)",
                        },
                        {
                            icon: "📊", title: "Viral Score Detection",
                            desc: "AI scores each segment for virality based on hook strength, emotional peaks, and engagement patterns.",
                            color: "rgba(255, 153, 0, 0.15)",
                        },
                    ].map((f) => (
                        <div key={f.title} className="card feature-card" style={{
                            padding: 32, border: "1px solid var(--border-muted)",
                            position: "relative", overflow: "hidden",
                            transition: "transform 0.3s, border-color 0.3s",
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--border-muted)"; }}
                        >
                            <div style={{
                                position: "absolute", top: -20, right: -20, width: 120, height: 120,
                                background: `radial-gradient(circle, ${f.color} 0%, transparent 70%)`,
                                pointerEvents: "none",
                            }} />
                            <div style={{
                                width: 48, height: 48, borderRadius: 14,
                                background: f.color, display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 24, marginBottom: 20,
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, margin: "0 0 10px" }}>{f.title}</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.7, margin: 0 }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section id="how-it-works" style={{
                padding: "100px 24px",
                background: "linear-gradient(180deg, transparent 0%, rgba(0, 229, 153, 0.02) 50%, transparent 100%)",
            }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <p style={{ color: "var(--primary)", fontSize: "var(--fs-xs)", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
                            How It Works
                        </p>
                        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, margin: "0 0 16px" }}>
                            Three Steps to Viral Content
                        </h2>
                        <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-lg)", maxWidth: 480, margin: "0 auto" }}>
                            No editing skills required. Just paste and let AI do the magic.
                        </p>
                    </div>

                    <div className="steps-grid" style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
                        {[
                            { step: "01", title: "Paste YouTube URL", desc: "Drop any YouTube video link. Long-form podcasts, interviews, tutorials — anything works.", icon: "🔗" },
                            { step: "02", title: "AI Finds Viral Moments", desc: "Gemini AI transcribes, analyzes, and identifies the highest-engagement segments automatically.", icon: "🧠" },
                            { step: "03", title: "Download & Post", desc: "Get perfectly trimmed clips rendered with FFmpeg. Download and post directly to any platform.", icon: "🚀" },
                        ].map((s, i) => (
                            <div key={s.step} className="step-item" style={{
                                flex: "1 1 250px", maxWidth: 300, textAlign: "center",
                                padding: 32, position: "relative",
                            }}>
                                <div style={{
                                    fontSize: 48, marginBottom: 20,
                                    filter: "grayscale(0)",
                                }}>
                                    {s.icon}
                                </div>
                                <p style={{
                                    fontSize: "var(--fs-xs)", color: "var(--primary)", fontWeight: 800,
                                    letterSpacing: 2, marginBottom: 12,
                                }}>
                                    STEP {s.step}
                                </p>
                                <h3 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, margin: "0 0 12px" }}>{s.title}</h3>
                                <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.7, margin: 0 }}>
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PRICING SECTION ===== */}
            <section id="pricing" style={{ padding: "120px 24px", background: "#050505", textAlign: "center" }}>
                <div style={{ maxWidth: 900, margin: "0 auto 80px" }}>
                    {/* Badge */}
                    <div className="glass-pill" style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        padding: "8px 20px", marginBottom: 32,
                    }}>
                        <div style={{
                            width: 20, height: 20, background: "rgba(139, 92, 246, 0.2)",
                            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#8b5cf6", fontSize: 10
                        }}>💰</div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Pricing</span>
                    </div>

                    <h2 style={{
                        fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700,
                        lineHeight: 1.1, margin: "0 0 24px", color: "#fff"
                    }}>
                        Flexible Plans for Every Need—<br />
                        Perfect for Agencies, and Startups.
                    </h2>

                    <p style={{
                        fontSize: "clamp(16px, 1.2vw, 18px)", color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.6, maxWidth: 600, margin: "0 auto"
                    }}>
                        Our pricing plans are designed to make getting started as effortless as possible. With flexible options tailored to suit a variety of needs and budgets.
                    </p>
                </div>

                <div style={{
                    maxWidth: 1200, margin: "0 auto",
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32
                }}>
                    {[
                        {
                            name: "Starter",
                            price: "99",
                            desc: "Perfect for individuals and freelancers starting out.",
                            badge: "Most Pick",
                            stats: [{ label: "Projects", val: "100+" }, { label: "Revisions", val: "75+" }],
                            features: ["All templates unlocked", "Unlimited Licenses", "Lifetime Updates", "Email support", "30-Days Money-back Guarantee"]
                        },
                        {
                            name: "Professional",
                            price: "599",
                            desc: "Ideal for growing agencies and small businesses.",
                            badge: "Advanced",
                            stats: [{ label: "Projects", val: "150+" }, { label: "Revisions", val: "125+" }],
                            features: ["All templates unlocked", "Unlimited Licenses", "Lifetime Updates", "Email support", "30-Days Money-back Guarantee"],
                            active: true
                        },
                        {
                            name: "Enterprise",
                            price: "2,599",
                            desc: "Advanced solutions for large teams and startups.",
                            badge: "Recommended",
                            stats: [{ label: "Projects", val: "180+" }, { label: "Revisions", val: "140+" }],
                            features: ["All templates unlocked", "Unlimited Licenses", "Lifetime Updates", "Email support", "30-Days Money-back Guarantee"]
                        }
                    ].map((plan, i) => (
                        <div key={i} className="feature-card-wrapper" style={{
                            alignItems: "flex-start", textAlign: "left", padding: 48,
                            border: plan.active ? "1px solid rgba(139, 92, 246, 0.3)" : "1px solid rgba(255,255,255,0.04)",
                            background: plan.active ? "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))" : "#0d0d10"
                        }}>
                             <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                                <div style={{
                                    width: 48, height: 48, background: "rgba(139, 92, 246, 0.2)",
                                    borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#8b5cf6"
                                }}>
                                    {i === 0 ? "🚀" : i === 1 ? "💎" : "🏛️"}
                                </div>
                                <span className="glass" style={{
                                    padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                                    color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.05)"
                                }}>{plan.badge}</span>
                             </div>

                             <p style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.8)", margin: "0 0 8px" }}>{plan.name}</p>
                             <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
                                <span style={{ fontSize: 48, fontWeight: 700, color: "#fff" }}>${plan.price}</span>
                                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>/ Month</span>
                             </div>

                             <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 32 }}>
                                {plan.desc}
                             </p>

                             {/* Stats */}
                             <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
                                {plan.stats.map((s, idx) => (
                                    <div key={idx} className="glass" style={{
                                        flex: 1, padding: "12px", borderRadius: 16, textAlign: "center",
                                        border: "1px solid rgba(255,255,255,0.03)"
                                    }}>
                                        <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>{s.val}</p>
                                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>{s.label}</p>
                                    </div>
                                ))}
                             </div>

                             {/* Features List */}
                             <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48, flex: 1 }}>
                                {plan.features.map((f, idx) => (
                                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{
                                            width: 18, height: 18, borderRadius: "50%", background: "rgba(99, 102, 241, 0.2)",
                                            display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6", fontSize: 10
                                        }}>✓</div>
                                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{f}</span>
                                    </div>
                                ))}
                             </div>

                             <button style={{
                                width: "100%", padding: "16px", 
                                background: plan.active ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.03)",
                                border: plan.active ? "none" : "1px solid rgba(255,255,255,0.05)",
                                borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15,
                                cursor: "pointer", transition: "all 0.3s ease",
                                boxShadow: plan.active ? "0 10px 25px rgba(99, 102, 241, 0.3)" : "none"
                            }}
                            onMouseEnter={(e) => { 
                                if (plan.active) {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(99, 102, 241, 0.4)";
                                } else {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                }
                            }}
                            onMouseLeave={(e) => { 
                                if (plan.active) {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(99, 102, 241, 0.3)";
                                } else {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                }
                            }}
                            >
                                Book an Appointment
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section style={{
                padding: "100px 24px", textAlign: "center",
                background: "linear-gradient(180deg, transparent, rgba(0, 229, 153, 0.03))",
                position: "relative",
            }}>
                <div style={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    width: 600, height: 600,
                    background: "radial-gradient(circle, rgba(0, 229, 153, 0.06) 0%, transparent 60%)",
                    pointerEvents: "none", filter: "blur(60px)",
                }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, margin: "0 0 16px" }}>
                        Ready to Extract Viral Clips?
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-lg)", maxWidth: 480, margin: "0 auto 40px" }}>
                        Join thousands of creators using AI to find their best content moments.
                    </p>
                    <button onClick={onGetStarted} className="btn-primary" style={{
                        padding: "18px 48px", fontSize: "var(--fs-lg)", fontWeight: 700,
                        boxShadow: "0 0 40px rgba(0, 229, 153, 0.25)",
                    }}>
                        Get Started — It's Free →
                    </button>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer style={{
                padding: "40px 24px", borderTop: "1px solid var(--border-muted)",
                background: "var(--bg-sidebar)",
            }}>
                <div style={{
                    maxWidth: 900, margin: "0 auto",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexWrap: "wrap", gap: 16,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="logo-text" style={{ fontSize: "var(--fs-lg)", fontWeight: 800 }}>ClipMantra</span>
                        <span style={{ color: "var(--text-dark)", fontSize: "var(--fs-xs)" }}>•</span>
                        <span style={{ color: "var(--text-dark)", fontSize: "var(--fs-xs)" }}>AI-Powered Clip Extraction</span>
                    </div>
                    <p style={{ color: "var(--text-dark)", fontSize: "var(--fs-xs)", margin: 0 }}>
                        © 2026 ClipMantra. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* ===== RESPONSIVE STYLES ===== */}
            <style>{`
        @media (max-width: 768px) {
          .nav-links button:not(:last-child) {
            display: none !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
          .steps-grid {
            flex-direction: column !important;
            align-items: center !important;
          }
          .step-item {
            max-width: 100% !important;
          }
          .feature-card {
            padding: 24px !important;
          }
        }
      `}</style>
        </div>
    );
};

const navLink = {
    background: "none", border: "none", color: "var(--text-dim)",
    cursor: "pointer", fontSize: "var(--fs-sm)", fontWeight: 500,
    fontFamily: "var(--font-main)", transition: "color 0.2s", padding: 0,
};

export default LandingPage;
