# 技術規格 — 扁 AI 語錄遊戲視覺重設計

## 目標

將 `punch_AI/`（JSX prototype）的深色 Arcade 設計套用至 `扁AI語錄遊戲.html`（單檔 vanilla JS），保持遊戲邏輯不變。

## 架構約束

- 單一 HTML 檔案，無 build step，無 React
- Vanilla JS + pure CSS
- 結算圖卡：canvas 全繪製，不依賴 Result.png

## 色彩 Token（:root CSS 變數）

```css
--ink: #0E0B1A;   --ink-2: #1A1530;   --ink-3: #261D44;
--paper: #F5F1E6;
--red: #FF2D5C;   --red-deep: #C81D44;
--yellow: #FFD23F;  --cyan: #00E5FF;
--green: #39FF6A;  --magenta: #FF4FD8;
--grid: rgba(255,210,63,.08);
--shadow: 0 8px 0 rgba(0,0,0,.9);
--shadow-sm: 0 4px 0 rgba(0,0,0,.9);
--font-pixel: "Press Start 2P","Silkscreen",monospace;
--font-mono: "JetBrains Mono","Bai Jamjuree",monospace;
--font-display: "Bai Jamjuree","Noto Sans TC",system-ui,sans-serif;
--font-zh: "Noto Sans TC","PingFang TC",system-ui,sans-serif;
```

## CSS 元件（從 punch_AI/styles.css 搬移）

- `.arcade-bg`：深色底 + 放射漸層 + 格線 pseudo + 掃描線 pseudo
- `.pix-box` / `.pix-box-inset` / `.pix-chip`
- `.headline`
- `.btn-pixel` + `.alt` / `.ghost` / `.warn`
- `.hp` + `.hp-seg` + `.empty` / `.warn` / `.crit` + `@keyframes hp-flash`
- `.timer-bar` + `> i`
- `.glove` + `.left` / `.right` / `.cuff` / `.laces` + 5 variants (`.v-classic` 等)
- `.npc` + `.shake` / `.hit` / `.ko` + `@keyframes`
- `.impact` + `.go` + `@keyframes impact-pop`
- `.ko-banner`
- `.stat-card` + `.stat-num` + `.stat-label`
- `.crt`
- Utilities: `.row` / `.col` / `.center` / `.gap-2..8` / `.t-pixel` / `.t-mono` / `.t-display` / `.t-zh`

## CHARACTERS 陣列（12 筆，從 components.jsx）

每筆必備欄位：`id, name, en, title, skin, suit, hair, accent, quote, enQuote`

## HAIR_STYLES 常數（從 components.jsx 的 hairStyles map）

```javascript
const HAIR_STYLES = {
  clout:   [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[5,1]],
  founder: [[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[4,1],[5,1]],
  // ... 12 entries
};
```

## getRating(ko) 函式（從 screens.jsx）

回傳 `{tier, titleZh, titleEn, subZh, color}`：
- ko >= 8 → S / AI 終結者 / AI TERMINATOR / 神！完全無敵！ / var(--red)
- ko >= 5 → A / 職業拳擊手 / PRIZE FIGHTER / 擂台之王，準則之神。/ var(--yellow)
- ko >= 3 → B / 業餘選手 / AMATEUR / 有兩把刷子。 / var(--cyan)
- ko >= 1 → C / 新手拳手 / ROOKIE / 初出茅廬。 / var(--green)
- default → D / 還在熱身 / WARMING UP / 下次認真點。 / var(--paper)

## buildPixelChar(ch, state, scale) → HTMLElement

移植自 components.jsx PixelChar，使用 DOM 操作而非 JSX。

**參數：**
- `ch`：CHARACTERS 中的一個物件
- `state`：`'idle' | 'hurt' | 'hit' | 'ko'`
- `scale`：pixel 大小（px），預設 4

**回傳：** `<div class="npc ...">` 包含所有像素 block 的 div

**pixel 位置（基底 4px，乘以 scale）：**
- head：x=1..6, y=2..5（6×4 塊，skin 色）
- hair：從 HAIR_STYLES[ch.id] 查找，hair 色
- 眼睛：idle/hurt → 2 個 ink 方塊；hit/ko → X 眼（旋轉 ±45° 長方塊）
- 嘴巴：ko/hit → 2×2 塊；hurt → 1×2 塊；idle → 右移 smirk 3 塊
- 頸部：x=3,4, y=8（skin 色）
- body：x=0..7, y=8..13（8×6 塊，suit 色）
- collar：x=3,4, y=8（白色 #fff）
- 領帶：x=3,4, y=9..11（3 行，accent 色）
- 手臂：x=-1, x=8, y=9..13（suit 色）
- 手：x=-1,8, y=14（skin 色）
- 腿：x=2,5, y=14..17（ink 色）
- 鞋：x=0..2, x=5..7, y=18（ink 色）

