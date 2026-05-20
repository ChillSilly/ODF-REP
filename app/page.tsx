"use client";
 
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const DISCORD_USER_ID = "1372950378269769780";

const modules = [
  { id: "00", num: "00", name: "Plan de estudio", description: "Secuencia óptima de aprendizaje", color: "#F3F3F3" },
  { id: "01", num: "01", name: "Bases estadísticas", description: "El lenguaje matemático detrás de todo", color: "#F3F3F3" },
  { id: "02", num: "02", name: "Regime Switching", description: "Hamilton (1989) y su familia extendida", color: "#F3F3F3" },
  { id: "03", num: "03", name: "Hidden Markov Models", description: "El framework probabilístico para regímenes latentes", color: "#F3F3F3" },
  { id: "04", num: "04", name: "Volatility Regimes", description: "La dimensión más crítica para trading", color: "#F3F3F3" },
  { id: "05", num: "05", name: "Order Flow Regimes", description: "Regímenes a nivel de trades y DOM", color: "#F3F3F3" },
  { id: "order-flow", num: "11", name: "Order Flow", description: "AMT, Volume Profile, Footprints, Delta, VWAP, DOM", color: "#949494" },
  { id: "options-flow", num: "12", name: "Options Flow", description: "GEX, Dealer Hedging, Sweeps", color: "#949494" },
  { id: "macro", num: "13", name: "Macro", description: "Interest Rates, Treasury, Inflation", color: "#949494" },
  { id: "microstructure", num: "14", name: "Microstructure", description: "Tape Reading, Price Action", color: "#949494" },
  { id: "regimes", num: "15", name: "Market Regimes", description: "Long Gamma, Short Gamma, OpEx Pinning", color: "#949494" },
  { id: "risk-management", num: "16", name: "Risk Management", description: "Position Sizing, Kelly, Convexity", color: "#949494" },
];

const stats = [
  { value: "22+", label: "MODULES" },
  { value: "140+", label: "TERMS" },
  { value: "4", label: "PHASES" },
];

const features = [
  {
    title: "Interactive Brain",
    description: "Visual knowledge graph mapping every concept and their connections.",
  },
  {
    title: "Complete Glossary",
    description: "A to Z index of all trading, regime analysis, and quantitative finance terms.",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with completion indicators.",
  },
  {
    title: "Order Flow Tools",
    description: "Volume Profile, Footprints, Delta, VWAP, DOM analysis - all in one place.",
  },
];

