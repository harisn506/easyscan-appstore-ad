import React from "react";
import { Composition, Folder } from "remotion";
import { EasyScanAd, TOTAL_DURATION } from "./EasyScanAd";
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
import "./index.css";

const FPS = 30;
const W = 1920;
const H = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EasyScanAd"
        component={EasyScanAd}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={W}
        height={H}
      />
      <Folder name="Scenes">
        <Composition id="Hook" component={Hook} durationInFrames={84} fps={FPS} width={W} height={H} />
        <Composition id="Brand" component={Brand} durationInFrames={78} fps={FPS} width={W} height={H} />
        <Composition id="AdminScene" component={AdminScene} durationInFrames={112} fps={FPS} width={W} height={H} />
        <Composition id="Forecast" component={Forecast} durationInFrames={120} fps={FPS} width={W} height={H} />
        <Composition id="PlanScene" component={PlanScene} durationInFrames={118} fps={FPS} width={W} height={H} />
        <Composition id="OrderScene" component={OrderScene} durationInFrames={216} fps={FPS} width={W} height={H} />
        <Composition id="BeatOrdering" component={BeatOrdering} durationInFrames={62} fps={FPS} width={W} height={H} />
        <Composition id="BeatCounted" component={BeatCounted} durationInFrames={62} fps={FPS} width={W} height={H} />
        <Composition id="ReceiveScene" component={ReceiveScene} durationInFrames={128} fps={FPS} width={W} height={H} />
        <Composition id="LabelScene" component={LabelScene} durationInFrames={122} fps={FPS} width={W} height={H} />
        <Composition id="CountScene" component={CountScene} durationInFrames={126} fps={FPS} width={W} height={H} />
        <Composition id="AlertsScene" component={AlertsScene} durationInFrames={112} fps={FPS} width={W} height={H} />
        <Composition id="FulfilScene" component={FulfilScene} durationInFrames={140} fps={FPS} width={W} height={H} />
        <Composition id="Bento" component={Bento} durationInFrames={132} fps={FPS} width={W} height={H} />
        <Composition id="OneApp" component={OneApp} durationInFrames={84} fps={FPS} width={W} height={H} />
        <Composition id="Proof" component={Proof} durationInFrames={112} fps={FPS} width={W} height={H} />
        <Composition id="CTA" component={CTA} durationInFrames={130} fps={FPS} width={W} height={H} />
      </Folder>
    </>
  );
};
