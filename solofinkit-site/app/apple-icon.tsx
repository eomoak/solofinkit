import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0F172A", borderRadius: 42 }}>
        <svg width="116" height="116" viewBox="0 0 32 32" fill="none">
          <path d="M5 25H27" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="6" y="17" width="5" height="8" rx="1.2" fill="#34D399" />
          <rect x="13.5" y="12" width="5" height="13" rx="1.2" fill="#34D399" />
          <rect x="21" y="6" width="5" height="19" rx="1.2" fill="#34D399" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
