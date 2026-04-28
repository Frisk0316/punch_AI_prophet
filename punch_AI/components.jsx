/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ============================================
   12 AI 預言家 — name, title, weapon line, palette
============================================ */
const CHARACTERS = [
  { id: "clout",    name: "流量阿凱",    en: "Clout King",      title: "AI 流量網紅",        skin: "#F5C4B3", suit: "#FF2D5C", hair: "#1A1530", accent: "#FFD23F", quote: "AI 一秒生圖，設計師早點轉行吧！", enQuote: "AI makes art in a second — designers, switch careers." },
  { id: "founder",  name: "新創 CEO",    en: "Hype Founder",    title: "創投大會主講人",      skin: "#F5D9A8", suit: "#26215C", hair: "#3D1F08", accent: "#00E5FF", quote: "兩年後公司只要 prompt 不要工程師！", enQuote: "In two years we only need prompters, not engineers." },
  { id: "doom",     name: "焦慮博主",    en: "Doom Blogger",    title: "焦慮販賣專員",        skin: "#E8C0A0", suit: "#3B6D11", hair: "#0E0B1A", accent: "#FF4FD8", quote: "AI 已取代 95% 創意工作，學設計浪費時間！", enQuote: "AI replaces 95% of creative work. Design is dead." },
  { id: "troll",    name: "匿名酸民",    en: "Edgy Troll",      title: "深夜匿名留言哥",      skin: "#D8A8C0", suit: "#1A1530", hair: "#FF2D5C", accent: "#39FF6A", quote: "AI 寫 code 比你快 100 倍，承認吧！", enQuote: "AI codes 100× faster than you. Just admit it." },
  { id: "prophet",  name: "AI 預言家",   en: "AI Prophet",      title: "自封未來學家",        skin: "#F5C4A0", suit: "#5A3A1A", hair: "#FFD23F", accent: "#FF2D5C", quote: "人類技能將在五年內全部過時！", enQuote: "All human skills will be obsolete in five years." },
  { id: "vc",       name: "投資顧問",    en: "VC Speaker",      title: "簡報用詞愛 disrupt",  skin: "#D0DCC8", suit: "#185FA5", hair: "#3D1F08", accent: "#FFD23F", quote: "再投人類團隊就是不負責任！",          enQuote: "Funding human teams now is irresponsible." },
  { id: "critic",   name: "藝評人",      en: "Art Critic",      title: "創意已死的鼓吹者",    skin: "#F0B8B8", suit: "#412402", hair: "#0E0B1A", accent: "#00E5FF", quote: "創意已死，AI 比畢卡索更有靈魂！", enQuote: "Creativity is dead — AI has more soul than Picasso." },
  { id: "blogger",  name: "科技部落客",  en: "Tech Blogger",    title: "標題殺人作家",        skin: "#F5C4B3", suit: "#0C447C", hair: "#5A3A1A", accent: "#FF4FD8", quote: "工程師年薪即將崩盤！", enQuote: "Engineering salaries are about to collapse!" },
  { id: "guru",     name: "職涯導師",    en: "Career Guru",     title: "強迫你買課程",        skin: "#E8C0A0", suit: "#8B2351", hair: "#1A1530", accent: "#39FF6A", quote: "趁早學 AI，不然你就會被淘汰！", enQuote: "Learn AI now or get left behind!" },
  { id: "host",     name: "節目名嘴",    en: "Talk Show Host",  title: "晚間 8 點固定砲火",   skin: "#D8A8C0", suit: "#633806", hair: "#FFD23F", accent: "#FF2D5C", quote: "三年所學，AI 三秒搞定！",     enQuote: "Three years of study? AI does it in three seconds." },
  { id: "snob",     name: "設計圈酸民",  en: "Design Snob",     title: "推特冷嘲熱諷王",      skin: "#F5D9A8", suit: "#1D9E75", hair: "#0E0B1A", accent: "#FFD23F", quote: "你的設計已輸給 AI，認清現實！",   enQuote: "Your design is worse than AI's. Wake up." },
  { id: "boss",     name: "節省老闆",    en: "Cheap Boss",      title: "永遠在裁員的那位",    skin: "#C8DCE8", suit: "#3D1F08", hair: "#FF2D5C", accent: "#00E5FF", quote: "與其多請設計師不如多買幾個 AI 授權！", enQuote: "We'd rather buy AI licenses than hire designers." },
];

const PUNCH_WORDS = ["POW!", "BAM!", "WHAM!", "KAPOW!", "BOOM!", "ZAP!", "K.O.!", "SMASH!"];

