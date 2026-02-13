import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../utils/colors";
import { HEBREW_STYLE } from "../../utils/fonts";
import { SPRING_CONFIGS } from "../../utils/timing";
import { KineticText } from "../shared/KineticText";
import { ParticleSystem } from "../shared/ParticleSystem";
import { SceneTransition } from "../shared/SceneTransition";
import { GlowPulse } from "../shared/GlowPulse";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scan line
  const scanX = interpolate(frame, [0, 30], [-200, 2100], {
    extrapolateRight: "clamp",
  });

  // "אחת" emphasis
  const emphasizeProg = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: SPRING_CONFIGS.bouncy,
    durationInFrames: 20,
  });
  const oneScale = 1 + emphasizeProg * 0.8;

  return (
    <SceneTransition type="blur">
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 100%)`,
          justifyContent: "center",
          alignItems: "center",
          ...HEBREW_STYLE,
        }}
      >
        <ParticleSystem
          count={25}
          mode="ambient"
          colors={[COLORS.gold, COLORS.cyan]}
        />

        <GlowPulse
          color={COLORS.gold}
          size={600}
          intensity={0.4}
          style={{ top: "30%", left: "50%", transform: "translate(-50%, -50%)" }}
        />

        {/* Scan line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: scanX,
            width: 3,
            height: "100%",
            background: `linear-gradient(180deg, transparent, ${COLORS.gold}88, transparent)`,
            boxShadow: `0 0 20px ${COLORS.gold}44`,
            opacity: frame < 30 ? 0.8 : 0,
          }}
        />

        {/* Line 1: "השוק הישראלי" */}
        <KineticText
          text="\u05D4\u05E9\u05D5\u05E7 \u05D4\u05D9\u05E9\u05E8\u05D0\u05DC\u05D9"
          mode="word"
          startFrame={15}
          staggerFrames={6}
          springConfig="dramatic"
          direction="up"
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: COLORS.gold,
            textShadow: `0 0 30px ${COLORS.gold}44`,
          }}
        />

        {/* Line 2: "חסר פלטפורמה" */}
        <KineticText
          text="\u05D7\u05E1\u05E8 \u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4"
          mode="word"
          startFrame={30}
          staggerFrames={6}
          springConfig="dramatic"
          direction="up"
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: COLORS.cyan,
            marginTop: 10,
            textShadow: `0 0 30px ${COLORS.cyan}44`,
          }}
        />

        {/* "אחת" with emphasis */}
        <div
          style={{
            marginTop: 10,
            opacity: frame >= 50 ? 1 : 0,
            transform: `scale(${frame >= 60 ? oneScale : 1})`,
            fontSize: 100,
            fontWeight: "bold",
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.green})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 ${30 * emphasizeProg}px ${COLORS.gold}66)`,
          }}
        >
          {frame >= 50 && (
            <KineticText
              text="\u05D0\u05D7\u05EA"
              mode="letter"
              startFrame={0}
              staggerFrames={3}
              springConfig="bouncy"
              direction="scale"
              style={{
                fontSize: 100,
                fontWeight: "bold",
              }}
            />
          )}
        </div>
      </AbsoluteFill>
    </SceneTransition>
  );
};
