import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const lineWidth = interpolate(frame, [0, 30], [0, 100], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textY = interpolate(frame, [10, 30], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const glowIntensity = interpolate(frame, [0, 25, 50], [0, 1, 0.6], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #0f1628 0%, #070b14 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = ((i * 137.5) % 100);
        const y = ((i * 73.7) % 100);
        const delay = i * 2;
        const particleOpacity = interpolate(
          frame,
          [delay, delay + 15],
          [0, 0.6],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const size = 2 + (i % 4);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? "#4ade80" : "#22d3ee",
              opacity: particleOpacity * 0.5,
              boxShadow: `0 0 ${size * 3}px ${i % 3 === 0 ? "#4ade80" : "#22d3ee"}`,
            }}
          />
        );
      })}

      {/* Horizontal line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%)",
          width: `${lineWidth * 6}px`,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #4ade80, #22d3ee, transparent)",
          opacity: glowIntensity,
          boxShadow: `0 0 20px rgba(74, 222, 128, ${glowIntensity * 0.5})`,
        }}
      />

      {/* Shekel symbol */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          fontSize: 120,
          color: "#4ade80",
          textShadow: `0 0 40px rgba(74, 222, 128, ${glowIntensity})`,
          marginBottom: 20,
        }}
      >
        &#8362;
      </div>
    </AbsoluteFill>
  );
};
