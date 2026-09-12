"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const shapes = [
  { type: "circle", x: 3, y: 12, size: 60, speed: 0.3, color: "rgba(99,102,241,0.18)" },
  { type: "ring", x: 90, y: 8, size: 90, speed: 0.5, color: "rgba(129,140,248,0.22)" },
  { type: "square", x: 10, y: 30, size: 35, speed: 0.7, color: "rgba(167,139,250,0.12)", rotation: 15 },
  { type: "triangle", x: 88, y: 28, size: 45, speed: 0.4, color: "rgba(99,102,241,0.16)" },
  { type: "hexagon", x: 5, y: 50, size: 55, speed: 0.6, color: "rgba(129,140,248,0.16)" },
  { type: "circle", x: 90, y: 52, size: 70, speed: 0.35, color: "rgba(99,102,241,0.14)" },
  { type: "ring", x: 8, y: 55, size: 60, speed: 0.9, color: "rgba(167,139,250,0.18)" },
  { type: "square", x: 93, y: 45, size: 25, speed: 1.1, color: "rgba(99,102,241,0.12)", rotation: -10 },
  { type: "line", x: 15, y: 65, size: 80, speed: 0.5, color: "rgba(129,140,248,0.15)" },
  { type: "triangle", x: 6, y: 75, size: 40, speed: 0.7, color: "rgba(99,102,241,0.14)" },
  { type: "circle", x: 87, y: 82, size: 50, speed: 0.4, color: "rgba(129,140,248,0.18)" },
  { type: "hexagon", x: 10, y: 88, size: 55, speed: 0.55, color: "rgba(99,102,241,0.14)" },
  { type: "ring", x: 85, y: 72, size: 55, speed: 0.75, color: "rgba(167,139,250,0.16)" },
  { type: "square", x: 20, y: 92, size: 28, speed: 1.0, color: "rgba(99,102,241,0.12)", rotation: 22 },
  { type: "line", x: 65, y: 96, size: 70, speed: 0.6, color: "rgba(129,140,248,0.14)" },
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

type Shape = (typeof shapes)[number];

function AnimatedShape({
  shape,
  scrollYProgress,
}: {
  shape: Shape;
  scrollYProgress: MotionValue<number>;
}) {
  const yRange: [number, number] = [0, shape.speed * -120];
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [shape.rotation || 0, (shape.rotation || 0) + 20, (shape.rotation || 0) + 45]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.6, 0.6, 0.2]);

  const element = (() => {
    switch (shape.type) {
      case "circle":
        return (
          <div
            style={{
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${shape.color}, transparent)`,
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
              border: `1.5px solid ${shape.color}`,
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
              borderRadius: shape.size * 0.15,
              background: shape.color,
              border: `1px solid ${shape.color}`,
            }}
          />
        );
      case "triangle":
        return <Triangle size={shape.size} color={shape.color} />;
      case "hexagon":
        return <Hexagon size={shape.size} color={shape.color} />;
      case "line":
        return (
          <div
            style={{
              width: shape.size,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${shape.color}, transparent)`,
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
        position: "absolute",
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        y,
        rotate,
        opacity,
      }}
    >
      {element}
    </motion.div>
  );
}

export function ScrollShapes() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 sm:opacity-100" aria-hidden="true">
      {shapes.map((shape, index) => (
        <AnimatedShape key={index} shape={shape} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}