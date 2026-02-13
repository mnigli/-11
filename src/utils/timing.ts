import { SpringConfig } from "remotion";

export const SPRING_CONFIGS = {
  snappy: { damping: 15, mass: 0.5, stiffness: 200 } as SpringConfig,
  smooth: { damping: 20, mass: 1, stiffness: 120 } as SpringConfig,
  bouncy: { damping: 10, mass: 0.8, stiffness: 180 } as SpringConfig,
  dramatic: { damping: 12, mass: 1.5, stiffness: 100 } as SpringConfig,
};

export const SCENE_FRAMES = {
  hook: 105,
  logoReveal: 105,
  vision: 165,
  market: 165,
  features: 150,
  revenue: 75,
  socialProof: 60,
  cta: 75,
};

export const TOTAL_FRAMES = Object.values(SCENE_FRAMES).reduce(
  (a, b) => a + b,
  0
);

export const FPS = 30;
export const TRANSITION_FRAMES = 15;
