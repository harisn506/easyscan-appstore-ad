import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { BarcodeBackdrop, Stage } from "../helpers";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../theme";

// Laser-scan hero thumbnail: dark stage, lockup upper-third with the red
// laser frozen mid-sweep, payoff line below, Stocky hook at the bottom.
// Center band stays clear for YouTube's play button.
export const Thumbnail: React.FC = () => {
  const laserX = 61; // % across the lockup — mid-sweep through "Scan"
  return (
    <Stage glow={0.95}>
      <BarcodeBackdrop opacity={0.07} />
      <AbsoluteFill style={{ alignItems: "center" }}>
        {/* lockup + frozen laser */}
        <div
          style={{
            position: "absolute",
            top: 190,
            display: "flex",
            alignItems: "center",
            gap: 48,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 190,
              height: 190,
              borderRadius: 44,
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.55), 0 0 100px rgba(0,128,96,0.5)",
            }}
          />
          <div
            style={{
              position: "relative",
              fontFamily: FONT_DISPLAY,
              fontSize: 220,
              fontWeight: 900,
              letterSpacing: "-0.045em",
              color: COLORS.white,
              lineHeight: 1,
              textShadow: "0 20px 70px rgba(0,0,0,0.6)",
            }}
          >
            Easy<span style={{ color: COLORS.mint }}>Scan</span>
            {/* the laser, frozen mid-sweep */}
            <div
              style={{
                position: "absolute",
                top: "-16%",
                bottom: "-16%",
                left: `${laserX}%`,
                width: 7,
                borderRadius: 4,
                backgroundColor: "rgba(255,72,58,0.95)",
                boxShadow:
                  "0 0 24px rgba(255,59,48,0.95), 0 0 90px rgba(255,59,48,0.6), 0 0 160px rgba(255,59,48,0.35)",
              }}
            />
            {/* bright core at the beam */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${laserX}%`,
                width: 3,
                height: "130%",
                translate: "2px -50%",
                backgroundColor: "#FFD9D5",
                opacity: 0.9,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
        {/* payoff */}
        <div
          style={{
            position: "absolute",
            top: 620,
            fontFamily: FONT_DISPLAY,
            fontSize: 108,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: COLORS.white,
            textShadow: "0 12px 50px rgba(0,0,0,0.7)",
          }}
        >
          Inventory, <span style={{ color: COLORS.mint }}>handled.</span>
        </div>
        {/* hook */}
        <div
          style={{
            position: "absolute",
            bottom: 66,
            fontFamily: FONT_MONO,
            fontSize: 34,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: COLORS.lime,
            textShadow: "0 4px 24px rgba(0,0,0,0.8)",
          }}
        >
          The ultimate Stocky replacement
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
