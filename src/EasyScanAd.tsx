import React from "react";
import { interpolate, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Audio } from "@remotion/media";
import { Hook } from "./scenes/Hook";
import { Brand } from "./scenes/Brand";
import { Forecast } from "./scenes/Forecast";
import {
  AdminScene,
  AlertsScene,
  CountScene,
  FulfilScene,
  LabelScene,
  OrderScene,
  PlanScene,
  ReceiveScene,
} from "./scenes/DemoScenes";
import { BeatCounted, BeatOrdering } from "./scenes/Beats";
import { Bento } from "./scenes/Bento";
import { OneApp } from "./scenes/OneApp";
import { Proof } from "./scenes/Proof";
import { CTA } from "./scenes/CTA";

// Scene durations in frames @ 30fps
export const SCENES = [
  { name: "Hook", duration: 84 },
  { name: "Brand", duration: 78 },
  { name: "AdminScene", duration: 112 },
  { name: "Forecast", duration: 120 },
  { name: "PlanScene", duration: 118 },
  { name: "OrderScene", duration: 216 },
  { name: "BeatOrdering", duration: 62 },
  { name: "ReceiveScene", duration: 128 },
  { name: "LabelScene", duration: 122 },
  { name: "CountScene", duration: 126 },
  { name: "BeatCounted", duration: 62 },
  { name: "AlertsScene", duration: 112 },
  { name: "FulfilScene", duration: 140 },
  { name: "Bento", duration: 132 },
  { name: "OneApp", duration: 84 },
  { name: "Proof", duration: 112 },
  { name: "CTA", duration: 130 },
] as const;

export const TRANSITION_FRAMES = 10;
export const TOTAL_DURATION =
  SCENES.reduce((a, s) => a + s.duration, 0) -
  (SCENES.length - 1) * TRANSITION_FRAMES;

// Frame at which each scene starts in the final timeline (for whoosh SFX)
const sceneStarts = SCENES.slice(0, -1).map((_, i) =>
  SCENES.slice(0, i + 1).reduce((a, s) => a + s.duration, 0) -
  (i + 1) * TRANSITION_FRAMES,
);

const COMPONENTS = [
  Hook,
  Brand,
  AdminScene,
  Forecast,
  PlanScene,
  OrderScene,
  BeatOrdering,
  ReceiveScene,
  LabelScene,
  CountScene,
  BeatCounted,
  AlertsScene,
  FulfilScene,
  Bento,
  OneApp,
  Proof,
  CTA,
];

export const EasyScanAd: React.FC = () => {
  return (
    <>
      <TransitionSeries>
        {SCENES.map((s, i) => {
          const C = COMPONENTS[i];
          const elements = [
            <TransitionSeries.Sequence
              key={s.name}
              durationInFrames={s.duration}
              name={s.name}
            >
              <C />
            </TransitionSeries.Sequence>,
          ];
          if (i < SCENES.length - 1) {
            elements.push(
              <TransitionSeries.Transition
                key={`t-${i}`}
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
              />,
            );
          }
          return elements;
        })}
      </TransitionSeries>
      {/* Whoosh on every cut */}
      {sceneStarts.map((f, i) => (
        <Audio
          key={i}
          src="https://remotion.media/whoosh.wav"
          from={f - 4}
          volume={0.22}
        />
      ))}
      {/* Music: "Big Switch" — Matrika, via Uppbeat (license NNMN0B2PMQL7BWQ7).
          Credit shown in the CTA footer. Fades in fast, out over the CTA. */}
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [0, 20, TOTAL_DURATION - 80, TOTAL_DURATION - 6],
            [0, 0.34, 0.34, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />
    </>
  );
};
