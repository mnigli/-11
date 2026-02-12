import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { IntroScene } from "./IntroScene";
import { FeaturesScene } from "./FeaturesScene";
import { CtaScene } from "./CtaScene";

export const LaunchVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1628 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        direction: "rtl",
      }}
    >
      {/* Animated background particles */}
      <BackgroundParticles frame={frame} />

      {/* Scene 1: Logo + Tagline intro (0-100 frames = ~3.3s) */}
      <Sequence from={0} durationInFrames={100}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Features showcase (80-220 frames = ~4.7s) */}
      <Sequence from={80} durationInFrames={140}>
        <FeaturesScene />
      </Sequence>

      {/* Scene 3: CTA / closing (200-300 frames = ~3.3s) */}
      <Sequence from={200} durationInFrames={100}>
        <CtaScene />
      </Sequence>
    </AbsoluteFill>
  );
};

const BackgroundParticles: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 73.7) % 100,
    size: 2 + (i % 4) * 2,
    speed: 0.3 + (i % 5) * 0.15,
    opacity: 0.05 + (i % 3) * 0.05,
  }));

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {particles.map((p, i) => {
        const y = (p.y + frame * p.speed * 0.3) % 120 - 10;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(147, 130, 255, ${p.opacity})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
