import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const features = [
  {
    icon: "📊",
    title: "מעקב הוצאות חכם",
    description: "ניתוח אוטומטי של כל ההוצאות וההכנסות שלך",
  },
  {
    icon: "🎯",
    title: "תקציב מותאם אישית",
    description: "הגדר יעדים וקבל התראות בזמן אמת",
  },
  {
    icon: "📈",
    title: "גרפים ותובנות",
    description: "ראה לאן הכסף הולך עם ויזואליזציות ברורות",
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry fade
  const entryOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit fade
  const exitOpacity = interpolate(frame, [120, 140], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Section title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: entryOpacity * exitOpacity,
        padding: 80,
      }}
    >
      {/* Section title */}
      <div
        style={{
          fontSize: 50,
          fontWeight: 700,
          color: "#e2e8f0",
          marginBottom: 60,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px)`,
          textAlign: "center",
        }}
      >
        למה{" "}
        <span style={{ color: "#a78bfa" }}>שקלון</span>?
      </div>

      {/* Feature cards */}
      <div
        style={{
          display: "flex",
          gap: 40,
          justifyContent: "center",
          width: "100%",
          flexDirection: "row-reverse",
        }}
      >
        {features.map((feature, i) => {
          const delay = 15 + i * 18;
          const cardSpring = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 12, mass: 0.6 },
          });

          const cardOpacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Hover-like glow effect
          const glowPhase = Math.sin((frame - delay) * 0.06 + i);
          const glowOpacity = interpolate(glowPhase, [-1, 1], [0.02, 0.08]);

          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: cardOpacity,
                transform: `translateY(${interpolate(cardSpring, [0, 1], [60, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.9, 1])})`,
                background: `linear-gradient(180deg, rgba(139, 92, 246, ${glowOpacity + 0.08}) 0%, rgba(30, 20, 60, 0.6) 100%)`,
                borderRadius: 24,
                padding: "48px 36px",
                textAlign: "center",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(139, 92, 246, 0.1)`,
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 20 }}>
                {feature.icon}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#e2e8f0",
                  marginBottom: 12,
                }}
              >
                {feature.title}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: "rgba(196, 181, 253, 0.7)",
                  lineHeight: 1.5,
                }}
              >
                {feature.description}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
