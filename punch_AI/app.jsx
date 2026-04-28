/* global React, ReactDOM, CHARACTERS, GameArena, StartScreen, ResultScreen, ShareCard, PixelChar, Glove, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle, DesignCanvas, DCSection, DCArtboard */
const { useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "gloveVariant": "v-classic",
  "showCRT": true,
  "language": "zh"
}/*EDITMODE-END*/;

/* === Device frames (lightweight inline) === */
function PhoneFrame({ children, width = 390, height = 844 }) {
  return (
    <div style={{
      width: width + 24, height: height + 24,
      background: "#0a0a0a",
      borderRadius: 56,
      padding: 12,
      boxShadow: "0 12px 0 rgba(0,0,0,.4), inset 0 0 0 2px #2a2a2a",
      position: "relative",
    }}>
      <div style={{
        width, height, borderRadius: 44,
        overflow: "hidden", position: "relative",
        background: "#000",
      }}>
        {/* notch */}
        <div style={{
          position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
          width: 110, height: 28, background: "#000", borderRadius: 14, zIndex: 60,
        }} />
        {/* status bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 44, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px",
          color: "#fff", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
          background: "linear-gradient(180deg, rgba(0,0,0,.8), transparent)",
          pointerEvents: "none",
        }}>
          <span>9:41</span>
          <span>5G · 100%</span>
        </div>
        <div style={{ width: "100%", height: "100%", paddingTop: 44, position: "relative" }}>
          {children}
        </div>
        {/* home indicator */}
        <div style={{
          position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
          width: 130, height: 5, background: "rgba(255,255,255,.5)", borderRadius: 3, zIndex: 60,
        }} />
      </div>
    </div>
  );
}

function TabletFrame({ children, width = 820, height = 1180 }) {
  return (
    <div style={{
      width: width + 36, height: height + 36,
      background: "#0a0a0a",
      borderRadius: 36,
      padding: 18,
      boxShadow: "0 14px 0 rgba(0,0,0,.4), inset 0 0 0 2px #2a2a2a",
    }}>
      <div style={{
        width, height, borderRadius: 18,
        overflow: "hidden", background: "#000", position: "relative",
      }}>
        {children}
      </div>
    </div>
  );
}

