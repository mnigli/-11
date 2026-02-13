import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_CONFIGS } from "../../utils/timing";

export const KineticText: React.FC<{
  text: string;
  mode?: "letter" | "word";
  startFrame?: number;
  staggerFrames?: number;
  style?: React.CSSProperties;
  direction?: "up" | "down" | "scale" | "fade";
  springConfig?: keyof typeof SPRING_CONFIGS;
}> = ({
  text,
  mode = "word",
  startFrame = 0,
  staggerFrames,
  style,
  direction = "up",
  springConfig = "snappy",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stagger = staggerFrames ?? (mode === "letter" ? 2 : 5);
  const units = mode === "letter" ? text.split("") : text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: mode === "word" ? 16 : 0,
        direction: "rtl",
        ...style,
      }}
    >
      {units.map((unit, i) => {
        const unitFrame = frame - startFrame - i * stagger;
        const progress = spring({
          frame: Math.max(0, unitFrame),
          fps,
          config: SPRING_CONFIGS[springConfig],
          durationInFrames: 20,
        });
        const isActive = unitFrame >= 0;

        let transform = "";
        let opacity = isActive ? progress : 0;

        if (direction === "up") {
          transform = `translateY(${(1 - progress) * 40}px)`;
        } else if (direction === "down") {
          transform = `translateY(${(1 - progress) * -40}px)`;
        } else if (direction === "scale") {
          transform = `scale(${0.3 + progress * 0.7})`;
        } else {
          // fade only
          transform = "";
        }

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              transform,
              whiteSpace: mode === "letter" ? "pre" : undefined,
            }}
          >
            {unit}
          </span>
        );
      })}
    </div>
  );
};
