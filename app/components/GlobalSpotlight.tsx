"use client";

import { useEffect, useRef } from "react";

export default function GlobalSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--spotlight-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--spotlight-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(800px circle at var(--spotlight-x, -9999px) var(--spotlight-y, -9999px), rgba(160, 224, 171, 0.04), transparent 40%)`,
      }}
    />
  );
}
