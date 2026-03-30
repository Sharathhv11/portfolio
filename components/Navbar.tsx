"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon, FiDownload } from "react-icons/fi";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <div className="fixed top-0 md:top-4 left-0 right-0 z-50 flex justify-center md:px-6 pointer-events-none">
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                className={`
                    w-full max-w-6xl pointer-events-auto transition-all duration-500
                    rounded-none md:rounded-2xl
                    border border-transparent
                    ${scrolled
                        ? "bg-white/10 dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] md:border-white/30 dark:md:border-white/10 border-b-white/20 dark:border-b-white/10"
                        : "md:bg-white/10 dark:md:bg-black/20 md:backdrop-blur-2xl md:shadow-[0_8px_32px_rgba(31,38,135,0.12)] md:border-white/25 dark:md:border-white/10"
                    }
                `}
            >
                {/* Subtle inner glow overlay for glass depth */}
                <div className="absolute inset-0 rounded-none md:rounded-2xl bg-gradient-to-b from-white/20 dark:from-white/5 via-white/5 dark:via-white/5 to-transparent pointer-events-none" />

                <div className="relative px-5 lg:px-8 flex items-center justify-between h-16">
                    {/* ─── Logo ─── */}
                    <a
                        href="#home"
                        className="relative w-28 h-9 flex items-center select-none shrink-0"
                    >
                        <Image
                            src="/LOGO-removebg-preview.png"
                            alt="Sharath HV Logo"
                            fill
                            className="object-contain dark:invert transition-all duration-300"
                            priority
                        />
                    </a>

                    {/* ─── Desktop Nav — Sliding pill ─── */}
                    <div
                        className="hidden md:flex items-center gap-0.5"
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.label)}
                                className="relative px-4 py-1.5 text-[13px] font-medium transition-colors duration-200 rounded-lg"
                                style={{
                                    color: "var(--fg)",
                                    opacity: hoveredLink === link.label ? 1 : 0.65,
                                }}
                            >
                                {hoveredLink === link.label && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-lg bg-black/5 dark:bg-white/10 shadow-sm"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 28,
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </a>
                        ))}
                    </div>

                    {/* ─── Right Side ─── */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="relative w-14 h-7 rounded-full bg-black/10 dark:bg-white/10 flex items-center px-1 transition-colors duration-300 hover:bg-black/15 dark:hover:bg-white/20 cursor-pointer"
                            aria-label="Toggle theme"
                        >
                            <div
                                className={`absolute left-1 z-10 flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDark ? "translate-x-7" : "translate-x-0"}`}
                            >
                                {isDark ? <FiMoon size={12} className="text-slate-800" /> : <FiSun size={12} className="text-amber-500" />}
                            </div>
                            <div className="w-full flex justify-between px-1 text-black/40 dark:text-white/40">
                                <FiSun size={12} />
                                <FiMoon size={12} />
                            </div>
                        </button>
                        <a
                            href="/resume.pdf"
                            download
                            className="relative overflow-hidden group inline-flex items-center gap-2 px-5 py-2 text-[13px] font-semibold bg-black text-white dark:bg-white dark:text-black rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] dark:hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:scale-[1.02] active:scale-[0.98] hover:text-white dark:hover:text-white"
                        >
                            <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full" />
                            <span className="relative z-10 flex items-center gap-2">
                                <FiDownload size={13} className="transition-transform duration-300 group-hover:scale-110" />
                                Download CV
                            </span>
                        </a>
                    </div>

                    {/* ─── Mobile Menu Button ─── */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-black dark:text-white cursor-pointer"
                        aria-label="Menu"
                    >
                        {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
                    </button>
                </div>

                {/* ─── Mobile Menu ─── */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="relative px-5 pb-5 pt-2 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="px-4 py-2.5 text-sm font-medium text-black/60 dark:text-white/60 hover:text-[var(--accent)] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all duration-200"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <div className="mt-3 pt-3 border-t border-black/[0.06] dark:border-white/10">
                                    <div className="flex justify-between items-center mb-4 px-4">
                                        <span className="text-sm font-medium text-black/60 dark:text-white/60">Theme</span>
                                        <button
                                            onClick={() => setIsDark(!isDark)}
                                            className="relative w-12 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center px-1 cursor-pointer"
                                            aria-label="Toggle theme"
                                        >
                                            <div
                                                className={`absolute left-1 z-10 flex items-center justify-center w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-0"}`}
                                            >
                                                {isDark ? <FiMoon size={10} className="text-slate-800" /> : <FiSun size={10} className="text-amber-500" />}
                                            </div>
                                        </button>
                                    </div>
                                    <a
                                        href="/resume.pdf"
                                        download
                                        onClick={() => setMobileOpen(false)}
                                        className="relative overflow-hidden group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black rounded-full w-full justify-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:text-white dark:hover:text-white"
                                    >
                                        <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full" />
                                        <span className="relative z-10 flex items-center gap-2">
                                            <FiDownload size={14} className="transition-transform duration-300 group-hover:scale-110" />
                                            Download CV
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}
