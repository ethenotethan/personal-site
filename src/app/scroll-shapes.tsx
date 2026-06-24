"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const shapes = [
  { type: "circle", x: 3, y: 12, size: 60, speed: 0.3, color: "rgba(99,102,241,0.2)" },
  { type: "ring", x: 90, y: 8, size: 90, speed: 0.5, color: "rgba(129,140,248,0.25)" },
  { type: "square", x: 12, y: 30, size: 35, speed: 0.7, color: "rgba(167,139,250,0.15)", rotation: 15 },
  { type: "triangle", x: 85, y: 28, size: 45, speed: 0.4, color: "rgba(99,102,241,0.2)" },
  { type: "circle", x: 50, y: 6, size: 50, speed: 0.8, color: "rgba(99,102,241,0.12)" },
  { type: "hexagon", x: 6, y: 50, size: 55, speed: 0.6, color: "rgba(129,140,248,0.2)" },
  { type: "circle", x: 88, y: 52, size: 80, speed: 0.35, color: "rgba(99,102,241,0.18)" },
  { type: "ring", x: 45, y: 55, size: 70, speed: 0.9, color: "rgba(167,139,250,0.22)" },
  { type: "square", x: 92, y: 45, size: 25, speed: 1.1, color: "rgba(99,102,241,0.15)", rotation: -10 },
  { type: "line", x: 20, y: 62, size: 100, speed: 0.5, color: "rgba(129,140,248,0.2)" },
  { type: "triangle", x: 8, y: 75, size: 40, speed: 0.7, color: "rgba(99,102,241,0.18)" },
  { type: "circle", x: 85, y: 82, size: 55, speed: 0.4, color: "rgba(129,140,248,0.22)" },
  { type: "hexagon", x: 40, y: 85, size: 65, speed: 0.55, color: "rgba(99,102,241,0.18)" },
  { type: "ring", x: 72, y: 72, size: 60, speed: 0.75, color: "rgba(167,139,250,0.2)" },
  { type: "square", x: 22, y: 90, size: 30, speed: 1.0, color: "rgba(99,102,241,0.15)", rotation: 22 },
  { type: "line", x: 55, y: 95, size: 80, speed: 0.6, color: "rgba(129,140,248,0.18)" },
];

function Triangle({ size, color }: { size: number; color: string }) {
  const h = size * 0.866;
  const pts = `${size / 2},0 ${size},${h} 0,${h}`;
  return (
    <svg width={size} height={h}>
      <polygon points={pts} fill={color} />
    </svg>
  );
}

function Hexagon({ size, color }: { size: number; color: string }) {
  const r = size / 2;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${r + r * Math.cos(a)},${r + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size}>
      <polygon points={pts} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}

export function ScrollShapes() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => {
        const yRange: [number, number] = [0, shape.speed * -120];
        const y = useTransform(scrollYProgress, [0, 1], yRange);
        const rotate = useTransform(
          scrollYProgress,
          [0, 0.5, 1],
          [shape.rotation || 0, (shape.rotation || 0) + 20, (shape.rotation || 0) + 45]
        );
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.6, 0.6, 0.2]);

        const el = (() => {
          const s = shape;
          switch (s.type) {
            case "circle":
              return (
                <div
                  style={{
                    width: s.size,
                    height: s.size,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 35%, ${s.color}, transparent)`,
                  }}
                />
              );
            case "ring":
              return (
                <div
                  style={{
                    width: s.size,
                    height: s.size,
                    borderRadius: "50%",
                    border: `1.5px solid ${s.color}`,
                    background: "transparent",
                  }}
                />
              );
            case "square":
              return (
                <div
                  style={{
                    width: s.size,
                    height: s.size,
                    borderRadius: s.size * 0.15,
                    background: s.color,
                    border: `1px solid ${s.color}`,
                  }}
                />
              );
            case "triangle":
              return <Triangle size={s.size} color={s.color} />;
            case "hexagon":
              return <Hexagon size={s.size} color={s.color} />;
            case "line":
              return (
                <div
                  style={{
                    width: s.size,
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                  }}
                />
              );
            default:
              return null;
          }
        })();

        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              y,
              rotate,
              opacity,
            }}
          >
            {el}
          </motion.div>
        );
      })}
    </div>
  );
}