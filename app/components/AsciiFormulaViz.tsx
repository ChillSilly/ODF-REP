"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ASCII density ramp (darkest → lightest)
const DENSITY = `@#S%?*+;:,. `;

function brightness(val: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (val - min) / (max - min)));
}

function toChar(b: number): string {
  const idx = Math.floor(b * (DENSITY.length - 1));
  return DENSITY[DENSITY.length - 1 - idx];
}

// ─────────────────────────────────────────────────────────────────────────────
// Preset visualizations

export type VizPreset =
  | "imbalance"
  | "absorption"
  | "delta"
  | "vpoc"
  | "gaussian";

interface AsciiFormulaVizProps {
  preset: VizPreset;
  title?: string;
  description?: string;
  /** Width in ASCII columns */
  cols?: number;
  /** Height in ASCII rows */
  rows?: number;
  animated?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Frame generators — each returns a 2D number[][] grid [rows][cols] in [0,1]
// ─────────────────────────────────────────────────────────────────────────────

/** Imbalance heatmap: Imbalance Ratio = |Bid − Ask| / (Bid + Ask) */
function genImbalance(cols: number, rows: number, t: number): number[][] {
  const grid: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    const priceLevel = 1 - r / rows; // 1 at top, 0 at bottom
    for (let c = 0; c < cols; c++) {
      const time = c / cols;
      // Simulate bid/ask ratio wave
      const bid = 0.5 + 0.4 * Math.sin(time * Math.PI * 4 + t + priceLevel * 3);
      const ask = 1 - bid;
      const ratio = Math.abs(bid - ask) / (bid + ask);
      // Heatmap: high imbalance = bright
      const wave = ratio + 0.1 * Math.sin(t * 2 + priceLevel * 5);
      row.push(Math.max(0, Math.min(1, wave)));
    }
    grid.push(row);
  }
  return grid;
}

/** Absorption: Volume at level / Price movement — spike at key levels */
function genAbsorption(cols: number, rows: number, t: number): number[][] {
  const grid: number[][] = [];
  // Key absorption levels (normalized 0–1)
  const levels = [0.25, 0.5, 0.75];
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    const priceNorm = r / rows;
    for (let c = 0; c < cols; c++) {
      const timeNorm = c / cols;
      let val = 0.05;
      // Pulse at each key level
      for (const lv of levels) {
        const dist = Math.abs(priceNorm - lv);
        const timePulse = Math.max(0, Math.sin(timeNorm * Math.PI * 3 - t));
        val += timePulse * Math.exp(-dist * 25) * 0.9;
      }
      // Subtle background noise
      val += 0.03 * Math.sin(priceNorm * 20 + t);
      row.push(Math.max(0, Math.min(1, val)));
    }
    grid.push(row);
  }
  return grid;
}

/** Cumulative Delta (CVD) wave — Delta = Ask − Bid over time */
function genDelta(cols: number, rows: number, t: number): number[][] {
  const grid: number[][] = [];
  // Generate CVD line path
  const cvd: number[] = [];
  for (let c = 0; c < cols; c++) {
    const x = c / cols;
    // Trending up then diverge
    const trend = 0.4 + 0.3 * Math.sin(x * Math.PI * 2 - t * 0.8);
    const diverge = -0.25 * Math.sin(x * Math.PI * 4 + t * 0.5);
    cvd.push(trend + diverge);
  }

  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    const priceNorm = 1 - r / rows; // flip so top = high
    for (let c = 0; c < cols; c++) {
      const lineDist = Math.abs(priceNorm - cvd[c]);
      // Draw thin CVD line
      const lineVal = Math.exp(-lineDist * rows * 3);
      // Fill below line
      const fillVal = priceNorm < cvd[c] ? 0.15 : 0;
      row.push(Math.max(0, Math.min(1, lineVal * 0.95 + fillVal)));
    }
    grid.push(row);
  }
  return grid;
}

/** VPOC mean-reversion: P(reversion) = 1 − e^(−λ × |price − VPOC|) */
function genVpoc(cols: number, rows: number, t: number): number[][] {
  const grid: number[][] = [];
  const vpocRow = 0.5; // VPOC at middle
  const lambda = 5;

  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    const priceNorm = r / rows;
    const dist = Math.abs(priceNorm - vpocRow);
    const prob = 1 - Math.exp(-lambda * dist);

    for (let c = 0; c < cols; c++) {
      const timeWave = 0.5 + 0.5 * Math.sin(t * 1.2 + c / cols * Math.PI * 2);
      // Probability gradient + animation
      const val = prob * timeWave * 0.85 + (1 - prob) * 0.05;
      // VPOC line highlight
      const vpocHighlight = Math.exp(-Math.abs(priceNorm - vpocRow) * rows * 2.5);
      row.push(Math.max(0, Math.min(1, val * 0.6 + vpocHighlight * 0.5)));
    }
    grid.push(row);
  }
  return grid;
}

