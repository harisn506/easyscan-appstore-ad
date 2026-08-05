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
import {
  Count,
  DemoCaption,
  DemoStage,
  Flash,
  Float,
  Panel,
  RowIn,
  SceneHead,
  TypeIn,
} from "../demo";
import { Cursor, LaserScan } from "../helpers";
import {
  AISparkle,
  AdminFrame,
  AppIcon,
  PBadge,
  PButton,
  PCard,
  ScanRow,
  Toast,
} from "../ui";
import { AI_GRADIENT, COLORS, FONT_BODY, FONT_MONO } from "../theme";

const GREEN = "#008060";
const TXT = "#202223";
const SUB = "#6D7175";

const cell: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: 22,
  color: TXT,
  display: "flex",
  alignItems: "center",
};

const numBox = (active?: boolean): React.CSSProperties => ({
  width: 110,
  height: 46,
  borderRadius: 9,
  border: active ? "2px solid #4A90D9" : "1px solid #D0D3D6",
  backgroundColor: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  padding: "0 14px",
  fontFamily: FONT_BODY,
  fontSize: 22,
  color: TXT,
  position: "relative",
});

// ————— Inside Shopify (embedded establish) —————
export const AdminScene: React.FC = () => {
  return (
    <DemoStage>
      <SceneHead
        words={[
          { text: "Right" },
          { text: "inside", color: GREEN },
          { text: "Shopify.", color: GREEN },
        ]}
      />
      <Float top={236} tilt={16} push={0.06}>
        <div style={{ position: "relative" }}>
        <AdminFrame
          pageTitle="Dashboard"
          activeItem=""
          width={1560}
          height={680}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <PCard>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <PButton>Orders</PButton>
                <PButton>Update inventory</PButton>
                <PButton>Edit bin locations</PButton>
                <PButton>Put away stock</PButton>
                <PButton>All purchase orders</PButton>
              </div>
            </PCard>
            <div style={{ display: "flex", gap: 18 }}>
              {[
                ["🖨", "Print barcode labels"],
                ["▦", "Assign barcodes & SKUs"],
                ["⚠", "Inventory alerts"],
              ].map(([icon, label], i) => (
                <RowIn from={26 + i * 6} key={label} style={{ flex: 1 }}>
                  <PCard>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        fontSize: 23,
                        fontWeight: 600,
                        color: TXT,
                        padding: "6px 0",
                      }}
                    >
                      <span style={{ fontSize: 26 }}>{icon}</span>
                      {label}
                    </div>
                  </PCard>
                </RowIn>
              ))}
            </div>
            <RowIn from={44}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  backgroundColor: "#E7F4EE",
                  border: "1px solid #B8E3CF",
                  borderRadius: 12,
                  padding: "16px 24px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: GREEN,
                      marginBottom: 4,
                    }}
                  >
                    NEW IN EASYSCAN
                  </div>
                  <div style={{ fontSize: 23, fontWeight: 700, color: TXT }}>
                    Inventory alerts for low stock
                  </div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <PButton primary>Try it out</PButton>
                </div>
              </div>
            </RowIn>
          </div>
        </AdminFrame>
        <Cursor
          path={[
            { x: 780, y: 430, at: 40 },
            { x: 115, y: 505, at: 58 },
          ]}
          clicks={[64]}
        />
        </div>
      </Float>
      <DemoCaption from={58}>
        No new tabs, no exports — Built for Shopify
      </DemoCaption>
    </DemoStage>
  );
};

// ————— 01 · Plan: inventory requirements —————
const REQ_ROWS = [
  { emoji: "🏖", name: "Beach Ball - 10 inch", sku: "20327969756327", avail: "5,555" },
  { emoji: "🪑", name: "Deck Chair - Blue", sku: "basicdeckchair-1", avail: "21" },
  { emoji: "🎁", name: "Gift Card - £25.00", sku: "62317931452807", avail: "0" },
];

