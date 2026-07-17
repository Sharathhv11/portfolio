"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
    FiMail, 
    FiMapPin, 
    FiLinkedin, 
    FiGithub, 
    FiSend, 
    FiCheck, 
    FiCopy, 
    FiArrowRight 
} from "react-icons/fi";

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
const cardHoverEffects = "hover:bg-white/60 dark:hover:bg-white/[0.04] hover:border-black/15 dark:hover:border-white/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300 ease-out";

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [copied, setCopied] = useState(false);

    const emailAddress = "sharathhv.work@gmail.com"; // Professional email contact

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy email: ", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) return;

        setIsSubmitting(true);
        // Mock API submission latency
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormState({ name: "", email: "", subject: "", message: "" });

        // Reset success state after 4 seconds
        setTimeout(() => setIsSuccess(false), 4000);
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
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

            <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                >
                    {/* ─── Left Column: Socials & Info (5 cols) ─── */}
                    <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
                        <div className="flex flex-col gap-3">
                            <motion.div variants={itemVariants}>
                                <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase border border-black/15 dark:border-white/15 rounded-full text-black/50 dark:text-white/50">
                                    Contact
                                </span>
                            </motion.div>
                            <motion.h2
                                variants={itemVariants}
                                className="font-[var(--font-heading)] text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-black dark:text-white"
                            >
                                Let&apos;s build something great.
                            </motion.h2>
                            <motion.p
                                variants={itemVariants}
                                className="text-sm sm:text-base text-black/60 dark:text-white/60 leading-relaxed max-w-md"
                            >
                                Whether you have an interesting internship opportunity, a project proposal, or just want to chat about AI/ML or web dev — feel free to drop a message.
                            </motion.p>
                        </div>

                        {/* Details Cards */}
                        <div className="flex flex-col gap-4">
                            {/* Email Card (with click to copy) */}
                            <motion.div
                                variants={itemVariants}
                                onClick={handleCopyEmail}
                                className={`p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer select-none ${glassCardStyle} ${cardHoverEffects}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-black/[0.04] dark:bg-white/[0.04] rounded-xl text-black/60 dark:text-white/60 shrink-0">
                                        <FiMail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">Email Me</p>
                                        <p className="text-xs sm:text-sm font-bold text-black dark:text-white mt-0.5 break-all">{emailAddress}</p>
                                    </div>
                                </div>
                                <div className="p-2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
                                    {copied ? (
                                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Copied!</span>
                                    ) : (
                                        <FiCopy size={14} title="Copy to clipboard" />
                                    )}
                                </div>
                            </motion.div>

                            {/* Location Card */}
                            <motion.div
                                variants={itemVariants}
                                className={`p-4 rounded-2xl flex items-center gap-4 ${glassCardStyle}`}
                            >
                                <div className="p-3 bg-black/[0.04] dark:bg-white/[0.04] rounded-xl text-black/60 dark:text-white/60 shrink-0">
                                    <FiMapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">Location</p>
                                    <p className="text-xs sm:text-sm font-bold text-black dark:text-white mt-0.5">Hassan, Karnataka, India</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Links Row */}
                        <motion.div variants={itemVariants} className="flex gap-4">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-3.5 rounded-xl text-black/60 dark:text-white/60 hover:text-[var(--accent)] dark:hover:text-blue-400 hover:scale-110 active:scale-95 transition-all ${glassCardStyle}`}
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin size={20} />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-3.5 rounded-xl text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:scale-110 active:scale-95 transition-all ${glassCardStyle}`}
                                aria-label="GitHub"
                            >
                                <FiGithub size={20} />
                            </a>
                        </motion.div>
                    </div>

                    {/* ─── Right Column: Form Card (7 cols) ─── */}
                    <div className="lg:col-span-7 w-full">
                        <motion.div
                            variants={itemVariants}
                            className={`p-6 sm:p-8 rounded-3xl relative overflow-hidden ${glassCardStyle}`}
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Name Field */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-xs font-semibold text-black/55 dark:text-white/55">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/20 dark:bg-white/[0.01] backdrop-blur-sm text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[var(--accent)] dark:focus:border-blue-400 focus:ring-1 focus:ring-[var(--accent)]/30 dark:focus:ring-blue-400/30 transition-all duration-300"
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-xs font-semibold text-black/55 dark:text-white/55">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/20 dark:bg-white/[0.01] backdrop-blur-sm text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[var(--accent)] dark:focus:border-blue-400 focus:ring-1 focus:ring-[var(--accent)]/30 dark:focus:ring-blue-400/30 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="subject" className="text-xs font-semibold text-black/55 dark:text-white/55">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={formState.subject}
                                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                        placeholder="Collaboration interest"
                                        className="w-full px-4 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/20 dark:bg-white/[0.01] backdrop-blur-sm text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[var(--accent)] dark:focus:border-blue-400 focus:ring-1 focus:ring-[var(--accent)]/30 dark:focus:ring-blue-400/30 transition-all duration-300"
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-xs font-semibold text-black/55 dark:text-white/55">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        placeholder="Hi Sharath, let's talk about..."
                                        className="w-full px-4 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/20 dark:bg-white/[0.01] backdrop-blur-sm text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[var(--accent)] dark:focus:border-blue-400 focus:ring-1 focus:ring-[var(--accent)]/30 dark:focus:ring-blue-400/30 transition-all duration-300 resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full relative overflow-hidden inline-flex items-center justify-center gap-2 py-3.5 px-6 font-semibold bg-black text-white dark:bg-white dark:text-black rounded-xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] dark:hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed select-none cursor-pointer`}
                                >
                                    <AnimatePresence mode="wait">
                                        {isSuccess ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="flex items-center gap-2 text-emerald-500 dark:text-emerald-600"
                                            >
                                                <FiCheck size={16} />
                                                <span>Message Sent!</span>
                                            </motion.div>
                                        ) : isSubmitting ? (
                                            <motion.div
                                                key="sending"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                <span>Sending...</span>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="default"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2 group/btn"
                                            >
                                                <span>Send Message</span>
                                                <FiSend size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
