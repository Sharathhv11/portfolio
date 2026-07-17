"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
    FiBriefcase, 
    FiFolder, 
    FiAward, 
    FiGithub, 
    FiExternalLink, 
    FiArrowRight, 
    FiCalendar, 
    FiCheckCircle,
    FiX,
    FiChevronLeft,
    FiChevronRight
} from "react-icons/fi";
import {
    SiMongodb,
    SiExpress,
    SiReact,
    SiNodedotjs,
    SiGooglegemini,
    SiSupabase,
    SiJsonwebtokens
} from "react-icons/si";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const glassCardStyle = "bg-white/40 dark:bg-white/[0.02] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.01)]";
const cardHoverEffects = "hover:bg-white/60 dark:hover:bg-white/[0.04] hover:border-black/15 dark:hover:border-white/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] hover:-translate-y-1 transition-all duration-300 ease-out";

interface Project {
    title: string;
    category: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
    problemSolved?: string;
    bullets?: string[];
    images?: string[];
}

interface Experience {
    role: string;
    company: string;
    period: string;
    points: string[];
}

interface Achievement {
    title: string;
    issuer: string;
    year: string;
    description: string;
    certificateImage?: string;
}

const projectsData: Project[] = [
    {
        title: "GraphGen — AI Diagram Generator",
        category: "Full-Stack AI App",
        description: "Built a full-stack web app that lets users generate computer science / engineering diagrams (e.g. flowcharts, system diagrams) from natural language prompts.",
        tech: ["MongoDB", "Express", "React", "Node.js", "Gemini API", "Supabase", "JWT"],
        github: "https://github.com/Sharathhv11/graphgen-Back-end",
        demo: "https://graphgen1.vercel.app/",
        problemSolved: "Drawing computer science and engineering diagrams (flowcharts, system architectures, mind maps) manually is slow and tedious. GraphGen automates the entire process, letting users write simple natural language prompts to instantly generate fully structured, readable, and editable diagrams powered by generative AI.",
        bullets: [
            "Architected and developed a full-stack MERN (MongoDB, Express, React, Node.js) web application utilizing the Gemini API to automatically generate and render complex engineering diagrams from natural language prompts.",
            "Designed and secured a RESTful API implementing JWT-based authentication (1-hour expiry), bcrypt password hashing, and tokenized email verification/forgot-password flows with 10-minute expiry windows via Nodemailer.",
            "Structured a centralized error-handling architecture utilizing custom error classes to output environment-specific API error responses for development and production."
        ],
        images: [
            "/graphgen/Screenshot 2026-05-04 215857.png",
            "/graphgen/Screenshot 2026-05-04 220042.png",
            "/graphgen/Screenshot 2026-05-04 220306.png",
            "/graphgen/Screenshot 2026-05-04 220450.png",
            "/graphgen/Screenshot 2026-05-04 220517.png"
        ]
    }
];

const techIconsMap: Record<string, { Icon: any; color: string; hoverColor: string; darkHoverColor?: string }> = {
    "MongoDB": { Icon: SiMongodb, color: "rgba(71, 162, 72, 0.12)", hoverColor: "#47A248" },
    "Express": { Icon: SiExpress, color: "rgba(0, 0, 0, 0.12)", hoverColor: "#000000", darkHoverColor: "#ffffff" },
    "React": { Icon: SiReact, color: "rgba(97, 218, 251, 0.12)", hoverColor: "#61DAFB" },
    "Node.js": { Icon: SiNodedotjs, color: "rgba(51, 153, 51, 0.12)", hoverColor: "#339933" },
    "Gemini API": { Icon: SiGooglegemini, color: "rgba(142, 117, 200, 0.12)", hoverColor: "#8E75C8" },
    "Supabase": { Icon: SiSupabase, color: "rgba(62, 207, 142, 0.12)", hoverColor: "#3ECF8E" },
    "JWT": { Icon: SiJsonwebtokens, color: "rgba(0, 0, 0, 0.12)", hoverColor: "#000000", darkHoverColor: "#ffffff" }
};

