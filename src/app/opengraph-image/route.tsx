import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  const size = { width: 1200, height: 630 };

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #080d1a 0%, #0f1628 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#00c4b4",
            fontSize: 20,
            letterSpacing: 4,
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Pharmaceutical CRO
        </div>

        <div
          style={{
            color: "white",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 800,
            marginBottom: 32,
          }}
        >
          Noralixlabs
        </div>

        <div
          style={{
            color: "#8a9bb5",
            fontSize: 24,
            maxWidth: 700,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          Formulation · Analytical · Stability · CTD/eCTD Dossiers
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {["ICH Compliant", "CTD/eCTD Ready", "End-to-End Support"].map((tag) => (
            <div
              key={tag}
              style={{
                border: "1px solid rgba(0,196,180,0.4)",
                color: "#00c4b4",
                padding: "8px 20px",
                borderRadius: 100,
                fontSize: 16,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 80,
            color: "#8a9bb5",
            fontSize: 18,
          }}
        >
          noralixlabs.com
        </div>
      </div>
    ),
    { ...size }
  );
}

