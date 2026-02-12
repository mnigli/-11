import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [0, 15], [0.9, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const buttonOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const buttonY = interpolate(frame, [15, 30], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const urlOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const glowPulse =
    0.5 + 0.5 * Math.sin((frame / 30) * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #0f1628 0%, #070b14 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        direction: "rtl",
      }}
    >
      {/* Radiating rings */}
      {[1, 2, 3].map((i) => {
        const ringOpacity = interpolate(
          frame,
          [5 * i, 5 * i + 20],
          [0, 0.15],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const ringScale = interpolate(
          frame,
          [5 * i, 5 * i + 40],
          [0.3, 1 + i * 0.3],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              borderRadius: "50%",
              border: "1px solid #4ade80",
              opacity: ringOpacity * (1 - i * 0.2),
              transform: `scale(${ringScale})`,
            }}
          />
        );
      })}

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 72,
          fontWeight: "bold",
          background: "linear-gradient(135deg, #4ade80, #22d3ee)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 30,
          textAlign: "center",
          filter: `drop-shadow(0 0 ${20 * glowPulse}px rgba(74, 222, 128, 0.3))`,
        }}
      >
        &#1492;&#1510;&#1496;&#1512;&#1508;&#1493;
        &#1506;&#1499;&#1513;&#1497;&#1493;
      </div>

      {/* CTA button */}
      <div
        style={{
          opacity: buttonOpacity,
          transform: `translateY(${buttonY}px)`,
          padding: "22px 60px",
          borderRadius: 14,
          background: "linear-gradient(135deg, #4ade80, #22d3ee)",
          color: "#070b14",
          fontSize: 32,
          fontWeight: "bold",
          boxShadow: `0 0 ${40 * glowPulse}px rgba(74, 222, 128, 0.3)`,
          marginBottom: 40,
        }}
      >
        &#1500;&#1488;&#1514;&#1512; &#1513;&#1511;&#1500;&#1493;&#1503;
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          fontSize: 28,
          color: "#64748b",
          letterSpacing: 3,
        }}
      >
        shkalon.co.il
      </div>
    </AbsoluteFill>
  );
};
