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
import { Audio } from "@remotion/media";
import { Barcode, BarcodeBackdrop, LaserScan, Stage } from "../helpers";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../theme";

// Apple-keynote bento: EasyScan in the middle, the suite around it —
// every tile a moving symbol, not a sentence.

const MINT = COLORS.mint;

const Tile: React.FC<{
  order: number;
  col: string;
  row: string;
  center?: boolean;
  children: React.ReactNode;
}> = ({ order, col, row, center, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - 6 - order * 4,
    fps,
    config: { damping: 16, stiffness: 130, mass: 0.8 },
  });
  const floatY = Math.sin(frame / 40 + order * 1.3) * 3;
  return (
    <div
      style={{
        gridColumn: col,
        gridRow: row,
        borderRadius: 22,
        border: center
          ? `1.5px solid rgba(61,220,151,0.55)`
          : `1px solid ${COLORS.stroke}`,
        backgroundColor: center ? "rgba(13,25,19,0.95)" : "rgba(13,19,16,0.92)",
        boxShadow: center
          ? "0 0 90px rgba(0,128,96,0.35), 0 30px 80px rgba(0,0,0,0.5)"
          : "0 30px 80px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: 22,
        opacity: s,
        scale: String(0.82 + Math.min(s, 1) * 0.18),
        translate: `0px ${(1 - s) * 46 + floatY}px`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: FONT_MONO,
      fontSize: 20,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: COLORS.dim,
    }}
  >
    {children}
  </div>
);

// ——— symbols ———

const Spark: React.FC = () => {
  const frame = useCurrentFrame();
  const pts = [22, 27, 25, 34, 32, 42, 40, 52, 58, 70];
  const W = 300;
  const H = 104;
  const dx = W / (pts.length - 1);
  const path = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * dx} ${H - (v / 80) * H}`)
    .join(" ");
  const len = 500;
  const draw = Math.max(0, len - Math.max(0, frame - 18) * 16);
  const dotP = interpolate(frame, [18, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotI = dotP * (pts.length - 1);
  const dotX = dotI * dx;
  const lo = Math.floor(dotI);
  const hi = Math.min(pts.length - 1, lo + 1);
  const dotV = pts[lo] + (pts[hi] - pts[lo]) * (dotI - lo);
  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      <path
        d={path}
        fill="none"
        stroke={MINT}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={draw}
        style={{ filter: "drop-shadow(0 0 12px rgba(61,220,151,0.55))" }}
      />
      <circle
        cx={dotX}
        cy={H - (dotV / 80) * H}
        r={9}
        fill={MINT}
        opacity={dotP > 0.02 ? 1 : 0}
        style={{ filter: "drop-shadow(0 0 14px rgba(61,220,151,0.9))" }}
      />
    </svg>
  );
};

const PODoc: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line = (i: number) =>
    interpolate(frame, [22 + i * 7, 34 + i * 7], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const check = spring({
    frame: frame - 52,
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  return (
    <div style={{ position: "relative", width: 120, height: 126 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          backgroundColor: "#F4F7F5",
          boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
          padding: "20px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 13,
        }}
      >
        {[86, 62, 74].map((w, i) => (
          <div
            key={i}
            style={{
              height: 11,
              width: w * line(i) * 0.01 * 84,
              borderRadius: 6,
              backgroundColor: i === 0 ? "#1A1C1D" : "#A9B1AC",
            }}
          />
        ))}
        <div
          style={{
            height: 11,
            width: 44,
            borderRadius: 6,
            backgroundColor: MINT,
            opacity: line(3),
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: -16,
          bottom: -14,
          width: 52,
          height: 52,
          borderRadius: 26,
          backgroundColor: "#008060",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 900,
          scale: String(check),
          boxShadow: "0 0 30px rgba(0,128,96,0.7)",
        }}
      >
        ✓
      </div>
    </div>
  );
};

// 3×4 grid of SKUs counted one-by-one; one flags red — count everything,
// catch the odd one out.
const CountGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const COLS = 4;
  const BAD = 6; // index that flags red
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 52px)`,
        gap: 12,
      }}
    >
      {Array.from({ length: 12 }, (_, i) => {
        const at = 14 + i * 4;
        const on = frame >= at;
        const s = spring({
          frame: frame - at,
          fps,
          config: { damping: 12, stiffness: 200 },
        });
        const bad = i === BAD;
        const badPulse = bad && on ? 0.6 + Math.sin(frame / 7) * 0.4 : 0;
        return (
          <div
            key={i}
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              border: on
                ? bad
                  ? "2px solid rgba(255,80,68,0.9)"
                  : "2px solid rgba(61,220,151,0.7)"
                : "2px solid rgba(244,247,245,0.16)",
              backgroundColor: on
                ? bad
                  ? "rgba(255,59,48,0.16)"
                  : "rgba(0,128,96,0.22)"
                : "rgba(244,247,245,0.04)",
              color: bad ? "#FF6B5E" : MINT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 900,
              fontFamily: FONT_MONO,
              scale: String(on ? 0.75 + Math.min(s, 1) * 0.25 : 1),
              boxShadow: on
                ? bad
                  ? `0 0 ${14 + badPulse * 16}px rgba(255,59,48,0.6)`
                  : "0 0 14px rgba(0,128,96,0.35)"
                : "none",
            }}
          >
            {on ? (bad ? "!" : "✓") : ""}
          </div>
        );
      })}
    </div>
  );
};

