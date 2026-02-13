import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { HookScene } from "./components/scenes/HookScene";
import { LogoRevealScene } from "./components/scenes/LogoRevealScene";
import { VisionScene } from "./components/scenes/VisionScene";
import { MarketScene } from "./components/scenes/MarketScene";
import { FeaturesScene } from "./components/scenes/FeaturesScene";
import { RevenueScene } from "./components/scenes/RevenueScene";
import { SocialProofScene } from "./components/scenes/SocialProofScene";
import { CTAScene } from "./components/scenes/CTAScene";
import { SCENE_FRAMES } from "./utils/timing";

export const LaunchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Series>
        <Series.Sequence durationInFrames={SCENE_FRAMES.hook}>
          <HookScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.logoReveal}>
          <LogoRevealScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.vision}>
          <VisionScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.market}>
          <MarketScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.features}>
          <FeaturesScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.revenue}>
          <RevenueScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.socialProof}>
          <SocialProofScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.cta}>
          <CTAScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