export const PlanScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <DemoStage>
      <SceneHead
        chapter={{ n: "01", label: "Plan" }}
        words={[
          { text: "Set" },
          { text: "your" },
          { text: "rules", color: GREEN },
          { text: "once.", color: GREEN },
        ]}
      />
      <Float top={300}>
        <Panel title="Inventory requirements" width={1400}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 150px 130px 130px 130px",
              gap: "0 22px",
              alignItems: "center",
            }}
          >
            {["Product", "Available", "Min", "Max", "MOQ"].map((h, i) => (
              <div
                key={h}
                style={{
                  ...cell,
                  fontSize: 19,
                  color: SUB,
                  fontWeight: 600,
                  padding: "6px 0 14px",
                  justifyContent: i > 0 ? "flex-end" : "flex-start",
                }}
              >
                {h}
              </div>
            ))}
            {REQ_ROWS.map((r, i) => {
              const hero = i === 0;
              return (
                <React.Fragment key={r.sku}>
                  <RowIn from={10 + i * 5}>
                    <div style={{ ...cell, gap: 16, padding: "13px 0" }}>
                      <span style={{ fontSize: 30 }}>{r.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{r.name}</div>
                        <div style={{ fontSize: 18, color: SUB }}>{r.sku}</div>
                      </div>
                    </div>
                  </RowIn>
                  <RowIn from={10 + i * 5}>
                    <div style={{ ...cell, justifyContent: "flex-end" }}>
                      {r.avail}
                    </div>
                  </RowIn>
                  <RowIn from={10 + i * 5}>
                    <div style={numBox()}>{hero ? "" : i === 1 ? "10" : ""}</div>
                  </RowIn>
                  <RowIn from={10 + i * 5}>
                    <div style={numBox(hero && frame >= 46 && frame < 66)}>
                      {hero ? <TypeIn text="100" from={52} speed={3} /> : i === 1 ? "40" : "200"}
                      {hero && <Flash at={62} />}
                    </div>
                  </RowIn>
                  <RowIn from={10 + i * 5}>
                    <div style={numBox(hero && frame >= 68 && frame < 86)}>
                      {hero ? <TypeIn text="10" from={74} speed={3} /> : ""}
                      {hero && <Flash at={82} />}
                    </div>
                  </RowIn>
                </React.Fragment>
              );
            })}
          </div>
          <Cursor
            path={[
              { x: 700, y: 300, at: 36 },
              { x: 1160, y: 205, at: 48 },
              { x: 1330, y: 205, at: 70 },
            ]}
            clicks={[50, 72]}
          />
        </Panel>
      </Float>
      <DemoCaption from={64}>
        Min, max, MOQ — EasyScan does the math forever
      </DemoCaption>
    </DemoStage>
  );
};

// ————— 02 · Order: Smart generate → PO assembles itself —————
const Radio: React.FC<{ on?: boolean }> = ({ on }) => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: 12,
      border: on ? "7px solid #2C6ECB" : "2px solid #8C9196",
      backgroundColor: "#fff",
      flexShrink: 0,
    }}
  />
);

