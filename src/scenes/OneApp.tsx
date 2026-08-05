import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BarcodeBackdrop, Stage } from "../helpers";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../theme";

export const OneApp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = spring({
    frame: frame - 4,
    fps,
    config: { damping: 16 },
  });
  return (
    <Stage glow={0.9}>
      <BarcodeBackdrop />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 190,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            textAlign: "center",
            lineHeight: 1.05,
            color: COLORS.white,
            opacity: title,
            scale: String(0.7 + Math.min(title, 1) * 0.3),
          }}
        >
          Inventory,
          <br />
          <span style={{ color: COLORS.mint }}>handled.</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 130,
            fontFamily: FONT_MONO,
            fontSize: 30,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.lime,
            opacity: interpolate(frame, [0.9 * fps, 1.4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Forecast → order → receive → track → fulfil → repeat
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
