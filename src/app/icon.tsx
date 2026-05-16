import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1a1714",
          color: "#f0a73a",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontSize: 22,
          fontStyle: "italic",
          fontWeight: 500,
          letterSpacing: -1,
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
