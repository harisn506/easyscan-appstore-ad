import { loadFont as loadInterTight } from "@remotion/google-fonts/InterTight";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const interTight = loadInterTight("normal", {
  weights: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const mono = loadMono("normal", { weights: ["500", "700"], subsets: ["latin"] });

export const FONT_DISPLAY = interTight.fontFamily;
export const FONT_BODY = inter.fontFamily;
export const FONT_MONO = mono.fontFamily;

export const COLORS = {
  bg: "#070B09",
  bgPanel: "#0E1512",
  bgPanelSoft: "#121B17",
  stroke: "rgba(149, 191, 71, 0.16)",
  strokeSoft: "rgba(255,255,255,0.08)",
  green: "#00A67C",
  shopifyGreen: "#008060",
  lime: "#95BF47",
  mint: "#3DDC97",
  white: "#F4F7F5",
  dim: "rgba(244,247,245,0.55)",
  faint: "rgba(244,247,245,0.28)",
  amber: "#F5B950",
  red: "#F0635A",
};

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Polaris v10 light admin (matches real EasyScan)
export const POLARIS = {
  bg: "#F6F6F7",
  surface: "#FFFFFF",
  border: "#E1E3E5",
  text: "#202223",
  subdued: "#6D7175",
  primary: "#2C6ECB",
  primaryDown: "#1F5199",
  interactive: "#2C6ECB",
  successBg: "#AEE9D1",
  successText: "#0C5132",
  attentionBg: "#FFEA8A",
  attentionText: "#5E4200",
  infoBg: "#A4E8F2",
  infoText: "#00527C",
  badgeBg: "#E4E5E7",
  badgeText: "#202223",
  green: "#008060",
};

// Smart generate sparkle gradient (real EasyScan brand accent)
export const AI_GRADIENT =
  "conic-gradient(from 0deg, rgba(0,210,255,1), rgba(44,110,203,1), rgba(0,128,96,1), rgba(0,210,255,1))";
