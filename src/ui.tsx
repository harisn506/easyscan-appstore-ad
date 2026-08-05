import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AI_GRADIENT, FONT_BODY, POLARIS } from "./theme";

// EasyScan app icon (real logo asset)
export const AppIcon: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <Img
    src={staticFile("logo.png")}
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.26,
      flexShrink: 0,
    }}
  />
);

// ——— EasyScan embedded-in-Shopify mock kit — matched to real admin screenshot ———
// Chrome: dark Shopify top bar (search ⌘K, bell, merchant avatar) + light left
// sidebar (Home/Orders/Products/... , Apps > EasyScan sub-nav) + content pane.

export const PBadge: React.FC<{
  children: React.ReactNode;
  tone?: "default" | "success" | "attention" | "info" | "ready";
}> = ({ children, tone = "default" }) => {
  const map = {
    default: { bg: "#E4E5E7", fg: "#202223" },
    success: { bg: "#AEE9D1", fg: "#0C5132" },
    attention: { bg: "#FFEA8A", fg: "#5E4200" },
    info: { bg: "#A4E8F2", fg: "#00527C" },
    ready: { bg: "#CBF4E3", fg: "#0C5132" },
  }[tone];
  return (
    <span
      style={{
        fontFamily: FONT_BODY,
        fontSize: 19,
        fontWeight: 500,
        color: map.fg,
        backgroundColor: map.bg,
        padding: "4px 14px",
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

export const PButton: React.FC<{
  children: React.ReactNode;
  primary?: boolean;
  disabled?: boolean;
  pressedAt?: number;
}> = ({ children, primary, disabled, pressedAt }) => {
  const frame = useCurrentFrame();
  const pressed =
    pressedAt !== undefined && frame >= pressedAt && frame < pressedAt + 6;
  return (
    <div
      style={{
        fontFamily: FONT_BODY,
        fontSize: 21,
        fontWeight: 600,
        padding: "10px 22px",
        borderRadius: 10,
        color: disabled ? "#8C9196" : primary ? "#FFFFFF" : POLARIS.text,
        backgroundColor: disabled
          ? "#F1F1F1"
          : primary
            ? pressed
              ? "#303335"
              : "#1A1C1D"
            : pressed
              ? "#F0F0F0"
              : "#FFFFFF",
        border: primary || disabled ? "none" : `1px solid #D0D3D6`,
        boxShadow:
          primary || disabled
            ? "0 1px 0 rgba(0,0,0,0.1)"
            : "0 1px 1px rgba(0,0,0,0.07)",
        scale: pressed ? "0.96" : "1",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
};

export const PPlainAction: React.FC<{
  children: React.ReactNode;
  subdued?: boolean;
}> = ({ children, subdued }) => (
  <span
    style={{
      fontFamily: FONT_BODY,
      fontSize: 20,
      fontWeight: 500,
      color: subdued ? "#8C9196" : POLARIS.text,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

export const PillTabs: React.FC<{ tabs: string[]; active: string }> = ({
  tabs,
  active,
}) => (
  <div style={{ display: "flex", gap: 8, fontFamily: FONT_BODY, fontSize: 20 }}>
    {tabs.map((t) => (
      <div
        key={t}
        style={{
          padding: "7px 16px",
          borderRadius: 10,
          fontWeight: t === active ? 600 : 400,
          color: t === active ? "#007F5F" : "#42474C",
          backgroundColor: t === active ? "#E1F2E9" : "transparent",
        }}
      >
        {t}
      </div>
    ))}
  </div>
);

export const AISparkle: React.FC<{ size?: number }> = ({ size = 44 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        padding: 3,
        background: AI_GRADIENT,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: size / 3,
          background: AI_GRADIENT,
          filter: "blur(10px)",
          opacity: 0.55,
          rotate: `${frame * 2.4}deg`,
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: size / 5,
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.55,
        }}
      >
        ✦
      </div>
    </div>
  );
};

// Scan input row: qty stepper + "PER" + focused field with Ready badge + Add.
// `typedValue`/`typeStart` animate character-by-character typing.
export const ScanRow: React.FC<{
  typedValue?: string;
  typeStart?: number;
  placeholder?: string;
  addPressedAt?: number;
  width?: number;
}> = ({
  typedValue,
  typeStart = 0,
  placeholder = "Enter SKU/Barcode",
  addPressedAt,
  width = 1100,
}) => {
  const frame = useCurrentFrame();
  const chars =
    typedValue === undefined
      ? 0
      : Math.max(0, Math.floor((frame - typeStart) / 2));
  const shown = typedValue?.slice(0, chars) ?? "";
  const showCaret = Math.floor(frame / 12) % 2 === 0;
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "stretch", width }}>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 21,
          color: POLARIS.text,
          backgroundColor: "#FFFFFF",
          border: "1px solid #D0D3D6",
          borderRadius: 8,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        1 <span style={{ color: "#8C9196", fontSize: 15 }}>⇕</span>
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 19,
          fontWeight: 600,
          color: POLARIS.text,
          display: "flex",
          alignItems: "center",
        }}
      >
        PER
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#FFFFFF",
          border: "2px solid #4A90D9",
          outline: "1px solid #B3D1F0",
          borderRadius: 10,
          padding: "8px 14px",
          fontFamily: FONT_BODY,
          fontSize: 21,
        }}
      >
        <PBadge tone="ready">Ready</PBadge>
        <span style={{ color: shown ? POLARIS.text : "#8C9196" }}>
          {shown || placeholder}
        </span>
        {showCaret && (
          <span
            style={{ width: 2, height: 24, backgroundColor: POLARIS.text }}
          />
        )}
      </div>
      <PButton pressedAt={addPressedAt}>Add</PButton>
    </div>
  );
};

// App Bridge–style dark toast, bottom center of the admin frame
export const Toast: React.FC<{ children: React.ReactNode; from: number }> = ({
  children,
  from,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - from,
    fps,
    config: { damping: 15, stiffness: 160, mass: 0.7 },
  });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 26,
        left: "50%",
        translate: `-50% ${(1 - s) * 40}px`,
        opacity: s,
        backgroundColor: "#1A1C1D",
        color: "#FFFFFF",
        fontFamily: FONT_BODY,
        fontSize: 21,
        fontWeight: 500,
        padding: "13px 26px",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        zIndex: 40,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "#3DDC97" }}>✓</span> {children}
    </div>
  );
};

