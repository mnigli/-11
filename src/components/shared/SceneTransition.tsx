import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TRANSITION_FRAMES } from "../../utils/timing";

export const SceneTransition: React.FC<{
  type?: "fade" | "wipeRight" | "wipeUp" | "zoom" | "blur";
  durationFrames?: number;
  children: React.ReactNode;
}> = ({ type = "fade", durationFrames = TRANSITION_FRAMES, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const exitStart = durationInFrames - durationFrames;

  const enterProgress = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitProgress = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const progress = Math.min(enterProgress, exitProgress);

  let style: React.CSSProperties = {};

  switch (type) {
    case "fade":
      style = { opacity: progress };
      break;
    case "wipeRight":
      style = {
        clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
      };
      break;
    case "wipeUp":
      style = {
        clipPath: `inset(${(1 - progress) * 100}% 0 0 0)`,
      };
      break;
    case "zoom":
      style = {
        opacity: progress,
        transform: `scale(${0.8 + progress * 0.2})`,
      };
      break;
    case "blur":
      style = {
        opacity: progress,
        filter: `blur(${(1 - progress) * 10}px)`,
      };
      break;
  }

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};
