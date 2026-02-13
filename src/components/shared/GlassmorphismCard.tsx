import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SPRING_CONFIGS } from "../../utils/timing";

export const GlassmorphismCard: React.FC<{
  width?: number;
  height?: number;
  entranceDelay?: number;
  entranceType?: "flip3d" | "slideUp" | "scaleIn";
  glowColor?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  width = 280,
  height,
  entranceDelay = 0,
  entranceType = "scaleIn",
  glowColor = "#4ade80",
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - entranceDelay),
    fps,
    config: SPRING_CONFIGS.bouncy,
    durationInFrames: 25,
  });
  const isActive = frame >= entranceDelay;
  const opacity = isActive ? Math.min(progress * 1.5, 1) : 0;

  let transform = "";
  if (entranceType === "flip3d") {
    const rotateY = (1 - progress) * 90;
    transform = `perspective(1000px) rotateY(${rotateY}deg)`;
  } else if (entranceType === "slideUp") {
    transform = `translateY(${(1 - progress) * 60}px)`;
  } else {
    transform = `scale(${0.5 + progress * 0.5})`;
  }

  // Shine sweep
  const shinePos = interpolate(frame - entranceDelay, [15, 40], [-50, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 16,
        background: `linear-gradient(135deg, rgba(15, 22, 40, 0.7), rgba(10, 15, 30, 0.85))`,
        border: `1px solid ${glowColor}22`,
        boxShadow: `0 15px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 30px ${glowColor}11`,
        padding: "30px 24px",
        opacity,
        transform,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Shine effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(105deg, transparent ${shinePos - 20}%, rgba(255,255,255,0.06) ${shinePos}%, transparent ${shinePos + 20}%)`,
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};
