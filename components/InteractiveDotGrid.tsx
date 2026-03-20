"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─── Configuration ─── */
const DOT_SPACING = 28;
const DOT_BASE_RADIUS = 1.2;
const DOT_BASE_OPACITY = 0.1;
const MOUSE_RADIUS = 280;        // wider radius of cursor influence
const MOUSE_FORCE = 30;          // max displacement in px
const WAVE_AMPLITUDE = 4;        // idle wave displacement
const WAVE_SPEED = 0.0006;       // idle wave speed
const WAVE_LENGTH = 200;         // wave wavelength in px
const RETURN_EASE = 0.06;        // smoother return easing
const DAMPING = 0.82;            // fluid damping factor

/* ─── Hover Accent Color (muted electric blue) ─── */
const ACCENT_R = 59;
const ACCENT_G = 130;
const ACCENT_B = 246;

interface Dot {
    baseX: number;
    baseY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export default function InteractiveDotGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const rafRef = useRef<number>(0);
    const sizeRef = useRef({ w: 0, h: 0 });

    /* ─── Build grid of dots ─── */
    const buildGrid = useCallback(() => {
        const { w, h } = sizeRef.current;
        const dots: Dot[] = [];
        const cols = Math.ceil(w / DOT_SPACING) + 2;
        const rows = Math.ceil(h / DOT_SPACING) + 2;
        const offsetX = ((w - (cols - 1) * DOT_SPACING) / 2);
        const offsetY = ((h - (rows - 1) * DOT_SPACING) / 2);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const bx = offsetX + c * DOT_SPACING;
                const by = offsetY + r * DOT_SPACING;
                dots.push({ baseX: bx, baseY: by, x: bx, y: by, vx: 0, vy: 0 });
            }
        }
        dotsRef.current = dots;
    }, []);

    /* ─── Resize handler ─── */
    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        sizeRef.current = { w, h };
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildGrid();
    }, [buildGrid]);

    /* ─── Animation loop ─── */
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const { w, h } = sizeRef.current;
        const now = performance.now();
        const mouse = mouseRef.current;

        ctx.clearRect(0, 0, w, h);

        const dots = dotsRef.current;
        for (let i = 0, len = dots.length; i < len; i++) {
            const dot = dots[i];

            /* idle wave displacement */
            const waveX =
                Math.sin((dot.baseY / WAVE_LENGTH) * Math.PI * 2 + now * WAVE_SPEED) *
                WAVE_AMPLITUDE;
            const waveY =
                Math.cos((dot.baseX / WAVE_LENGTH) * Math.PI * 2 + now * WAVE_SPEED * 0.8) *
                WAVE_AMPLITUDE * 0.6;

            const targetX = dot.baseX + waveX;
            const targetY = dot.baseY + waveY;

            /* mouse repulsion */
            const dx = dot.x - mouse.x;
            const dy = dot.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

            let forceX = 0;
            let forceY = 0;

            if (distSq < radiusSq && distSq > 0.01) {
                const dist = Math.sqrt(distSq);
                const factor = (1 - dist / MOUSE_RADIUS);
                /* smooth cubic falloff for premium feel */
                const strength = factor * factor * factor * MOUSE_FORCE;
                forceX = (dx / dist) * strength;
                forceY = (dy / dist) * strength;
            }

            /* ease dot toward target + force */
            dot.vx += ((targetX + forceX) - dot.x) * RETURN_EASE;
            dot.vy += ((targetY + forceY) - dot.y) * RETURN_EASE;
            dot.vx *= DAMPING;
            dot.vy *= DAMPING;
            dot.x += dot.vx;
            dot.y += dot.vy;

            /* distance-based opacity & color (dots near cursor tint blue) */
            let opacity = DOT_BASE_OPACITY;
            let r = 0, g = 0, b = 0;
            if (distSq < radiusSq) {
                const proximityFactor = 1 - Math.sqrt(distSq) / MOUSE_RADIUS;
                const colorBlend = proximityFactor * proximityFactor; // quadratic for subtlety
                opacity = DOT_BASE_OPACITY + proximityFactor * 0.2;
                r = Math.round(colorBlend * ACCENT_R);
                g = Math.round(colorBlend * ACCENT_G);
                b = Math.round(colorBlend * ACCENT_B);
            }

            /* draw dot */
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_BASE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.fill();
        }

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    /* ─── Mouse tracking ─── */
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -9999, y: -9999 };
    }, []);

    /* ─── Setup ─── */
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave);

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(rafRef.current);
        };
    }, [handleResize, handleMouseMove, handleMouseLeave, animate]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ display: "block" }}
        />
    );
}
