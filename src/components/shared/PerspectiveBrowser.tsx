import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SPRING_CONFIGS } from "../../utils/timing";

export const PerspectiveBrowser: React.FC<{
  startFrame?: number;
  children: React.ReactNode;
  width?: number;
  height?: number;
}> = ({ startFrame = 0, children, width = 1100, height = 650 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const prog = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: SPRING_CONFIGS.smooth,
    durationInFrames: 35,
  });

  const rotateY = (1 - prog) * 18;
  const rotateX = (1 - prog) * 4;
  const scale = 0.75 + prog * 0.25;
  const translateY = (1 - prog) * 100;
  const opacity = interpolate(frame - startFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ perspective: 1200 }}>
      <div
        style={{
          width,
          height,
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid rgba(74, 222, 128, 0.25)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(74, 222, 128, 0.08)",
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
          opacity,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            height: 40,
            background: "#1a1f35",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 7,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                backgroundColor: c,
              }}
            />
          ))}
          <div
            style={{
              marginLeft: 16,
              flex: 1,
              height: 26,
              borderRadius: 6,
              backgroundColor: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#64748b",
            }}
          >
            shkalon.co.il
          </div>
        </div>
        {/* Content */}
        <div
          style={{
            height: height - 40,
            background: "linear-gradient(180deg, #0c1220 0%, #0a0f1e 100%)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>

      {/* Reflection */}
      <div
        style={{
          width,
          height: 60,
          background:
            "linear-gradient(180deg, rgba(74, 222, 128, 0.03), transparent)",
          opacity: prog * 0.4,
          transform: "scaleY(-1)",
          marginTop: -2,
          borderRadius: "0 0 14px 14px",
        }}
      />
    </div>
  );
};
