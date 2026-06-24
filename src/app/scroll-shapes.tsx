"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ShapeDef {
  type: "circle" | "square" | "triangle" | "hexagon" | "line" | "ring";
  x: number; // vw percentage
  y: number; // vh percentage
  size: number; // px
  rotation?: number; // degrees
  opacity: [number, number, number]; // [start, mid, end] scroll segments
  parallaxSpeed: number; // 0-3, higher = faster
  color?: string;
  borderWidth?: number;
}

const shapes: ShapeDef[] = [
  // Top section shapes
  { type: "circle", x: 5, y: 15, size: 80, opacity: [0.25, 0.1, 0], parallaxSpeed: 0.3, color: "#6366f1" },
  { type: "ring", x: 92, y: 10, size: 120, opacity: [0.2, 0.08, 0], parallaxSpeed: 0.5, color: "#818cf8", borderWidth: 1.5 },
  { type: "square", x: 15, y: 25, size: 40, rotation: 15, opacity: [0.18, 0.06, 0], parallaxSpeed: 0.7, color: "#a78bfa" },
  { type: "triangle", x: 88, y: 30, size: 50, rotation: -20, opacity: [0.2, 0.08, 0], parallaxSpeed: 0.4, color: "#6366f1" },
  { type: "line", x: 50, y: 8, size: 120, rotation: 45, opacity: [0.15, 0.05, 0], parallaxSpeed: 0.6, color: "#6366f1" },

  // Mid section — manifesto/experience area
  { type: "hexagon", x: 8, y: 48, size: 70, rotation: 30, opacity: [0, 0.14, 0.06], parallaxSpeed: 0.8, color: "#818cf8" },
  { type: "circle", x: 85, y: 55, size: 100, opacity: [0, 0.16, 0.05], parallaxSpeed: 0.5, color: "#6366f1" },
  { type: "square", x: 48, y: 52, size: 30, rotation: -10, opacity: [0, 0.12, 0.04], parallaxSpeed: 1.2, color: "#a78bfa" },
  { type: "ring", x: 94, y: 42, size: 60, opacity: [0, 0.15, 0.05], parallaxSpeed: 0.6, color: "#6366f1", borderWidth: 1 },
  { type: "line", x: 20, y: 60, size: 80, rotation: -30, opacity: [0, 0.1, 0.04], parallaxSpeed: 0.9, color: "#818cf8" },

  // Lower section — awards/hobbies
  { type: "triangle", x: 10, y: 78, size: 45, rotation: 60, opacity: [0, 0.04, 0.18], parallaxSpeed: 0.7, color: "#6366f1" },
  { type: "circle", x: 90, y: 85, size: 55, opacity: [0, 0.06, 0.2], parallaxSpeed: 0.4, color: "#818cf8" },
  { type: "hexagon", x: 45, y: 88, size: 90, rotation: -15, opacity: [0, 0.07, 0.16], parallaxSpeed: 0.5, color: "#6366f1" },
  { type: "ring", x: 75, y: 75, size: 80, opacity: [0, 0.05, 0.14], parallaxSpeed: 0.8, color: "#a78bfa", borderWidth: 1.5 },
  { type: "square", x: 25, y: 92, size: 35, rotation: 25, opacity: [0, 0.05, 0.12], parallaxSpeed: 1.1, color: "#6366f1" },
  { type: "line", x: 60, y: 95, size: 100, rotation: 20, opacity: [0, 0.05, 0.12], parallaxSpeed: 0.6, color: "#818cf8" },
];

function TriangleShape({ size, color }: { size: number; color: string }) {
  const h = size * 0.866;
  const points = `${size / 2},0 ${size},${h} 0,${h}`;
  return (
    <svg width={size} height={h} viewBox={`0 0 ${size} ${h}`}>
      <polygon points={points} fill={color} opacity={0.3} />
    </svg>
  );
}

function HexagonShape({ size, color }: { size: number; color: string }) {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={points} fill="none" stroke={color} strokeWidth={1} opacity={0.4} />
    </svg>
  );
}

function AnimatedShape({ shape, scrollY }: { shape: ShapeDef; scrollY: any }) {
  const yOffset = useTransform(scrollY, [0, 3000], [0, shape.parallaxSpeed * 200]);
  const rotate = useTransform(
    scrollY,
    [0, 1500, 3000],
    [(shape.rotation || 0), (shape.rotation || 0) + 30, (shape.rotation || 0) + 60]
  );
  const scale = useTransform(scrollY, [0, 1500, 3000], [1, 1.15, 0.9]);
  const opacity = useTransform(
    scrollY,
    [0, 1500, 3000],
    shape.opacity as [number, number, number]
  );

  const shapeEl = (() => {
    switch (shape.type) {
      case "circle":
        return (
          <div
            style={{
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${shape.color || "#6366f1"}33, ${shape.color || "#6366f1"}0a)`,
              border: `${shape.borderWidth || 0}px solid ${shape.color || "#6366f1"}33`,
            }}
          />
        );
      case "ring":
        return (
          <div
            style={{
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              border: `${shape.borderWidth || 1.5}px solid ${shape.color || "#6366f1"}44`,
              background: "transparent",
            }}
          />
        );
      case "square":
        return (
          <div
            style={{
              width: shape.size,
              height: shape.size,
              borderRadius: shape.size * 0.2,
              background: `${shape.color || "#6366f1"}11`,
              border: `1px solid ${shape.color || "#6366f1"}22`,
            }}
          />
        );
      case "triangle":
        return <TriangleShape size={shape.size} color={shape.color || "#6366f1"} />;
      case "hexagon":
        return <HexagonShape size={shape.size} color={shape.color || "#6366f1"} />;
      case "line":
        return (
          <div
            style={{
              width: shape.size,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${shape.color || "#6366f1"}44, transparent)`,
            }}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <motion.div
      style={{
        position: "fixed",
        left: `${shape.x}vw`,
        top: `${shape.y}vh`,
        y: yOffset,
        rotate,
        scale,
        opacity,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {shapeEl}
    </motion.div>
  );
}

export function ScrollShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <AnimatedShape key={i} shape={shape} scrollY={scrollY} />
      ))}
    </div>
  );
}