import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

const features = [
  { icon: "\uD83D\uDCC8", title: "\u05D7\u05D3\u05E9\u05D5\u05EA", desc: "\u05E2\u05D3\u05DB\u05D5\u05E0\u05D9\u05DD \u05DE\u05E9\u05D5\u05E7 \u05D4\u05D4\u05D5\u05DF" },
  { icon: "\uD83D\uDEE0\uFE0F", title: "\u05DB\u05DC\u05D9\u05DD", desc: "\u05DE\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05DD \u05D5\u05E0\u05D9\u05EA\u05D5\u05D7\u05D9\u05DD" },
  { icon: "\uD83D\uDCBC", title: "\u05D4\u05E9\u05E7\u05E2\u05D5\u05EA", desc: "\u05DE\u05D3\u05E8\u05D9\u05DB\u05D9\u05DD \u05DC\u05DE\u05E9\u05E7\u05D9\u05E2\u05D9\u05DD" },
  { icon: "\uD83D\uDCDA", title: "\u05DE\u05D3\u05E8\u05D9\u05DB\u05D9\u05DD", desc: "\u05DC\u05DE\u05D9\u05D3\u05D4 \u05E2\u05E6\u05DE\u05D0\u05D9\u05EA" },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [-30, 0], {
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
      {/* Section title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 56,
          fontWeight: "bold",
          background: "linear-gradient(135deg, #4ade80, #22d3ee)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        &#1502;&#1492; &#1514;&#1502;&#1510;&#1488;&#1493;
        &#1489;&#1513;&#1511;&#1500;&#1493;&#1503;?
      </div>

      {/* Feature cards */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 80,
        }}
      >
        {features.map((feature, i) => {
          const delay = 10 + i * 10;
          const cardOpacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const cardY = interpolate(
            frame,
            [delay, delay + 15],
            [50, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.2)),
            }
          );
          const cardScale = interpolate(
            frame,
            [delay, delay + 15],
            [0.8, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.2)),
            }
          );

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                width: 320,
                padding: "50px 30px",
                borderRadius: 20,
                background:
                  "linear-gradient(135deg, rgba(15, 22, 40, 0.9), rgba(10, 15, 30, 0.95))",
                border: "1px solid rgba(74, 222, 128, 0.2)",
                textAlign: "center",
                boxShadow: `0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(74, 222, 128, 0.1)`,
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 20 }}>
                {feature.icon}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#e2e8f0",
                  marginBottom: 12,
                }}
              >
                {feature.title}
              </div>
              <div style={{ fontSize: 22, color: "#64748b" }}>
                {feature.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
