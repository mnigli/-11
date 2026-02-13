import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../utils/colors";
import { HEBREW_STYLE } from "../../utils/fonts";
import { KineticText } from "../shared/KineticText";
import { FlowDiagram } from "../shared/FlowDiagram";
import { SceneTransition } from "../shared/SceneTransition";
import { GlowPulse } from "../shared/GlowPulse";

export const RevenueScene: React.FC = () => {
  const nodes = [
    { label: "\u05E4\u05E8\u05D9\u05DE\u05D9\u05D5\u05DD", icon: "\u2B50", x: 200, y: 120 },
    { label: "\u05E4\u05E8\u05E1\u05D5\u05DD", icon: "\uD83D\uDCE2", x: 700, y: 120 },
    { label: "\u05E9\u05D5\u05EA\u05E4\u05D5\u05D9\u05D5\u05EA", icon: "\uD83E\uDD1D", x: 200, y: 320 },
    { label: "\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD", icon: "\uD83D\uDCCA", x: 700, y: 320 },
  ];

  const centerNode = {
    label: "\u05E9\u05E7\u05DC\u05D5\u05DF",
    icon: "\u20AA",
    x: 450,
    y: 220,
  };

  return (
    <SceneTransition type="fade">
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 100%)`,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 60,
          ...HEBREW_STYLE,
        }}
      >
        <GlowPulse
          color={COLORS.gold}
          size={600}
          intensity={0.3}
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />

        {/* Title */}
        <KineticText
          text="\u05DE\u05D5\u05D3\u05DC \u05D4\u05DB\u05E0\u05E1\u05D5\u05EA"
          mode="word"
          startFrame={0}
          staggerFrames={5}
          springConfig="smooth"
          direction="up"
          style={{
            fontSize: 52,
            fontWeight: "bold",
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 40,
          }}
        />

        {/* Flow diagram */}
        <FlowDiagram
          nodes={nodes}
          centerNode={centerNode}
          startFrame={10}
          width={900}
          height={440}
        />
      </AbsoluteFill>
    </SceneTransition>
  );
};