export const OrderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // phase windows
  const A_END = 96; // modal
  const B_END = 142; // scanning
  const scanO = interpolate(frame, [A_END - 6, A_END, B_END, B_END + 6], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const poS = spring({
    frame: frame - B_END,
    fps,
    config: { damping: 19, stiffness: 120 },
  });
  const flip = spring({
    frame: frame - 176,
    fps,
    config: { damping: 15, stiffness: 150 },
  });
  return (
    <DemoStage>
      <SceneHead
        chapter={{ n: "02", label: "Order" }}
        words={[
          { text: "POs" },
          { text: "that" },
          { text: "write", color: GREEN },
          { text: "themselves.", color: GREEN },
        ]}
      />
      {/* Phase A — Smart generate modal */}
      {frame < A_END && (
        <Float top={288} width={1000}>
          <div
            style={{
              borderRadius: 18,
              backgroundColor: "#FFFFFF",
              boxShadow:
                "0 36px 90px rgba(10,30,22,0.35), 0 12px 32px rgba(10,30,22,0.18)",
              overflow: "hidden",
              fontFamily: FONT_BODY,
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "20px 30px",
                borderBottom: "1px solid #E1E3E5",
                fontSize: 28,
                fontWeight: 700,
                color: TXT,
              }}
            >
              <AISparkle size={38} /> Smart generate
              <span style={{ marginLeft: "auto", color: SUB, fontSize: 26 }}>✕</span>
            </div>
            <div style={{ padding: "22px 30px", display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", gap: 20 }}>
                {[
                  ["Supplier", "Asda"],
                  ["Destination", "Dodpits House"],
                ].map(([label, val]) => (
                  <div key={label} style={{ flex: 1 }}>
                    <div style={{ fontSize: 19, color: SUB, marginBottom: 8 }}>{label}</div>
                    <div
                      style={{
                        border: "1px solid #D0D3D6",
                        borderRadius: 10,
                        padding: "11px 16px",
                        fontSize: 22,
                        color: TXT,
                        display: "flex",
                      }}
                    >
                      {val}
                      <span style={{ marginLeft: "auto", color: SUB }}>⇕</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 21, fontWeight: 700, color: TXT, marginTop: 4 }}>
                Restock strategy
              </div>
              <RowIn from={20}>
                <div
                  style={{
                    border: "2px solid #2C6ECB",
                    backgroundColor: "#F2F7FE",
                    borderRadius: 12,
                    padding: "16px 20px",
                    display: "flex",
                    gap: 16,
                    position: "relative",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: TXT }}>
                      Demand forecast
                    </div>
                    <div style={{ fontSize: 19, color: SUB, lineHeight: 1.45, marginTop: 4 }}>
                      Suggests how much to order from how fast each item sells,
                      your supplier's lead time, and your minimum stock levels
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        fontSize: 19,
                        color: TXT,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      Days of stock to order
                      <span
                        style={{
                          border: "1px solid #D0D3D6",
                          borderRadius: 8,
                          padding: "4px 14px",
                          backgroundColor: "#fff",
                        }}
                      >
                        30
                      </span>
                    </div>
                  </div>
                  <Radio on />
                </div>
              </RowIn>
              <div style={{ display: "flex", gap: 16, opacity: 0.55 }}>
                <div
                  style={{
                    flex: 1,
                    border: "1px solid #D0D3D6",
                    borderRadius: 12,
                    padding: "12px 20px",
                    fontSize: 21,
                    color: TXT,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  Smart restock <div style={{ marginLeft: "auto" }}><Radio /></div>
                </div>
                <div
                  style={{
                    flex: 1,
                    border: "1px solid #D0D3D6",
                    borderRadius: 12,
                    padding: "12px 20px",
                    fontSize: 21,
                    color: TXT,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  Fill to maximum <div style={{ marginLeft: "auto" }}><Radio /></div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 14, marginTop: 4 }}>
                <PButton>Cancel</PButton>
                <PButton primary pressedAt={88}>Generate</PButton>
              </div>
            </div>
            <Cursor
              path={[
                { x: 520, y: 420, at: 44 },
                { x: 902, y: 580, at: 78 },
              ]}
              clicks={[88]}
            />
          </div>
        </Float>
      )}
      {/* Phase B — AI scanning */}
      {scanO > 0 && (
        <AbsoluteFill style={{ alignItems: "center", zIndex: 12, opacity: scanO }}>
          <div
            style={{
              position: "absolute",
              top: 384,
              width: 760,
              borderRadius: 20,
              padding: 4,
              background: AI_GRADIENT,
              boxShadow: "0 30px 80px rgba(10,30,22,0.35)",
            }}
          >
            <div
              style={{
                borderRadius: 16,
                backgroundColor: "#FFFFFF",
                padding: "44px 50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                fontFamily: FONT_BODY,
              }}
            >
              <AISparkle size={62} />
              <div style={{ fontSize: 32, fontWeight: 700, color: TXT }}>
                Scanning your Shopify catalog
              </div>
              <div style={{ fontSize: 24, color: SUB }}>
                Checked <span style={{ color: GREEN, fontWeight: 700 }}>
                  <Count from={A_END + 4} b={759} dur={34} />
                </span>{" "}
                variants · sales velocity · lead times
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}
      {/* Phase C — the PO assembles */}
      {frame >= B_END && (
        <AbsoluteFill style={{ alignItems: "center", zIndex: 12 }}>
          <div
            style={{
              position: "absolute",
              top: 268,
              width: 1180,
              // solidify fast — a half-transparent white panel over the stage
              // reads as a broken grey slab, not a surface
              opacity: Math.min(poS * 1.7, 1),
              translate: `0px ${(1 - poS) * 70}px`,
              scale: String(0.97 + poS * 0.03 + interpolate(frame, [B_END, B_END + 68], [0, 0.03], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })),
            }}
          >
            <Panel
              title="PO-1076"
              width={1180}
              badge={
                <div style={{ position: "relative", height: 34 }}>
                  <div style={{ opacity: 1 - flip, position: flip > 0.02 ? "absolute" : "relative" }}>
                    <PBadge>Draft</PBadge>
                  </div>
                  <div style={{ opacity: flip, scale: String(0.7 + flip * 0.3) }}>
                    <PBadge tone="info">Ordered</PBadge>
                  </div>
                </div>
              }
              actions={<PButton primary pressedAt={172}>Mark as ordered</PButton>}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { emoji: "🏖", name: "Beach Ball - 10 inch", meta: "H-APPL · bin B12", qty: 41, cost: "£102.50" },
                  { emoji: "🍎", name: "Apple", meta: "APL · bins A1 A4", qty: 5, cost: "£2.50" },
                ].map((r, i) => (
                  <RowIn from={B_END + 6 + i * 8} key={r.name}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 18,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 12,
                        border: "1px solid #E1E3E5",
                        padding: "14px 22px",
                        fontFamily: FONT_BODY,
                      }}
                    >
                      <span style={{ fontSize: 32 }}>{r.emoji}</span>
                      <div>
                        <div style={{ fontSize: 23, fontWeight: 600, color: TXT }}>{r.name}</div>
                        <div style={{ fontSize: 18, color: SUB }}>{r.meta}</div>
                      </div>
                      <div style={{ marginLeft: "auto", fontSize: 23, color: TXT, fontFamily: FONT_MONO }}>
                        × <Count from={B_END + 12 + i * 8} b={r.qty} dur={16} />
                      </div>
                      <div style={{ width: 130, textAlign: "right", fontSize: 23, fontWeight: 600, color: TXT }}>
                        {r.cost}
                      </div>
                    </div>
                  </RowIn>
                ))}
                <RowIn from={B_END + 26}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 26,
                      padding: "8px 22px 2px",
                      fontSize: 24,
                      color: TXT,
                      fontWeight: 700,
                    }}
                  >
                    46 items
                    <span style={{ color: GREEN }}>£105.00</span>
                  </div>
                </RowIn>
              </div>
            </Panel>
          </div>
        </AbsoluteFill>
      )}
      <DemoCaption from={150}>
        Forecasts demand · drafts the PO · you approve
      </DemoCaption>
      <Audio src={staticFile("success.mp3")} from={178} volume={0.5} />
    </DemoStage>
  );
};