const SIDEBAR_MAIN = [
  { icon: "⌂", label: "Home" },
  { icon: "▤", label: "Orders", badge: "103" },
  { icon: "◈", label: "Products" },
  { icon: "◉", label: "Customers" },
  { icon: "↗", label: "Growth" },
  { icon: "◇", label: "Discounts" },
  { icon: "▣", label: "Content" },
  { icon: "◎", label: "Markets" },
  { icon: "▥", label: "Finance" },
  { icon: "▦", label: "Analytics" },
];

const EASYSCAN_SUB = [
  "Barcodes & SKUs",
  "Orders",
  "Create order",
  "Update inventory",
  "Check inventory",
  "Purchase orders",
  "Stocktake",
  "View more",
];

// Full embedded-admin frame matching the user's screenshot
export const AdminFrame: React.FC<{
  pageTitle: React.ReactNode;
  activeItem: string;
  titleBadge?: React.ReactNode;
  secondaryActions?: React.ReactNode;
  primaryAction?: React.ReactNode;
  backArrow?: boolean;
  children: React.ReactNode;
  width?: number;
  height?: number;
  from?: number;
}> = ({
  pageTitle,
  activeItem,
  titleBadge,
  secondaryActions,
  primaryAction,
  backArrow,
  children,
  width = 1640,
  height = 760,
  from = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - from,
    fps,
    config: { damping: 20, stiffness: 130, mass: 0.8 },
  });
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#F1F1F1",
        boxShadow: "0 30px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)",
        opacity: s,
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT_BODY,
        border: "1px solid #D8DADD",
      }}
    >
      {/* Shopify admin top bar */}
      <div
        style={{
          height: 56,
          backgroundColor: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: 16,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "#95BF47", fontSize: 24 }}>🛍</span> shopify
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 620,
            margin: "0 auto",
            height: 36,
            borderRadius: 10,
            backgroundColor: "#303030",
            color: "#B5B5B5",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 10,
          }}
        >
          ⌕ Search
          <span
            style={{
              marginLeft: "auto",
              fontSize: 15,
              border: "1px solid #4A4A4A",
              borderRadius: 6,
              padding: "1px 8px",
            }}
          >
            ⌘ K
          </span>
        </div>
        <div style={{ color: "#B5B5B5", fontSize: 20 }}>🔔</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#303030",
            borderRadius: 10,
            padding: "4px 10px 4px 4px",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              backgroundColor: "#36A3FF",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            AL
          </div>
          <span style={{ color: "#E3E3E3", fontSize: 18, fontWeight: 600 }}>
            ACME Ltd
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Shopify admin sidebar */}
        <div
          style={{
            width: 232,
            backgroundColor: "#EBEBEB",
            padding: "12px 8px",
            flexShrink: 0,
            fontSize: 18,
            color: "#303030",
            overflow: "hidden",
          }}
        >
          {SIDEBAR_MAIN.map((n) => (
            <div
              key={n.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 10px",
                borderRadius: 8,
                fontWeight: 500,
              }}
            >
              <span style={{ opacity: 0.65, fontSize: 16 }}>{n.icon}</span>
              {n.label}
              {n.badge && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 15,
                    backgroundColor: "#D9D9D9",
                    borderRadius: 6,
                    padding: "1px 8px",
                  }}
                >
                  {n.badge}
                </span>
              )}
            </div>
          ))}
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#616161",
              padding: "10px 10px 4px",
            }}
          >
            Apps ›
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 10px",
              borderRadius: 8,
              fontWeight: 600,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }}
          >
            <AppIcon size={22} />
            EasyScan
          </div>
          {EASYSCAN_SUB.map((n) => (
            <div
              key={n}
              style={{
                padding: "5px 10px 5px 42px",
                borderRadius: 8,
                fontSize: 17,
                fontWeight: n === activeItem ? 650 : 400,
                color: n === activeItem ? "#1A1C1D" : "#4A4A4A",
                backgroundColor: n === activeItem ? "#DEDEDE" : "transparent",
              }}
            >
              {n}
            </div>
          ))}
        </div>
        {/* Content pane */}
        <div
          style={{
            flex: 1,
            padding: "20px 28px",
            overflow: "hidden",
            position: "relative",
            backgroundColor: "#F1F1F1",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 18,
            }}
          >
            {backArrow && (
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  border: "1px solid #D0D3D6",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "#42474C",
                }}
              >
                ←
              </div>
            )}
            <AppIcon size={30} />
            <span style={{ color: "#8C9196", fontSize: 20 }}>›</span>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#202223" }}>
              {pageTitle}
            </div>
            {titleBadge}
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: 18,
                alignItems: "center",
              }}
            >
              {secondaryActions}
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 19,
                  fontWeight: 600,
                  padding: "8px 18px",
                  borderRadius: 10,
                  backgroundColor: "#E3E3E3",
                  color: "#303030",
                }}
              >
                Haris
              </div>
              {primaryAction}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export const PCard: React.FC<{
  children: React.ReactNode;
  title?: React.ReactNode;
  headerActions?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, title, headerActions, style }) => (
  <div
    style={{
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      boxShadow: "0 0 5px rgba(23,24,24,0.05), 0 1px 2px rgba(0,0,0,0.15)",
      ...style,
    }}
  >
    {title && (
      <div
        style={{
          padding: "16px 24px 10px",
          fontSize: 23,
          fontWeight: 600,
          color: "#202223",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        {title}
        {headerActions && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 22,
              alignItems: "center",
            }}
          >
            {headerActions}
          </div>
        )}
      </div>
    )}
    <div style={{ padding: title ? "4px 24px 16px" : "16px 24px" }}>
      {children}
    </div>
  </div>
);

// Kept for compatibility where a plain counter is useful in scenes
export const CountUp: React.FC<{ to: number; start: number; dur?: number }> = ({
  to,
  start,
  dur = 15,
}) => {
  const frame = useCurrentFrame();
  const v = Math.round(
    interpolate(frame, [start, start + dur], [0, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return <>{v}</>;
};
