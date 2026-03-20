"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
    SiReact,
    SiNodedotjs,
    SiNextdotjs,
    SiGit,
    SiDocker,
    SiTypescript,
    SiTailwindcss,
    SiPython,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

/* ─── Rotating Titles ─── */
const titles = ["Engineer", "Tech Enthusiast", "Full Stack Developer", "Builder"];

/* ─── Tech Icons with brand colors ─── */
const techIcons = [
    { Icon: SiReact, label: "React", color: "#61DAFB" },
    { Icon: SiNodedotjs, label: "Node.js", color: "#339933" },
    { Icon: SiNextdotjs, label: "Next.js", color: "#000000", darkColor: "#ffffff" },
    { Icon: SiGit, label: "Git", color: "#F05032" },
    { Icon: SiDocker, label: "Docker", color: "#2496ED" },
    { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
    { Icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
    { Icon: SiPython, label: "Python", color: "#3776AB" },
];

/* ─── Animation Variants ─── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
    },
};

export default function Hero() {
    const [titleIndex, setTitleIndex] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);
    const isInView = useInView(heroRef, { once: true, amount: 0.2 });

    /* Rotate title every 3s */
    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    /* Cursor parallax */
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            setMousePos({ x, y });
        },
        []
    );

    return (
        <section
            ref={heroRef}
            id="home"
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* ── Gradient Fades ── */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/40 dark:from-black/40 to-transparent pointer-events-none z-[1]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#030303] to-transparent pointer-events-none z-[1]" />

            {/* ── Main Content ── */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* ─── Left Column — Text ─── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex flex-col gap-6"
                    >
                        {/* Tag */}
                        <motion.div variants={itemVariants}>
                            <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase border border-black/15 dark:border-white/15 rounded-full text-black/50 dark:text-white/50">
                                Portfolio
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="font-[var(--font-syne)] text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
                        >
                            Sharath HV
                        </motion.h1>

                        {/* Rotating Subtitle */}
                        <motion.div
                            variants={itemVariants}
                            className="h-10 flex items-center overflow-hidden"
                        >
                            <span className="text-lg sm:text-xl text-black/40 dark:text-white/40 mr-2 font-medium">
                                I&apos;m a
                            </span>
                            <div className="relative h-10 flex items-center">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={titles[titleIndex]}
                                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="text-lg sm:text-xl font-semibold cursor-blink"
                                    >
                                        {titles[titleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Subtext */}
                        <motion.p
                            variants={itemVariants}
                            className="text-base text-black/50 dark:text-white/50 max-w-md leading-relaxed"
                        >
                            Building scalable, elegant solutions that bridge design and
                            engineering with precision and creativity.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-4 pt-2"
                        >
                            <a
                                href="#projects"
                                className="relative overflow-hidden group inline-flex items-center gap-2 px-7 py-3 text-sm font-medium bg-black text-white dark:bg-white dark:text-black rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)] hover:scale-[1.02] active:scale-[0.98] hover:text-white dark:hover:text-white"
                            >
                                <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full" />
                                <span className="relative z-10 flex items-center gap-2">
                                    View Work
                                    <svg
                                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>
                            </a>
                            <a
                                href="#contact"
                                className="relative overflow-hidden group inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-black dark:text-white rounded-full border border-black/20 dark:border-white/20 transition-all duration-300 hover:border-[var(--accent)] dark:hover:border-[var(--accent)] hover:scale-[1.02] active:scale-[0.98] hover:text-white dark:hover:text-white"
                            >
                                <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full" />
                                <span className="relative z-10 flex items-center gap-2">
                                    <FaLinkedinIn className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                    Contact Me
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* ─── Right Column — Image + Orbiting Icons ─── */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex items-center justify-center"
                        style={{
                            transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
                            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                        }}
                    >
                        <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px]">
                            {/* Decorative rings */}
                            <div className="absolute inset-[-20px] rounded-full border border-black/[0.04] dark:border-white/[0.04] animate-[spin_40s_linear_infinite]" />
                            <div className="absolute inset-[-50px] rounded-full border border-dashed border-black/[0.06] dark:border-white/[0.06] animate-[spin_60s_linear_infinite_reverse]" />

                            {/* Profile Image */}
                            <div className="absolute inset-4 rounded-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.08)] dark:shadow-[0_0_60px_rgba(255,255,255,0.04)] border-2 border-black/5 dark:border-white/5">
                                <Image
                                    src="/GPTProfile.png"
                                    alt="Sharath HV"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Orbiting Tech Icons — Draggable */}
                            {techIcons.map((tech, i) => {
                                const radius = 190;
                                const duration = 30 + i * 4;

                                return (
                                    <div
                                        key={tech.label}
                                        className="absolute top-1/2 left-1/2 group/orbit"
                                        style={{
                                            animation: `orbit ${duration}s linear infinite`,
                                            animationDelay: `${-(duration / techIcons.length) * i}s`,
                                            ["--orbit-radius" as string]: `${radius}px`,
                                        }}
                                    >
                                        <motion.div
                                            drag
                                            dragSnapToOrigin
                                            dragElastic={0.6}
                                            dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
                                            whileDrag={{ scale: 1.3, zIndex: 50 }}
                                            className="group/icon flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-[#111] border border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.02)] hover:scale-110 transition-all duration-300 cursor-grab active:cursor-grabbing"
                                            title={tech.label}
                                            style={{
                                                '--brand-color': tech.color,
                                                '--brand-color-dark': tech.darkColor || tech.color
                                            } as React.CSSProperties}
                                        >
                                            <tech.Icon className="w-5 h-5 text-black/60 dark:text-white/60 transition-colors duration-300 group-hover/icon:text-[var(--brand-color)] dark:group-hover/icon:text-[var(--brand-color-dark)]" />
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