const experienceData: Experience[] = [
    {
        role: "DevOps Intern",
        company: "Crystalize",
        period: "Jun 2024",
        points: [
            "Mastered and implemented collaborative Git workflows and GitHub version control, managing code repositories and streamlining branch integration for team builds.",
            "Containerized multi-tier web applications utilizing Docker, creating isolated development environments to eliminate deployment inconsistencies.",
            "Explored and deployed cloud services on AWS (Amazon Web Services), learning key cloud infrastructure concepts, automated builds, and server instance orchestration."
        ]
    }
];

const achievementsData: Achievement[] = [
    {
        title: "2nd Place - National Level Hackathon",
        issuer: "Malnad College of Engineering",
        year: "2025",
        description: "Built an integrated medical web platform connecting hospitals, pharmacies, and patients to streamline digital prescription management and secure medical records.",
        certificateImage: "/certificates/2nd-place-certificate.jpeg"
    },
    {
        title: "Top 15 Finish (Out of 70 Teams) - National Krushimantana Hackathon",
        issuer: "MCE ME-RIISE",
        year: "2026",
        description: "Achieved a top 15 placement among 70 competing teams nationwide in the national-level agricultural technology hackathon.",
        certificateImage: "/certificates/krushimanta-hackaton.jpeg"
    }
];

