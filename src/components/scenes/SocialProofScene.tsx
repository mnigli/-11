import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../utils/colors";
import { HEBREW_STYLE } from "../../utils/fonts";
import { AnimatedCounter } from "../shared/AnimatedCounter";
import { GlassmorphismCard } from "../shared/GlassmorphismCard";
import { SceneTransition } from "../shared/SceneTransition";
import { GlowPulse } from "../shared/GlowPulse";
import { KineticText } from "../shared/KineticText";

export const SocialProofScene: React.FC = () => {
  return (
    <SceneTransition type="zoom">
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 100%)`,
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          ...HEBREW_STYLE,
        }}
      >
        <GlowPulse color={COLORS.green} size={600} intensity={0.3} />

        <KineticText
          text="\u05D4\u05DE\u05E1\u05E4\u05E8\u05D9\u05DD \u05DE\u05D3\u05D1\u05E8\u05D9\u05DD"
          mode="word"
          startFrame={0}
          staggerFrames={4}
          springConfig="snappy"
          direction="up"
          style={{
            fontSize: 48,
            fontWeight: "bold",
            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        />

        <div style={{ display: "flex", gap: 50 }}>
          <GlassmorphismCard
            width={300}
            entranceDelay={5}
            entranceType="slideUp"
            glowColor={COLORS.gold}
            style={{ textAlign: "center", padding: "35px 20px" }}
          >
            <AnimatedCounter
              targetValue={10}
              startFrame={10}
              suffix="K+"
              label="\u05E8\u05E9\u05D5\u05DE\u05D9\u05DD \u05DC\u05D2\u05E8\u05E1\u05EA \u05D1\u05D8\u05D0"
            />
          </GlassmorphismCard>

          <GlassmorphismCard
            width={300}
            entranceDelay={10}
            entranceType="slideUp"
            glowColor={COLORS.green}
            style={{ textAlign: "center", padding: "35px 20px" }}
          >
            <AnimatedCounter
              targetValue={48}
              startFrame={15}
              formatFn={(n) => (n / 10).toFixed(1)}
              suffix="/5"
              label="\u05D3\u05D9\u05E8\u05D5\u05D2 \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD"
            />
          </GlassmorphismCard>

          <GlassmorphismCard
            width={300}
            entranceDelay={15}
            entranceType="slideUp"
            glowColor={COLORS.cyan}
            style={{ textAlign: "center", padding: "35px 20px" }}
          >
            <AnimatedCounter
              targetValue={50}
              startFrame={20}
              suffix="+"
              label="\u05DB\u05DC\u05D9\u05DD \u05E4\u05D9\u05E0\u05E0\u05E1\u05D9\u05D9\u05DD"
            />
          </GlassmorphismCard>
        </div>
      </AbsoluteFill>
    </SceneTransition>
  );
};