// ————— 03 · Receive —————
export const ReceiveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const done = frame >= 84;
  const barW = interpolate(frame, [56, 82], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <DemoStage>
      <SceneHead
        chapter={{ n: "03", label: "Receive" }}
        words={[
          { text: "Scan" },
          { text: "it" },
          { text: "in.", color: GREEN },
          { text: "Stock" },
          { text: "goes" },
          { text: "live.", color: GREEN },
        ]}
      />
      <Float top={312}>
        <Panel
          title="PO-1062"
          width={1340}
          badge={
            done ? <PBadge tone="success">Received</PBadge> : <PBadge tone="info">Ordered</PBadge>
          }
          actions={<PButton primary>Receive inventory</PButton>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative" }}>
            <ScanRow
              typedValue="35796189756327"
              typeStart={22}
              addPressedAt={52}
              width={1280}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                border: "1px solid #E1E3E5",
                padding: "16px 24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Flash at={54} />
              <span style={{ fontSize: 34 }}>🏖</span>
              <div>
                <div style={{ fontSize: 24, fontWeight: 600, color: TXT }}>
                  Beach Ball - 10 inch
                </div>
                <div style={{ fontSize: 19, color: SUB }}>
                  35796189756327 · bin B12
                </div>
              </div>
              <div style={{ marginLeft: "auto", width: 420 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 21,
                    color: TXT,
                    fontFamily: FONT_MONO,
                    marginBottom: 8,
                  }}
                >
                  <span>
                    <Count from={56} b={41} dur={26} /> of 41 received
                  </span>
                  {done && <span style={{ color: GREEN, fontWeight: 700 }}>✓</span>}
                </div>
                <div
                  style={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#E4E5E7",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${barW}%`,
                      height: "100%",
                      borderRadius: 6,
                      backgroundColor: GREEN,
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ height: 64 }} />
            {done && <Toast from={88}>Stock synced to Shopify — 41 units added</Toast>}
          </div>
        </Panel>
      </Float>
      <DemoCaption from={62}>Barcode receiving — no typing, no typos</DemoCaption>
      <Audio src={staticFile("beep.mp3")} from={52} volume={0.5} />
    </DemoStage>
  );
};

