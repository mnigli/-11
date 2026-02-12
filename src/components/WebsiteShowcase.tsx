import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

export const WebsiteShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  const browserScale = interpolate(frame, [0, 25], [0.85, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const browserOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const chartProgress = interpolate(frame, [15, 50], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const glowIntensity = interpolate(frame, [20, 40], [0, 0.6], {
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
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 500,
          borderRadius: 30,
          background:
            "linear-gradient(135deg, rgba(74, 222, 128, 0.05), rgba(34, 211, 238, 0.05))",
          opacity: glowIntensity,
          filter: "blur(40px)",
        }}
      />

      {/* Browser mockup */}
      <div
        style={{
          opacity: browserOpacity,
          transform: `scale(${browserScale})`,
          width: 1200,
          height: 700,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(74, 222, 128, 0.3)",
          boxShadow: `0 25px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(74, 222, 128, ${glowIntensity * 0.15})`,
        }}
      >
        {/* Browser bar */}
        <div
          style={{
            height: 44,
            background: "#1a1f35",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#febc2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#28c840",
            }}
          />
          <div
            style={{
              marginLeft: 20,
              flex: 1,
              height: 28,
              borderRadius: 6,
              backgroundColor: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#64748b",
            }}
          >
            shkalon.co.il
          </div>
        </div>

        {/* Website content area */}
        <div
          style={{
            height: 656,
            background: "linear-gradient(180deg, #0c1220 0%, #0a0f1e 100%)",
            direction: "rtl",
            padding: 40,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Nav bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 50,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              &#1513;&#1511;&#1500;&#1493;&#1503;
            </div>
            <div style={{ display: "flex", gap: 30, color: "#94a3b8", fontSize: 16 }}>
              <span>&#1489;&#1497;&#1514;</span>
              <span>&#1495;&#1491;&#1513;&#1493;&#1514;</span>
              <span>&#1499;&#1500;&#1497;&#1501;</span>
              <span>&#1492;&#1513;&#1511;&#1506;&#1493;&#1514;</span>
              <span>&#1502;&#1491;&#1512;&#1497;&#1499;&#1497;&#1501;</span>
            </div>
          </div>

          {/* Hero section */}
          <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                  color: "#e2e8f0",
                  lineHeight: 1.3,
                  marginBottom: 20,
                }}
              >
                &#1492;&#1491;&#1512;&#1498; &#1513;&#1500;&#1498;
                <br />
                &#1500;&#1513;&#1493;&#1511;
                &#1492;&#1492;&#1493;&#1503;
              </div>
              <div style={{ fontSize: 20, color: "#64748b", marginBottom: 30 }}>
                &#1499;&#1500; &#1492;&#1499;&#1500;&#1497;&#1501;
                &#1493;&#1492;&#1502;&#1497;&#1491;&#1506;
                &#1513;&#1514;&#1510;&#1496;&#1512;&#1499;&#1493;
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "14px 36px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                  color: "#070b14",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                &#1492;&#1514;&#1495;&#1497;&#1500;&#1493;
                &#1506;&#1499;&#1513;&#1497;&#1493;
              </div>
            </div>

            {/* Chart area */}
            <div style={{ flex: 1, position: "relative", height: 300 }}>
              <svg viewBox="0 0 400 250" width="100%" height="100%">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 62.5}
                    x2="400"
                    y2={i * 62.5}
                    stroke="rgba(148, 163, 184, 0.1)"
                    strokeWidth="1"
                  />
                ))}
                {/* Chart line */}
                <path
                  d="M 0 200 Q 50 180 100 160 T 200 100 T 300 70 T 400 20"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="3"
                  strokeDasharray="600"
                  strokeDashoffset={600 * (1 - chartProgress)}
                  strokeLinecap="round"
                />
                {/* Glow under chart */}
                <path
                  d="M 0 200 Q 50 180 100 160 T 200 100 T 300 70 T 400 20 L 400 250 L 0 250 Z"
                  fill="url(#chartGradient)"
                  opacity={chartProgress * 0.3}
                />
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
