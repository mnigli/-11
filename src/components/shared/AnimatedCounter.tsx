import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { SPRING_CONFIGS } from "../../utils/timing";

export const AnimatedCounter: React.FC<{
  targetValue: number;
  startFrame?: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: string;
  formatFn?: (n: number) => string;
}> = ({
  targetValue,
  startFrame = 0,
  durationFrames = 30,
  prefix = "",
  suffix = "",
  style,
  labelStyle,
  label,
  formatFn,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: SPRING_CONFIGS.dramatic,
    durationInFrames: durationFrames,
  });

  const currentValue = Math.round(progress * targetValue);
  const displayValue = formatFn
    ? formatFn(currentValue)
    : currentValue.toLocaleString();

  const settled = frame - startFrame > durationFrames;
  const glowScale = settled
    ? 1 + 0.02 * Math.sin(((frame - startFrame) / 20) * Math.PI * 2)
    : interpolate(progress, [0.8, 1], [1, 1.05], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const opacity = interpolate(frame - startFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        textAlign: "center",
        opacity,
        transform: `scale(${glowScale})`,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: "bold",
          background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          direction: "ltr",
        }}
      >
        {prefix}
        {displayValue}
        {suffix}
      </div>
      {label && (
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            marginTop: 8,
            direction: "rtl",
            ...labelStyle,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
