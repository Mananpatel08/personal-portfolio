import { ImageResponse } from "next/og";
import { profile } from "@/lib/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

/* Satori requires an explicit display on every node that has more than one
   child, so every wrapper here declares one. */
const row = { display: "flex", alignItems: "center" } as const;
const col = { display: "flex", flexDirection: "column" } as const;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          ...col,
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          backgroundColor: "#f2f0ea",
          padding: "72px 80px",
        }}
      >
        <div style={{ ...row, gap: 24 }}>
          <div
            style={{
              ...row,
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 22,
              backgroundColor: "#b34a22",
              color: "#f2f0ea",
              fontSize: 58,
            }}
          >
            M
          </div>
          <div style={col}>
            <div style={{ display: "flex", fontSize: 26, color: "#1a1815" }}>
              {profile.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#625f58",
                marginTop: 6,
              }}
            >
              {`${profile.role} · ${profile.location.short}`}
            </div>
          </div>
        </div>

        <div style={{ ...col, maxWidth: 960 }}>
          <div
            style={{
              display: "flex",
              fontSize: 70,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              color: "#1a1815",
            }}
          >
            I build the quiet half of the product.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 70,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              color: "#8a867b",
            }}
          >
            Backend, at Wedowebapps.
          </div>
        </div>

        <div
          style={{
            ...row,
            justifyContent: "space-between",
            borderTop: "1px solid rgba(26,24,21,0.12)",
            paddingTop: 26,
            fontSize: 21,
            color: "#625f58",
          }}
        >
          <div style={{ display: "flex" }}>
            Python · Django REST Framework · FastAPI · PostgreSQL
          </div>
          <div style={{ display: "flex" }}>mananpatel.dev</div>
        </div>
      </div>
    ),
    size,
  );
}
