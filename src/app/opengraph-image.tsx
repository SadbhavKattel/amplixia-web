import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";
export const alt = "Amplixia. AI services for businesses.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(240, 167, 58, 0.18), transparent 60%), #1a1714",
          color: "#f0e9dd",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#f0a73a",
              color: "#1a1714",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: -0.4,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 920 }}>
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.04,
              letterSpacing: -1.5,
              fontWeight: 400,
            }}
          >
            We help businesses{" "}
            <span style={{ fontStyle: "italic", color: "#f0a73a" }}>grow</span> with AI.
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a8a094",
              lineHeight: 1.4,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Marketing, ad creative, software, automation.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#807868",
            borderTop: "1px solid #322d27",
            paddingTop: 24,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <span>amplixia.com</span>
          <span>{siteConfig.email}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
