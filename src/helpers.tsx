import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, EASE_OUT, FONT_DISPLAY, FONT_MONO } from "./theme";

// Dark stage with subtle green radial glow + grid
export const Stage: React.FC<{
  children: React.ReactNode;
  glow?: number; // 0..1
}> = ({ children, glow = 0.5 }) => {
  const frame = useCurrentFrame();
  const cx = 50 + Math.sin(frame / 55) * 9;
  const cy = 45 + Math.cos(frame / 70) * 7;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 62% 52% at ${cx}% ${cy}%, rgba(0,128,96,${
            0.26 * glow
          }), transparent 70%), radial-gradient(ellipse 40% 36% at ${100 - cx}% ${
            100 - cy
          }%, rgba(61,220,151,${0.09 * glow}), transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(149,191,71,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(149,191,71,0.045) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 85%)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

// Word-by-word kinetic headline (Apple style)
export const KineticWords: React.FC<{
  words: { text: string; color?: string }[];
  from?: number;
  fontSize?: number;
  stagger?: number;
  fontWeight?: number;
  lineHeight?: number;
  maxWidth?: number;
  baseColor?: string;
}> = ({
  words,
  from = 0,
  fontSize = 130,
  stagger = 3,
  fontWeight = 800,
  lineHeight = 1.06,
  maxWidth = 1500,
  baseColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: fontSize * 0.28,
        maxWidth,
        fontFamily: FONT_DISPLAY,
        fontSize,
        fontWeight,
        lineHeight,
        letterSpacing: "-0.03em",
        textAlign: "center",
        color: baseColor ?? COLORS.white,
      }}
    >
      {words.map((w, i) => {
        const start = from + i * stagger;
        const s = spring({
          frame: frame - start,
          fps,
          config: { damping: 16, mass: 0.6, stiffness: 160 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color: w.color ?? baseColor ?? COLORS.white,
              opacity: s,
              translate: `0px ${(1 - s) * fontSize * 0.45}px`,
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

export const FadeUp: React.FC<{
  children: React.ReactNode;
  from?: number;
  duration?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, from = 0, duration = 18, distance = 40, style }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        opacity: interpolate(frame, [from, from + duration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(...EASE_OUT),
        }),
        translate: `0px ${interpolate(
          frame,
          [from, from + duration],
          [distance, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          },
        )}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Mock app window frame (EasyScan admin look)
export const UIWindow: React.FC<{
  title: string;
  width?: number;
  children: React.ReactNode;
  from?: number;
}> = ({ title, width = 1100, children, from = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - from, fps, config: { damping: 24 } });
  return (
    <div
      style={{
        width,
        borderRadius: 24,
        backgroundColor: COLORS.bgPanel,
        border: `1px solid ${COLORS.stroke}`,
        boxShadow:
          "0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(0,128,96,0.12)",
        overflow: "hidden",
        opacity: s,
        scale: String(0.94 + s * 0.06),
        translate: `0px ${(1 - s) * 60}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "20px 28px",
          borderBottom: `1px solid ${COLORS.strokeSoft}`,
        }}
      >
        <div style={{ display: "flex", gap: 9 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 13,
                height: 13,
                borderRadius: 7,
                backgroundColor: "rgba(255,255,255,0.14)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 22,
            color: COLORS.dim,
            marginLeft: 10,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontFamily: FONT_MONO,
            fontSize: 20,
            color: COLORS.lime,
            padding: "4px 14px",
            borderRadius: 999,
            border: `1px solid ${COLORS.stroke}`,
          }}
        >
          EasyScan
        </div>
      </div>
      <div style={{ padding: 32 }}>{children}</div>
    </div>
  );
};

// CSS barcode
export const Barcode: React.FC<{ height?: number; width?: number }> = ({
  height = 90,
  width = 260,
}) => {
  const bars = [3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 2, 1, 3, 2];
  return (
    <div style={{ display: "flex", gap: 3, height, width, alignItems: "stretch" }}>
      {bars.map((b, i) => (
        <div
          key={i}
          style={{
            flexGrow: b,
            backgroundColor: i % 2 === 0 ? COLORS.white : "transparent",
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
};

// Light Polaris-style stage for product demo scenes
export const LightStage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const bx = 80 + Math.sin(frame / 60) * 10;
  const by = 10 + Math.cos(frame / 48) * 8;
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(160deg, #FDFDFC 0%, #EEF1F0 55%, #DFEAE3 100%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 52% 42% at ${bx}% ${by}%, rgba(0,128,96,0.14), transparent 70%), radial-gradient(ellipse 44% 40% at ${100 - bx}% 92%, rgba(149,191,71,0.12), transparent 70%)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

// Numbered story-chapter label
export const Chapter: React.FC<{
  n: string;
  label: string;
  dark?: boolean;
  from?: number;
}> = ({ n, label, dark, from = 0 }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [from, from + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: FONT_MONO,
        fontSize: 26,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: dark ? COLORS.lime : "#007F5F",
        opacity: o,
      }}
    >
      <span
        style={{
          padding: "4px 14px",
          borderRadius: 8,
          border: `1.5px solid ${dark ? "rgba(149,191,71,0.4)" : "rgba(0,128,96,0.35)"}`,
          fontWeight: 700,
        }}
      >
        {n}
      </span>
      {label}
    </div>
  );
};

// Continuous camera push-in for "alive" feel
export const Camera: React.FC<{
  children: React.ReactNode;
  zoom?: [number, number]; // start → end scale over scene
  drift?: [number, number]; // px drift x,y
  duration?: number;
}> = ({ children, zoom = [1, 1.06], drift = [0, -14], duration = 120 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        scale: String(zoom[0] + (zoom[1] - zoom[0]) * p),
        translate: `${drift[0] * p}px ${drift[1] * p}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// 3D tilt wrapper — settles from a tilted pose into place, with slow float
export const Tilt3D: React.FC<{
  children: React.ReactNode;
  from?: number;
  startRotX?: number;
  startRotY?: number;
}> = ({ children, from = 0, startRotX = 18, startRotY = -14 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - from,
    fps,
    config: { damping: 19, mass: 0.9, stiffness: 110 },
  });
  const floatX = Math.sin((frame / fps) * Math.PI * 0.5) * 1.6;
  const floatY = Math.cos((frame / fps) * Math.PI * 0.4) * 2.2;
  return (
    <div style={{ perspective: 1600 }}>
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${startRotX * (1 - s) + floatX}deg) rotateY(${
            startRotY * (1 - s) + floatY
          }deg)`,
          opacity: Math.min(s * 1.6, 1),
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Animated mouse cursor with click ripple. Moves through waypoints.
export const Cursor: React.FC<{
  path: { x: number; y: number; at: number }[];
  clicks?: number[]; // frames at which a click ripple fires
}> = ({ path, clicks = [] }) => {
  const frame = useCurrentFrame();
  const xs = path.map((p) => p.x);
  const ys = path.map((p) => p.y);
  const ts = path.map((p) => p.at);
  const x = interpolate(frame, ts, xs, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const y = interpolate(frame, ts, ys, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const appear = interpolate(frame, [ts[0] - 6, ts[0]], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const activeClick = clicks.find((c) => frame >= c && frame < c + 16);
  const clickP = activeClick ? (frame - activeClick) / 16 : 0;
  const press = clicks.some((c) => frame >= c - 2 && frame < c + 4) ? 0.82 : 1;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        translate: `${x}px ${y}px`,
        opacity: appear,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {activeClick !== undefined && (
        <div
          style={{
            position: "absolute",
            left: -26,
            top: -26,
            width: 60,
            height: 60,
            borderRadius: 30,
            border: "3px solid rgba(44,110,203,0.8)",
            scale: String(0.3 + clickP * 1.3),
            opacity: 1 - clickP,
          }}
        />
      )}
      <svg
        width="34"
        height="42"
        viewBox="0 0 24 30"
        style={{
          scale: String(press),
          filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.35))",
        }}
      >
        <path
          d="M4 2 L4 24 L9.5 19 L13 27 L16.5 25.5 L13 18 L20 17.5 Z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  );
};

// Faint giant barcode drifting behind typography scenes — brand motif
export const BarcodeBackdrop: React.FC<{ opacity?: number }> = ({
  opacity = 0.05,
}) => {
  const frame = useCurrentFrame();
  const bars = [3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 2, 1, 3, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1];
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 18,
          width: 2400,
          height: 1400,
          alignItems: "stretch",
          translate: `${Math.sin(frame / 90) * 40 - 60}px 0px`,
          rotate: "-8deg",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 50%, black, transparent 78%)",
        }}
      >
        {bars.map((b, i) => (
          <div
            key={i}
            style={{
              flexGrow: b,
              backgroundColor:
                i % 2 === 0 ? `rgba(149,191,71,${opacity})` : "transparent",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Red scanner laser sweeping horizontally across its parent (position:relative)
export const LaserScan: React.FC<{
  from: number;
  duration?: number;
}> = ({ from, duration = 22 }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame > from + duration) return null;
  const p = (frame - from) / duration;
  const x = interpolate(p, [0, 1], [-4, 104]);
  return (
    <div
      style={{
        position: "absolute",
        top: "-6%",
        bottom: "-6%",
        left: `${x}%`,
        width: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,59,48,0.9)",
        boxShadow:
          "0 0 18px rgba(255,59,48,0.9), 0 0 60px rgba(255,59,48,0.55)",
        opacity: Math.sin(p * Math.PI) * 0.95 + 0.05,
        zIndex: 60,
        pointerEvents: "none",
      }}
    />
  );
};

export const Kicker: React.FC<{ children: React.ReactNode; from?: number }> = ({
  children,
  from = 0,
}) => (
  <FadeUp from={from} distance={20}>
    <div
      style={{
        fontFamily: FONT_MONO,
        fontSize: 30,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: COLORS.lime,
      }}
    >
      {children}
    </div>
  </FadeUp>
);
