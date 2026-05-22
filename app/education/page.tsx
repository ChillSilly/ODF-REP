"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DiscordGate from "@/app/components/DiscordGate";
import { useProgress } from "@/hooks/useProgress";
import {
  educationCategories,
  categoryLabels,
  categoryColors,
  categoryDescriptions,
  topicsByCategory,
  lectures,
} from "@/data/educationVault";

const GRADIENT_TEXT = {
  background: "linear-gradient(90deg, rgb(160, 224, 171), rgb(255, 172, 46) 50%, rgb(165, 45, 37))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const TOTAL_MODULES = educationCategories.length;
const TOTAL_LECTURES = lectures.length;
const TOTAL_TOPICS = Object.values(topicsByCategory).reduce((acc, arr) => acc + arr.length, 0);

export default function EducationLandingPage() {
  const { progress, isLoaded, getProgressPercentage } = useProgress();
  const overallProgress = getProgressPercentage(TOTAL_MODULES);

  return (
    <DiscordGate>
      <main className="min-h-screen" style={{ background: "var(--color-midnight-void)" }}>
        {/* ELEMENT 1: GENERIC HERO — Centered, clean, with progress context */}
        <section className="pt-24 pb-14 px-6">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Tag */}
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase block mb-4" style={GRADIENT_TEXT}>
                Education
              </span>

              {/* Heading */}
              <h1
                className="font-primary text-[clamp(36px,6vw,56px)] font-bold tracking-[-0.03em] mb-5"
                style={{ color: "var(--color-polar-white)" }}
              >
                The vault.
              </h1>

              {/* Subtext */}
              <p
                className="font-primary text-[18px] max-w-[600px] leading-relaxed mb-8"
                style={{ color: "var(--color-ash-gray)" }}
              >
                A complete knowledge system for trading. {TOTAL_LECTURES} lectures. {TOTAL_TOPICS}+ topics.
                Everything the Obsidian vault taught you, now structured for the web.
              </p>

              {/* ELEMENT 3: FLAT SECTION — Progress as a clean data display */}
              {isLoaded && (
                <div className="mb-8 max-w-[500px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "#6d6d6d" }}>
                      Learning Progress
                    </span>
                    <span className="text-[11px] font-mono font-medium" style={{ color: "#949494" }}>
                      {progress.completedModules.length} / {TOTAL_MODULES} modules
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${overallProgress}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, rgb(160, 224, 171), rgb(255, 172, 46) 75%, rgb(165, 45, 37))",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* CTA Row */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/education/lectures"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "var(--color-polar-white)",
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lecture Track (L1–L27)
                </Link>
                <Link
                  href="/education/foundations"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    color: "#949494",
                  }}
                >
                  Browse by Category
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px" style={{ background: "rgba(255, 255, 255, 0.05)" }} />

        {/* ELEMENT 2: CARD GRID — Flat cards with subtle borders and hover lift */}
        <section className="px-6 py-14 pb-20">
          <div className="max-w-[1100px] mx-auto">
            {/* Section label */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: "#6d6d6d" }}>
                Categories
              </h2>
              <span className="font-mono text-[11px]" style={{ color: "#3d3d3d" }}>
                {educationCategories.length} modules · {TOTAL_TOPICS} topics
              </span>
            </div>

            {/* 4-column card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {educationCategories.map((cat, idx) => {
                const color = categoryColors[cat];
                const topicCount = topicsByCategory[cat]?.length || 0;
                const lectureCount = lectures.filter(l => l.category === cat).length;
                const isCompleted = progress.completedModules.includes(cat);

                return (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/education/${cat}`}
                      className="block p-5 rounded-xl transition-all duration-200 group relative overflow-hidden h-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${color}50`;
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {/* Completion indicator */}
                      {isCompleted && (
                        <div
                          className="absolute top-3 right-3 w-2 h-2 rounded-full"
                          style={{ background: color }}
                        />
                      )}

                      {/* Category initial */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 text-[16px] font-bold"
                        style={{
                          background: `${color}12`,
                          color: color,
                          border: `1px solid ${color}20`,
                        }}
                      >
                        {categoryLabels[cat].charAt(0)}
                      </div>

                      {/* Category name */}
                      <h3
                        className="font-primary text-[15px] font-semibold mb-1.5"
                        style={{ color: "var(--color-polar-white)" }}
                      >
                        {categoryLabels[cat]}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-[12px] leading-relaxed mb-4 line-clamp-2"
                        style={{ color: "#6d6d6d" }}
                      >
                        {categoryDescriptions[cat]}
                      </p>

                      {/* Metadata row */}
                      <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: "#4a4a4a" }}>
                        {topicCount > 0 && (
                          <span className="flex items-center gap-1">
                            <span style={{ color }}>·</span>
                            {topicCount} topics
                          </span>
                        )}
                        {lectureCount > 0 && (
                          <span className="flex items-center gap-1">
                            <span style={{ color }}>·</span>
                            {lectureCount} lectures
                          </span>
                        )}
                      </div>

                      {/* Hover arrow indicator */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          style={{ color }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom stats bar */}
            <div
              className="mt-8 flex items-center justify-between rounded-xl px-5 py-4"
              style={{
                background: "rgba(255, 255, 255, 0.015)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <div className="flex gap-8">
                {[
                  { value: String(TOTAL_LECTURES), label: "Lectures" },
                  { value: String(TOTAL_TOPICS), label: "Topics" },
                  { value: String(educationCategories.length), label: "Categories" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-[18px] font-bold font-mono" style={GRADIENT_TEXT}>
                      {value}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider mt-0.5" style={{ color: "#4a4a4a" }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/education/lectures"
                className="text-[12px] font-mono uppercase tracking-wider hover:opacity-70 transition-opacity"
                style={{ color: "#949494" }}
              >
                Start Learning →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </DiscordGate>
  );
}