// ————— 04 · Labels (dark stage, label prints itself) —————
export const LabelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const label = spring({
    frame: frame - 8,
    fps,
    config: { damping: 19, stiffness: 110 },
  });
  const fan = spring({
    frame: frame - 66,
    fps,
    config: { damping: 18, stiffness: 100 },
  });
  const barGrow = (i: number) =>
    spring({
      frame: frame - 22 - i * 1.2,
      fps,
      config: { damping: 20, stiffness: 200 },
    });
  const bars = [3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 2, 1, 3, 2, 1, 4];
  const sheet = (rot: number, dx: number, o: number) => (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        transform: `rotate(${rot * fan}deg) translateX(${dx * fan}px)`,
        opacity: o,
      }}
    />
  );
  return (
    <DemoStage dark>
      <SceneHead
        dark
        chapter={{ n: "04", label: "Label" }}
        words={[
          { text: "Labels" },
          { text: "for" },
          { text: "anything", color: COLORS.mint },
          { text: "you" },
          { text: "sell." },
        ]}
      />
      <AbsoluteFill style={{ alignItems: "center", zIndex: 10 }}>
        <div
          style={{
            position: "absolute",
            top: 330,
            width: 720,
            height: 420,
            opacity: label,
            translate: `0px ${(1 - label) * 80}px`,
            scale: String(0.94 + label * 0.06 + interpolate(frame, [0, 105], [0, 0.04], { extrapolateRight: "clamp" })),
            // 3D swing on entrance only — steady state is 2D so the label
            // text stays sharp (3D compositing blurs rasterized text)
            transform: `${
              1 - label > 0.004
                ? `perspective(1600px) rotateY(${-14 * (1 - label)}deg) `
                : ""
            }rotate(${Math.sin(frame / 46) * 0.7}deg)`,
          }}
        >
          {sheet(-5, -26, 0.5)}
          {sheet(4, 22, 0.7)}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 14,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 36px 90px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              fontFamily: FONT_BODY,
            }}
          >
            <RowIn from={14}>
              <div style={{ fontSize: 34, fontWeight: 700, color: "#111" }}>
                Beach Ball - 10 inch
              </div>
            </RowIn>
            <RowIn from={18}>
              <div style={{ fontSize: 28, color: "#111" }}>$20.99</div>
            </RowIn>
            <div style={{ display: "flex", gap: 4, height: 110, width: 440, alignItems: "flex-end" }}>
              {bars.map((b, i) => (
                <div
                  key={i}
                  style={{
                    flexGrow: b,
                    height: `${barGrow(i) * 100}%`,
                    backgroundColor: i % 2 === 0 ? "#111" : "transparent",
                  }}
                />
              ))}
            </div>
            <RowIn from={52}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#111", letterSpacing: "0.14em" }}>
                35796189756327
              </div>
            </RowIn>
            <LaserScan from={80} duration={20} />
          </div>
        </div>
        <RowIn from={72} style={{ position: "absolute", top: 800, zIndex: 20 }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontFamily: FONT_MONO,
              fontSize: 24,
              color: COLORS.mint,
              border: `1px solid rgba(61,220,151,0.4)`,
              borderRadius: 999,
              padding: "10px 26px",
              backgroundColor: "rgba(10,14,12,0.7)",
            }}
          >
            Avery 3422 · 70 × 35 mm · 8 × 3 per sheet
          </div>
        </RowIn>
      </AbsoluteFill>
      <DemoCaption from={84}>Avery · Zebra · Dymo · fully custom layouts</DemoCaption>
      <Audio src={staticFile("beep.mp3")} from={92} volume={0.45} />
    </DemoStage>
  );
};

