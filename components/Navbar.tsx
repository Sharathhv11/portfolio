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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="fixed top-0 md:top-4 left-0 right-0 z-50 flex justify-center md:px-6 pointer-events-none">
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full max-w-7xl pointer-events-auto transition-all duration-500 rounded-none md:rounded-2xl ${scrolled
                    ? "bg-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15)] border-b md:border border-white/40"
                    : "md:bg-white/15 md:backdrop-blur-2xl md:shadow-[0_8px_32px_rgba(31,38,135,0.1)] md:border md:border-white/30"
                    }`}
            >
                <div className="px-6 lg:px-8 flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <a
                        href="#home"
                        className="relative w-32 h-10 flex items-center select-none"
                    >
                        <Image
                            src="/LOGO.png"
                            alt="Sharath HV Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="nav-link text-sm font-medium text-black/70 hover:text-black transition-colors duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="relative w-14 h-7 rounded-full bg-black/10 flex items-center px-1 transition-colors duration-300 hover:bg-black/15"
                            aria-label="Toggle theme"
                        >
                            <div
                                className={`absolute left-1 z-10 flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDark ? "translate-x-7" : "translate-x-0"
                                    }`}
                            >
                                {isDark ? <FiMoon size={12} className="text-slate-800" /> : <FiSun size={12} className="text-amber-500" />}
                            </div>
                            <div className="w-full flex justify-between px-1 text-black/40">
                                <FiSun size={12} />
                                <FiMoon size={12} />
                            </div>
                        </button>
                        <a
                            href="/resume.pdf"
                            download
                            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-black text-white rounded-full transition-all duration-300 hover:bg-white hover:text-[var(--accent)] hover:shadow-[inset_0_0_0_1.5px_var(--accent)] hover:scale-[1.03] active:scale-[0.97]"
                        >
                            <FiDownload size={14} />
                            Download CV
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
                        aria-label="Menu"
                    >
                        {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden overflow-hidden bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                        >
                            <div className="px-6 pb-6 pt-4 flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-base font-medium text-black/70 hover:text-black transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <div className="flex items-center gap-3 pt-4 border-t border-black/10">
                                    <button
                                        onClick={() => setIsDark(!isDark)}
                                        className="relative w-14 h-7 rounded-full bg-black/10 flex items-center px-1 transition-colors hover:bg-black/15"
                                        aria-label="Toggle theme"
                                    >
                                        <div
                                            className={`absolute left-1 z-10 flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDark ? "translate-x-7" : "translate-x-0"
                                                }`}
                                        >
                                            {isDark ? <FiMoon size={12} className="text-slate-800" /> : <FiSun size={12} className="text-amber-500" />}
                                        </div>
                                        <div className="w-full flex justify-between px-1 text-black/40">
                                            <FiSun size={12} />
                                            <FiMoon size={12} />
                                        </div>
                                    </button>
                                    <a
                                        href="/resume.pdf"
                                        download
                                        onClick={() => setMobileOpen(false)}
                                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-black text-white rounded-full"
                                    >
                                        <FiDownload size={14} />
                                        Download CV
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
