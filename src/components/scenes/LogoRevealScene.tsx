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
import { ParticleSystem } from "../shared/ParticleSystem";
import { SceneTransition } from "../shared/SceneTransition";
import { GlowPulse } from "../shared/GlowPulse";

export const LogoRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shekel symbol
  const shekelProg = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: SPRING_CONFIGS.bouncy,
    durationInFrames: 20,
  });

  // Line decoration
  const lineProg = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: SPRING_CONFIGS.smooth,
    durationInFrames: 25,
  });

  const glowPulse = 0.6 + 0.4 * Math.sin((frame / 25) * Math.PI * 2);

  return (
    <SceneTransition type="zoom">
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 100%)`,
          justifyContent: "center",
          alignItems: "center",
          ...HEBREW_STYLE,
        }}
      >
        <ParticleSystem
          count={35}
          mode="converge"
          colors={[COLORS.green, COLORS.cyan, COLORS.gold]}
          convergeX={960}
          convergeY={440}
        />

        <GlowPulse
          color={COLORS.green}
          size={700}
          intensity={0.5}
          pulseSpeed={40}
        />

        {/* Shekel symbol */}
        <div
          style={{
            fontSize: 100,
            color: COLORS.gold,
            opacity: shekelProg,
            transform: `scale(${shekelProg})`,
            textShadow: `0 0 40px ${COLORS.gold}66`,
            marginBottom: 10,
          }}
        >
          &#8362;
        </div>

        {/* Logo text - letter by letter */}
        <KineticText
          text="\u05E9\u05E7\u05DC\u05D5\u05DF"
          mode="letter"
          startFrame={20}
          staggerFrames={3}
          springConfig="bouncy"
          direction="scale"
          style={{
            fontSize: 130,
            fontWeight: "bold",
            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 ${25 * glowPulse}px ${COLORS.green}55)`,
          }}
        />

        {/* Decorative line */}
        <div
          style={{
            width: 280 * lineProg,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
            marginTop: 12,
            marginBottom: 20,
          }}
        />

        {/* Tagline */}
        <KineticText
          text="\u05E9\u05E7\u05DC \u05D5\u05D7\u05E9\u05D1\u05D5\u05DF \u2014 \u05D4\u05D3\u05E8\u05DA \u05DC\u05E9\u05D5\u05E7 \u05D4\u05D4\u05D5\u05DF"
          mode="word"
          startFrame={50}
          staggerFrames={4}
          springConfig="smooth"
          direction="up"
          style={{
            fontSize: 36,
            color: COLORS.textSecondary,
          }}
        />
      </AbsoluteFill>
    </SceneTransition>
  );
};
