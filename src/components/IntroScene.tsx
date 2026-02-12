import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });
  const logoRotate = interpolate(frame, [0, 30], [10, 0], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14 },
  });

  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 14 },
  });

  // Glow pulse
  const glowIntensity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [20, 40]
  );

  // Exit fade
  const exitOpacity = interpolate(frame, [80, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      {/* Shekel symbol as logo */}
      <div
        style={{
          transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          fontSize: 140,
          fontWeight: "bold",
          background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #4f46e5 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: `drop-shadow(0 0 ${glowIntensity}px rgba(139, 92, 246, 0.6))`,
          marginBottom: 20,
        }}
      >
        ₪
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${interpolate(titleY, [0, 1], [30, 0])}px)`,
          fontSize: 90,
          fontWeight: 800,
          background: "linear-gradient(90deg, #c4b5fd, #a78bfa, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-2px",
        }}
      >
        שקלון
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${interpolate(subtitleY, [0, 1], [20, 0])}px)`,
          fontSize: 32,
          color: "rgba(196, 181, 253, 0.8)",
          marginTop: 16,
          fontWeight: 400,
        }}
      >
        הכסף שלך. בשליטה שלך.
      </div>

      {/* Decorative line */}
      <div
        style={{
          marginTop: 30,
          width: interpolate(frame, [45, 70], [0, 300], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 2,
          background: "linear-gradient(90deg, transparent, #8b5cf6, transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
