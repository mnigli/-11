import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { COLORS } from "../../utils/colors";
import { HEBREW_STYLE } from "../../utils/fonts";
import { SPRING_CONFIGS } from "../../utils/timing";
import { PerspectiveBrowser } from "../shared/PerspectiveBrowser";
import { SceneTransition } from "../shared/SceneTransition";
import { GlowPulse } from "../shared/GlowPulse";

export const VisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartProgress = interpolate(frame, [35, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Highlight boxes
  const highlights = [
    { label: "\u05D7\u05D3\u05E9\u05D5\u05EA \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA", x: 50, y: 180, w: 200, h: 120, delay: 60 },
    { label: "\u05DB\u05DC\u05D9 \u05E0\u05D9\u05EA\u05D5\u05D7", x: 280, y: 180, w: 200, h: 120, delay: 75 },
    { label: "\u05DE\u05E2\u05E7\u05D1 \u05EA\u05D9\u05E7", x: 510, y: 180, w: 200, h: 120, delay: 90 },
  ];

  return (
    <SceneTransition type="wipeUp">
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 100%)`,
          justifyContent: "center",
          alignItems: "center",
          ...HEBREW_STYLE,
        }}
      >
        <GlowPulse
          color={COLORS.green}
          size={900}
          intensity={0.3}
        />

        <PerspectiveBrowser startFrame={0} width={1100} height={620}>
          {/* Website content */}
          <div style={{ padding: 30, position: "relative" }}>
            {/* Nav */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 30,
                opacity: interpolate(frame, [10, 25], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                &#1513;&#1511;&#1500;&#1493;&#1503;
              </div>
              <div style={{ display: "flex", gap: 24, color: COLORS.textSecondary, fontSize: 14 }}>
                <span>&#1489;&#1497;&#1514;</span>
                <span>&#1495;&#1491;&#1513;&#1493;&#1514;</span>
                <span>&#1499;&#1500;&#1497;&#1501;</span>
                <span>&#1492;&#1513;&#1511;&#1506;&#1493;&#1514;</span>
                <span>&#1502;&#1491;&#1512;&#1497;&#1499;&#1497;&#1501;</span>
              </div>
            </div>

            {/* Hero */}
            <div style={{ display: "flex", gap: 40 }}>
              <div
                style={{
                  flex: 1,
                  opacity: interpolate(frame, [15, 30], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: "bold",
                    color: COLORS.textPrimary,
                    lineHeight: 1.3,
                    marginBottom: 16,
                  }}
                >
                  &#1492;&#1491;&#1512;&#1498; &#1513;&#1500;&#1498;
                  <br />
                  &#1500;&#1513;&#1493;&#1511; &#1492;&#1492;&#1493;&#1503;
                </div>
                <div style={{ fontSize: 16, color: COLORS.textMuted, marginBottom: 20 }}>
                  &#1499;&#1500; &#1492;&#1499;&#1500;&#1497;&#1501;
                  &#1493;&#1492;&#1502;&#1497;&#1491;&#1506;
                  &#1513;&#1514;&#1510;&#1496;&#1512;&#1499;&#1493;
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "10px 28px",
                    borderRadius: 8,
                    background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`,
                    color: COLORS.bgDeep,
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  &#1492;&#1514;&#1495;&#1497;&#1500;&#1493; &#1506;&#1499;&#1513;&#1497;&#1493;
                </div>
              </div>

              {/* Chart */}
              <div style={{ flex: 1, position: "relative" }}>
                <svg viewBox="0 0 400 220" width="100%" height="100%">
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 55 + 20}
                      x2="400"
                      y2={i * 55 + 20}
                      stroke="rgba(148, 163, 184, 0.08)"
                      strokeWidth="1"
                    />
                  ))}
                  <defs>
                    <linearGradient id="visionChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.green} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={COLORS.green} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 180 Q 50 170 100 140 T 200 90 T 300 50 T 400 15"
                    fill="none"
                    stroke={COLORS.green}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="600"
                    strokeDashoffset={600 * (1 - chartProgress)}
                  />
                  <path
                    d="M 0 180 Q 50 170 100 140 T 200 90 T 300 50 T 400 15 L 400 220 L 0 220 Z"
                    fill="url(#visionChartGrad)"
                    opacity={chartProgress * 0.5}
                  />
                </svg>
              </div>
            </div>

            {/* Highlight overlays */}
            {highlights.map((h, i) => {
              const hProg = spring({
                frame: Math.max(0, frame - h.delay),
                fps,
                config: SPRING_CONFIGS.snappy,
                durationInFrames: 20,
              });
              return (
                <div key={i}>
                  <div
                    style={{
                      position: "absolute",
                      left: h.x,
                      top: h.y,
                      width: h.w,
                      height: h.h,
                      border: `2px solid ${COLORS.gold}`,
                      borderRadius: 8,
                      opacity: hProg * 0.6,
                      boxShadow: `0 0 15px ${COLORS.gold}33`,
                      transform: `scale(${0.9 + hProg * 0.1})`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: h.x,
                      top: h.y - 22,
                      fontSize: 13,
                      color: COLORS.gold,
                      opacity: hProg,
                      fontWeight: "bold",
                      direction: "rtl",
                    }}
                  >
                    {h.label}
                  </div>
                </div>
              );
            })}
          </div>
        </PerspectiveBrowser>
      </AbsoluteFill>
    </SceneTransition>
  );
};
