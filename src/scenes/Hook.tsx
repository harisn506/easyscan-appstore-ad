import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { BarcodeBackdrop, Camera, FadeUp, KineticWords, Stage } from "../helpers";
import { COLORS, FONT_BODY } from "../theme";

export const Hook: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <Stage glow={0.4}>
      <BarcodeBackdrop />
      <Camera zoom={[1, 1.08]} duration={75}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 42,
          }}
        >
          <KineticWords
            words={[
              { text: "Inventory" },
              { text: "runs" },
              { text: "your" },
              { text: "business." },
            ]}
            fontSize={104}
            stagger={3}
          />
          <KineticWords
            from={Math.round(1.0 * fps)}
            words={[
              { text: "EasyScan", color: COLORS.mint },
              { text: "runs" },
              { text: "your" },
              { text: "inventory.", color: COLORS.mint },
            ]}
            fontSize={104}
          />
          <FadeUp from={Math.round(1.6 * fps)} distance={22}>
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 36,
                color: COLORS.dim,
                fontWeight: 500,
              }}
            >
              Forecast → order → receive → count → fulfil
            </div>
          </FadeUp>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};
