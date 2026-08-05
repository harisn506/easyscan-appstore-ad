import React from "react";
import { AbsoluteFill } from "remotion";
import { BarcodeBackdrop, Camera, KineticWords, Stage } from "../helpers";
import { COLORS } from "../theme";

// Quick dark typography beats that break up the UI-demo run

const Beat: React.FC<{ words: { text: string; color?: string }[] }> = ({
  words,
}) => (
  <Stage glow={0.5}>
    <BarcodeBackdrop />
    <Camera zoom={[1, 1.09]} duration={50}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <KineticWords words={words} fontSize={112} stagger={3} maxWidth={1600} />
      </AbsoluteFill>
    </Camera>
  </Stage>
);

export const BeatOrdering: React.FC = () => (
  <Beat
    words={[
      { text: "Hours" },
      { text: "of" },
      { text: "ordering." },
      { text: "Gone.", color: COLORS.mint },
    ]}
  />
);

export const BeatCounted: React.FC = () => (
  <Beat
    words={[
      { text: "Every" },
      { text: "unit," },
      { text: "accounted", color: COLORS.mint },
      { text: "for.", color: COLORS.mint },
    ]}
  />
);
