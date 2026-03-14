// ─── Node Types ────────────────────────────────────────────────────────────────
export const NODE_TYPES = {
  ROOT: "ROOT",
  BODY_PART: "BODY_PART",
  SERGERY: "SERGERY",
  PRODUCT: "PRODUCT",
};

// ─── Type Display Config (matches project's light theme) ──────────────────────
export const TYPE_CONFIG = {
  BODY_PART: {
    color: "#f97316", // orange — matches project's primary
    bg: "#fff7ed",
    border: "#fed7aa",
    icon: "🫁",
    label: "Body Part",
  },
  SERGERY: {
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: "🔬",
    label: "Surgery",
  },
  PRODUCT: {
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    icon: "💊",
    label: "Product",
  },
};
