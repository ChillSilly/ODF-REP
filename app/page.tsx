"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import HeroSection from "./components/HeroSection";

const DISCORD_USER_ID = "1372950378269769780";
const DISCORD_INVITE = "https://discord.gg/mtS68EZePS";

const modules = [
  { id: "00", num: "00", name: "Study Plan", description: "Optimal learning sequence" },
  { id: "01", num: "01", name: "Statistical Foundations", description: "The mathematical language behind everything" },
  { id: "02", num: "02", name: "Regime Switching", description: "Hamilton (1989) and his extended family" },
  { id: "03", num: "03", name: "Hidden Markov Models", description: "The probabilistic framework for latent regimes" },
  { id: "04", num: "04", name: "Volatility Regimes", description: "The most critical dimension for trading" },
  { id: "05", num: "05", name: "Order Flow Regimes", description: "Regimes at trade and DOM level" },
  { id: "order-flow", num: "11", name: "Order Flow", description: "AMT, Volume Profile, Footprints, Delta, VWAP, DOM" },
  { id: "options-flow", num: "12", name: "Options Flow", description: "GEX, Dealer Hedging, Sweeps" },
  { id: "macro", num: "13", name: "Macro", description: "Interest Rates, Treasury, Inflation" },
  { id: "microstructure", num: "14", name: "Microstructure", description: "Tape Reading, Price Action" },
  { id: "regimes", num: "15", name: "Market Regimes", description: "Long Gamma, Short Gamma, OpEx Pinning" },
  { id: "risk-management", num: "16", name: "Risk Management", description: "Position Sizing, Kelly, Convexity" },
];