/* ============================================
   PIXEL CHARACTER — built from divs (8x10 grid blocks)
   Drawn at 16x20 pixels, scale via CSS
============================================ */
function PixelChar({ ch, state = "idle", scale = 4 }) {
  // simplified pixel art: head, hair, body, tie, arms, legs
  const px = scale;
  const skin = ch.skin, suit = ch.suit, hair = ch.hair, accent = ch.accent;
  const ink = "#0E0B1A";

  // Different hair shapes per character id for variety
  const hairStyles = {
    clout:    [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[5,1]],
    founder:  [[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[4,1],[5,1]],
    doom:     [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[1,1],[4,1],[2,2]],
    troll:    [[0,0],[5,0],[1,1],[2,1],[3,1],[4,1]],
    prophet:  [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[4,1],[5,1],[2,2],[3,2]],
    vc:       [[1,0],[2,0],[3,0],[4,0]],
    critic:   [[0,0],[1,0],[4,0],[5,0],[0,1],[5,1]],
    blogger:  [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0]],
    guru:     [[1,0],[2,0],[3,0],[4,0],[1,1],[4,1]],
    host:     [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[5,1],[0,2],[5,2]],
    snob:     [[2,0],[3,0]],
    boss:     [[0,0],[1,0],[4,0],[5,0]],
  };
  const hairCells = hairStyles[ch.id] || hairStyles.clout;

  const cell = (x, y, color) => ({
    position: "absolute",
    left: x * px, top: y * px,
    width: px, height: px,
    background: color,
  });

  const blocks = [];
  // head (6x4 block from y=1..4, x=0..5)
  for (let x = 0; x < 6; x++) for (let y = 1; y < 5; y++) {
    blocks.push(<div key={`s${x}${y}`} style={cell(x + 1, y + 1, skin)} />);
  }
  // hair on top
  hairCells.forEach(([x, y], i) => blocks.push(<div key={`h${i}`} style={cell(x + 1, y + 1, hair)} />));
  // eyes
  const eyeY = state === "ko" || state === "hit" ? 3 : 3;
  if (state === "ko" || state === "hit") {
    // X eyes
    blocks.push(<div key="exl1" style={{...cell(2, eyeY, ink), transform:`rotate(45deg)`, width: px*1.5}} />);
    blocks.push(<div key="exl2" style={{...cell(2, eyeY, ink), transform:`rotate(-45deg)`, width: px*1.5}} />);
    blocks.push(<div key="exr1" style={{...cell(5, eyeY, ink), transform:`rotate(45deg)`, width: px*1.5}} />);
    blocks.push(<div key="exr2" style={{...cell(5, eyeY, ink), transform:`rotate(-45deg)`, width: px*1.5}} />);
  } else {
    blocks.push(<div key="el" style={cell(2, eyeY, ink)} />);
    blocks.push(<div key="er" style={cell(5, eyeY, ink)} />);
  }
  // mouth
  if (state === "ko" || state === "hit") {
    blocks.push(<div key="m1" style={cell(3, 5, ink)} />);
    blocks.push(<div key="m2" style={cell(4, 5, ink)} />);
    blocks.push(<div key="m3" style={cell(3, 6, ink)} />);
    blocks.push(<div key="m4" style={cell(4, 6, ink)} />);
  } else if (state === "hurt") {
    blocks.push(<div key="m1" style={cell(3, 5, ink)} />);
    blocks.push(<div key="m2" style={cell(4, 5, ink)} />);
  } else {
    // smug smirk
    blocks.push(<div key="m1" style={cell(3, 5, ink)} />);
    blocks.push(<div key="m2" style={cell(4, 5, ink)} />);
    blocks.push(<div key="m3" style={cell(5, 5, ink)} />);
  }
  // neck
  blocks.push(<div key="n1" style={cell(3, 7, skin)} />);
  blocks.push(<div key="n2" style={cell(4, 7, skin)} />);
  // body (8x6 block)
  for (let x = 0; x < 8; x++) for (let y = 0; y < 6; y++) {
    blocks.push(<div key={`b${x}${y}`} style={cell(x, y + 8, suit)} />);
  }
  // collar
  blocks.push(<div key="c1" style={cell(3, 8, "#fff")} />);
  blocks.push(<div key="c2" style={cell(4, 8, "#fff")} />);
  // tie
  blocks.push(<div key="t1" style={cell(3, 9, accent)} />);
  blocks.push(<div key="t2" style={cell(4, 9, accent)} />);
  blocks.push(<div key="t3" style={cell(3, 10, accent)} />);
  blocks.push(<div key="t4" style={cell(4, 10, accent)} />);
  blocks.push(<div key="t5" style={cell(3, 11, accent)} />);
  blocks.push(<div key="t6" style={cell(4, 11, accent)} />);
  // arms
  for (let y = 0; y < 5; y++) {
    blocks.push(<div key={`la${y}`} style={cell(-1, y + 9, suit)} />);
    blocks.push(<div key={`ra${y}`} style={cell(8, y + 9, suit)} />);
  }
  // hands
  blocks.push(<div key="lh" style={cell(-1, 14, skin)} />);
  blocks.push(<div key="rh" style={cell(8, 14, skin)} />);
  // legs
  for (let y = 0; y < 4; y++) {
    blocks.push(<div key={`ll${y}`} style={cell(2, y + 14, ink)} />);
    blocks.push(<div key={`rl${y}`} style={cell(5, y + 14, ink)} />);
  }
  // shoes
  for (let x = 0; x < 3; x++) {
    blocks.push(<div key={`ls${x}`} style={cell(x, 18, ink)} />);
    blocks.push(<div key={`rs${x}`} style={cell(x + 5, 18, ink)} />);
  }

  return (
    <div className={`npc ${state === "shake" ? "shake" : ""} ${state === "ko" ? "ko" : ""} ${state === "hit" ? "hit" : ""}`}
         style={{ width: 10 * px, height: 19 * px, position: "relative" }}>
      {blocks}
    </div>
  );
}

