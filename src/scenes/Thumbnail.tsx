import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { Bento } from "./Bento";
import { COLORS, FONT_BODY, FONT_DISPLAY, FONT_MONO } from "../theme";

// Single-frame thumbnail: the settled bento grid behind the CTA lockup.
// Sequence with negative `from` samples Bento at a late, fully-assembled frame.
export const Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#060B08" }}>
      <Sequence from={-118} layout="none">
        <AbsoluteFill style={{ scale: "1.08" }}>
          <Bento backdrop />
        </AbsoluteFill>
      </Sequence>
      {/* dim the grid so the lockup owns the frame; center stays clear for
          the player's play button */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 70% 62% at 50% 26%, rgba(4,9,6,0.94), rgba(4,9,6,0.6) 58%, rgba(4,9,6,0.3))",
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          flexDirection: "column",
          gap: 34,
          paddingTop: 88,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 178,
              height: 178,
              borderRadius: 42,
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.5), 0 0 90px rgba(0,128,96,0.45)",
            }}
          />
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 188,
              fontWeight: 900,
              letterSpacing: "-0.045em",
              color: COLORS.white,
              textShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            Easy<span style={{ color: COLORS.mint }}>Scan</span>
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 52,
            fontWeight: 600,
            color: "#E8EFEA",
            textShadow: "0 8px 30px rgba(0,0,0,0.7)",
          }}
        >
          Take inventory off your mind
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 54,
            fontFamily: FONT_MONO,
            fontSize: 28,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: COLORS.lime,
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          }}
        >
          Everything inventory · one app
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
