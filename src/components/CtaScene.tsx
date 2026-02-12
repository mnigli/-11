import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const buttonSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 10, mass: 0.5 },
  });

  const urlSpring = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 14 },
  });

  // Pulsing glow on button
  const pulsePhase = Math.sin(frame * 0.1);
  const buttonGlow = interpolate(pulsePhase, [-1, 1], [15, 35]);

  // Radial background glow
  const bgGlow = interpolate(frame, [0, 50], [0, 0.15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: entryOpacity,
      }}
    >
      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(139, 92, 246, ${bgGlow}) 0%, transparent 70%)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          fontSize: 58,
          fontWeight: 800,
          color: "#f1f5f9",
          marginBottom: 20,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.8, 1])})`,
          textAlign: "center",
        }}
      >
        מוכנים לשלוט בכסף?
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 28,
          color: "rgba(196, 181, 253, 0.8)",
          marginBottom: 50,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        הצטרפו עכשיו - בחינם!
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${interpolate(buttonSpring, [0, 1], [0.5, 1])})`,
          opacity: interpolate(buttonSpring, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
            color: "white",
            fontSize: 34,
            fontWeight: 700,
            padding: "22px 64px",
            borderRadius: 16,
            boxShadow: `0 0 ${buttonGlow}px rgba(139, 92, 246, 0.5), 0 4px 20px rgba(0,0,0,0.3)`,
            letterSpacing: "0.5px",
          }}
        >
          התחילו עכשיו
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          marginTop: 40,
          fontSize: 24,
          color: "rgba(148, 163, 184, 0.6)",
          opacity: interpolate(urlSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(urlSpring, [0, 1], [15, 0])}px)`,
          letterSpacing: "1px",
        }}
      >
        shekalon.co.il
      </div>
    </AbsoluteFill>
  );
};
