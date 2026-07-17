"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    SiPython,
    SiPytorch,
    SiTensorflow,
    SiScikitlearn,
    SiPandas,
    SiNumpy,
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiExpress,
    SiPostgresql,
    SiMongodb,
    SiGit,
    SiDocker,
    SiLinux,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const skillGroups = [
    {
        title: "Machine Learning & AI",
        description: "Core algorithms, model training, and data analysis",
        skills: [
            { name: "Python", Icon: SiPython, color: "rgba(55, 118, 171, 0.12)", hoverColor: "#3776AB" },
            { name: "PyTorch", Icon: SiPytorch, color: "rgba(238, 76, 44, 0.12)", hoverColor: "#EE4C2C" },
            { name: "TensorFlow", Icon: SiTensorflow, color: "rgba(255, 111, 0, 0.12)", hoverColor: "#FF6F00" },
            { name: "Scikit-Learn", Icon: SiScikitlearn, color: "rgba(247, 147, 30, 0.12)", hoverColor: "#F7931E" },
            { name: "Pandas", Icon: SiPandas, color: "rgba(21, 4, 90, 0.12)", hoverColor: "#15045A", darkHoverColor: "#60a5fa" },
            { name: "NumPy", Icon: SiNumpy, color: "rgba(77, 121, 167, 0.12)", hoverColor: "#4D79A7" },
        ],
    },
    {
        title: "Frontend Development",
        description: "Crafting beautiful, interactive UI/UX experiences",
        skills: [
            { name: "React", Icon: SiReact, color: "rgba(97, 218, 251, 0.12)", hoverColor: "#61DAFB" },
            { name: "Next.js", Icon: SiNextdotjs, color: "rgba(0, 0, 0, 0.12)", hoverColor: "#000000", darkHoverColor: "#ffffff" },
            { name: "TypeScript", Icon: SiTypescript, color: "rgba(49, 120, 198, 0.12)", hoverColor: "#3178C6" },
            { name: "Tailwind CSS", Icon: SiTailwindcss, color: "rgba(6, 182, 212, 0.12)", hoverColor: "#06B6D4" },
        ],
    },
    {
        title: "Backend & Databases",
        description: "Building scalable APIs and handling data storage",
        skills: [
            { name: "Node.js", Icon: SiNodedotjs, color: "rgba(51, 153, 51, 0.12)", hoverColor: "#339933" },
            { name: "Express", Icon: SiExpress, color: "rgba(0, 0, 0, 0.12)", hoverColor: "#000000", darkHoverColor: "#ffffff" },
            { name: "PostgreSQL", Icon: SiPostgresql, color: "rgba(51, 103, 145, 0.12)", hoverColor: "#336791" },
            { name: "MongoDB", Icon: SiMongodb, color: "rgba(71, 162, 72, 0.12)", hoverColor: "#47A248" },
        ],
    },
    {
        title: "Developer Tools",
        description: "Version control, workflow efficiency, and environment management",
        skills: [
            { name: "Git", Icon: SiGit, color: "rgba(240, 80, 50, 0.12)", hoverColor: "#F05032" },
            { name: "Docker", Icon: SiDocker, color: "rgba(36, 150, 237, 0.12)", hoverColor: "#2496ED" },
            { name: "Linux", Icon: SiLinux, color: "rgba(252, 209, 22, 0.12)", hoverColor: "#FCD116" },
            { name: "VS Code", Icon: TbBrandVscode, color: "rgba(0, 122, 204, 0.12)", hoverColor: "#007ACC" },
        ],
    },
];

const glassPanelStyle = "bg-white/30 dark:bg-white/[0.01] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.005)] rounded-3xl p-6 sm:p-8 hover:border-black/15 dark:hover:border-white/15 transition-all duration-300";
const glassBadgeStyle = "relative flex items-center gap-3 px-4 py-3 rounded-xl border border-black/[0.05] dark:border-white/[0.05] bg-white/20 dark:bg-white/[0.005] backdrop-blur-sm transition-all duration-300 group overflow-hidden select-none hover:border-black/[0.1] dark:hover:border-white/[0.1] hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]";

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-24 sm:py-32 overflow-hidden bg-transparent"
        >
            {/* Progressive Section Divider at top */}
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
                {/* Section Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col items-center text-center gap-4 mb-16"
                >
                    <motion.div variants={itemVariants}>
                        <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase border border-black/15 dark:border-white/15 rounded-full text-black/50 dark:text-white/50">
                            Skills & Stack
                        </span>
                    </motion.div>
                    
                    <motion.h2
                        variants={itemVariants}
                        className="font-[var(--font-heading)] text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-black dark:text-white"
                    >
                        My Technical Arsenal
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-base text-black/50 dark:text-white/50 max-w-lg leading-relaxed"
                    >
                        Technologies I use to build ML pipelines, design databases, and craft responsive user experiences.
                    </motion.p>
                </motion.div>

                {/* Grid of Categories */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {skillGroups.map((group, groupIdx) => (
                        <motion.div
                            key={groupIdx}
                            variants={itemVariants}
                            className={glassPanelStyle}
                        >
                            <h3 className="font-[var(--font-heading)] text-lg sm:text-xl font-extrabold text-black dark:text-white">
                                {group.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-black/45 dark:text-white/45 mt-1 mb-6">
                                {group.description}
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {group.skills.map((skill, skillIdx) => {
                                    return (
                                        <div
                                            key={skillIdx}
                                            className={glassBadgeStyle}
                                            style={{
                                                ["--brand-color" as string]: skill.hoverColor,
                                                ["--brand-color-dark" as string]: skill.darkHoverColor || skill.hoverColor,
                                            } as React.CSSProperties}
                                        >
                                            {/* Brand Color Radial Glow Overlay */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                style={{
                                                    background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 90%)`,
                                                }}
                                            />
                                            <skill.Icon
                                                className="w-4 h-4 text-black/50 dark:text-white/50 group-hover:text-[var(--brand-color)] dark:group-hover:text-[var(--brand-color-dark)] transition-colors duration-300 shrink-0"
                                            />
                                            <span className="text-xs sm:text-sm font-semibold text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                                                {skill.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