const Bell: React.FC = () => {
  const frame = useCurrentFrame();
  const swingEnv = interpolate(frame, [20, 90], [1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rot = Math.sin(frame / 5.5) * 14 * swingEnv;
  const dot = 0.5 + Math.sin(frame / 8) * 0.5;
  return (
    <div style={{ position: "relative", width: 130, height: 130 }}>
      <svg
        width={130}
        height={130}
        viewBox="0 0 100 100"
        style={{
          transformOrigin: "50% 12%",
          transform: `rotate(${rot}deg)`,
          filter: "drop-shadow(0 12px 26px rgba(0,0,0,0.5))",
        }}
      >
        <path
          d="M50 10 C36 10 27 22 27 36 L27 56 L19 68 L81 68 L73 56 L73 36 C73 22 64 10 50 10 Z"
          fill="#F4F7F5"
        />
        <circle cx={50} cy={78} r={8} fill="#F4F7F5" />
      </svg>
      <div
        style={{
          position: "absolute",
          right: 14,
          top: 8,
          width: 26,
          height: 26,
          borderRadius: 13,
          backgroundColor: "#FF3B30",
          boxShadow: `0 0 ${12 + dot * 16}px rgba(255,59,48,${0.55 + dot * 0.45})`,
        }}
      />
    </div>
  );
};

// Handheld scanner firing a laser across a parcel's barcode — lock, flash, ✓.
// `hits`: frames at which the beam locks + fires (✓ stays after the last one).
// `k`: uniform scale — shrinks the layout box too, so flex rows don't overlap.
export const ScannerScan: React.FC<{ hits?: number[]; k?: number }> = ({
  hits = [52],
  k = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = hits.find((h) => frame >= h && frame < h + 20);
  const lastHit = [...hits].reverse().find((h) => frame >= h);
  const locked = active !== undefined;
  const sweep = locked ? 0 : Math.sin(frame / 9) * 9; // stripe hunts, then locks
  const flash =
    active === undefined
      ? 0
      : interpolate(frame - active, [0, 3, 14], [0, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const check = spring({
    frame: lastHit === undefined ? -1 : frame - lastHit - 2,
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const bob = Math.sin(frame / 26) * 3;
  // label geometry (absolute in the 320×170 canvas)
  const LX = 26; // label left
  const LY = 82; // label top
  const LW = 96;
  const LH = 60;
  const stripeY = LY + LH / 2 + sweep; // laser stripe across the barcode
  // scanner head tip (beam origin), matches the drawn scanner below
  const TIPX = 216;
  const TIPY = 54 + bob;
  return (
    <div style={{ width: 320 * k, height: 170 * k, flexShrink: 0 }}>
    <div
      style={{
        position: "relative",
        width: 320,
        height: 170,
        scale: String(k),
        transformOrigin: "top left",
      }}
    >
      {/* parcel */}
      <div
        style={{
          position: "absolute",
          left: 8,
          top: 58,
          width: 172,
          height: 112,
          borderRadius: 12,
          background: "linear-gradient(160deg, #C89A6B, #A87B4F)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "52%",
            width: 22,
            height: "100%",
            backgroundColor: "rgba(139,101,63,0.65)",
          }}
        />
      </div>
      {/* label with barcode (drawn outside parcel div so coords are canvas-absolute) */}
      <div
        style={{
          position: "absolute",
          left: LX,
          top: LY,
          width: LW,
          height: LH,
          borderRadius: 6,
          backgroundColor: "#F7F7F4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: flash
            ? `0 0 ${18 + flash * 22}px rgba(255,80,68,${0.5 + flash * 0.5})`
            : "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", gap: 2.5, height: 36, width: 72, alignItems: "stretch" }}>
          {[3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3].map((b, i) => (
            <div
              key={i}
              style={{
                flexGrow: b,
                backgroundColor: i % 2 === 0 ? "#16211B" : "transparent",
              }}
            />
          ))}
        </div>
      </div>
      {/* scanner: body angled toward the label, head at lower-left tip */}
      <div
        style={{
          position: "absolute",
          left: TIPX - 8,
          top: TIPY - 16,
          transform: "rotate(24deg)",
          transformOrigin: "0% 50%",
        }}
      >
        <div
          style={{
            width: 100,
            height: 44,
            borderRadius: "8px 14px 14px 8px",
            background: "linear-gradient(180deg, #3A403D, #1A1C1D)",
            boxShadow:
              "0 14px 30px rgba(0,0,0,0.55), inset 0 2px 3px rgba(255,255,255,0.15)",
            position: "relative",
          }}
        >
          {/* scan head window at the tip */}
          <div
            style={{
              position: "absolute",
              left: 2,
              top: 7,
              width: 10,
              height: 30,
              borderRadius: 4,
              background: locked ? "#FF3B30" : "#5A625E",
              boxShadow: locked ? "0 0 16px rgba(255,59,48,0.9)" : "none",
            }}
          />
          {/* grip below body */}
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: -36,
              width: 30,
              height: 46,
              borderRadius: "6px 6px 12px 12px",
              background: "linear-gradient(180deg, #2A2E2C, #16211B)",
              transform: "rotate(-16deg)",
            }}
          />
        </div>
      </div>
      {/* laser: cone from head tip fanning onto the label, stripe across barcode */}
      <svg
        width={320}
        height={170}
        style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
      >
        <polygon
          points={`${TIPX},${TIPY} ${LX + 4},${stripeY - 4} ${LX + LW - 4},${stripeY + 5}`}
          fill={`rgba(255,59,48,${locked ? 0.3 + flash * 0.25 : 0.14})`}
        />
        <line
          x1={LX + 4}
          y1={stripeY}
          x2={LX + LW - 4}
          y2={stripeY + 2}
          stroke={`rgba(255,59,48,${locked ? 0.95 : 0.6})`}
          strokeWidth={3.5}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 ${locked ? 14 : 7}px rgba(255,59,48,0.85))`,
          }}
        />
      </svg>
      {/* verified check pinned to label corner */}
      <div
        style={{
          position: "absolute",
          left: LX + LW - 16,
          top: LY - 18,
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor: "#008060",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 23,
          fontWeight: 900,
          scale: String(check),
          boxShadow: "0 0 26px rgba(0,128,96,0.7)",
          zIndex: 5,
        }}
      >
        ✓
      </div>
    </div>
    </div>
  );
};

const Pin: React.FC<{ size?: number; color?: string }> = ({
  size = 56,
  color = "#F4F7F5",
}) => (
  <svg width={size} height={size} viewBox="0 0 60 60">
    <path
      d="M30 4 C18 4 9 13 9 25 C9 40 30 56 30 56 C30 56 51 40 51 25 C51 13 42 4 30 4 Z"
      fill={color}
      style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.45))" }}
    />
    <circle cx={30} cy={24} r={9} fill="#0D1310" />
  </svg>
);

const Locations: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (frame % 56) / 56;
  const dotX = interpolate(t < 0.5 ? t * 2 : (1 - t) * 2, [0, 1], [26, 214]);
  const arcY = 46 - Math.sin((dotX - 26) / 188 * Math.PI) * 26;
  return (
    <div style={{ position: "relative", width: 240, height: 120 }}>
      <svg
        width={240}
        height={120}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <path
          d="M 26 46 Q 120 6 214 46"
          fill="none"
          stroke="rgba(61,220,151,0.4)"
          strokeWidth={3}
          strokeDasharray="8 10"
        />
        <circle
          cx={dotX}
          cy={arcY}
          r={7}
          fill={MINT}
          style={{ filter: "drop-shadow(0 0 12px rgba(61,220,151,0.9))" }}
        />
      </svg>
      <div style={{ position: "absolute", left: 0, top: 42 }}>
        <Pin />
      </div>
      <div style={{ position: "absolute", right: 0, top: 42 }}>
        <Pin color={MINT} />
      </div>
    </div>
  );
};

// ——— scene ———

export const Bento: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const kicker = spring({ frame, fps, config: { damping: 18 } });
  const logoPop = spring({
    frame: frame - 42,
    fps,
    config: { damping: 13, stiffness: 140 },
  });
  return (
    <Stage glow={0.75}>
      <BarcodeBackdrop opacity={0.035} />
      <Audio src={staticFile("beep.mp3")} from={52} volume={0.4} />
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT_MONO,
          fontSize: 26,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: COLORS.lime,
          opacity: kicker,
        }}
      >
        Everything inventory · one app
      </div>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "500px 520px 500px",
            gridTemplateRows: "236px 252px 236px",
            gap: 20,
            marginTop: 52,
          }}
        >
          <Tile order={1} col="1" row="1">
            <Spark />
            <Label>Demand forecast</Label>
          </Tile>
          <Tile order={3} col="2" row="1">
            <PODoc />
            <Label>Purchase orders</Label>
          </Tile>
          <Tile order={5} col="3" row="1">
            <div style={{ position: "relative", padding: "8px 0" }}>
              <Barcode height={84} width={280} />
              <LaserScan from={46} duration={22} />
            </div>
            <Label>Barcode labels</Label>
          </Tile>
          <Tile order={7} col="1" row="2">
            <CountGrid />
            <Label>Stock counts</Label>
          </Tile>
          <Tile order={8} col="2" row="2" center>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                scale: String(0.9 + Math.min(logoPop, 1) * 0.1),
              }}
            >
              <Img
                src={staticFile("logo.png")}
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 24,
                  boxShadow: "0 0 50px rgba(0,128,96,0.5)",
                }}
              />
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 74,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: COLORS.white,
                }}
              >
                Easy<span style={{ color: MINT }}>Scan</span>
              </div>
            </div>
          </Tile>
          <Tile order={2} col="3" row="2">
            <Bell />
            <Label>Low-stock alerts</Label>
          </Tile>
          <Tile order={6} col="1" row="3">
            <ScannerScan k={0.82} />
            <Label>Scan-verified picking</Label>
          </Tile>
          <Tile order={4} col="2" row="3">
            <Locations />
            <Label>Multi-location</Label>
          </Tile>
          <Tile order={9} col="3" row="3">
            <Img
              src={staticFile("bfs.png")}
              style={{ height: 68, borderRadius: 17 }}
            />
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 24,
                color: MINT,
                fontWeight: 700,
              }}
            >
              ★★★★★ 5.0
            </div>
          </Tile>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