const features = [
  { title: "Interactive Brain", description: "Visual knowledge graph mapping every concept and their connections." },
  { title: "Complete Glossary", description: "A to Z index of all trading, regime analysis, and quantitative finance terms." },
  { title: "Progress Tracking", description: "Monitor your learning journey with completion indicators." },
  { title: "Order Flow Tools", description: "Volume Profile, Footprints, Delta, VWAP, DOM analysis - all in one place." },
];

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? "scroll-reveal-visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [ownerAvatar, setOwnerAvatar] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("Owner");
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const cached = localStorage.getItem("odf_owner_avatar");
    const cachedName = localStorage.getItem("odf_owner_name");
    const cachedTime = localStorage.getItem("odf_owner_cached_at");
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (cached && cachedTime && now - parseInt(cachedTime) < oneHour) {
      setOwnerAvatar(cached);
      if (cachedName) setOwnerName(cachedName);
      setIsLoading(false);
      return;
    }

    const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="100" fill="%230a0a0c"/><path d="M50 60 L150 60 L170 100 L150 140 L100 175 L50 140 L30 100 Z" fill="%2316161a" stroke="%23ffffff" stroke-width="2"/><path d="M100 60 L100 175" stroke="%23ffffff" stroke-width="1.5" stroke-dasharray="4 4"/><polygon points="65,90 90,95 85,105 60,100" fill="%23ffffff"/><polygon points="135,90 110,95 115,105 140,100" fill="%23ffffff"/><polygon points="100,105 95,130 105,130" fill="%23ffffff"/><path d="M85 145 L115 145 L100 160 Z" fill="%23ffffff"/></svg>`;
    setOwnerAvatar(defaultAvatar);

    const loadDiscordUser = async () => {
      try {
        const response = await fetch(`/api/discord/user/${DISCORD_USER_ID}`);
        if (response.ok) {
          const data = await response.json();
          if (data.avatarUrl) {
            setOwnerAvatar(data.avatarUrl);
            localStorage.setItem("odf_owner_avatar", data.avatarUrl);
            localStorage.setItem("odf_owner_cached_at", now.toString());
          }
          if (data.username || data.global_name) {
            const name = data.global_name || data.username;
            setOwnerName(name);
            localStorage.setItem("odf_owner_name", name);
          }
        }
      } catch {
        // Keep defaults on error
      } finally {
        setIsLoading(false);
      }
    };

    loadDiscordUser();
  }, []);

  return (
    <main className="min-h-screen bg-black" ref={containerRef}>
      {/* Hero */}
      <HeroSection />

      {/* Scroll indicator line */}
      <div className="h-px bg-white/5" />

      {/* Modules */}
      <section id="expertise" className="py-16 md:py-24 px-6">
        <div className="max-w-[1078px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-[39px] font-semibold text-white tracking-tight">
                MODULES
              </h2>
              <p className="font-mono text-xs md:text-sm tracking-widest uppercase mt-3" style={{ color: "#6d6d6d" }}>
                22 modules covering regime detection, order flow, and quantitative finance.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, idx) => (
              <ScrollReveal key={module.id} delay={idx * 0.05}>
                <Link
                  href={`/module/${module.id}`}
                  className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#5E0ED7]/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-white tracking-tight">
                      {module.num}
                    </span>
                    <span className="font-mono text-xs tracking-wider uppercase transition-colors duration-200 group-hover:text-white" style={{ color: "#6d6d6d" }}>
                      OPEN →
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-white mb-2">
                    {module.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6d6d6d" }}>
                    {module.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-10">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider border border-white/20 text-white hover:bg-white/5 transition-all duration-300"
              >
                View All Modules
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section id="studios" className="py-16 md:py-24 px-6">
        <div className="max-w-[1078px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-[39px] font-semibold text-white tracking-tight">
                FEATURES
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#5E0ED7]/30 transition-all duration-300">
                  <h3 className="text-lg font-medium text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#949494" }}>
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Owner */}
      <section id="story" className="py-16 md:py-24 px-6 pb-20">
        <div className="max-w-[1078px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center">
              <p className="font-mono text-[11px] tracking-[0.15em] mb-6" style={{ color: "#858585" }}>
                OWNER
              </p>

              <a
                href={`https://discord.com/users/${DISCORD_USER_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[130px] h-[130px] rounded-full border-2 border-white/10 overflow-hidden mb-6 bg-[#080808] hover:scale-[1.05] hover:border-[#8052ff]/50 transition-all duration-300 cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center">
                  {ownerAvatar && !imgError ? (
                    <img
                      src={ownerAvatar}
                      alt="Owner"
                      className="w-full h-full object-cover rounded-full"
                      onError={() => {
                        localStorage.removeItem("odf_owner_avatar");
                        localStorage.removeItem("odf_owner_cached_at");
                        setImgError(true);
                      }}
                      loading="eager"
                    />
                  ) : (
                    <svg className="w-12 h-12" style={{ color: "#858585" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
              </a>

              <h3
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "29px",
                  fontWeight: 600,
                  color: "var(--color-frost-white)",
                  marginBottom: "12px",
                }}
              >
                {ownerName || "Owner"}
              </h3>

              <p className="text-sm max-w-[400px] leading-relaxed mb-6" style={{ color: "#858585" }}>
                Building next-generation tools for traders who think in probabilities. Order Flow, Regimes, and Quantitative Finance.
              </p>

              <a
                href={`https://discord.com/users/${DISCORD_USER_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider border border-white/20 text-white hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                DISCORD
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feedback */}
      <section id="feedback" className="py-16 md:py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-[1078px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-[39px] font-semibold text-white tracking-tight mb-6">
              HAVE FEEDBACK?
            </h2>
            <p className="text-sm max-w-[500px] mx-auto leading-relaxed mb-8" style={{ color: "#6d6d6d" }}>
              We are constantly improving. Reach out on Discord with suggestions, bug reports, or just to say hi.
            </p>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold uppercase tracking-wider bg-[#5E0ED7] text-white hover:bg-[#4a0bab] transition-all duration-300"
            >
              Contact on Discord
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/[0.06]">
        <div className="max-w-[1078px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/favicon.svg" alt="ODF" className="w-6 h-6 object-contain" />
              <span className="text-sm font-semibold text-white">ODF</span>
            </div>

            <nav className="flex items-center gap-8">
              {[
                { href: "/", label: "HOME" },
                { href: "/education", label: "EDUCATION" },
                { href: "/glossary", label: "GLOSSARY" },
                { href: "/brain", label: "BRAIN" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] tracking-wider uppercase transition-colors duration-200 hover:text-white"
                  style={{ color: "#6d6d6d" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <span className="font-mono text-xs" style={{ color: "#6d6d6d" }}>
              © 2026 ODF
            </span>
          </div>
          <div className="text-center mt-4">
            <span className="font-mono text-[10px]" style={{ color: "#3d3d3d" }}>
              build: 6554a35 · May 20 2026
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