**容器尺寸：** `width: 10*scale*px, height: 19*scale*px`（px = scale 參數）

注意：`components.jsx` 中的 `scale` 就是 px 大小（非乘數），4 表示每格 4px。

## buildHPBar(hp, max) → 更新 #hpbar DOM

清空並重建 `document.getElementById('hpbar')` 的 `.hp-seg` 元素：
- `filled && pct <= 0.34` → `.hp-seg.crit`
- `filled && pct <= 0.67` → `.hp-seg.warn`
- `filled` → `.hp-seg`
- `!filled` → `.hp-seg.empty`

## HTML 結構（關鍵更新）

### #hud
```html
<div id="hud">
  <div class="pix-chip" style="background:var(--red);color:var(--paper)">
    <span id="hud-ko-label">KO</span> ×<span id="kos">0</span>
  </div>
  <div style="text-align:center">
    <div class="t-pixel" style="font-size:8px;opacity:.7">TIME</div>
    <div id="td" class="t-pixel">30</div>
  </div>
  <div id="hud-right">
    <div class="pix-chip" style="background:var(--yellow);color:var(--ink)">
      <span id="hud-score-label">SCORE</span> <span id="sc">0</span>
    </div>
    <button id="stopbtn"></button>
  </div>
</div>
```

### #npcw / #npc
```html
<div id="npcw"><div id="npc" class="npc"></div></div>
```
（靜態 face divs 全數移除）

### Glove
```html
<div class="glove left v-classic" id="gl-left">
  <span class="laces"></span><span class="cuff"></span>
</div>
```

## 結算圖卡 Canvas（1080×1350）

無需 Result.png，全程 canvas 繪製。

子函式：

| 函式 | 內容 |
|------|------|
| `drawCardBackground(ctx,w,h)` | #0E0B1A + 放射漸層（紅/青）+ 40px 格線 + 掃描線 |
| `drawCardCorners(ctx,w,h)` | 四角黃色 L 形（28×28）+ 紅色內點 |
| `drawCardHeader(ctx,w)` | 紅底 PUNCH AI 徽章、SCORE CARD、日期 |
| `drawCardTitle(ctx,w)` | K.O. REPORT（三色錯位）+ 副標 |
| `drawCardRatingBlock(ctx,w)` | 大字母 S/A/B/C/D + 評級文字（呼叫 getRating） |
| `drawCardStats(ctx,w)` | KO/分數/連擊三欄（紅/黃/青色數字） |
| `drawCardSecondaryRow(ctx,w)` | TIME / ACCURACY / POWER 輔助列 |
| `drawCardFallenRoster(ctx,w)` | 12 角色 6×2 格線（呼叫 drawPixelCharOnCanvas） |
| `drawCardFooter(ctx,w,h)` | ! 徽章、hashtag、URL、1 CREDIT |

Canvas 版角色繪製 `drawPixelCharOnCanvas(ctx, ch, state, x, y, scale)` 使用 `fillRect` 代替 DOM div，邏輯與 buildPixelChar 相同。

CSS 變數在 canvas context 中不可用，需用 resolveCardColor(name) 轉換：
```javascript
const CARD_COLORS = {
  'var(--red)':'#FF2D5C', 'var(--yellow)':'#FFD23F',
  'var(--cyan)':'#00E5FF', 'var(--green)':'#39FF6A',
  'var(--paper)':'#F5F1E6',
};
```

## 驗收標準

- [ ] 四個畫面在 375px / 768px / 1280px 無 JS error
- [ ] 所有 `--ink` 系列背景，無暖棕色（#FFF5D6 等）殘留
- [ ] KO 動畫、HP 段數條、glove 動畫正確
- [ ] 結算圖卡：S/A/B/C/D 評級字母正確顏色、12 角色格線
- [ ] 圖卡下載為 JPEG 1080×1350，可在裝置圖庫開啟
- [ ] Twitter/Threads 分享：桌機觸發圖片複製或下載
- [ ] 中英切換（?lang=en）全畫面正確翻譯