export default function ExperienceProjects() {
    const [activeTab, setActiveTab] = useState<"projects" | "experience" | "achievements">("projects");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    const openProjectDetails = (project: Project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        setLightboxImage(null);
    };

    const tabs = [
        { id: "projects", label: "Projects", Icon: FiFolder },
        { id: "experience", label: "Experience", Icon: FiBriefcase },
        { id: "achievements", label: "Achievements", Icon: FiAward },
    ] as const;

    return (
        <section
            ref={containerRef}
            id="projects"
            className="relative py-24 sm:py-32 overflow-hidden bg-transparent"
        >
            {/* Divider */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent origin-center"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
                {/* Header Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-12 sm:mb-16 max-w-2xl flex flex-col items-center gap-3"
                >
                    <motion.div variants={itemVariants}>
                        <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase border border-black/15 dark:border-white/15 rounded-full text-black/50 dark:text-white/50">
                            My Journey
                        </span>
                    </motion.div>
                    <motion.h2
                        variants={itemVariants}
                        className="font-[var(--font-heading)] text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-black dark:text-white"
                    >
                        Work, Builds & Milestones
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-sm sm:text-base text-black/60 dark:text-white/60 leading-relaxed"
                    >
                        Explore my projects, professional industry experiences, and academic achievements.
                    </motion.p>
                </motion.div>

                {/* ─── Tabs List (On top of the box) ─── */}
                <div className="relative flex p-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-white/20 dark:bg-white/[0.01] backdrop-blur-md mb-8 max-w-md w-full justify-between shadow-sm">
                    {tabs.map((tab) => {
                        const Icon = tab.Icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex-1 flex items-center justify-center gap-2 py-2 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold select-none cursor-pointer transition-colors duration-300 z-10 ${
                                    isActive
                                        ? "text-white dark:text-black"
                                        : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-journey-tab"
                                        className="absolute inset-0 bg-black dark:bg-white rounded-full -z-10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <Icon size={14} className="shrink-0" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* ─── Main Content Box ─── */}
                <div className={`w-full min-h-[420px] rounded-3xl p-6 sm:p-8 md:p-10 ${glassCardStyle}`}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, filter: "blur(6px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(6px)" }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="w-full h-full"
                        >
                            {/* ─── Projects Tab Content ─── */}
                            {activeTab === "projects" && (
                                <div className="grid grid-cols-1 max-w-3xl mx-auto w-full">
                                    {projectsData.map((project, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-5 sm:p-6 rounded-2xl flex flex-col justify-between h-full group ${glassCardStyle} ${cardHoverEffects}`}
                                        >
                                            <div>
                                                <div className="flex items-start justify-between mb-3 gap-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] dark:text-blue-400 bg-[var(--accent)]/10 dark:bg-blue-400/10 px-2.5 py-1 rounded-full">
                                                        {project.category}
                                                    </span>
                                                </div>
                                                <h3 className="font-[var(--font-heading)] text-lg sm:text-xl font-bold text-black dark:text-white mb-2 group-hover:text-[var(--accent)] dark:group-hover:text-blue-400 transition-colors duration-300">
                                                    {project.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed mb-6">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.tech.map((t, index) => {
                                                        const techInfo = techIconsMap[t];
                                                        const TechIcon = techInfo ? techInfo.Icon : null;
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/[0.05] dark:border-white/[0.05] bg-white/20 dark:bg-white/[0.002] backdrop-blur-sm transition-all duration-300 group/tech overflow-hidden select-none hover:-translate-y-0.5 hover:border-black/[0.1] dark:hover:border-white/[0.1]"
                                                                style={techInfo ? {
                                                                    ["--brand-color" as string]: techInfo.hoverColor,
                                                                    ["--brand-color-dark" as string]: techInfo.darkHoverColor || techInfo.hoverColor,
                                                                } as React.CSSProperties : {}}
                                                            >
                                                                {/* Hover Glow */}
                                                                {techInfo && (
                                                                    <div
                                                                        className="absolute inset-0 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                                        style={{
                                                                            background: `radial-gradient(circle at center, ${techInfo.color} 0%, transparent 95%)`,
                                                                        }}
                                                                    />
                                                                )}
                                                                {TechIcon && (
                                                                    <TechIcon 
                                                                        className="w-3.5 h-3.5 text-black/50 dark:text-white/50 group-hover/tech:text-[var(--brand-color)] dark:group-hover/tech:text-[var(--brand-color-dark)] transition-colors duration-300 shrink-0" 
                                                                    />
                                                                )}
                                                                <span className="text-[10px] font-semibold text-black/60 dark:text-white/60 group-hover/tech:text-black dark:group-hover/tech:text-white transition-colors duration-300">
                                                                    {t}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                
                                                <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] dark:border-white/[0.05] gap-3">
                                                    <div className="flex items-center gap-2">
                                                        {project.github && (
                                                            <a
                                                                href={project.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-center w-8 h-8 rounded-full border border-black/[0.08] dark:border-white/[0.08] text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200"
                                                                title="Repository"
                                                            >
                                                                <FiGithub size={14} />
                                                            </a>
                                                        )}
                                                        {project.demo && (
                                                            <a
                                                                href={project.demo}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-center w-8 h-8 rounded-full border border-black/[0.08] dark:border-white/[0.08] text-[var(--accent)] dark:text-blue-400 hover:opacity-80 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200"
                                                                title="Live Demo"
                                                            >
                                                                <FiExternalLink size={13} />
                                                            </a>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => openProjectDetails(project)}
                                                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 text-black/80 dark:text-white/80 cursor-pointer"
                                                    >
                                                        <span>View Project</span>
                                                        <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ─── Experience Tab Content ─── */}
                            {activeTab === "experience" && (
                                <div className="relative flex flex-col gap-8 pl-4 sm:pl-6 border-l border-black/[0.08] dark:border-white/[0.08] py-2 max-w-4xl mx-auto">
                                    {experienceData.map((exp, idx) => (
                                        <div key={idx} className="relative group">
                                            {/* Timeline Node Point */}
                                            <div className="absolute -left-[21px] sm:-left-[29px] top-1.5 flex items-center justify-center">
                                                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white dark:bg-black border-2 border-black dark:border-white transition-all duration-300 group-hover:scale-125 group-hover:border-[var(--accent)] dark:group-hover:border-blue-400" />
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                                                <div>
                                                    <h3 className="font-[var(--font-heading)] text-lg sm:text-xl font-bold text-black dark:text-white">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-sm font-semibold text-[var(--accent)] dark:text-blue-400 mt-0.5">
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-black/50 dark:text-white/50 sm:mt-1 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] px-2.5 py-1 rounded-full w-fit">
                                                    <FiCalendar size={12} />
                                                    <span>{exp.period}</span>
                                                </div>
                                            </div>

                                            <ul className="flex flex-col gap-2.5 pl-1.5">
                                                {exp.points.map((pt, pIdx) => (
                                                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed">
                                                        <FiCheckCircle size={14} className="text-[var(--accent)] dark:text-blue-400 mt-0.5 shrink-0" />
                                                        <span>{pt}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ─── Achievements Tab Content ─── */}
                            {activeTab === "achievements" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
                                    {achievementsData.map((ach, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-5 rounded-2xl flex flex-col gap-4 items-start ${glassCardStyle} ${cardHoverEffects}`}
                                        >
                                            <div className="flex gap-4 items-start w-full">
                                                <div className="p-3 bg-[var(--accent)]/10 dark:bg-blue-400/10 rounded-xl text-[var(--accent)] dark:text-blue-400 shrink-0 mt-0.5">
                                                    <FiAward size={20} />
                                                </div>
                                                <div className="flex flex-col gap-1.5 flex-1">
                                                    <div className="flex items-baseline justify-between gap-2">
                                                        <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider">
                                                            {ach.issuer}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-[var(--accent)] dark:text-blue-400 bg-[var(--accent)]/10 dark:bg-blue-400/10 px-2 py-0.5 rounded">
                                                            {ach.year}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-[var(--font-heading)] text-base font-bold text-black dark:text-white leading-snug">
                                                        {ach.title}
                                                    </h3>
                                                    <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                                                        {ach.description}
                                                    </p>
                                                </div>
                                            </div>
                                            {ach.certificateImage && (
                                                <button
                                                    onClick={() => setLightboxImage(ach.certificateImage || null)}
                                                    className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] dark:text-blue-400 hover:opacity-80 transition-opacity duration-200 cursor-pointer self-start sm:ml-14"
                                                >
                                                    <span>View Certificate</span>
                                                    <FiExternalLink size={13} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(12px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(12px)" }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-black/10 dark:border-white/[0.08] bg-white/95 dark:bg-black/90 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col gap-6 scrollbar-thin"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all cursor-pointer z-10"
                            >
                                <FiX size={18} />
                            </button>

                            {/* Modal Header */}
                            <div>
                                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] dark:text-blue-400 bg-[var(--accent)]/10 dark:bg-blue-400/10 rounded-full mb-3">
                                    {selectedProject.category}
                                </span>
                                <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-extrabold text-black dark:text-white leading-tight">
                                    {selectedProject.title}
                                </h3>
                            </div>

                            {/* Content Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                {/* Left Side: Details & Tech */}
                                <div className="flex flex-col gap-6">
                                    {selectedProject.problemSolved && (
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-sm font-bold text-black/40 dark:text-white/45 uppercase tracking-wider">
                                                What It Solves
                                            </h4>
                                            <p className="text-sm text-black/75 dark:text-white/75 leading-relaxed">
                                                {selectedProject.problemSolved}
                                            </p>
                                        </div>
                                    )}

                                    {selectedProject.bullets && selectedProject.bullets.length > 0 && (
                                        <div className="flex flex-col gap-3">
                                            <h4 className="text-sm font-bold text-black/40 dark:text-white/45 uppercase tracking-wider">
                                                Key Highlights
                                            </h4>
                                            <ul className="flex flex-col gap-3">
                                                {selectedProject.bullets.map((bullet, bIdx) => (
                                                    <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-black/70 dark:text-white/70 leading-relaxed">
                                                        <FiCheckCircle size={15} className="text-[var(--accent)] dark:text-blue-400 mt-0.5 shrink-0" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <h4 className="text-sm font-bold text-black/40 dark:text-white/45 uppercase tracking-wider">
                                            Tech Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map((t, idx) => {
                                                const techInfo = techIconsMap[t];
                                                const TechIcon = techInfo ? techInfo.Icon : null;
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/[0.05] dark:border-white/[0.05] bg-white/20 dark:bg-white/[0.002] backdrop-blur-sm transition-all duration-300 group/modal-tech overflow-hidden select-none hover:-translate-y-0.5 hover:border-black/[0.1] dark:hover:border-white/[0.1]"
                                                        style={techInfo ? {
                                                            ["--brand-color" as string]: techInfo.hoverColor,
                                                            ["--brand-color-dark" as string]: techInfo.darkHoverColor || techInfo.hoverColor,
                                                        } as React.CSSProperties : {}}
                                                    >
                                                        {/* Hover Glow */}
                                                        {techInfo && (
                                                            <div
                                                                className="absolute inset-0 opacity-0 group-hover/modal-tech:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                                style={{
                                                                    background: `radial-gradient(circle at center, ${techInfo.color} 0%, transparent 95%)`,
                                                                }}
                                                            />
                                                        )}
                                                        {TechIcon && (
                                                            <TechIcon 
                                                                className="w-3.5 h-3.5 text-black/50 dark:text-white/50 group-hover/modal-tech:text-[var(--brand-color)] dark:group-hover/modal-tech:text-[var(--brand-color-dark)] transition-colors duration-300 shrink-0" 
                                                            />
                                                        )}
                                                        <span className="text-[10px] sm:text-xs font-semibold text-black/60 dark:text-white/60 group-hover/modal-tech:text-black dark:group-hover/modal-tech:text-white transition-colors duration-300">
                                                            {t}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Screenshots or Fallback */}
                                <div className="flex flex-col gap-4">
                                    {selectedProject.images && selectedProject.images.length > 0 ? (
                                        <div className="flex flex-col gap-3">
                                            <h4 className="text-sm font-bold text-black/40 dark:text-white/45 uppercase tracking-wider">
                                                Visual Walkthrough
                                            </h4>
                                            
                                            {/* Browser window container */}
                                            <div className="relative w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/10 bg-neutral-950 flex flex-col group/carousel">
                                                {/* Browser mockup header */}
                                                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-black/10 dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.03] select-none">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                                    <div className="ml-4 text-[10px] text-black/40 dark:text-white/40 font-mono truncate max-w-[200px]">
                                                        {selectedProject.demo ? selectedProject.demo.replace("https://", "") : "graphgen1.vercel.app"}
                                                    </div>
                                                </div>
                                                
                                                {/* Image Container */}
                                                <div 
                                                    className="relative h-[260px] sm:h-[340px] w-full flex items-center justify-center p-2 bg-neutral-900 cursor-zoom-in"
                                                    onClick={() => setLightboxImage(selectedProject.images![currentImageIndex])}
                                                    title="Click to view full image"
                                                >
                                                    <img
                                                        src={selectedProject.images[currentImageIndex]}
                                                        alt={`${selectedProject.title} Screenshot ${currentImageIndex + 1}`}
                                                        className="max-w-full max-h-full object-contain rounded-lg select-none"
                                                    />
                                                    
                                                    {/* Navigation Arrows */}
                                                    {selectedProject.images.length > 1 && (
                                                        <>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setCurrentImageIndex((prev) => 
                                                                        prev === 0 ? selectedProject.images!.length - 1 : prev - 1
                                                                    );
                                                                }}
                                                                className="absolute left-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 shadow-md animate-in fade-in duration-200"
                                                            >
                                                                <FiChevronLeft size={18} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setCurrentImageIndex((prev) => 
                                                                        prev === selectedProject.images!.length - 1 ? 0 : prev + 1
                                                                    );
                                                                }}
                                                                className="absolute right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 shadow-md animate-in fade-in duration-200"
                                                            >
                                                                <FiChevronRight size={18} />
                                                            </button>
                                                        </>
                                                    )}

                                                    {/* Page Indicators */}
                                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                                                        {selectedProject.images.map((_, imgIdx) => (
                                                            <button
                                                                key={imgIdx}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setCurrentImageIndex(imgIdx);
                                                                }}
                                                                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                                                                    currentImageIndex === imgIdx ? "bg-white scale-125" : "bg-white/40"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-center text-black/50 dark:text-white/50 italic">
                                                Image {currentImageIndex + 1} of {selectedProject.images.length} (Click to expand)
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="relative aspect-video rounded-2xl border border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-center p-6 bg-black/[0.01] dark:bg-white/[0.01]">
                                            <FiFolder size={32} className="text-black/25 dark:text-white/25 mb-2" />
                                            <p className="text-xs font-semibold text-black/40 dark:text-white/45">
                                                No screenshots available for this project.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Modal Footer / CTA Links */}
                            <div className="flex items-center gap-4 pt-6 border-t border-black/10 dark:border-white/10 mt-4">
                                {selectedProject.github && (
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-black/80 dark:text-white/80 transition-all"
                                    >
                                        <FiGithub size={16} />
                                        <span>Code Repository</span>
                                    </a>
                                )}
                                {selectedProject.demo && (
                                    <a
                                        href={selectedProject.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl bg-black dark:bg-white hover:opacity-90 text-white dark:text-black transition-all ml-auto"
                                    >
                                        <span>Launch Live App</span>
                                        <FiExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm cursor-zoom-out"
                    >
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                        >
                            <FiX size={20} />
                        </button>
                        <motion.img
                            initial={{ opacity: 0, filter: "blur(15px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(15px)" }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            src={lightboxImage}
                            alt="Full screen view"
                            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl select-none"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
