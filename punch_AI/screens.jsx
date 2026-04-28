/* global React, ReactDOM, CHARACTERS, PUNCH_WORDS, PixelChar, HPBar, Glove, SpeechBubble, GameHUD */
const { useState: useS2, useEffect: useE2, useMemo: useM2 } = React;

/* ============================================
   GAME ARENA SCREEN — used inside device frames
============================================ */
function GameArena({ width = 390, character, hp = 2, time = 24, score = 1340, ko = 4, combo = 6, gloveVariant = "v-classic", showImpact = true, scale = 1 }) {
  const ch = character || CHARACTERS[0];
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const charScale = isMobile ? 3 : isTablet ? 5 : 6;
  const gloveSize = isMobile ? 80 : isTablet ? 130 : 160;

  return (
    <div className="arcade-bg" style={{ width: "100%", height: "100%", position: "relative", padding: isMobile ? 16 : 28, display: "flex", flexDirection: "column", gap: isMobile ? 12 : 20 }}>
      {/* Top HUD */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <GameHUD time={time} score={score} ko={ko} combo={combo} />
      </div>

      {/* Center stage */}
      <div className="col center" style={{ flex: 1, gap: isMobile ? 10 : 22, position: "relative", zIndex: 2 }}>
        {/* NPC info row */}
        <div className="col center gap-2" style={{ width: "100%", maxWidth: 540 }}>
          <div className="row gap-2" style={{ alignItems: "center" }}>
            <div className="pix-chip" style={{ background: "var(--ink-2)", color: "var(--yellow)", border: "2px solid var(--yellow)" }}>
              CHALLENGER #{ch.idx ?? "07"}
            </div>
            <div className="t-zh" style={{ fontSize: isMobile ? 12 : 14, color: "var(--paper)", fontWeight: 700 }}>{ch.title}</div>
          </div>
          <HPBar hp={hp} max={3} label={ch.name.toUpperCase()} />
        </div>

        {/* Quote bubble */}
        <SpeechBubble quote={ch.quote} source={ch.title} />

        {/* Character */}
        <div style={{ position: "relative", marginTop: isMobile ? 4 : 8 }}>
          <PixelChar ch={ch} state={hp < 3 ? "hurt" : "idle"} scale={charScale} />
          {showImpact && (
            <div style={{ position: "absolute", top: -10, right: -40, transform: "rotate(8deg)" }}>
              <span className="impact go" style={{ fontSize: isMobile ? 22 : 32 }}>POW!</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom gloves */}
      <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", padding: isMobile ? "0 8px" : "0 32px", position: "relative", zIndex: 2 }}>
        <div style={{ transform: "translateY(20%)" }}>
          <Glove side="left" variant={gloveVariant} size={gloveSize} />
        </div>
        <div className="t-pixel center" style={{
          fontSize: isMobile ? 9 : 11, color: "var(--paper)", opacity: .8,
          textAlign: "center", padding: "8px 14px",
          border: "2px dashed rgba(255,255,255,.3)", borderRadius: 2
        }}>
          TAP TO PUNCH
        </div>
        <div style={{ transform: "translateY(20%)" }}>
          <Glove side="right" variant={gloveVariant} size={gloveSize} />
        </div>
      </div>
    </div>
  );
}

/* ============================================
   START / INTRO SCREEN
============================================ */
function StartScreen({ width = 390 }) {
  const isMobile = width < 600;
  return (
    <div className="arcade-bg col center" style={{ width: "100%", height: "100%", padding: isMobile ? 22 : 40, gap: isMobile ? 16 : 24, position: "relative" }}>
      <div className="pix-chip" style={{ background: "var(--red)", color: "var(--paper)" }}>INSERT COIN · ROUND 0</div>
      <div className="headline" style={{ fontSize: isMobile ? 28 : 56, textAlign: "center", maxWidth: 800 }}>
        PUNCH<br/>AI PROPHETS
      </div>
      <div className="t-zh" style={{ fontSize: isMobile ? 13 : 18, color: "var(--paper)", textAlign: "center", maxWidth: 480, lineHeight: 1.7, opacity: .85 }}>
        30 秒限時。把滿口「AI 會取代你」的<br/>語錄神棍一個個揍飛擂台。
      </div>

      {/* Character lineup preview */}
      <div className="row" style={{ gap: isMobile ? 4 : 8, justifyContent: "center", flexWrap: "wrap", maxWidth: 600, marginTop: 4 }}>
        {CHARACTERS.slice(0, isMobile ? 6 : 12).map((c, i) => (
          <div key={c.id} style={{ transform: `scale(${isMobile ? .7 : 1})` }}>
            <PixelChar ch={c} state="idle" scale={isMobile ? 2 : 2} />
          </div>
        ))}
      </div>

      <div className="row gap-3" style={{ marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <button className="btn-pixel">START · 30S</button>
        <button className="btn-pixel ghost">INFINITE</button>
      </div>

      <div className="row gap-2" style={{ flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
        <div className="pix-chip" style={{ background: "var(--ink-2)", color: "var(--paper)", border: "2px solid var(--paper)" }}>3 PUNCH KO</div>
        <div className="pix-chip" style={{ background: "var(--ink-2)", color: "var(--paper)", border: "2px solid var(--paper)" }}>COMBO ×10 MAX</div>
        <div className="pix-chip" style={{ background: "var(--ink-2)", color: "var(--paper)", border: "2px solid var(--paper)" }}>+50 PER KO</div>
      </div>
    </div>
  );
}

/* ============================================
   RESULT SCREEN — 戰績卡片
============================================ */
function getRating(ko) {
  if (ko >= 8) return { tier: "S", titleZh: "AI 終結者",   titleEn: "AI TERMINATOR",  subZh: "神！完全無敵！",     color: "var(--red)" };
  if (ko >= 5) return { tier: "A", titleZh: "職業拳擊手", titleEn: "PRIZE FIGHTER",  subZh: "擂台之王，準則之神。", color: "var(--yellow)" };
  if (ko >= 3) return { tier: "B", titleZh: "業餘選手",   titleEn: "AMATEUR",        subZh: "有兩把刷子。",         color: "var(--cyan)" };
  if (ko >= 1) return { tier: "C", titleZh: "新手拳手",   titleEn: "ROOKIE",         subZh: "初出茅廬。",           color: "var(--green)" };
  return { tier: "D", titleZh: "還在熱身", titleEn: "WARMING UP", subZh: "下次認真點。", color: "var(--paper)" };
}

function ResultScreen({ width = 390, ko = 6, score = 1980, combo = 8, time = 30, kOd = [0, 2, 4, 5, 7, 9] }) {
  const isMobile = width < 600;
  const r = getRating(ko);
  return (
    <div className="arcade-bg" style={{ width: "100%", height: "100%", padding: isMobile ? 18 : 32, position: "relative", overflow: "auto" }}>
      <div className="col gap-4" style={{ position: "relative", zIndex: 2, height: "100%", maxWidth: 720, margin: "0 auto" }}>
        {/* Top: TIME UP banner */}
        <div className="col center" style={{ gap: 6 }}>
          <div className="ko-banner" style={{ fontSize: isMobile ? 36 : 64 }}>TIME UP</div>
          <div className="t-zh" style={{ fontSize: isMobile ? 12 : 16, opacity: .75, color: "var(--paper)" }}>30 秒限時拳擊挑戰 · 結算</div>
        </div>

        {/* Rating block */}
        <div className="pix-box col center" style={{ padding: isMobile ? 16 : 24, gap: 8, background: "linear-gradient(180deg, var(--ink-3) 0%, var(--ink-2) 100%)" }}>
          <div className="t-pixel" style={{ fontSize: 10, color: "var(--paper)", opacity: .7 }}>YOUR BOXER RANK</div>
          <div className="row center gap-4" style={{ width: "100%" }}>
            <div className="t-pixel" style={{
              fontSize: isMobile ? 80 : 120, color: r.color, lineHeight: 1,
              textShadow: `4px 4px 0 var(--ink), 0 0 28px ${r.color}66`,
              fontFamily: "var(--font-pixel)",
            }}>{r.tier}</div>
            <div className="col" style={{ alignItems: "flex-start", gap: 4 }}>
              <div className="t-pixel" style={{ fontSize: isMobile ? 14 : 20, color: r.color }}>{r.titleEn}</div>
              <div className="t-zh" style={{ fontSize: isMobile ? 18 : 26, color: "var(--paper)", fontWeight: 800 }}>{r.titleZh}</div>
              <div className="t-zh" style={{ fontSize: isMobile ? 11 : 14, color: "var(--paper)", opacity: .7 }}>{r.subZh}</div>
            </div>
          </div>
        </div>

        {/* Stat grid */}
        <div className="row gap-3" style={{ flexWrap: isMobile ? "wrap" : "nowrap" }}>
          <div className="stat-card col" style={{ flex: 1, minWidth: isMobile ? "30%" : 0, alignItems: "flex-start" }}>
            <div className="t-pixel" style={{ fontSize: 9, color: "var(--paper)", opacity: .6 }}>KO 人數</div>
            <div className="row" style={{ alignItems: "baseline", gap: 6 }}>
              <div className="stat-num" style={{ color: "var(--red)", fontSize: isMobile ? 32 : 44 }}>{ko}</div>
              <div className="t-mono" style={{ fontSize: 12, opacity: .6 }}>/12</div>
            </div>
            <div className="t-mono" style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>KNOCKOUTS</div>
          </div>
          <div className="stat-card col" style={{ flex: 1, minWidth: isMobile ? "30%" : 0, alignItems: "flex-start" }}>
            <div className="t-pixel" style={{ fontSize: 9, color: "var(--paper)", opacity: .6 }}>總得分</div>
            <div className="stat-num" style={{ color: "var(--yellow)", fontSize: isMobile ? 32 : 44 }}>{score.toLocaleString()}</div>
            <div className="t-mono" style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>SCORE</div>
          </div>
          <div className="stat-card col" style={{ flex: 1, minWidth: isMobile ? "30%" : 0, alignItems: "flex-start" }}>
            <div className="t-pixel" style={{ fontSize: 9, color: "var(--paper)", opacity: .6 }}>最高連擊</div>
            <div className="row" style={{ alignItems: "baseline", gap: 4 }}>
              <div className="t-mono" style={{ color: "var(--cyan)", fontSize: isMobile ? 22 : 30, fontWeight: 800 }}>×</div>
              <div className="stat-num" style={{ color: "var(--cyan)", fontSize: isMobile ? 32 : 44 }}>{combo}</div>
            </div>
            <div className="t-mono" style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>BEST COMBO</div>
          </div>
        </div>

        {/* KO'd characters */}
        <div className="pix-box-inset col gap-3" style={{ padding: isMobile ? 12 : 18 }}>
          <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
            <div className="t-pixel" style={{ fontSize: 10, color: "var(--yellow)" }}>FALLEN PROPHETS</div>
            <div className="t-mono" style={{ fontSize: 10, opacity: .55 }}>{kOd.length} / 12 KO'd</div>
          </div>
          <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
            {CHARACTERS.map((c, i) => {
              const dead = kOd.includes(i);
              return (
                <div key={c.id} className="col center" style={{
                  width: isMobile ? 52 : 68,
                  padding: 6,
                  background: dead ? "var(--ink-3)" : "var(--ink-2)",
                  border: `2px solid ${dead ? "var(--red)" : "rgba(255,255,255,.15)"}`,
                  position: "relative",
                  borderRadius: 2,
                  opacity: dead ? 1 : .35,
                }}>
                  <div style={{ filter: dead ? "saturate(.4) brightness(.7)" : "none" }}>
                    <PixelChar ch={c} state={dead ? "ko" : "idle"} scale={isMobile ? 1.5 : 2} />
                  </div>
                  {dead && (
                    <div style={{
                      position: "absolute", top: 2, right: 2,
                      background: "var(--red)", color: "var(--paper)",
                      fontFamily: "var(--font-pixel)", fontSize: 7,
                      padding: "2px 4px", border: "1px solid var(--ink)",
                    }}>KO</div>
                  )}
                  <div className="t-zh" style={{ fontSize: 9, marginTop: 4, color: "var(--paper)", textAlign: "center", lineHeight: 1.2 }}>{c.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action row */}
        <div className="col gap-3">
          <div className="t-pixel" style={{ fontSize: 10, color: "var(--paper)", opacity: .6, textAlign: "center" }}>SHARE YOUR RUN</div>
          <div className="row gap-2" style={{ flexWrap: "wrap", justifyContent: "center" }}>
            <button className="btn-pixel warn" style={{ fontSize: 10, padding: "12px 16px" }}>↓ DOWNLOAD JPG</button>
            <button className="btn-pixel ghost" style={{ fontSize: 10, padding: "12px 16px" }}>𝕏 / TWITTER</button>
            <button className="btn-pixel ghost" style={{ fontSize: 10, padding: "12px 16px" }}>THREADS</button>
          </div>
          <button className="btn-pixel" style={{ alignSelf: "center", marginTop: 4 }}>FIGHT AGAIN</button>
        </div>
      </div>
    </div>
  );
}

window.GameArena = GameArena;
window.StartScreen = StartScreen;
window.ResultScreen = ResultScreen;
window.getRating = getRating;
