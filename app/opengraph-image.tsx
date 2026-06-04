import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BIZBUYUK Real Estate — Your trusted partner in the Dubai property market";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* gold glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,161,90,0.35), transparent 65%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 100 100">
            <g stroke="#ecd49b" strokeWidth="5" strokeLinejoin="round" fill="none">
              <polygon points="50,12 84,31 84,69 50,88 16,69 16,31" />
              <polygon points="50,33 68,44 68,63 50,73 32,63 32,44" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#f3ede1", fontSize: 30, letterSpacing: 4, fontWeight: 700 }}>
              BIZBUYUK
            </span>
            <span style={{ color: "#c8a15a", fontSize: 14, letterSpacing: 6 }}>REAL ESTATE</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <span style={{ color: "#c8a15a", fontSize: 22, letterSpacing: 8, marginBottom: 24 }}>
            DUBAI · EST. 2023
          </span>
          <span style={{ color: "#f3ede1", fontSize: 72, lineHeight: 1.05 }}>
            Your trusted partner in the
            <span style={{ color: "#ecd49b" }}> Dubai property</span> market.
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#9c9488", fontSize: 22 }}>
          <span>bizbuyuk.com</span>
          <span>+971 55 479 13 13</span>
        </div>
      </div>
    ),
    size
  );
}
