import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SPRING_CONFIGS } from "../../utils/timing";
import { COLORS } from "../../utils/colors";

export const AnimatedChart: React.FC<{
  type: "bar" | "line" | "pie";
  data: number[];
  startFrame?: number;
  width?: number;
  height?: number;
  barColors?: string[];
  labels?: string[];
}> = ({
  type,
  data,
  startFrame = 0,
  width = 500,
  height = 300,
  barColors,
  labels,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const maxVal = Math.max(...data);

  if (type === "bar") {
    const barWidth = (width - (data.length + 1) * 12) / data.length;
    return (
      <svg viewBox={`0 0 ${width} ${height + 40}`} width={width} height={height + 40}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((pct, i) => (
          <line
            key={i}
            x1={0}
            y1={height * (1 - pct)}
            x2={width}
            y2={height * (1 - pct)}
            stroke="rgba(148, 163, 184, 0.1)"
            strokeWidth={1}
          />
        ))}
        {data.map((val, i) => {
          const delay = startFrame + i * 5;
          const prog = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: SPRING_CONFIGS.bouncy,
            durationInFrames: 25,
          });
          const barH = (val / maxVal) * height * 0.85 * prog;
          const x = 12 + i * (barWidth + 12);
          const y = height - barH;
          const color = barColors
            ? barColors[i % barColors.length]
            : i % 2 === 0
            ? COLORS.green
            : COLORS.cyan;

          return (
            <React.Fragment key={i}>
              <defs>
                <linearGradient id={`bar-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={4}
                fill={`url(#bar-${i})`}
              />
              {labels && labels[i] && (
                <text
                  x={x + barWidth / 2}
                  y={height + 24}
                  textAnchor="middle"
                  fill={COLORS.textMuted}
                  fontSize={12}
                  opacity={prog}
                >
                  {labels[i]}
                </text>
              )}
            </React.Fragment>
          );
        })}
      </svg>
    );
  }

  if (type === "line") {
    const padding = 20;
    const stepX = (width - padding * 2) / (data.length - 1);
    const overallProg = interpolate(frame - startFrame, [0, 40], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const points = data.map((val, i) => ({
      x: padding + i * stepX,
      y: height - padding - (val / maxVal) * (height - padding * 2),
    }));

    const pathD = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
    const totalLen = 1200;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        {[0.25, 0.5, 0.75].map((pct, i) => (
          <line
            key={i}
            x1={padding}
            y1={height * (1 - pct)}
            x2={width - padding}
            y2={height * (1 - pct)}
            stroke="rgba(148, 163, 184, 0.08)"
            strokeWidth={1}
          />
        ))}
        <defs>
          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.green} stopOpacity={0.3} />
            <stop offset="100%" stopColor={COLORS.green} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#lineAreaGrad)" opacity={overallProg} />
        <path
          d={pathD}
          fill="none"
          stroke={COLORS.green}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={totalLen}
          strokeDashoffset={totalLen * (1 - overallProg)}
        />
        {points.map((p, i) => {
          const dotProg = interpolate(
            frame - startFrame,
            [10 + i * 5, 15 + i * 5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={5 * dotProg}
              fill={COLORS.green}
              opacity={dotProg}
            />
          );
        })}
      </svg>
    );
  }

  // pie
  const total = data.reduce((a, b) => a + b, 0);
  const r = Math.min(width, height) / 2 - 20;
  const cx = width / 2;
  const cy = height / 2;
  const circumference = 2 * Math.PI * r;
  let accumulated = 0;
  const pieColors = barColors || [COLORS.green, COLORS.cyan, COLORS.gold, COLORS.goldDark, "#a78bfa"];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {data.map((val, i) => {
        const segLen = (val / total) * circumference;
        const delay = startFrame + i * 8;
        const prog = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: SPRING_CONFIGS.smooth,
          durationInFrames: 30,
        });
        const offset = accumulated;
        accumulated += segLen;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={pieColors[i % pieColors.length]}
            strokeWidth={40}
            strokeDasharray={`${segLen * prog} ${circumference - segLen * prog}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            opacity={0.85}
          />
        );
      })}
    </svg>
  );
};
