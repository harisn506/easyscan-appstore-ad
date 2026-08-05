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
import { BarcodeBackdrop, Stage } from "../helpers";
import { COLORS, FONT_BODY, FONT_DISPLAY, FONT_MONO } from "../theme";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame, fps, config: { damping: 18, mass: 1.1 } });
  const glow = 0.5 + Math.sin((frame / fps) * Math.PI * 0.9) * 0.5;
  return (
    <Stage glow={1}>
      <BarcodeBackdrop opacity={0.04} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 52,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 44,
            opacity: logo,
            scale: String(0.82 + Math.min(logo, 1) * 0.18),
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 190,
              height: 190,
              borderRadius: 44,
              boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 ${
                60 + glow * 50
              }px rgba(0,128,96,${0.3 + glow * 0.25})`,
            }}
          />
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 200,
              fontWeight: 900,
              letterSpacing: "-0.045em",
              color: COLORS.white,
            }}
          >
            Easy<span style={{ color: COLORS.mint }}>Scan</span>
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 46,
            fontWeight: 500,
            color: COLORS.dim,
            opacity: interpolate(frame, [0.5 * fps, 0.9 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Take inventory off your mind
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 27,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.lime,
            opacity: interpolate(frame, [1.2 * fps, 1.7 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          The ultimate Stocky replacement
        </div>
        {/* music attribution — required by the Uppbeat free license */}
        <div
          style={{
            position: "absolute",
            bottom: 26,
            width: "100%",
            textAlign: "center",
            fontFamily: FONT_BODY,
            fontSize: 17,
            color: "rgba(155,166,160,0.5)",
            opacity: interpolate(frame, [1.6 * fps, 2.1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Music from #Uppbeat (free for Creators!): https://uppbeat.io/t/matrika/big-switch
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