/* ============================================
   HP BAR — segmented
============================================ */
function HPBar({ hp = 3, max = 3, label, sub }) {
  const segs = [];
  for (let i = 0; i < max; i++) {
    const filled = i < hp;
    const pct = hp / max;
    const cls = filled ? (pct <= 0.34 ? "hp-seg crit" : pct <= 0.67 ? "hp-seg warn" : "hp-seg") : "hp-seg empty";
    segs.push(<div key={i} className={cls} />);
  }
  return (
    <div className="col gap-2" style={{ width: "100%" }}>
      {label && (
        <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
          <div className="t-pixel" style={{ fontSize: 10, color: "var(--paper)" }}>{label}</div>
          <div className="t-pixel" style={{ fontSize: 10, color: "var(--yellow)" }}>{hp}/{max}</div>
        </div>
      )}
      <div className="hp">{segs}</div>
      {sub && <div className="t-mono" style={{ fontSize: 10, opacity: .65 }}>{sub}</div>}
    </div>
  );
}

/* ============================================
   GLOVE
============================================ */
function Glove({ side = "left", variant = "v-classic", size = 96, label }) {
  return (
    <div className="col center gap-2">
      <div className={`glove ${side} ${variant}`} style={{ width: size, height: size, transform: side === "left" ? "rotate(-12deg)" : "rotate(12deg)" }}>
        <span className="laces" />
        <span className="cuff" style={{ width: size * .82, height: size * .22 }} />
      </div>
      {label && <div className="t-pixel" style={{ fontSize: 9, marginTop: 12, color: "var(--paper)", opacity: .8 }}>{label}</div>}
    </div>
  );
}

/* ============================================
   SPEECH BUBBLE
============================================ */
function SpeechBubble({ quote, source, en }) {
  return (
    <div style={{
      background: "var(--paper)", color: "var(--ink)",
      border: "4px solid var(--paper)", boxShadow: "var(--shadow)",
      padding: "16px 20px", borderRadius: 4,
      position: "relative", maxWidth: 560,
    }}>
      <div style={{
        position: "absolute", left: 0, top: 0, right: 0, height: 6,
        background: "repeating-linear-gradient(90deg, var(--ink) 0 6px, transparent 6px 12px)",
      }} />
      <div className="t-zh" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}>{quote}</div>
      {en && <div className="t-mono" style={{ fontSize: 11, marginTop: 6, color: "#666", fontStyle: "italic" }}>{en}</div>}
      {source && <div className="t-pixel" style={{ fontSize: 9, marginTop: 8, color: "var(--red-deep, #C81D44)" }}>— {source}</div>}
      {/* tail */}
      <div style={{
        position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "12px solid transparent",
        borderRight: "12px solid transparent",
        borderTop: "16px solid var(--paper)",
      }} />
    </div>
  );
}

/* ============================================
   GAME HUD
============================================ */
function GameHUD({ time = 24, score = 1340, ko = 4, combo = 6 }) {
  const pct = (time / 30) * 100;
  return (
    <div className="col gap-3" style={{ width: "100%" }}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div className="row gap-3" style={{ alignItems: "center" }}>
          <div className="pix-chip" style={{ background: "var(--red)", color: "var(--paper)" }}>KO ×{ko}</div>
          <div className="pix-chip" style={{ background: "var(--cyan)", color: "var(--ink)" }}>COMBO ×{combo}</div>
        </div>
        <div className="col center" style={{ minWidth: 90 }}>
          <div className="t-pixel" style={{ fontSize: 8, color: "var(--paper)", opacity: .7 }}>TIME</div>
          <div className="t-pixel" style={{ fontSize: 32, color: time < 10 ? "var(--red)" : "var(--yellow)", textShadow: "3px 3px 0 var(--ink)" }}>{time.toString().padStart(2, "0")}</div>
        </div>
        <div className="row gap-3" style={{ alignItems: "center" }}>
          <div className="pix-chip" style={{ background: "var(--yellow)", color: "var(--ink)" }}>SCORE {score.toLocaleString()}</div>
        </div>
      </div>
      <div className="timer-bar"><i style={{ width: pct + "%" }} /></div>
    </div>
  );
}

window.CHARACTERS = CHARACTERS;
window.PUNCH_WORDS = PUNCH_WORDS;
window.PixelChar = PixelChar;
window.HPBar = HPBar;
window.Glove = Glove;
window.SpeechBubble = SpeechBubble;
window.GameHUD = GameHUD;
