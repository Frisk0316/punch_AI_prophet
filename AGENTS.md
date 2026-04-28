# AGENTS.md — 扁 AI 語錄遊戲

請先閱讀 `docs/ai_collaboration.md`。

## Codex 在本專案的角色

**Codex 負責：**
- 依照 `docs/spec.md` 的規格實作
- CSS design token 與元件替換
- HTML 結構更新（HUD、角色容器、結算畫面）
- JS 元件移植：`buildPixelChar()`, `buildHPBar()`, `renderNPC()`, `renderFallenProphets()` 等
- 結算圖卡 Canvas 全繪製
- 修 bug、調整視覺細節

**不能修改的區域：**
- 遊戲核心邏輯：`punch()`, `doKO()`, `tick()`, `startGame()`, `endGame()`, `resetGame()`
- 音效引擎：所有 `play*()` 函式  
- 分享基礎設施：`shareSocial()`, `shareX()`, `shareThreads()`, `downloadShareCard()`, `downloadBlob()`, `prepareShareCard()`, `ensureShareCardReady()`, `showShareToast()`
- 語言系統：`UI` 物件、`LANG`、`applyLanguage()`、`ui()` 函式

## 實作規格

完整規格見 `docs/spec.md`，任務清單見 `docs/tasks.md`。

## 測試 Gate（每步驟完成前）

1. Chrome DevTools → mobile 375px：四個畫面（intro/start/arena/end）無 JS console error
2. 桌機 1280px：畫面可讀，角色顯示正常
3. 按鈕點擊有反應（hover/active 動畫）
4. HP 段數條件正確（3/3 紅、1/3 紅閃爍）
5. KO 動畫播放（角色旋轉倒下）
6. 圖卡可下載並正確顯示評級、角色格線

## 主要實作風險

| 風險 | 解法 |
|------|------|
| Press Start 2P 在 canvas 中未載入 | `await document.fonts.ready` 已存在；確保 Google Fonts link 在 `<script>` 前 |
| `#hd` 移除後 `getGloveTarget()` 回傳 NaN | 改抓 `document.getElementById('npc')` |
| `.npc.ko` keyframe 在多個子 div 上 | `#npc { transform-origin: 50% 100% }` |
| `ctx.filter` Safari 舊版不支援 | try/catch fallback，不套 filter 直接畫 |
| 無限模式 kodList 重複 | `if (!kodList.includes(idx)) kodList.push(idx)` |

## 完成後回報格式

```
Changed files:
Assumptions made:
Test results (375px / 1280px):
Known risks:
```