// ————— 05 · Count: check inventory —————
export const CountScene: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = [
    { emoji: "🧅", name: "Onion", bin: "No bin", onHand: "-1", count: 100, at: 40, diff: "(+101)", bad: true },
    { emoji: "🍌", name: "Banana", bin: "1234", onHand: "1000", count: 1000, at: 58, diff: "—", bad: false },
  ];
  return (
    <DemoStage>
      <SceneHead
        chapter={{ n: "05", label: "Count" }}
        words={[
          { text: "Count" },
          { text: "without", color: GREEN },
          { text: "closing", color: GREEN },
          { text: "shop." },
        ]}
      />
      <Float top={300}>
        <Panel
          title="Check inventory"
          width={1400}
          badge={<PBadge>Taporley Warehouse</PBadge>}
          actions={<PButton>Save report</PButton>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
            <ScanRow typedValue="16671771030407" typeStart={16} addPressedAt={38} width={1340} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 130px 130px 130px 150px",
                gap: "0 20px",
                fontSize: 19,
                color: SUB,
                fontWeight: 600,
                padding: "4px 24px 0",
              }}
            >
              <div>Product</div>
              <div style={{ textAlign: "right" }}>Bin</div>
              <div style={{ textAlign: "right" }}>Count</div>
              <div style={{ textAlign: "right" }}>On hand</div>
              <div style={{ textAlign: "right" }}>Difference</div>
            </div>
            {rows.map((r) => (
              <RowIn from={r.at - 20} key={r.name}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 130px 130px 130px 150px",
                    gap: "0 20px",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 12,
                    border: "1px solid #E1E3E5",
                    padding: "13px 24px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Flash at={r.at + 2} />
                  <div style={{ ...cell, gap: 14 }}>
                    <span style={{ fontSize: 30 }}>{r.emoji}</span>
                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                  </div>
                  <div style={{ ...cell, justifyContent: "flex-end", color: SUB, fontSize: 20 }}>{r.bin}</div>
                  <div style={{ ...cell, justifyContent: "flex-end", fontFamily: FONT_MONO }}>
                    {frame >= r.at ? <Count from={r.at} b={r.count} dur={14} /> : ""}
                  </div>
                  <div style={{ ...cell, justifyContent: "flex-end", fontFamily: FONT_MONO, color: r.bad ? "#D72C0D" : GREEN, fontWeight: 700 }}>
                    {r.onHand}
                  </div>
                  <div style={{ ...cell, justifyContent: "flex-end" }}>
                    {r.bad && frame >= 72 ? (
                      <span
                        style={{
                          color: "#D72C0D",
                          fontWeight: 800,
                          fontFamily: FONT_MONO,
                          fontSize: 23,
                          scale: String(Math.min(1, (frame - 72) / 6) * 0.3 + 0.7),
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {r.diff} ⚠
                      </span>
                    ) : (
                      !r.bad && frame >= r.at + 16 && <span style={{ color: SUB }}>{r.diff}</span>
                    )}
                  </div>
                </div>
              </RowIn>
            ))}
            <RowIn from={86}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  backgroundColor: "#FFF5EA",
                  border: "1px solid #E9C46A",
                  borderRadius: 12,
                  padding: "13px 22px",
                  fontSize: 21,
                  color: "#5E4200",
                  fontWeight: 600,
                }}
              >
                ⚠ 1 item exceeds the recorded on hand quantity — review before saving
              </div>
            </RowIn>
          </div>
        </Panel>
      </Float>
      <DemoCaption from={64}>Differences flagged before anything saves</DemoCaption>
      <Audio src={staticFile("beep.mp3")} from={40} volume={0.5} />
      <Audio src={staticFile("beep.mp3")} from={58} volume={0.5} />
    </DemoStage>
  );
};

// ————— Alerts (dark stage — it watches at night) —————
export const AlertsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const notif = spring({
    frame: frame - 52,
    fps,
    config: { damping: 15, stiffness: 130 },
  });
  const dot = 0.5 + Math.sin((frame / fps) * Math.PI * 2) * 0.5;
  return (
    <DemoStage dark>
      <SceneHead
        dark
        words={[
          { text: "Know" },
          { text: "before", color: COLORS.mint },
          { text: "you" },
          { text: "run" },
          { text: "out.", color: COLORS.mint },
        ]}
      />
      <Float top={330} width={1080}>
        <Panel
          title="Inventory alerts"
          width={1080}
          badge={<PBadge tone="success">Watching</PBadge>}
          actions={<PButton>Create alert rule</PButton>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 23,
                color: TXT,
                fontWeight: 600,
                padding: "2px 4px",
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: GREEN,
                  boxShadow: `0 0 ${10 + dot * 14}px rgba(0,128,96,${0.5 + dot * 0.5})`,
                }}
              />
              Low stock alerts are watching inventory
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                border: "1px solid #E1E3E5",
                padding: "15px 24px",
                fontSize: 22,
                color: TXT,
              }}
            >
              <div style={{ fontWeight: 700 }}>All products</div>
              <PBadge tone="attention">Below 10 units</PBadge>
              <div style={{ color: SUB }}>Daily digest · haris@506.io</div>
              <div style={{ marginLeft: "auto" }}>
                <PBadge tone="success">Active</PBadge>
              </div>
            </div>
          </div>
        </Panel>
      </Float>
      {/* Notification pops in */}
      <div
        style={{
          position: "absolute",
          right: 170,
          top: 610,
          width: 560,
          zIndex: 15,
          opacity: notif,
          translate: `${(1 - notif) * 120}px 0px`,
          transform: `rotate(${(1 - notif) * 3}deg)`,
        }}
      >
        <div
          style={{
            borderRadius: 16,
            backgroundColor: "#1A1C1D",
            border: "1px solid rgba(61,220,151,0.35)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 50px rgba(0,128,96,0.15)",
            padding: "20px 26px",
            fontFamily: FONT_BODY,
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 19, color: COLORS.mint, fontWeight: 700, marginBottom: 10 }}>
            <AppIcon size={26} />
            EasyScan · just now
          </div>
          <div style={{ fontSize: 23, fontWeight: 700 }}>
            Beach Ball - 12 inch is down to 8 units
          </div>
          <div style={{ fontSize: 20, color: "#9BA6A0", marginTop: 6 }}>
            Suggested reorder: 46 units from Asda →
          </div>
        </div>
      </div>
      <DemoCaption from={70}>Alert rules watch every SKU, day and night</DemoCaption>
    </DemoStage>
  );
};

