import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Chapter, Cursor, KineticWords } from "./helpers";
import { COLORS, FONT_BODY, POLARIS } from "./theme";

// Screenshots are 3024x1650. Displayed height-fit to 1080.
export const IMG_W = (3024 / 1650) * 1080; // ~1979.3
export const IMG_H = 1080;

export type CamKey = { at: number; x: number; y: number; z: number };

// Camera over a full-bleed screenshot. x/y = focus point as image fraction,
// z = zoom. Overlay children are rendered in image space (IMG_W × IMG_H px).
export const ScreenCam: React.FC<{
  src: string;
  cam: CamKey[];
  children?: React.ReactNode;
  dim?: number; // 0..1 extra dim for headline moments
  blur?: number;
}> = ({ src, cam, children, dim = 0, blur = 0 }) => {
  const frame = useCurrentFrame();
  // Slow-in/slow-out per move — camera never lurches at keyframes
  const ease = Easing.bezier(0.55, 0, 0.25, 1);
  const ts = cam.map((c) => c.at);
  const ix = (sel: (c: CamKey) => number) =>
    cam.length === 1
      ? sel(cam[0])
      : interpolate(frame, ts, cam.map(sel), {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        });
  const x = ix((c) => c.x);
  const y = ix((c) => c.y);
  // Zoom interpolated in log space — perceptually constant zoom speed
  const z = Math.exp(ix((c) => Math.log(c.z)));
  // Handheld micro-drift: the frame is never perfectly still
  const driftX =
    Math.sin(frame * 0.029) * 3.2 + Math.sin(frame * 0.013 + 1.7) * 2.2;
  const driftY =
    Math.cos(frame * 0.023) * 2.6 + Math.sin(frame * 0.011 + 0.6) * 1.8;
  let tx = 960 - x * IMG_W * z + driftX;
  let ty = 540 - y * IMG_H * z + driftY;
  // Clamp so the image always covers the frame — no black edges
  tx = Math.min(0, Math.max(1920 - IMG_W * z, tx));
  ty = Math.min(0, Math.max(1080 - IMG_H * z, ty));
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0B0E0C" }}>
      <div
        style={{
          position: "absolute",
          width: IMG_W,
          height: IMG_H,
          transformOrigin: "0 0",
          transform: `translate(${tx}px, ${ty}px) scale(${z})`,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: IMG_W,
            height: IMG_H,
            filter: blur ? `blur(${blur}px)` : undefined,
          }}
        />
        {children}
      </div>
      {dim > 0 && (
        <AbsoluteFill
          style={{ backgroundColor: `rgba(6,9,8,${0.68 * dim})` }}
        />
      )}
    </AbsoluteFill>
  );
};

// Pulsing highlight ring around a region, in image fractions
export const Highlight: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  from: number;
  color?: string;
}> = ({ x, y, w, h, from, color = "#008060" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - from,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const pulse = 1 + Math.sin(((frame - from) / fps) * Math.PI * 2.2) * 0.015;
  return (
    <div
      style={{
        position: "absolute",
        left: x * IMG_W - 8,
        top: y * IMG_H - 8,
        width: w * IMG_W + 16,
        height: h * IMG_H + 16,
        border: `3px solid ${color}`,
        borderRadius: 10,
        boxShadow: `0 0 0 4px ${color}1E, 0 0 26px ${color}50`,
        opacity: s,
        scale: String((0.88 + Math.min(s, 1) * 0.12) * pulse),
        pointerEvents: "none",
      }}
    />
  );
};

// Cursor that lives in image space (fractions), scales with camera
export const ImgCursor: React.FC<{
  path: { x: number; y: number; at: number }[];
  clicks?: number[];
}> = ({ path, clicks }) => (
  <Cursor
    path={path.map((p) => ({ x: p.x * IMG_W, y: p.y * IMG_H, at: p.at }))}
    clicks={clicks}
  />
);

// Headline intro: big type over dimmed/blurred UI, exits upward as camera dives
export const HeadlineIntro: React.FC<{
  chapter?: { n: string; label: string };
  words: { text: string; color?: string }[];
  hold?: number; // frames the headline owns the screen
  light?: boolean; // set when screenshot is light → use dark scrim regardless
}> = ({ chapter, words, hold = 34 }) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [hold, hold + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.5, 0, 0.8, 1),
  });
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 26,
        opacity: 1 - out,
        translate: `0px ${-90 * out}px`,
        zIndex: 30,
      }}
    >
      {chapter && <Chapter n={chapter.n} label={chapter.label} dark />}
      <KineticWords words={words} fontSize={96} maxWidth={1600} />
    </AbsoluteFill>
  );
};

// Dim layer that follows the headline hold, then reveals the UI
export const introDim = (frame: number, hold = 34) =>
  interpolate(frame, [0, hold, hold + 14], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Bottom-left caption during the dive
export const Caption: React.FC<{ children: React.ReactNode; from: number }> = ({
  children,
  from,
}) => {
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
        left: 70,
        bottom: 60,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: 14,
        backgroundColor: "rgba(10,14,12,0.82)",
        border: `1px solid rgba(61,220,151,0.35)`,
        borderRadius: 14,
        padding: "14px 26px",
        fontFamily: FONT_BODY,
        fontSize: 28,
        fontWeight: 600,
        color: COLORS.white,
        opacity: s,
        translate: `0px ${(1 - s) * 40}px`,
        boxShadow: "0 14px 40px rgba(0,0,0,0.4)",
      }}
    >
      <span style={{ color: COLORS.mint, fontSize: 24 }}>●</span>
      {children}
    </div>
  );
};

// Crossfade wrapper for multi-screenshot sequences within one scene
export const Segment: React.FC<{
  from: number;
  to: number;
  fade?: number;
  children: React.ReactNode;
}> = ({ from, to, fade = 8, children }) => {
  const frame = useCurrentFrame();
  if (frame < from - fade || frame > to + fade) return null;
  const o = interpolate(
    frame,
    [from - fade, from, to, to + fade],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

export const POLARIS_GREEN = POLARIS.green;
