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
import { KineticText } from "../shared/KineticText";
import { GlassmorphismCard } from "../shared/GlassmorphismCard";
import { SceneTransition } from "../shared/SceneTransition";
import { GlowPulse } from "../shared/GlowPulse";

const features = [
  { icon: "\uD83D\uDCF0", title: "\u05D7\u05D3\u05E9\u05D5\u05EA \u05E9\u05D5\u05E7" },
  { icon: "\uD83D\uDCC9", title: "\u05E0\u05D9\u05EA\u05D5\u05D7 \u05D8\u05DB\u05E0\u05D9" },
  { icon: "\uD83E\uDDEE", title: "\u05DE\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05DD" },
  { icon: "\uD83D\uDCDA", title: "\u05DE\u05D3\u05E8\u05D9\u05DB\u05D9\u05DD" },
  { icon: "\uD83D\uDCBC", title: "\u05DE\u05E2\u05E7\u05D1 \u05EA\u05D9\u05E7\u05D9\u05DD" },
  { icon: "\uD83D\uDD14", title: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA" },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Center hub
  const hubProg = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: SPRING_CONFIGS.bouncy,
    durationInFrames: 25,
  });

  // Card positions in 2x3 grid
  const positions = [
    { x: 260, y: 240 },
    { x: 660, y: 240 },
    { x: 1060, y: 240 },
    { x: 260, y: 520 },
    { x: 660, y: 520 },
    { x: 1060, y: 520 },
  ];

  const hubX = 660;
  const hubY = 400;

  return (
    <SceneTransition type="fade">
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 100%)`,
          ...HEBREW_STYLE,
        }}
      >
        <GlowPulse
          color={COLORS.cyan}
          size={700}
          intensity={0.25}
          style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
        />

        {/* Title */}
        <div style={{ position: "absolute", top: 60, width: "100%", textAlign: "center" }}>
          <KineticText
            text="\u05D4\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4 \u05D4\u05DE\u05DC\u05D0\u05D4"
            mode="word"
            startFrame={0}
            staggerFrames={5}
            springConfig="smooth"
            direction="up"
            style={{
              fontSize: 56,
              fontWeight: "bold",
              background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          />
        </div>

        {/* Connection lines SVG */}
        <svg
          viewBox="0 0 1920 1080"
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {positions.map((pos, i) => {
            const lineDelay = 70 + i * 5;
            const lineProg = spring({
              frame: Math.max(0, frame - lineDelay),
              fps,
              config: SPRING_CONFIGS.smooth,
              durationInFrames: 20,
            });
            return (
              <line
                key={i}
                x1={hubX}
                y1={hubY}
                x2={hubX + (pos.x - hubX) * lineProg}
                y2={hubY + (pos.y - hubY) * lineProg}
                stroke={COLORS.green}
                strokeWidth={1.5}
                opacity={lineProg * 0.4}
                strokeDasharray="6 4"
              />
            );
          })}
        </svg>

        {/* Feature cards */}
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: positions[i].x - 120,
              top: positions[i].y - 65,
            }}
          >
            <GlassmorphismCard
              width={240}
              entranceDelay={10 + i * 8}
              entranceType="flip3d"
              glowColor={i % 2 === 0 ? COLORS.green : COLORS.cyan}
              style={{ textAlign: "center", padding: "24px 16px" }}
            >
              <div style={{ fontSize: 44, marginBottom: 10 }}>{f.icon}</div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: COLORS.textPrimary,
                }}
              >
                {f.title}
              </div>
            </GlassmorphismCard>
          </div>
        ))}

        {/* Center hub */}
        <div
          style={{
            position: "absolute",
            left: hubX - 55,
            top: hubY - 25,
            opacity: hubProg,
            transform: `scale(${hubProg})`,
          }}
        >
          <div
            style={{
              width: 110,
              height: 50,
              borderRadius: 25,
              background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: COLORS.bgDeep,
              boxShadow: `0 0 30px ${COLORS.green}44`,
            }}
          >
            &#1513;&#1511;&#1500;&#1493;&#1503;
          </div>
        </div>
      </AbsoluteFill>
    </SceneTransition>
  );
};