// Oversized handheld scanner entering from the bottom-right corner, firing a
// red laser into the live scan field while the barcode digits stream in.
// Windows match the two ScanRow typing runs; beeps land at each window's end.
const HandScanner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame,
    fps,
    config: { damping: 17, stiffness: 150 },
  });
  // Track the panel's float so the beam stays glued to the input field
  const floatY = Math.sin(frame / 34) * 3 + Math.cos(frame / 21) * 1.6;
  const NX = 1618; // beam origin (scanner lens) in frame coords
  const NY = 606 + floatY * 0.5;
  const TX = 1235; // beam target: right half of the scan input
  const TY = 417 + floatY;
  const WINDOWS: Array<[number, number]> = [
    [14, 44],
    [56, 94],
  ];
  const win = WINDOWS.find(([a, b]) => frame >= a && frame < b);
  const fire = win
    ? interpolate(frame, [win[0], win[0] + 3, win[1] - 4, win[1]], [0, 1, 1, 0])
    : 0;
  const flick = 0.75 + 0.25 * Math.sin(frame * 1.9);
  const recoil = win ? 7 * Math.exp(-(frame - win[0]) / 5) : 0;
  const dx = NX - TX;
  const dy = NY - TY;
  const dist = Math.hypot(dx, dy);
  const rx = (dx / dist) * recoil;
  const ry = (dy / dist) * recoil;
  const sweep = Math.sin(frame / 2.6) * 74;
  // Point the nose (local -x) straight at the target, with a gentle idle sway
  const ang =
    (Math.atan2(TY - NY, TX - NX) * 180) / Math.PI +
    180 +
    Math.sin(frame / 30) * 1.2;
  const lensOn = fire > 0.15;
  return (
    <svg
      width={1920}
      height={1080}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 15,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id="scanBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A514D" />
          <stop offset="0.45" stopColor="#2E3331" />
          <stop offset="1" stopColor="#1B1E1D" />
        </linearGradient>
        <linearGradient id="scanGrip" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#343A37" />
          <stop offset="1" stopColor="#151817" />
        </linearGradient>
        <filter id="laserGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* laser: cone from lens onto the field, core beam, impact flare + dot */}
      {fire > 0 && (
        <g>
          <polygon
            points={`${NX},${NY} ${TX - 84},${TY} ${TX + 84},${TY}`}
            fill={`rgba(255,59,48,${0.13 * fire * flick})`}
          />
          <line
            x1={NX}
            y1={NY}
            x2={TX + sweep * 0.25}
            y2={TY}
            stroke="#FF6B5E"
            strokeWidth={3.5}
            strokeLinecap="round"
            opacity={0.85 * fire * flick}
            filter="url(#laserGlow)"
          />
          <line
            x1={TX - 84}
            y1={TY}
            x2={TX + 84}
            y2={TY}
            stroke="#FF3B30"
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.8 * fire}
            filter="url(#laserGlow)"
          />
          <circle
            cx={TX + sweep}
            cy={TY}
            r={5.5}
            fill="#FFD9D5"
            opacity={fire}
            filter="url(#laserGlow)"
          />
        </g>
      )}
      {/* the device — slides up from the corner like it's in the viewer's hand */}
      <g
        transform={`translate(${(1 - s) * 300}, ${(1 - s) * 220})`}
        opacity={Math.min(s * 1.4, 1)}
      >
        <g
          transform={`translate(${NX + rx}, ${NY + ry}) rotate(${ang}) scale(1.55)`}
        >
          {/* grip */}
          <g transform="translate(82,24) rotate(16)">
            <rect
              x={0}
              y={0}
              width={46}
              height={128}
              rx={22}
              fill="url(#scanGrip)"
            />
            <rect
              x={7}
              y={12}
              width={10}
              height={96}
              rx={5}
              fill="rgba(255,255,255,0.05)"
            />
            <ellipse cx={23} cy={124} rx={29} ry={13} fill="#141816" />
          </g>
          {/* trigger */}
          <rect x={60} y={30} width={15} height={26} rx={7} fill={GREEN} />
          {/* head */}
          <rect
            x={-12}
            y={-30}
            width={148}
            height={62}
            rx={24}
            fill="url(#scanBody)"
            stroke="rgba(255,255,255,0.09)"
          />
          <rect
            x={6}
            y={-25}
            width={108}
            height={7}
            rx={3.5}
            fill="rgba(255,255,255,0.13)"
          />
          {/* brand stripe */}
          <rect x={36} y={-30} width={7} height={62} fill={GREEN} opacity={0.85} />
          {/* nose lens housing + lens (lights red while firing) */}
          <rect x={-18} y={-21} width={20} height={44} rx={8} fill="#0F1211" />
          <rect
            x={-14}
            y={-13}
            width={12}
            height={28}
            rx={5}
            fill={lensOn ? "#FF3B30" : "#39423C"}
            filter={lensOn ? "url(#laserGlow)" : undefined}
          />
        </g>
      </g>
    </svg>
  );
};

