/* global React, CHARACTERS, PixelChar, getRating */

/* ============================================
   SHARE CARD — IG vertical 1080x1350
   Rendered at native size; scaled via CSS transform when shown
============================================ */
function ShareCard({ ko = 6, score = 1980, combo = 8, time = "00:30", kOd = [0, 2, 4, 5, 7, 9], topThree = [4, 5, 9], variant = "dark", playerName = "PLAYER 01", date = "2026.04.28" }) {
  const r = getRating(ko);

  // Aspect 1080x1350; will be displayed at native px so caller scales the box
  const w = 1080, h = 1350;

  return (
    <div style={{
      width: w, height: h,
      background: "#0E0B1A",
      backgroundImage: `
        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,45,92,.25), transparent 60%),
        radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,229,255,.18), transparent 60%),
        linear-gradient(rgba(255,210,63,.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,210,63,.06) 1px, transparent 1px)
      `,
      backgroundSize: "auto, auto, 40px 40px, 40px 40px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-display)",
      color: "#F5F1E6",
      padding: 64,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* scanlines */}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 2px, transparent 2px 4px)",
        pointerEvents: "none", mixBlendMode: "multiply", zIndex: 1,
      }} />

      {/* corner pixel ornaments */}
      <PixelCorner x={32} y={32} />
      <PixelCorner x={w - 60} y={32} flip="x" />
      <PixelCorner x={32} y={h - 60} flip="y" />
      <PixelCorner x={w - 60} y={h - 60} flip="xy" />

      {/* HEADER bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            fontFamily: "var(--font-pixel)", fontSize: 16,
            background: "#FF2D5C", color: "#F5F1E6",
            border: "3px solid #F5F1E6",
            padding: "8px 14px", letterSpacing: 2,
          }}>PUNCH AI · v26</div>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "#FFD23F", opacity: .85, letterSpacing: 1 }}>SCORE CARD</div>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, opacity: .65 }}>{date}</div>
      </div>

      {/* TITLE — 戰績 */}
      <div style={{ marginTop: 28, position: "relative", zIndex: 2 }}>
        <div style={{
          fontFamily: "var(--font-pixel)", fontSize: 76, lineHeight: 1.05,
          color: "#FFD23F",
          textShadow: "5px 0 0 #FF2D5C, -5px 0 0 #00E5FF, 0 0 28px rgba(255,210,63,.5)",
          letterSpacing: 4,
        }}>K.O. REPORT</div>
        <div style={{ fontFamily: "var(--font-zh)", fontSize: 26, marginTop: 8, opacity: .85, fontWeight: 700, letterSpacing: 1 }}>
          {playerName} · 30 秒擂台戰績結算
        </div>
      </div>

      {/* RATING block — left S, right titles + winner silhouette */}
      <div style={{
        marginTop: 32, position: "relative", zIndex: 2,
        background: "linear-gradient(180deg, rgba(38,29,68,.85) 0%, rgba(26,21,48,.85) 100%)",
        border: "5px solid #F5F1E6",
        boxShadow: "0 12px 0 rgba(0,0,0,.85), inset 0 0 0 2px #0E0B1A",
        padding: "28px 36px",
        display: "flex", alignItems: "center", gap: 32,
      }}>
        <div style={{
          fontFamily: "var(--font-pixel)", fontSize: 220, lineHeight: 1, color: r.color,
          textShadow: `7px 7px 0 #0E0B1A, 0 0 60px ${r.color}88`,
          minWidth: 200, textAlign: "center",
        }}>{r.tier}</div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "#F5F1E6", opacity: .55, letterSpacing: 1.5 }}>BOXER RANK</div>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: 36, color: r.color, letterSpacing: 2, lineHeight: 1.1 }}>{r.titleEn}</div>
          <div style={{ fontFamily: "var(--font-zh)", fontSize: 50, fontWeight: 900, lineHeight: 1.1, color: "#F5F1E6" }}>{r.titleZh}</div>
          <div style={{ fontFamily: "var(--font-zh)", fontSize: 22, opacity: .8, marginTop: 4 }}>{r.subZh}</div>
        </div>
      </div>

      {/* STAT row */}
      <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, position: "relative", zIndex: 2 }}>
        <StatCell label="KO 人數" sub="KNOCKOUTS" value={ko} suffix="/ 12" color="#FF2D5C" />
        <StatCell label="總得分" sub="TOTAL SCORE" value={score.toLocaleString()} color="#FFD23F" />
        <StatCell label="最高連擊" sub="BEST COMBO" value={combo} prefix="×" color="#00E5FF" />
      </div>

      {/* TRINITY: Time + accuracy + power — secondary row */}
      <div style={{
        marginTop: 18, position: "relative", zIndex: 2,
        background: "rgba(14,11,26,.5)",
        border: "3px solid rgba(245,241,230,.2)",
        padding: "14px 22px",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
        fontFamily: "var(--font-mono)", fontSize: 18,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ opacity: .55, fontSize: 14 }}>TIME</span>
          <span style={{ color: "#FFD23F", fontWeight: 700 }}>{time}</span>
        </div>
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.2)" }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ opacity: .55, fontSize: 14 }}>ACCURACY</span>
          <span style={{ color: "#39FF6A", fontWeight: 700 }}>{Math.min(99, 60 + ko * 4)}%</span>
        </div>
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.2)" }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ opacity: .55, fontSize: 14 }}>POWER</span>
          <span style={{ color: "#FF4FD8", fontWeight: 700 }}>{(score / Math.max(1, ko)).toFixed(0)}</span>
          <span style={{ opacity: .4, fontSize: 12 }}>pts/KO</span>
        </div>
      </div>

      {/* DEFEATED ROSTER */}
      <div style={{ marginTop: 22, position: "relative", zIndex: 2, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: 16, color: "#FFD23F", letterSpacing: 1.5 }}>DEFEATED PROPHETS</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, opacity: .55 }}>{kOd.length} / 12 down</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          {CHARACTERS.map((c, i) => {
            const dead = kOd.includes(i);
            return (
              <div key={c.id} style={{
                position: "relative",
                background: dead ? "rgba(38,29,68,.9)" : "rgba(14,11,26,.6)",
                border: `3px solid ${dead ? "#FF2D5C" : "rgba(245,241,230,.15)"}`,
                padding: "10px 6px 8px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                opacity: dead ? 1 : .3,
              }}>
                <div style={{ filter: dead ? "saturate(.5)" : "none" }}>
                  <PixelChar ch={c} state={dead ? "ko" : "idle"} scale={2.5} />
                </div>
                {dead && (
                  <div style={{
                    position: "absolute", top: 4, right: 4,
                    background: "#FF2D5C", color: "#F5F1E6",
                    fontFamily: "var(--font-pixel)", fontSize: 9,
                    padding: "2px 5px", border: "1.5px solid #0E0B1A", letterSpacing: 1,
                  }}>KO</div>
                )}
                <div style={{ fontFamily: "var(--font-zh)", fontSize: 12, color: "#F5F1E6", textAlign: "center", lineHeight: 1.2, fontWeight: 700, marginTop: 2 }}>
                  {c.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        marginTop: 18, position: "relative", zIndex: 2,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 16, borderTop: "3px dashed rgba(255,210,63,.4)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38, background: "#FF2D5C",
            border: "3px solid #F5F1E6", display: "grid", placeItems: "center",
            fontFamily: "var(--font-pixel)", fontSize: 18, color: "#F5F1E6",
          }}>!</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontFamily: "var(--font-pixel)", fontSize: 14, letterSpacing: 1.5, color: "#FFD23F" }}>#扁AI語錄 #AI不會取代你</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, opacity: .55 }}>frisk0316.github.io/punch_AI_prophet</div>
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "#F5F1E6", opacity: .8, letterSpacing: 2 }}>1 CREDIT</div>
      </div>
    </div>
  );
}

