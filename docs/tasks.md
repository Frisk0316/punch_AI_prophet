# 任務清單 — 視覺設計遷移

## 任務狀態

| # | 任務 | 狀態 | 備註 |
|---|------|------|------|
| 1 | 建立協作文件架構 | ✅ 完成 | CLAUDE.md, AGENTS.md, docs/ |
| 2 | CSS 設計系統替換 | ⏳ 待辦 | 從 punch_AI/styles.css 搬移 |
| 3 | CHARACTERS 陣列 + getRating() | ⏳ 待辦 | 從 punch_AI/components.jsx + screens.jsx |
| 4 | buildPixelChar() + buildHPBar() 元件 | ⏳ 待辦 | DOM 版 PixelChar |
| 5 | HTML 結構更新 | ⏳ 待辦 | HUD / NPC / Glove / 各畫面 |
| 6 | JS 遊戲迴圈接線 | ⏳ 待辦 | renderNPC, buildHPBar, fallen-grid 等 |
| 7 | 結算圖卡 Canvas 全繪製替換 | ⏳ 待辦 | 不依賴 Result.png |

## 每步驟定義完成

每步驟必須：
1. Chrome 375px + 1280px 無 JS error
2. 視覺對比 punch_AI/ JSX prototype 符合預期
3. 不破壞上一步驟的成果

## 對應規格

詳見 `docs/spec.md`。
