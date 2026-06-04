import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080a",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 100 100">
          <g stroke="#ecd49b" strokeWidth="5" strokeLinejoin="round" fill="none">
            <polygon points="50,12 84,31 84,69 50,88 16,69 16,31" />
            <polygon points="50,33 68,44 68,63 50,73 32,63 32,44" />
            <line x1="50" y1="33" x2="50" y2="53" />
            <line x1="50" y1="53" x2="32" y2="63" />
            <line x1="50" y1="53" x2="68" y2="63" />
          </g>
        </svg>
      </div>
    ),
    size
  );
}
