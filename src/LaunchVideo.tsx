import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { IntroScene } from "./components/IntroScene";
import { LogoReveal } from "./components/LogoReveal";
import { FeaturesScene } from "./components/FeaturesScene";
import { WebsiteShowcase } from "./components/WebsiteShowcase";
import { CTAScene } from "./components/CTAScene";

export const LaunchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Series>
        <Series.Sequence durationInFrames={50}>
          <IntroScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <LogoReveal />
        </Series.Sequence>
        <Series.Sequence durationInFrames={80}>
          <FeaturesScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <WebsiteShowcase />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <CTAScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
