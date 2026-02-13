import React from "react";
import { useCurrentFrame } from "remotion";

export const GlowPulse: React.FC<{
  color: string;
  size?: number;
  pulseSpeed?: number;
  intensity?: number;
  style?: React.CSSProperties;
}> = ({ color, size = 500, pulseSpeed = 60, intensity = 0.8, style }) => {
  const frame = useCurrentFrame();
  const pulse = 0.6 + 0.4 * Math.sin((frame / pulseSpeed) * Math.PI * 2);
  const scaleOsc = 1 + 0.05 * Math.sin((frame / pulseSpeed) * Math.PI * 2);

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}33 0%, ${color}11 40%, transparent 70%)`,
        opacity: intensity * pulse,
        transform: `scale(${scaleOsc})`,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
};
