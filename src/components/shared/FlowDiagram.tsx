import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SPRING_CONFIGS } from "../../utils/timing";
import { COLORS } from "../../utils/colors";
import { GlassmorphismCard } from "./GlassmorphismCard";

interface FlowNode {
  label: string;
  icon: string;
  x: number;
  y: number;
}

export const FlowDiagram: React.FC<{
  nodes: FlowNode[];
  centerNode?: FlowNode;
  startFrame?: number;
  width?: number;
  height?: number;
}> = ({
  nodes,
  centerNode,
  startFrame = 0,
  width = 900,
  height = 400,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = centerNode ? centerNode.x : width / 2;
  const cy = centerNode ? centerNode.y : height / 2;

  return (
    <div style={{ position: "relative", width, height }}>
      {/* SVG connection lines */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        {nodes.map((node, i) => {
          const lineDelay = startFrame + 10 + i * 6;
          const lineProg = spring({
            frame: Math.max(0, frame - lineDelay),
            fps,
            config: SPRING_CONFIGS.smooth,
            durationInFrames: 25,
          });
          const dx = node.x - cx;
          const dy = node.y - cy;
          const len = Math.sqrt(dx * dx + dy * dy);

          return (
            <React.Fragment key={`line-${i}`}>
              <line
                x1={cx}
                y1={cy}
                x2={cx + dx * lineProg}
                y2={cy + dy * lineProg}
                stroke={COLORS.gold}
                strokeWidth={2}
                opacity={0.4}
              />
              {/* Traveling dot */}
              {lineProg > 0.1 && (
                <circle
                  cx={cx + dx * lineProg}
                  cy={cy + dy * lineProg}
                  r={4}
                  fill={COLORS.gold}
                  opacity={0.8}
                >
                  <animate
                    attributeName="r"
                    values="3;5;3"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </React.Fragment>
          );
        })}
      </svg>

      {/* Center node */}
      {centerNode && (
        <div
          style={{
            position: "absolute",
            left: cx - 60,
            top: cy - 30,
          }}
        >
          <GlassmorphismCard
            width={120}
            entranceDelay={startFrame}
            entranceType="scaleIn"
            glowColor={COLORS.gold}
            style={{ padding: "12px 16px", textAlign: "center" }}
          >
            <div style={{ fontSize: 24 }}>{centerNode.icon}</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: COLORS.gold,
                marginTop: 4,
              }}
            >
              {centerNode.label}
            </div>
          </GlassmorphismCard>
        </div>
      )}

      {/* Outer nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: node.x - 70,
            top: node.y - 35,
          }}
        >
          <GlassmorphismCard
            width={140}
            entranceDelay={startFrame + 8 + i * 6}
            entranceType="slideUp"
            glowColor={COLORS.green}
            style={{ padding: "14px 12px", textAlign: "center" }}
          >
            <div style={{ fontSize: 28 }}>{node.icon}</div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textPrimary,
                marginTop: 6,
                direction: "rtl",
              }}
            >
              {node.label}
            </div>
          </GlassmorphismCard>
        </div>
      ))}
    </div>
  );
};
