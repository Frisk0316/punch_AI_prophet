# 扁 AI 語錄

一個用純 HTML、CSS、JavaScript 製作的 30 秒限時拳擊小遊戲。玩家要在倒數結束前，快速把滿口「AI 會取代你」的語錄神棍打到 K.O.。

## 線上遊玩

啟用 GitHub Pages 後，遊戲可從這個網址開啟：

<https://frisk0316.github.io/punch_AI_prophet/>

## 本機開啟

直接用瀏覽器打開 [index.html](/punch_AI_prophet/blob/main/index.html) 即可開始遊玩。

## GitHub Pages 設定

1. 打開 GitHub repo 的 `Settings`
2. 進入 `Pages`
3. 在 `Build and deployment` 裡把 `Source` 設成 `Deploy from a branch`
4. Branch 選 `main`，資料夾選 `/ (root)`
5. 存檔後等待 GitHub 發布

因為 repo 根目錄已經有 `index.html`，GitHub Pages 會直接把它當成網站首頁。

## 專案檔案

- `index.html`：GitHub Pages 入口頁，會導向遊戲主頁
- `扁AI語錄遊戲.html`：遊戲主程式
- `.gitignore`：忽略 `.codex` 與本機環境檔案

