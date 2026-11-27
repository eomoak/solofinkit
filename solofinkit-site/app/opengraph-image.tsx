import { ImageResponse } from "next/og";

export const alt = "SoloFinKit — Practical Financial & Cross-Border Calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "76px 88px", background: "#F8FAFC", color: "#0F172A", position: "relative" }}>
        <div style={{ position: "absolute", right: 82, top: 78, width: 270, height: 270, borderRadius: 58, background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="168" height="168" viewBox="0 0 32 32" fill="none">
            <path d="M5 25H27" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
            <rect x="6" y="17" width="5" height="8" rx="1.2" fill="#34D399" />
            <rect x="13.5" y="12" width="5" height="13" rx="1.2" fill="#34D399" />
            <rect x="21" y="6" width="5" height="19" rx="1.2" fill="#34D399" />
          </svg>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 27, fontWeight: 700, letterSpacing: 1, color: "#059669" }}>SOLOFINKIT.COM</div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 34, maxWidth: 760 }}>
          <div style={{ fontSize: 66, lineHeight: 1.12, fontWeight: 750, letterSpacing: -2.5 }}>Practical financial</div>
          <div style={{ fontSize: 66, lineHeight: 1.12, fontWeight: 750, letterSpacing: -2.5 }}>tools for global work.</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 27, lineHeight: 1.4, color: "#475569", maxWidth: 730 }}>Financial &amp; cross-border calculators for freelancers and global sellers.</div>
        </div>
        <div style={{ position: "absolute", left: 88, bottom: 58, width: 1024, height: 4, background: "#DCE5EE", borderRadius: 4 }} />
      </div>
    ),
    { ...size },
  );
}
