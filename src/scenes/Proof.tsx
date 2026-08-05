import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FadeUp, KineticWords, Stage } from "../helpers";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../theme";

const Stat: React.FC<{
  big: string;
  label: string;
  from: number;
  accent?: boolean;
}> = ({ big, label, from, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - from, fps, config: { damping: 15, mass: 0.9 } });
  return (
    <div
      style={{
        width: 400,
        padding: "44px 36px",
        borderRadius: 24,
        backgroundColor: COLORS.bgPanel,
        border: `1px solid ${accent ? "rgba(61,220,151,0.4)" : COLORS.stroke}`,
        boxShadow: accent
          ? "0 0 70px rgba(61,220,151,0.18)"
          : "0 30px 80px rgba(0,0,0,0.5)",
        textAlign: "center",
        opacity: s,
        translate: `0px ${(1 - s) * 80}px`,
        scale: String(0.9 + Math.min(s, 1) * 0.1),
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 84,
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: accent ? COLORS.mint : COLORS.white,
          marginBottom: 14,
        }}
      >
        {big}
      </div>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 26,
          color: COLORS.dim,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage glow={0.7}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 64,
        }}
      >
        <KineticWords
          words={[
            { text: "Loved" },
            { text: "by" },
            { text: "merchants.", color: COLORS.mint },
          ]}
          fontSize={96}
        />
        <div style={{ display: "flex", gap: 36 }}>
          <Stat from={Math.round(0.5 * fps)} big="★ 5.0" label="Rated on the Shopify App Store" accent />
          <Stat from={Math.round(0.7 * fps)} big="10M+" label="Orders processed with EasyScan" />
          <Stat from={Math.round(0.9 * fps)} big="#1" label="In inventory optimization" accent />
        </div>
        <FadeUp from={Math.round(1.5 * fps)} distance={24}>
          <Img
            src={staticFile("bfs.png")}
            style={{
              height: 84,
              borderRadius: 22,
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              opacity: interpolate(frame, [1.5 * fps, 2.0 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        </FadeUp>
      </AbsoluteFill>
    </Stage>
  );
};