export default function HomePage() {
  const [ownerAvatar, setOwnerAvatar] = useState<string | null>("https://cdn.discordapp.com/avatars/1372950378269769780/81ddcdac6ebd0b739438529a0a3f30ce.png?size=256");
  const [ownerUsername, setOwnerUsername] = useState<string | null>("ʌρ");
  const bgRef = useRef<HTMLDivElement>(null);

  const modulesReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const founderReveal = useScrollReveal();

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) - 0.5;
      targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (bgRef.current) {
        bgRef.current.style.setProperty("--mouse-x", `${currentX}`);
        bgRef.current.style.setProperty("--mouse-y", `${currentY}`);
      }
      frameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const loadDiscordUser = async () => {
      try {
        const response = await fetch(`/api/discord/user/${DISCORD_USER_ID}`);
        if (response.ok) {
          const data = await response.json();
          if (data.avatarUrl) {
            setOwnerAvatar(data.avatarUrl);
          } else {
            const defaultIndex = Number((BigInt(DISCORD_USER_ID) >> BigInt(22)) % BigInt(6));
            const defaultAvatar = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
            setOwnerAvatar(defaultAvatar);
          }
          if (data.username) {
            setOwnerUsername(data.username);
          }
        } else {
          const defaultIndex = Number((BigInt(DISCORD_USER_ID) >> BigInt(22)) % BigInt(6));
          const defaultAvatar = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
          setOwnerAvatar(defaultAvatar);
        }
      } catch {
        const defaultIndex = Number((BigInt(DISCORD_USER_ID) >> BigInt(22)) % BigInt(6));
        const defaultAvatar = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
        setOwnerAvatar(defaultAvatar);
        setOwnerUsername("Owner");
      }
    };

    loadDiscordUser();
  }, []);

  return (
    <main className="min-h-screen relative" style={{ background: "var(--color-midnight-canvas)", overflow: "hidden" }}>
      {/* Background Deep Ocean Gradient & Organic Shifting Blobs */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-25 animate-float-slow" 
             style={{ 
               background: 'rgb(160, 224, 171)', 
               animationDuration: '24s',
               transform: 'translate(calc(var(--mouse-x, 0) * -60px), calc(var(--mouse-y, 0) * -60px))'
             }} />
        <div className="absolute bottom-[10%] right-[2%] w-[60vw] h-[60vw] rounded-full blur-[110px] opacity-20 animate-float-slow" 
             style={{ 
               background: 'rgb(255, 172, 46)', 
               animationDuration: '32s', 
               animationDelay: '-8s',
               transform: 'translate(calc(var(--mouse-x, 0) * 50px), calc(var(--mouse-y, 0) * 50px))'
             }} />
        <div className="absolute top-[30%] right-[20%] w-[45vw] h-[45vw] rounded-full blur-[90px] opacity-20 animate-float-slow" 
             style={{ 
               background: 'rgb(165, 45, 37)', 
               animationDuration: '28s', 
               animationDelay: '-4s',
               transform: 'translate(calc(var(--mouse-x, 0) * -30px), calc(var(--mouse-y, 0) * 40px))'
             }} />
        
        {/* Frosted glass overlay to diffuse the gradients into a soft, immersive glow */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[120px] saturate-[160%]" />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <section
          className="min-h-[85vh] flex flex-col items-center justify-center px-6"
          style={{ position: "relative" }}
        >
          {/* Ethereal Watermark background text */}
          <div 
            style={{
              position: "absolute",
              top: "42%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-raleway)",
              fontSize: "var(--text-display)",
              lineHeight: "var(--leading-display)",
              fontWeight: 400,
              letterSpacing: "-0.05em",
              color: "var(--color-frost-white)",
              opacity: 0.02,
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 0,
            }}
          >
            ODF
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-[800px] relative z-10"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "#858585",
                marginBottom: "32px",
              }}
            >
              OPTIONS · DATA · FLOW
            </motion.p>

            <h1
              style={{
                fontFamily: "var(--font-raleway)",
                fontSize: "var(--text-heading-lg)",
                fontWeight: 400,
                lineHeight: 1.39,
                letterSpacing: "normal",
                color: "var(--color-frost-white)",
                marginBottom: "24px",
              }}
            >
              ODF
            </h1>

            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-subheading)",
                lineHeight: 1.22,
                color: "var(--color-whisper-gray)",
                marginBottom: "40px",
                maxWidth: "500px",
                margin: "0 auto 40px",
              }}
            >
              Master the Market Regimes
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--element-gap)" }}>
              <a href="/api/auth/login" className="btn-gradient" style={{ fontSize: "14px", padding: "12px 32px", borderRadius: "var(--radius-buttons)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                LOGIN
              </a>
              <Link href="/brain" className="btn-ghost-secondary" style={{ fontSize: "14px", padding: "12px 32px", borderRadius: "var(--radius-buttons)" }}>
                VIEW BRAIN
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "48px",
              marginTop: "80px",
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.2, duration: 0.6 }}
                className="text-center"
              >
                <div
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "var(--color-frost-white)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "var(--color-whisper-gray)",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            style={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "40px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                paddingTop: "8px",
              }}
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "4px",
                  height: "8px",
                  background: "rgba(255, 255, 255, 0.4)",
                  borderRadius: "2px",
                }}
              />
            </div>
          </motion.div>
        </section>

        <section style={{ padding: "var(--section-gap) 24px" }} ref={modulesReveal.ref}>
          <div style={{ maxWidth: "var(--page-max-width)", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={modulesReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "var(--font-raleway)",
                  fontSize: "var(--text-heading-sm)",
                  fontWeight: 400,
                  color: "var(--color-frost-white)",
                  letterSpacing: "normal",
                }}
              >
                MODULES
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={modulesReveal.isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  color: "var(--color-whisper-gray)",
                  marginTop: "12px",
                }}
              >
                22 modules covering regime detection, order flow, and quantitative finance.
              </motion.p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "var(--element-gap)",
              }}
            >
              {modules.map((module, idx) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={modulesReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="frosted-card hover-lift"
                  style={{
                    padding: "var(--card-padding)",
                    borderRadius: "var(--radius-cards)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "var(--color-frost-white)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {module.num}
                    </span>
                    <Link
                      href={`/module/${module.id}`}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "var(--color-whisper-gray)",
                        letterSpacing: "0.02em",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-frost-white)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-whisper-gray)";
                      }}
                    >
                      OPEN →
                    </Link>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: module.color,
                      marginBottom: "8px",
                    }}
                  >
                    {module.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "14px",
                      color: "var(--color-whisper-gray)",
                      lineHeight: "1.4",
                    }}
                  >
                    {module.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/dashboard" className="btn-ghost" style={{ borderRadius: "var(--radius-buttons)" }}>
                VIEW ALL MODULES
              </Link>
            </div>
          </div>
        </section>

        <section style={{ padding: "var(--section-gap) 24px" }} ref={featuresReveal.ref}>
          <div style={{ maxWidth: "var(--page-max-width)", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={featuresReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "var(--font-raleway)",
                  fontSize: "var(--text-heading-sm)",
                  fontWeight: 400,
                  color: "var(--color-frost-white)",
                  letterSpacing: "normal",
                }}
              >
                FEATURES
              </motion.h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "var(--element-gap)",
              }}
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="frosted-card hover-lift"
                  style={{
                    padding: "var(--card-padding)",
                    borderRadius: "var(--radius-cards)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "var(--color-frost-white)",
                      marginBottom: "12px",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "14px",
                      color: "var(--color-whisper-gray)",
                      lineHeight: "1.5",
                    }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "var(--section-gap) 24px 80px" }} ref={founderReveal.ref}>
          <div style={{ maxWidth: "var(--page-max-width)", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={founderReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: "var(--color-whisper-gray)",
                  marginBottom: "24px",
                }}
              >
                FOUNDER
              </p>

              <a
                href={`https://discord.com/users/${DISCORD_USER_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  border: "2px solid var(--color-border)",
                  overflow: "hidden",
                  marginBottom: "24px",
                  background: "var(--color-deep-space)",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="hover:scale-[1.05] hover:border-[var(--color-cosmic-violet)]"
              >
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {ownerAvatar ? (
                    <img
                      src={ownerAvatar}
                      alt="Founder"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <svg
                      style={{ width: "48px", height: "48px", color: "var(--color-whisper-gray)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
              </a>

              <h3
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-heading-sm)",
                  fontWeight: 600,
                  color: "var(--color-frost-white)",
                  marginBottom: "12px",
                }}
              >
                {ownerUsername || "Founder"}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "14px",
                  color: "var(--color-whisper-gray)",
                  maxWidth: "400px",
                  lineHeight: "1.5",
                  marginBottom: "24px",
                }}
              >
                Building next-generation tools for traders who think in probabilities. Order Flow, Regimes, and Quantitative Finance.
              </p>

              <a
                href={`https://discord.com/users/${DISCORD_USER_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ gap: "10px", borderRadius: "var(--radius-buttons)" }}
              >
                <svg style={{ width: "18px", height: "18px" }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.078.078 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                DISCORD
              </a>
            </motion.div>
          </div>
        </section>

        <footer
          style={{
            padding: "48px 24px",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div style={{ maxWidth: "var(--page-max-width)", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src="/favicon.ico"
                  alt="ODF"
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--color-frost-white)",
                  }}
                >
                  ODF
                </span>
              </div>

              <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                {[
                  { href: "/", label: "HOME" },
                  { href: "/dashboard", label: "EDUCATION" },
                  { href: "/glossary", label: "GLOSSARY" },
                  { href: "/brain", label: "BRAIN" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link"
                    style={{ fontSize: "13px", letterSpacing: "0.02em" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--color-whisper-gray)",
                }}
              >
                © 2026 ODF
              </span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
