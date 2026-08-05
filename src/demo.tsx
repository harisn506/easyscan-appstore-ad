import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Chapter, KineticWords, LightStage, Stage } from "./helpers";
import { AppIcon } from "./ui";
import { COLORS, FONT_BODY } from "./theme";

// ——— Demo-UI scene system (Apple-style): headline on top, one floating
// simplified product panel below, continuous choreographed motion inside. ———

export const INK = "#16211B"; // headline ink on light stages

// Stage that flips light/dark
export const DemoStage: React.FC<{
  dark?: boolean;
  children: React.ReactNode;
}> = ({ dark, children }) =>
  dark ? (
    <Stage glow={0.65}>{children}</Stage>
  ) : (
    <LightStage>{children}</LightStage>
  );

// Headline block pinned near the top. Persists for the whole scene.
export const SceneHead: React.FC<{
  chapter?: { n: string; label: string };
  words: { text: string; color?: string }[];
  dark?: boolean;
  fontSize?: number;
}> = ({ chapter, words, dark, fontSize = 78 }) => (
  <div
    style={{
      position: "absolute",
      top: 74,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      zIndex: 20,
    }}
  >
    {chapter && <Chapter n={chapter.n} label={chapter.label} dark={dark} />}
    <KineticWords
      words={words}
      fontSize={fontSize}
      maxWidth={1700}
      baseColor={dark ? COLORS.white : INK}
    />
  </div>
);

// Floating panel: springs up with a 3D settle, then never sits still —
// slow push-in + gentle float for the rest of the scene.
export const Float: React.FC<{
  children: React.ReactNode;
  from?: number;
  width?: number;
  top?: number;
  push?: number; // extra scale gained over the scene
  tilt?: number; // initial rotateX degrees
}> = ({ children, from = 6, width, top = 250, push = 0.045, tilt = 14 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const s = spring({
    frame: frame - from,
    fps,
    config: { damping: 21, stiffness: 110, mass: 0.9 },
  });
  const drift = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });
  const floatY = Math.sin(frame / 34) * 3 + Math.cos(frame / 21) * 1.6;
  const floatR = Math.sin(frame / 55) * 0.35;
  // 3D tilt only while settling: perspective/rotateX force GPU compositing,
  // which rasterizes text once and stretches it — under a continuous scale
  // that reads as the text "pulling focus". Steady state stays strictly 2D
  // so Chrome re-rasterizes text sharp at every scale.
  const settling = 1 - s > 0.004;
  const threeD = settling
    ? `perspective(1800px) rotateX(${tilt * (1 - s)}deg) rotateY(${-9 * (1 - s)}deg) `
    : "";
  return (
    <AbsoluteFill style={{ alignItems: "center", zIndex: 10 }}>
      <div
        style={{
          position: "absolute",
          top,
          width,
          transform: `${threeD}translateY(${(1 - s) * 90 + floatY}px) rotateZ(${
            floatR * s
          }deg) scale(${(0.96 + s * 0.04) * (1 + push * drift)})`,
          opacity: Math.min(s * 1.5, 1),
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Slim EasyScan panel: white app surface with the real page-header chrome
// (green app icon › page title · badge · actions), decluttered like an ad.
export const Panel: React.FC<{
  title: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  width?: number;
  children: React.ReactNode;
}> = ({ title, badge, actions, width = 1360, children }) => (
  <div
    style={{
      width,
      borderRadius: 18,
      backgroundColor: "#F6F6F7",
      border: "1px solid #E1E3E5",
      boxShadow:
        "0 60px 140px rgba(10,30,22,0.35), 0 14px 40px rgba(10,30,22,0.18)",
      overflow: "hidden",
      fontFamily: FONT_BODY,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "18px 28px",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E1E3E5",
      }}
    >
      <AppIcon size={34} />
      <span style={{ color: "#8C9196", fontSize: 22 }}>›</span>
      <div style={{ fontSize: 30, fontWeight: 700, color: "#202223" }}>
        {title}
      </div>
      {badge}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        {actions}
      </div>
    </div>
    <div style={{ padding: 26 }}>{children}</div>
  </div>
);

// Character-by-character typed text
export const TypeIn: React.FC<{
  text: string;
  from: number;
  speed?: number; // frames per char
  caret?: boolean;
}> = ({ text, from, speed = 2, caret = true }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.floor((frame - from) / speed));
  const shown = text.slice(0, n);
  const typing = n > 0 && n < text.length;
  return (
    <>
      {shown}
      {caret && typing && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            backgroundColor: "#202223",
            verticalAlign: "text-bottom",
          }}
        />
      )}
    </>
  );
};

// Quick green flash to confirm an action (scan, save, pick)
export const Flash: React.FC<{ at: number; color?: string }> = ({
  at,
  color = "#00A67C",
}) => {
  const frame = useCurrentFrame();
  if (frame < at || frame > at + 16) return null;
  const o = interpolate(frame, [at, at + 3, at + 16], [0, 0.35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        backgroundColor: color,
        opacity: o,
        pointerEvents: "none",
      }}
    />
  );
};

// Animated number that counts from → to
export const Count: React.FC<{
  from: number;
  a?: number;
  b: number;
  dur?: number;
}> = ({ from, a = 0, b, dur = 18 }) => {
  const frame = useCurrentFrame();
  const v = Math.round(
    interpolate(frame, [from, from + dur], [a, b], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: undefined,
    }),
  );
  return <>{v}</>;
};

// Bottom caption pill (dark, works on both stages)
export const DemoCaption: React.FC<{
  children: React.ReactNode;
  from: number;
}> = ({ children, from }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - from,
    fps,
    config: { damping: 16, stiffness: 140 },
  });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 54,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          backgroundColor: "rgba(10,14,12,0.85)",
          border: "1px solid rgba(61,220,151,0.35)",
          borderRadius: 999,
          padding: "13px 30px",
          fontFamily: FONT_BODY,
          fontSize: 27,
          fontWeight: 600,
          color: COLORS.white,
          opacity: s,
          translate: `0px ${(1 - s) * 36}px`,
          boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
        }}
      >
        <span style={{ color: COLORS.mint, fontSize: 22 }}>●</span>
        {children}
      </div>
    </div>
  );
};

// Row entrance: springs in with slight rise, staggered by index
export const RowIn: React.FC<{
  from: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ from, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - from,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.7 },
  });
  return (
    <div
      style={{
        opacity: s,
        translate: `0px ${(1 - s) * 26}px`,
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