function DesktopFrame({ children, width = 1440, height = 900 }) {
  return (
    <div style={{
      width: width + 24, height: height + 56,
      background: "#1a1a1a",
      borderRadius: 12,
      boxShadow: "0 14px 0 rgba(0,0,0,.5)",
      overflow: "hidden",
    }}>
      <div style={{
        height: 36, background: "#2a2a2a",
        display: "flex", alignItems: "center", padding: "0 14px", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
        </div>
        <div style={{
          marginLeft: 16, padding: "4px 14px", background: "#1a1a1a", borderRadius: 6,
          color: "#888", fontFamily: "var(--font-mono)", fontSize: 11,
          flex: 1, maxWidth: 460,
        }}>frisk0316.github.io/punch_AI_prophet</div>
      </div>
      <div style={{ width, height, margin: "0 auto", overflow: "hidden", background: "#000" }}>
        {children}
      </div>
    </div>
  );
}

/* === main app === */
function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Sample game state for screens
  const sampleArena = { hp: 2, time: 24, score: 1340, ko: 4, combo: 6 };
  const sampleResult = { ko: 6, score: 1980, combo: 8, time: 30, kOd: [0, 2, 4, 5, 7, 9] };

  return (
    <>
      <DesignCanvas
        title="PUNCH AI · UI Redesign"
        subtitle="像素街機格鬥風 · 12 角色 · 結算與分享卡"
      >
        {/* ============ SECTION 1 — Mobile ============ */}
        <DCSection id="mobile" title="01 · MOBILE — iPhone 直立">
          <DCArtboard id="m-start" label="開始畫面" width={414} height={868} background="#000">
            <PhoneFrame width={390} height={844}>
              <StartScreen width={390} />
            </PhoneFrame>
          </DCArtboard>

          <DCArtboard id="m-arena" label="戰鬥畫面 (HP 2/3)" width={414} height={868} background="#000">
            <PhoneFrame width={390} height={844}>
              <GameArena width={390} character={CHARACTERS[2]} {...sampleArena} gloveVariant={tw.gloveVariant} />
            </PhoneFrame>
          </DCArtboard>

          <DCArtboard id="m-arena2" label="戰鬥畫面 (新挑戰者)" width={414} height={868} background="#000">
            <PhoneFrame width={390} height={844}>
              <GameArena width={390} character={CHARACTERS[7]} hp={3} time={18} score={2100} ko={6} combo={3} gloveVariant={tw.gloveVariant} showImpact={false} />
            </PhoneFrame>
          </DCArtboard>

          <DCArtboard id="m-result" label="結算畫面" width={414} height={868} background="#000">
            <PhoneFrame width={390} height={844}>
              <ResultScreen width={390} {...sampleResult} />
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        {/* ============ SECTION 2 — Tablet ============ */}
        <DCSection id="tablet" title="02 · TABLET — iPad 直立">
          <DCArtboard id="t-arena" label="戰鬥畫面" width={856} height={1216} background="#000">
            <TabletFrame width={820} height={1180}>
              <GameArena width={820} character={CHARACTERS[5]} hp={1} time={12} score={2740} ko={7} combo={4} gloveVariant={tw.gloveVariant} />
            </TabletFrame>
          </DCArtboard>

          <DCArtboard id="t-result" label="結算畫面" width={856} height={1216} background="#000">
            <TabletFrame width={820} height={1180}>
              <ResultScreen width={820} {...sampleResult} />
            </TabletFrame>
          </DCArtboard>
        </DCSection>

        {/* ============ SECTION 3 — Desktop ============ */}
        <DCSection id="desktop" title="03 · DESKTOP — 1440 寬">
          <DCArtboard id="d-start" label="開始畫面" width={1464} height={956} background="#000">
            <DesktopFrame width={1440} height={900}>
              <StartScreen width={1440} />
            </DesktopFrame>
          </DCArtboard>

          <DCArtboard id="d-arena" label="戰鬥畫面" width={1464} height={956} background="#000">
            <DesktopFrame width={1440} height={900}>
              <GameArena width={1440} character={CHARACTERS[10]} hp={2} time={8} score={3650} ko={9} combo={7} gloveVariant={tw.gloveVariant} />
            </DesktopFrame>
          </DCArtboard>

          <DCArtboard id="d-result" label="結算畫面" width={1464} height={956} background="#000">
            <DesktopFrame width={1440} height={900}>
              <ResultScreen width={1440} {...sampleResult} />
            </DesktopFrame>
          </DCArtboard>
        </DCSection>

        {/* ============ SECTION 4 — Share Card ============ */}
        <DCSection id="share" title="04 · 分享圖卡 — IG 直式 1080×1350">
          <DCArtboard id="sc-rookie" label="C 級 · 新手拳手" width={540} height={675} background="#000">
            <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 1080, height: 1350 }}>
              <ShareCard ko={2} score={420} combo={3} time="00:30" kOd={[3, 9]} playerName="ROOKIE 087" date="2026.04.28" />
            </div>
          </DCArtboard>

          <DCArtboard id="sc-amateur" label="B 級 · 業餘選手" width={540} height={675} background="#000">
            <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 1080, height: 1350 }}>
              <ShareCard ko={4} score={1280} combo={5} time="00:30" kOd={[1, 4, 7, 10]} playerName="P1 · KENJI" date="2026.04.28" />
            </div>
          </DCArtboard>

          <DCArtboard id="sc-pro" label="A 級 · 職業拳擊手" width={540} height={675} background="#000">
            <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 1080, height: 1350 }}>
              <ShareCard ko={6} score={1980} combo={8} time="00:30" kOd={[0, 2, 4, 5, 7, 9]} playerName="P1 · ANN" date="2026.04.28" />
            </div>
          </DCArtboard>

          <DCArtboard id="sc-terminator" label="S 級 · AI 終結者" width={540} height={675} background="#000">
            <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 1080, height: 1350 }}>
              <ShareCard ko={11} score={4720} combo={10} time="00:30" kOd={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11]} playerName="TERMINATOR" date="2026.04.28" />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ============ SECTION 5 — Character Roster ============ */}
        <DCSection id="roster" title="05 · 12 位 AI 預言家陣容">
          <DCArtboard id="roster-grid" label="角色設計總表" width={1200} height={760} background="linear-gradient(180deg, #0E0B1A, #060410)">
            <div style={{ padding: 32, height: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div className="headline" style={{ fontSize: 32 }}>CAST OF PROPHETS</div>
                <div className="t-mono" style={{ color: "var(--paper)", opacity: .55, fontSize: 14 }}>12 unique challengers · 3 HP each</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, flex: 1 }}>
                {CHARACTERS.map((c, i) => (
                  <div key={c.id} style={{
                    background: "rgba(38,29,68,.5)",
                    border: "3px solid #F5F1E6",
                    boxShadow: "var(--shadow-sm)",
                    padding: 14, display: "flex", flexDirection: "column", gap: 8,
                    alignItems: "center", textAlign: "center",
                  }}>
                    <div className="t-pixel" style={{ fontSize: 9, color: "var(--yellow)" }}>#{String(i + 1).padStart(2, "0")}</div>
                    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                      <PixelChar ch={c} state="idle" scale={3} />
                    </div>
                    <div className="t-zh" style={{ fontSize: 13, color: "var(--paper)", fontWeight: 800 }}>{c.name}</div>
                    <div className="t-mono" style={{ fontSize: 9, color: c.accent, opacity: .9 }}>{c.en.toUpperCase()}</div>
                    <div className="t-zh" style={{ fontSize: 10, color: "var(--paper)", opacity: .6, lineHeight: 1.3 }}>{c.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </DCArtboard>
        </DCSection>

        {/* ============ SECTION 6 — Glove variants ============ */}
        <DCSection id="gloves" title="06 · 拳套樣式（可在 Tweaks 切換）">
          <DCArtboard id="glove-set" label="5 種拳套" width={900} height={400} background="linear-gradient(180deg, #0E0B1A, #060410)">
            <div style={{ padding: 32, height: "100%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              {[
                { v: "v-classic", label: "CLASSIC RED", id: "經典紅" },
                { v: "v-gold",    label: "GOLD GLORY", id: "黃金榮耀" },
                { v: "v-cyber",   label: "CYBER ION",  id: "電光賽博" },
                { v: "v-leather", label: "OLD SCHOOL", id: "復古皮革" },
                { v: "v-toxic",   label: "TOXIC GREEN",id: "毒液綠" },
              ].map((g) => (
                <div key={g.v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  <Glove side="left" variant={g.v} size={120} />
                  <div className="t-pixel" style={{ fontSize: 10, color: "var(--yellow)" }}>{g.label}</div>
                  <div className="t-zh" style={{ fontSize: 12, color: "var(--paper)", opacity: .8 }}>{g.id}</div>
                </div>
              ))}
            </div>
          </DCArtboard>
        </DCSection>

        {/* ============ SECTION 7 — Design system ============ */}
        <DCSection id="ds" title="07 · 設計系統 · 色票 · 字體">
          <DCArtboard id="ds-tokens" label="Tokens" width={1100} height={520} background="linear-gradient(180deg, #0E0B1A, #060410)">
            <div style={{ padding: 32, height: "100%", display: "flex", flexDirection: "column", gap: 24, color: "var(--paper)" }}>
              <div className="headline" style={{ fontSize: 28 }}>DESIGN TOKENS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
                {[
                  { name: "ink",    hex: "#0E0B1A", text: "#fff" },
                  { name: "ink-2",  hex: "#1A1530", text: "#fff" },
                  { name: "paper",  hex: "#F5F1E6", text: "#0E0B1A" },
                  { name: "red",    hex: "#FF2D5C", text: "#fff" },
                  { name: "yellow", hex: "#FFD23F", text: "#0E0B1A" },
                  { name: "cyan",   hex: "#00E5FF", text: "#0E0B1A" },
                ].map((c) => (
                  <div key={c.name} style={{
                    background: c.hex, color: c.text,
                    border: "3px solid var(--paper)",
                    padding: 14, display: "flex", flexDirection: "column", gap: 4,
                    fontFamily: "var(--font-mono)",
                  }}>
                    <div className="t-pixel" style={{ fontSize: 10 }}>{c.name.toUpperCase()}</div>
                    <div style={{ fontSize: 12, opacity: .8, marginTop: 28 }}>{c.hex}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div className="t-pixel" style={{ fontSize: 10, opacity: .55 }}>DISPLAY · PIXEL</div>
                  <div className="t-pixel" style={{ fontSize: 24, color: "var(--yellow)" }}>K.O.</div>
                  <div className="t-mono" style={{ fontSize: 11, opacity: .5 }}>Press Start 2P</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div className="t-pixel" style={{ fontSize: 10, opacity: .55 }}>BODY · ZH</div>
                  <div className="t-zh" style={{ fontSize: 22, fontWeight: 800 }}>扁 AI 語錄</div>
                  <div className="t-mono" style={{ fontSize: 11, opacity: .5 }}>Noto Sans TC</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div className="t-pixel" style={{ fontSize: 10, opacity: .55 }}>NUMBERS · MONO</div>
                  <div className="t-mono" style={{ fontSize: 22, color: "var(--cyan)", fontWeight: 800 }}>1,980 · ×8</div>
                  <div className="t-mono" style={{ fontSize: 11, opacity: .5 }}>JetBrains Mono</div>
                </div>
              </div>
            </div>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="拳套樣式">
          <TweakSelect
            label="Glove variant"
            value={tw.gloveVariant}
            onChange={(v) => setTweak("gloveVariant", v)}
            options={[
              { value: "v-classic", label: "CLASSIC RED · 經典紅" },
              { value: "v-gold",    label: "GOLD GLORY · 黃金榮耀" },
              { value: "v-cyber",   label: "CYBER ION · 電光賽博" },
              { value: "v-leather", label: "OLD SCHOOL · 復古皮革" },
              { value: "v-toxic",   label: "TOXIC GREEN · 毒液綠" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
