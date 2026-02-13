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

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = 0.5 + 0.5 * Math.sin((frame / 20) * Math.PI * 2);

  // Logo final
  const logoProg = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: SPRING_CONFIGS.bouncy,
    durationInFrames: 20,
  });

  const contactOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contactY = interpolate(frame, [30, 45], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneTransition type="fade" durationFrames={10}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 100%)`,
          justifyContent: "center",
          alignItems: "center",
          ...HEBREW_STYLE,
        }}
      >
        <ParticleSystem
          count={40}
          mode="burst"
          burstFrame={0}
          colors={[COLORS.gold, COLORS.green, COLORS.cyan]}
        />

        <GlowPulse
          color={COLORS.gold}
          size={700}
          intensity={0.6}
          pulseSpeed={30}
        />
        <GlowPulse
          color={COLORS.green}
          size={500}
          intensity={0.4}
          pulseSpeed={40}
        />

        {/* Radiating rings */}
        {[1, 2, 3].map((i) => {
          const ringProg = spring({
            frame: Math.max(0, frame - i * 5),
            fps,
            config: SPRING_CONFIGS.dramatic,
            durationInFrames: 40,
          });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 400,
                height: 400,
                borderRadius: "50%",
                border: `1px solid ${COLORS.gold}`,
                opacity: (1 - i * 0.25) * ringProg * 0.3,
                transform: `scale(${ringProg * (0.8 + i * 0.4)})`,
              }}
            />
          );
        })}

        {/* Main CTA text */}
        <KineticText
          text="\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05DC\u05DE\u05D4\u05E4\u05DB\u05D4 \u05D4\u05E4\u05D9\u05E0\u05E0\u05E1\u05D9\u05EA"
          mode="word"
          startFrame={5}
          staggerFrames={4}
          springConfig="dramatic"
          direction="up"
          style={{
            fontSize: 68,
            fontWeight: "bold",
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.green})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 ${20 * glowPulse}px ${COLORS.gold}44)`,
            marginBottom: 30,
          }}
        />

        {/* Contact info */}
        <div
          style={{
            opacity: contactOpacity,
            transform: `translateY(${contactY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: COLORS.textSecondary,
              marginBottom: 20,
              letterSpacing: 2,
            }}
          >
            shkalon.co.il
          </div>
        </div>

        {/* Final logo */}
        <div
          style={{
            opacity: logoProg,
            transform: `scale(${logoProg})`,
            fontSize: 44,
            fontWeight: "bold",
            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 ${15 * glowPulse}px ${COLORS.green}55)`,
          }}
        >
          &#1513;&#1511;&#1500;&#1493;&#1503;
        </div>
      </AbsoluteFill>
    </SceneTransition>
  );
};