// ————— 06 · Fulfil: pick list —————
export const FulfilScene: React.FC = () => {
  const frame = useCurrentFrame();
  const picked1 = frame >= 46;
  const picked2 = frame >= 96;
  const total = (picked1 ? 6 : 0) + (picked2 ? 3 : 0);
  const rows = [
    { emoji: "🍌", name: "Banana", bins: ["1234"], need: 6, at: 46, on: picked1 },
    { emoji: "🏖", name: "Beach Ball - 15 inch", bins: ["01-05", "P1", "P5"], need: 3, at: 96, on: picked2 },
  ];
  return (
    <DemoStage>
      <SceneHead
        chapter={{ n: "06", label: "Fulfil" }}
        words={[
          { text: "Pick" },
          { text: "fast." },
          { text: "Ship" },
          { text: "the" },
          { text: "right", color: GREEN },
          { text: "thing.", color: GREEN },
        ]}
      />
      <Float top={296}>
        <Panel
          title="Pick list"
          width={1380}
          badge={
            <span style={{ fontFamily: FONT_MONO, fontSize: 24, color: total === 9 ? GREEN : SUB, fontWeight: 700 }}>
              {total}/9 items
            </span>
          }
          actions={<PButton primary pressedAt={120}>Complete pick</PButton>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
            {frame < 56 ? (
              <ScanRow
                typedValue="12345678910"
                typeStart={16}
                addPressedAt={42}
                width={1320}
              />
            ) : (
              <ScanRow
                typedValue="35796188464295"
                typeStart={58}
                addPressedAt={92}
                width={1320}
              />
            )}
            {rows.map((r, i) => (
              <RowIn from={8 + i * 6} key={r.name}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    backgroundColor: r.on ? "#F0FAF5" : "#FFFFFF",
                    borderRadius: 12,
                    border: r.on ? `1.5px solid ${GREEN}` : "1px solid #E1E3E5",
                    padding: "16px 24px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Flash at={r.at} />
                  <span style={{ fontSize: 32 }}>{r.emoji}</span>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 600, color: TXT }}>{r.name}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      {r.bins.map((b) => (
                        <span
                          key={b}
                          style={{
                            fontSize: 17,
                            fontFamily: FONT_MONO,
                            backgroundColor: "#CBF4E3",
                            color: "#0C5132",
                            borderRadius: 7,
                            padding: "2px 10px",
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", fontFamily: FONT_MONO, fontSize: 26, fontWeight: 700, color: r.on ? GREEN : TXT }}>
                    {r.on ? r.need : 0}/{r.need}
                  </div>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      border: r.on ? "none" : "2px solid #D0D3D6",
                      backgroundColor: r.on ? GREEN : "#fff",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      fontWeight: 800,
                    }}
                  >
                    {r.on ? "✓" : ""}
                  </div>
                </div>
              </RowIn>
            ))}
            <div style={{ display: "flex", gap: 20, alignItems: "center", padding: "2px 4px" }}>
              <div style={{ fontSize: 21, color: SUB }}>
                25 orders · scan-verified against each item
              </div>
            </div>
            <div style={{ height: 60 }} />
            {frame >= 124 && <Toast from={124}>Pick complete — 25 orders ready to pack</Toast>}
          </div>
          <Cursor
            path={[
              { x: 900, y: 320, at: 100 },
              { x: 1245, y: 62, at: 114 },
            ]}
            clicks={[120]}
          />
        </Panel>
      </Float>
      {/* physical scan → digital effect: laser fires into the field as digits stream */}
      <HandScanner />
      <DemoCaption from={100}>Every pick checked by barcode — wrong items can't ship</DemoCaption>
      <Audio src={staticFile("beep.mp3")} from={44} volume={0.5} />
      <Audio src={staticFile("beep.mp3")} from={94} volume={0.5} />
      <Audio src={staticFile("complete.mp3")} from={122} volume={0.55} />
    </DemoStage>
  );
};
