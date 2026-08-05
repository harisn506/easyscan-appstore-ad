import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { Stage } from "../helpers";
import { DemoCaption, SceneHead } from "../demo";
import { AISparkle } from "../ui";
import { AI_GRADIENT, COLORS, FONT_BODY, FONT_MONO } from "../theme";

// Stock projection for one real product: history draws, AI continues the
// line to zero, flags the run-out date, and tells you exactly what to order.

const W = 1160;
const H = 290;

// stock on hand, declining with sales — history then AI projection
const HIST = [92, 88, 86, 80, 78, 71, 68, 62, 60, 53, 50, 44];
const PROJ = [44, 37, 31, 24, 16, 8, 0];

const toPath = (vals: number[], x0: number, dx: number) =>
  vals
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x0 + i * dx} ${H - (v / 100) * H}`)
    .join(" ");

export const Forecast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dx = W / (HIST.length + PROJ.length - 2);
  const histLen = 1500;
  const projLen = 800;
  const histDraw = interpolate(frame, [14, 40], [histLen, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const projDraw = interpolate(frame, [40, 62], [projLen, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card = spring({
    frame: frame - 6,
    fps,
    config: { damping: 20, stiffness: 110, mass: 0.9 },
  });
  const marker = spring({
    frame: frame - 62,
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const chip = spring({
    frame: frame - 72,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const todayX = (HIST.length - 1) * dx;
  const endX = todayX + (PROJ.length - 1) * dx;
  return (
    <Stage glow={0.8}>
      <SceneHead
        dark
        words={[
          { text: "It" },
          { text: "sees" },
          { text: "the" },
          { text: "sell-out", color: COLORS.mint },
          { text: "coming.", color: COLORS.mint },
        ]}
      />
      <AbsoluteFill style={{ alignItems: "center", zIndex: 10 }}>
        <div
          style={{
            position: "absolute",
            top: 288,
            width: 1320,
            borderRadius: 20,
            border: `1px solid ${COLORS.stroke}`,
            backgroundColor: "rgba(13,19,16,0.92)",
            boxShadow: "0 36px 90px rgba(0,0,0,0.5)",
            padding: "26px 38px 30px",
            opacity: card,
            translate: `0px ${(1 - card) * 80}px`,
            scale: String(
              (0.96 + card * 0.04) *
                (1 +
                  interpolate(frame, [0, 100], [0, 0.035], {
                    extrapolateRight: "clamp",
                  })),
            ),
          }}
        >
          {/* product header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 22,
            }}
          >
            <span style={{ fontSize: 38 }}>🏖</span>
            <div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 27,
                  fontWeight: 700,
                  color: COLORS.white,
                }}
              >
                Beach Ball - 10 inch
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 18,
                  color: COLORS.dim,
                }}
              >
                35796189756327 · Dodpits House
              </div>
            </div>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: FONT_MONO,
                fontSize: 20,
                color: COLORS.mint,
              }}
            >
              <AISparkle size={34} /> Demand forecast
            </div>
          </div>
          {/* chart */}
          <div style={{ position: "relative", width: W, height: H, margin: "0 auto" }}>
            <svg width={W} height={H} style={{ overflow: "visible" }}>
              {[0.33, 0.66].map((g) => (
                <line
                  key={g}
                  x1={0}
                  x2={W}
                  y1={H * g}
                  y2={H * g}
                  stroke="rgba(244,247,245,0.07)"
                  strokeWidth={1}
                />
              ))}
              <line
                x1={0}
                x2={W}
                y1={H}
                y2={H}
                stroke="rgba(244,247,245,0.18)"
                strokeWidth={1.5}
              />
              {/* today divider */}
              <line
                x1={todayX}
                x2={todayX}
                y1={-10}
                y2={H}
                stroke="rgba(244,247,245,0.22)"
                strokeWidth={1.5}
                strokeDasharray="6 8"
              />
              {/* history */}
              <path
                d={toPath(HIST, 0, dx)}
                fill="none"
                stroke={COLORS.mint}
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={histLen}
                strokeDashoffset={histDraw}
                style={{ filter: "drop-shadow(0 0 12px rgba(61,220,151,0.5))" }}
              />
              {/* AI projection to zero */}
              <path
                d={toPath(PROJ, todayX, dx)}
                fill="none"
                stroke="#FF6B5E"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeDasharray={`14 12`}
                strokeDashoffset={projDraw}
                pathLength={projLen}
                style={{ filter: "drop-shadow(0 0 12px rgba(255,107,94,0.45))" }}
              />
              {/* run-out marker */}
              <circle
                cx={endX}
                cy={H}
                r={11 * Math.min(marker, 1)}
                fill="#FF3B30"
                style={{ filter: "drop-shadow(0 0 16px rgba(255,59,48,0.8))" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                left: todayX - 34,
                top: -34,
                fontFamily: FONT_MONO,
                fontSize: 17,
                letterSpacing: "0.18em",
                color: COLORS.dim,
              }}
            >
              TODAY
            </div>
            <div
              style={{
                position: "absolute",
                left: endX - 250,
                top: H - 58,
                fontFamily: FONT_BODY,
                fontSize: 23,
                fontWeight: 700,
                color: "#FF6B5E",
                whiteSpace: "nowrap",
                opacity: marker,
                translate: `0px ${(1 - marker) * 16}px`,
              }}
            >
              Runs out · Aug 23
            </div>
          </div>
          {/* AI suggestion */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 24,
              opacity: chip,
              translate: `0px ${(1 - chip) * 30}px`,
            }}
          >
            <div
              style={{
                borderRadius: 999,
                padding: 3,
                background: AI_GRADIENT,
                boxShadow: "0 0 50px rgba(0,210,255,0.25)",
              }}
            >
              <div
                style={{
                  borderRadius: 999,
                  backgroundColor: "#0D1310",
                  padding: "13px 32px",
                  fontFamily: FONT_BODY,
                  fontSize: 25,
                  fontWeight: 700,
                  color: COLORS.white,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                ✦ Order <span style={{ color: COLORS.mint }}>46 units</span> by
                Aug 16 — covers the next 30 days
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <DemoCaption from={80}>Per variant · per location · updated daily</DemoCaption>
      <Audio src={staticFile("success.mp3")} from={74} volume={0.4} />
    </Stage>
  );
};
