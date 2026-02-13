import React from "react";
import { Composition } from "remotion";
import { LaunchVideo } from "./LaunchVideo";
import { TOTAL_FRAMES, FPS } from "./utils/timing";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LaunchVideo"
      component={LaunchVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
