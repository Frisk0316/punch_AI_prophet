# CLAUDE.md — 扁 AI 語錄遊戲

請先閱讀 `docs/ai_collaboration.md`。

## Claude 在本專案的角色

**我（Claude）負責：**
- 需求釐清、功能規格撰寫、驗收標準定義
- 架構決策（例如：是否用 React、圖卡 canvas 策略）
- 設計審查（像素角色、分享圖卡視覺方向）
- 分析 risk（字體載入、跨瀏覽器相容、分享 API 限制）
- Codex 實作完成後的 diff review

**我不應直接修改：**
- 遊戲核心邏輯函式（`punch()`, `doKO()`, `tick()`, `startGame()`, `endGame()` 等）
- 音效引擎（所有 `play*()` 函式）
- 分享基礎設施（`shareSocial()`, `prepareShareCard()`, `downloadBlob()` 等）
- 這些區域不經討論不應動，有 regression 風險

## 權威文件

| 資訊 | 文件 |
|------|------|
| 協作規範 | `docs/ai_collaboration.md` |
| 技術規格 | `docs/spec.md` |
| 任務進度 | `docs/tasks.md` |
| 產品概覽 | `README.md` |

## 設計原始碼來源

新版 Arcade 設計來自 `punch_AI/` 資料夾（JSX prototype）：
- `punch_AI/styles.css` — CSS design token 與元件
- `punch_AI/components.jsx` — CHARACTERS 資料、PixelChar 邏輯
- `punch_AI/screens.jsx` — getRating()、畫面 HTML 結構
- `punch_AI/share-card.jsx` — 圖卡 Canvas 佈局

## 架構約束（不變）

- **單一 HTML 檔**：不引入 React 或 build step
- **Vanilla JS**：所有元件移植為 DOM 操作函式
- **無外部圖片**：結算圖卡全程 canvas 繪製，不依賴 `Result.png`
