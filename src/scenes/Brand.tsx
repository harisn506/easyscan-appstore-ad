import React from "react";
import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BarcodeBackdrop, Camera, KineticWords, LaserScan, Stage } from "../helpers";
import { Audio } from "@remotion/media";
import { COLORS, FONT_DISPLAY } from "../theme";

export const Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 140 },
  });
  return (
    <Stage glow={0.85}>
      <BarcodeBackdrop opacity={0.04} />
      <Audio src={staticFile("beep.mp3")} from={42} volume={0.4} />
      <Camera zoom={[1.04, 1]} duration={65}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 44,
              opacity: s,
              scale: String(0.75 + s * 0.25),
              position: "relative",
            }}
          >
            <LaserScan from={26} duration={20} />
            <Img
              src={staticFile("logo.png")}
              style={{
                width: 190,
                height: 190,
                borderRadius: 44,
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.5), 0 0 70px rgba(0,128,96,0.35)",
              }}
            />
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 200,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: COLORS.white,
              }}
            >
              Easy<span style={{ color: COLORS.mint }}>Scan</span>
            </div>
          </div>
          <KineticWords
            from={Math.round(0.5 * fps)}
            words={[
              { text: "The" },
              { text: "all-in-one", color: COLORS.lime },
              { text: "inventory" },
              { text: "suite" },
              { text: "for" },
              { text: "Shopify." },
            ]}
            fontSize={64}
            fontWeight={700}
          />
          <KineticWords
            from={Math.round(1.1 * fps)}
            words={[
              { text: "★★★★★", color: COLORS.mint },
              { text: "5.0" },
              { text: "on" },
              { text: "the" },
              { text: "App" },
              { text: "Store" },
            ]}
            fontSize={34}
            fontWeight={600}
            stagger={2}
          />
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};
