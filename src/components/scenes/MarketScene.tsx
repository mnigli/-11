import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../utils/colors";
import { HEBREW_STYLE } from "../../utils/fonts";
import { KineticText } from "../shared/KineticText";
import { AnimatedCounter } from "../shared/AnimatedCounter";
import { AnimatedChart } from "../shared/AnimatedChart";
import { GlassmorphismCard } from "../shared/GlassmorphismCard";
import { SceneTransition } from "../shared/SceneTransition";
import { GlowPulse } from "../shared/GlowPulse";

export const MarketScene: React.FC = () => {
  return (
    <SceneTransition type="fade">
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 100%)`,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 80,
          ...HEBREW_STYLE,
        }}
      >
        <GlowPulse
          color={COLORS.gold}
          size={800}
          intensity={0.3}
          style={{ top: "20%", left: "50%", transform: "translate(-50%, -50%)" }}
        />

        {/* Title */}
        <KineticText
          text="\u05D4\u05D6\u05D3\u05DE\u05E0\u05D5\u05EA \u05E9\u05D5\u05E7"
          mode="word"
          startFrame={0}
          staggerFrames={5}
          springConfig="dramatic"
          direction="up"
          style={{
            fontSize: 60,
            fontWeight: "bold",
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 50,
          }}
        />

        {/* Counter cards */}
        <div style={{ display: "flex", gap: 40, marginBottom: 50 }}>
          <GlassmorphismCard
            width={300}
            entranceDelay={15}
            entranceType="scaleIn"
            glowColor={COLORS.gold}
            style={{ textAlign: "center", padding: "30px 20px" }}
          >
            <AnimatedCounter
              targetValue={2}
              startFrame={20}
              prefix=""
              suffix="M+"
              label="\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05E4\u05D5\u05D8\u05E0\u05E6\u05D9\u05D0\u05DC\u05D9\u05D9\u05DD"
            />
          </GlassmorphismCard>

          <GlassmorphismCard
            width={300}
            entranceDelay={25}
            entranceType="scaleIn"
            glowColor={COLORS.green}
            style={{ textAlign: "center", padding: "30px 20px" }}
          >
            <AnimatedCounter
              targetValue={50}
              startFrame={30}
              prefix="₪"
              suffix="B+"
              label="\u05E9\u05D5\u05E7 \u05D4\u05D4\u05D5\u05DF \u05D4\u05D9\u05E9\u05E8\u05D0\u05DC\u05D9"
            />
          </GlassmorphismCard>

          <GlassmorphismCard
            width={300}
            entranceDelay={35}
            entranceType="scaleIn"
            glowColor={COLORS.cyan}
            style={{ textAlign: "center", padding: "30px 20px" }}
          >
            <AnimatedCounter
              targetValue={85}
              startFrame={40}
              suffix="%"
              label="\u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9"
            />
          </GlassmorphismCard>
        </div>

        {/* Market chart */}
        <div style={{ display: "flex", gap: 50, alignItems: "flex-end" }}>
          <AnimatedChart
            type="bar"
            data={[65, 45, 80, 55, 90]}
            startFrame={50}
            width={450}
            height={250}
            barColors={[COLORS.green, COLORS.cyan, COLORS.gold, COLORS.green, COLORS.cyan]}
            labels={[
              "\u05DE\u05E0\u05D9\u05D5\u05EA",
              "\u05D0\u05D2\"\u05D7",
              "\u05EA\u05E2\u05D5\u05D3\u05D5\u05EA",
              "\u05E7\u05E8\u05E0\u05D5\u05EA",
              "\u05E7\u05E8\u05D9\u05E4\u05D8\u05D5",
            ]}
          />
          <AnimatedChart
            type="line"
            data={[20, 35, 30, 55, 70, 65, 90, 95]}
            startFrame={70}
            width={450}
            height={250}
          />
        </div>
      </AbsoluteFill>
    </SceneTransition>
  );
};