/** Gaussian bell curve — Volume distribution at fair value */
function genGaussian(cols: number, rows: number, t: number): number[][] {
  const grid: number[][] = [];
  // Multiple sessions shifting over time
  const sessions = [
    { mu: 0.35, sigma: 0.08, amp: 1.0 },
    { mu: 0.65, sigma: 0.1, amp: 0.85 },
  ];

  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    const priceNorm = 1 - r / rows;
    for (let c = 0; c < cols; c++) {
      const timeNorm = c / cols;
      let val = 0;
      for (const s of sessions) {
        const mu = s.mu + 0.05 * Math.sin(t * 0.7 + s.mu * 10);
        const gaussian = s.amp * Math.exp(-Math.pow(priceNorm - mu, 2) / (2 * s.sigma * s.sigma));
        // Volume bar height based on gaussian — fill from left
        val += gaussian * (timeNorm < 0.5 + 0.3 * Math.sin(t + c) ? 1 : 0.3);
      }
      row.push(Math.max(0, Math.min(1, val)));
    }
    grid.push(row);
  }
  return grid;
}

function getGenerator(preset: VizPreset) {
  switch (preset) {
    case "imbalance": return genImbalance;
    case "absorption": return genAbsorption;
    case "delta": return genDelta;
    case "vpoc": return genVpoc;
    case "gaussian": return genGaussian;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Color palettes per preset
const PALETTE: Record<VizPreset, [string, string]> = {
  imbalance:  ["#3b82f6", "#ef4444"],   // blue → red (bid vs ask)
  absorption: ["#1a1a2e", "#fbbf24"],   // dark → gold (absorption spike)
  delta:      ["#0f172a", "#34d399"],   // dark → green (CVD)
  vpoc:       ["#0f172a", "#a78bfa"],   // dark → violet (probability)
  gaussian:   ["#0f172a", "#60a5fa"],   // dark → blue (distribution)
};

function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b_ = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b_})`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component

export default function AsciiFormulaViz({
  preset,
  title,
  description,
  cols = 80,
  rows = 22,
  animated = true,
}: AsciiFormulaVizProps) {
  const [frame, setFrame] = useState<{ chars: string[]; colors: string[] }[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const tRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);

  const renderFrame = (t: number) => {
    const gen = getGenerator(preset);
    const grid = gen(cols, rows, t);
    const [colA, colB] = PALETTE[preset];

    const lines = grid.map((row) => ({
      chars: row.map((v) => toChar(v)),
      colors: row.map((v) => lerpColor(colA, colB, v)),
    }));
    setFrame(lines);
  };

  useEffect(() => {
    renderFrame(0);
  }, [preset, cols, rows]);

  useEffect(() => {
    if (!animated || !isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const loop = (timestamp: number) => {
      if (timestamp - lastTimestampRef.current > 50) { // ~20fps
        tRef.current += 0.04;
        renderFrame(tRef.current);
        lastTimestampRef.current = timestamp;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animated, isPlaying, preset, cols, rows]);

  const PRESET_LABELS: Record<VizPreset, string> = {
    imbalance:  "Imbalance Heatmap",
    absorption: "Absorption Signal",
    delta:      "Cumulative Delta (CVD)",
    vpoc:       "VPOC Reversion Probability",
    gaussian:   "Volume Distribution (Gaussian)",
  };

  const PRESET_FORMULAS: Record<VizPreset, string> = {
    imbalance:  "Imbalance Ratio = |Bid − Ask| / (Bid + Ask)",
    absorption: "Absorption Score = Volume at Level / Price Movement",
    delta:      "Δ = Ask Volume − Bid Volume   |   CVD = Σ Δ(t)",
    vpoc:       "P(reversion) = 1 − e^(−λ × |price − VPOC|)",
    gaussian:   "V(p) = A·exp(−(p − μ)² / 2σ²)",
  };

  return (
    <div className="my-6 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden bg-[#080810]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#10101c] border-b border-[rgba(255,255,255,0.07)]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[11px] text-[rgba(255,255,255,0.4)] font-mono uppercase tracking-widest">
            ASCII-VIZ · {PRESET_LABELS[preset]}
          </span>
        </div>
        {animated && (
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="text-[10px] font-mono px-2 py-0.5 rounded border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.4)] hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-all"
          >
            {isPlaying ? "⏸ pause" : "▶ play"}
          </button>
        )}
      </div>

      {/* Formula banner */}
      <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.05)] bg-[#0a0a16]">
        <code className="text-[12px] text-[#a78bfa] font-mono">
          {PRESET_FORMULAS[preset]}
        </code>
      </div>

      {/* ASCII canvas */}
      <div
        className="overflow-x-auto p-3"
        style={{ fontFamily: "monospace", lineHeight: "1.1" }}
      >
        {frame.map((line, ri) => (
          <div key={ri} style={{ whiteSpace: "pre", fontSize: "10px" }}>
            {line.chars.map((ch, ci) => (
              <span key={ci} style={{ color: line.colors[ci] }}>
                {ch}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Footer legend */}
      {description && (
        <div className="px-4 py-2 border-t border-[rgba(255,255,255,0.05)] bg-[#0a0a16]">
          <p className="text-[11px] text-[rgba(255,255,255,0.35)] font-mono">{description}</p>
        </div>
      )}
    </div>
  );
}
