import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 20], [0.5, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [15, 35], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const glowPulse = interpolate(
    frame,
    [20, 35, 50, 60],
    [0, 1, 0.6, 0.8],
    { extrapolateRight: "clamp" }
  );

  const lineScale = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

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
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74, 222, 128, 0.08) 0%, transparent 70%)",
          opacity: glowPulse,
        }}
      />

      {/* Main title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #4ade80, #22d3ee)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
            filter: `drop-shadow(0 0 ${30 * glowPulse}px rgba(74, 222, 128, 0.4))`,
            letterSpacing: 4,
          }}
        >
          &#1513;&#1511;&#1500;&#1493;&#1503;
        </div>
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: 300 * lineScale,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #4ade80, #22d3ee, transparent)",
          marginTop: 10,
          marginBottom: 20,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 38,
          color: "#94a3b8",
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        &#1513;&#1511;&#1500; &#1493;&#1495;&#1513;&#1489;&#1493;&#1503;
        &mdash; &#1492;&#1491;&#1512;&#1498; &#1500;&#1513;&#1493;&#1511;
        &#1492;&#1492;&#1493;&#1503;
      </div>
    </AbsoluteFill>
  );
};
