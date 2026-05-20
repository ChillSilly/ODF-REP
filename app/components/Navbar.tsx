"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/dashboard", label: "EDUCATION" },
  { href: "/glossary", label: "GLOSSARY" },
  { href: "/brain", label: "BRAIN" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          height: "64px",
        }}
      >
        <div
          style={{
            maxWidth: "1078px",
            margin: "0 auto",
            height: "100%",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ width: "28px", height: "28px" }}
            >
              <img
                src="/favicon.ico"
                alt="ODF"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </motion.div>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--color-frost-white)",
              }}
            >
              ODF
            </span>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                    opacity: isActive ? 1 : 0.6,
                    position: "relative",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      style={{
                        position: "absolute",
                        bottom: "-1px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "var(--color-frost-white)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" className="btn-ghost" style={{ fontSize: "13px", padding: "8px 16px" }}>
              START
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                gap: "5px",
              }}
            >
              <span style={{ width: "16px", height: "1px", background: "var(--color-frost-white)" }} />
              <span style={{ width: "16px", height: "1px", background: "var(--color-frost-white)" }} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
            }}
            className="md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100%",
                width: "280px",
                background: "var(--color-deep-shadow)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "var(--color-frost-white)",
                    letterSpacing: "0.02em",
                  }}
                >
                  MENU
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    cursor: "pointer",
                    color: "var(--color-frost-white)",
                    fontSize: "18px",
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "var(--radius-md)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "14px",
                        color: isActive ? "var(--color-frost-white)" : "var(--color-whisper-gray)",
                        background: isActive ? "rgba(255, 255, 255, 0.05)" : "transparent",
                        letterSpacing: "0.02em",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: "64px" }} />
    </>
  );
}