function StatCell({ label, sub, value, prefix, suffix, color }) {
  return (
    <div style={{
      background: "linear-gradient(180deg, #1A1530 0%, #0E0B1A 100%)",
      border: "4px solid #F5F1E6",
      boxShadow: "0 8px 0 rgba(0,0,0,.9), inset 0 0 0 2px #0E0B1A",
      padding: "20px 22px",
      display: "flex", flexDirection: "column", gap: 6,
      position: "relative",
    }}>
      <div style={{ fontFamily: "var(--font-zh)", fontSize: 18, color: "#F5F1E6", opacity: .75, fontWeight: 700 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        {prefix && <span style={{ fontFamily: "var(--font-mono)", fontSize: 32, color, fontWeight: 800 }}>{prefix}</span>}
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 56, color, lineHeight: 1, textShadow: "3px 3px 0 #0E0B1A" }}>{value}</span>
        {suffix && <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, opacity: .5 }}>{suffix}</span>}
      </div>
      <div style={{ fontFamily: "var(--font-pixel)", fontSize: 11, color: "#F5F1E6", opacity: .5, letterSpacing: 1.2 }}>{sub}</div>
    </div>
  );
}

function PixelCorner({ x, y, flip }) {
  // 8x8 pixel L-bracket
  const tx = flip && flip.includes("x") ? -1 : 1;
  const ty = flip && flip.includes("y") ? -1 : 1;
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: 28, height: 28,
      transform: `scale(${tx},${ty})`,
      transformOrigin: "center",
      zIndex: 1,
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 28, height: 6, background: "#FFD23F" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 6, height: 28, background: "#FFD23F" }} />
      <div style={{ position: "absolute", left: 8, top: 8, width: 12, height: 4, background: "#FF2D5C" }} />
      <div style={{ position: "absolute", left: 8, top: 8, width: 4, height: 12, background: "#FF2D5C" }} />
    </div>
  );
}

window.ShareCard = ShareCard;
