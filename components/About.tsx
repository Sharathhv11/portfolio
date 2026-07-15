"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiMapPin, FiBookOpen, FiCpu } from "react-icons/fi";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const cardHoverEffects = "hover:bg-white/60 dark:hover:bg-white/[0.05] hover:border-black/15 dark:hover:border-white/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] hover:-translate-y-1 transition-all duration-300 ease-out";
const glassCardStyle = "bg-white/40 dark:bg-white/[0.02] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.01)]";

export default function About() {
    const aboutRef = useRef<HTMLElement>(null);
    const isInView = useInView(aboutRef, { once: true, amount: 0.2 });

    const stats = [
        { value: "10+", label: "Projects Built" },
        { value: "5+", label: "ML Models" },
        { value: "8+", label: "Tech Stack" },
    ];

    return (
        <section
            ref={aboutRef}
            id="about"
            className="relative py-24 sm:py-32 overflow-hidden bg-transparent"
        >
            {/* Progressive Section Divider */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent origin-center"
                />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/10 border border-black/[0.08] dark:border-white/[0.08]"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                >
                    {/* ─── Left Column: Who I Am & Stats (7 cols on large screens) ─── */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* About Me Pill */}
                        <motion.div variants={itemVariants}>
                            <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase border border-black/15 dark:border-white/15 rounded-full text-black/50 dark:text-white/50">
                                About Me
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            variants={itemVariants}
                            className="font-[var(--font-heading)] text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-black dark:text-white"
                        >
                            A Little About Me
                        </motion.h2>

                        {/* Biography Paragraphs */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-4 text-base text-black/60 dark:text-white/60 leading-relaxed max-w-2xl"
                        >
                            <p>
                                Hello! I&apos;m Sharath HV, a Computer Science Engineering student passionate about
                                creating intelligent applications and software solutions. As a fresher, I combine my strong
                                academic foundation with hands-on projects to bridge software engineering with data intelligence.
                            </p>
                            <p>
                                My primary focus lies in Machine Learning and Data Science. I enjoy exploring neural
                                networks, building predictive models, and working with Python, while also maintaining a strong
                                foundation in full-stack development using modern web technologies like React and Node.js.
                            </p>
                            <p>
                                I am always eager to learn, experiment, and solve complex problems. I am currently looking
                                for internship or entry-level opportunities where I can apply my ML knowledge, collaborate on
                                impactful projects, and grow as an engineer.
                            </p>
                        </motion.div>
                    </div>
 
                    {/* ─── Right Column: Bento Grid Info Tiles (5 cols on large screens) ─── */}
                    <div className="lg:col-span-5 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Location Tile */}
                            <motion.div
                                variants={itemVariants}
                                className={`relative p-4 rounded-2xl flex items-center gap-4 ${glassCardStyle} ${cardHoverEffects}`}
                            >
                                <span className="absolute top-3 right-3 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <div className="p-2.5 bg-black/[0.04] dark:bg-white/[0.04] rounded-xl text-black/60 dark:text-white/60 shrink-0">
                                    <FiMapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">Location</p>
                                    <p className="text-xs sm:text-sm font-bold text-black dark:text-white mt-0.5">Hassan, Karnataka</p>
                                </div>
                            </motion.div>
 
                            {/* Education Tile */}
                            <motion.div
                                variants={itemVariants}
                                className={`p-4 rounded-2xl flex items-center gap-4 ${glassCardStyle} ${cardHoverEffects}`}
                            >
                                <div className="p-2.5 bg-black/[0.04] dark:bg-white/[0.04] rounded-xl text-black/60 dark:text-white/60 shrink-0">
                                    <FiBookOpen size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">Education</p>
                                    <p className="text-xs sm:text-sm font-bold text-black dark:text-white mt-0.5">B.E. Computer Science</p>
                                </div>
                            </motion.div>
 
                            {/* Currently Working On Tile */}
                            <motion.div
                                variants={itemVariants}
                                className={`sm:col-span-2 p-4 rounded-2xl flex items-center gap-4 ${glassCardStyle} ${cardHoverEffects}`}
                            >
                                <div className="p-2.5 bg-black/[0.04] dark:bg-white/[0.04] rounded-xl text-black/60 dark:text-white/60 shrink-0">
                                    <FiCpu size={18} className="animate-[spin_8s_linear_infinite]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">Current Focus</p>
                                    <p className="text-xs sm:text-sm font-bold text-black dark:text-white mt-0.5">Machine Learning & Data Science</p>
                                </div>
                            </motion.div>

                            {/* Stats Grid */}
                            <div className="sm:col-span-2 grid grid-cols-3 gap-4">
                                {stats.map((stat, idx) => (
                                    <motion.div
                                        variants={itemVariants}
                                        key={idx}
                                        className={`p-3 rounded-xl text-center select-none ${glassCardStyle} ${cardHoverEffects}`}
                                    >
                                        <div className="font-[var(--font-heading)] text-lg sm:text-2xl font-extrabold text-black dark:text-white">
                                            {stat.value}
                                        </div>
                                        <div className="text-[9px] sm:text-[11px] text-black/40 dark:text-white/40 font-medium mt-0.5 leading-tight">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
