import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#180f17", color: "#f0e9e1", display: "flex", flexDirection: "column", justifyContent: "center", padding: 86, fontFamily: "serif", borderTop: "14px solid #ae4c5a" }}><div style={{ display: "flex", justifyContent: "space-between", width: "100%", borderBottom: "1px solid #8f505e", paddingBottom: 22, fontSize: 20, letterSpacing: 6, color: "#e4b5ae" }}><span>THE LIVING MANUSCRIPT</span><span>01 / 01</span></div><div style={{ fontSize: 116, fontStyle: "italic", letterSpacing: -5, marginTop: 50 }}>Muwafaq Sami.</div><div style={{ fontSize: 26, color: "#d1bfc2", marginTop: 10, fontFamily: "sans-serif" }}>Creative writer · Screenwriter · Narrative designer</div></div>, size);
}
