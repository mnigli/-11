import React from "react";
import { useCurrentFrame, random, interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_CONFIGS } from "../../utils/timing";

type ParticleMode = "ambient" | "burst" | "converge";

export const ParticleSystem: React.FC<{
  count?: number;
  mode?: ParticleMode;
  burstFrame?: number;
  colors?: string[];
  area?: { width: number; height: number };
  convergeX?: number;
  convergeY?: number;
  style?: React.CSSProperties;
}> = ({
  count = 30,
  mode = "ambient",
  burstFrame = 0,
  colors = ["#4ade80", "#22d3ee", "#fbbf24"],
  area = { width: 1920, height: 1080 },
  convergeX = 960,
  convergeY = 540,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const globalOpacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: globalOpacity,
        ...style,
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const seed = `p-${i}`;
        const startX = random(seed + "-x") * area.width;
        const startY = random(seed + "-y") * area.height;
        const vx = (random(seed + "-vx") - 0.5) * 2;
        const vy = (random(seed + "-vy") - 0.5) * 1.5;
        const size = 2 + random(seed + "-s") * 4;
        const color = colors[Math.floor(random(seed + "-c") * colors.length)];
        const delay = Math.floor(random(seed + "-d") * 15);

        let x: number, y: number, opacity: number;

        if (mode === "ambient") {
          const wobble = Math.sin((frame * 0.03) + i * 1.7) * 20;
          x = startX + vx * frame + wobble;
          y = startY + vy * frame;
          opacity = 0.3 + 0.3 * Math.sin((frame * 0.05) + i);
        } else if (mode === "burst") {
          const burstF = Math.max(0, frame - burstFrame);
          const angle = (i / count) * Math.PI * 2;
          const speed = 3 + random(seed + "-sp") * 8;
          const prog = spring({
            frame: burstF,
            fps,
            config: SPRING_CONFIGS.dramatic,
            durationInFrames: 40,
          });
          const dist = prog * speed * 30;
          x = area.width / 2 + Math.cos(angle) * dist;
          y = area.height / 2 + Math.sin(angle) * dist;
          opacity = interpolate(burstF, [0, 5, 30, 45], [0, 1, 0.8, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
        } else {
          // converge
          const prog = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: SPRING_CONFIGS.smooth,
            durationInFrames: 35,
          });
          x = startX + (convergeX - startX) * prog;
          y = startY + (convergeY - startY) * prog;
          opacity = interpolate(prog, [0, 0.3, 0.9, 1], [0.4, 0.8, 0.8, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
        }

        const trails = mode === "ambient" ? 3 : mode === "burst" ? 4 : 2;

        return (
          <React.Fragment key={i}>
            {Array.from({ length: trails }).map((_, t) => {
              const trailX = mode === "ambient"
                ? x - vx * t * 3
                : mode === "burst"
                ? x * (1 - t * 0.04)
                : x;
              const trailY = mode === "ambient"
                ? y - vy * t * 3
                : mode === "burst"
                ? y * (1 - t * 0.04)
                : y;
              return (
                <div
                  key={t}
                  style={{
                    position: "absolute",
                    left: trailX,
                    top: trailY,
                    width: size * (1 - t * 0.2),
                    height: size * (1 - t * 0.2),
                    borderRadius: "50%",
                    backgroundColor: color,
                    opacity: opacity * (1 - t * 0.3),
                    boxShadow: t === 0 ? `0 0 ${size * 2}px ${color}` : undefined,
                  }}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};
