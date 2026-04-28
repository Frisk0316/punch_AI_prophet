# Claude 與 Codex 協作手冊

本文件是一份可複製到任何專案的 Claude + Codex 協作規範。目標是讓 Claude 負責釐清問題、審查假設與風險，讓 Codex 負責落地實作、測試與部署檢查，並避免兩個 AI 同時改到同一批檔案。

使用方式：

1. 將 `AGENTS.md`、`CLAUDE.md`、`docs/ai_collaboration.md` 複製到目標專案根目錄。
2. 依照該專案修改「單一真相來源」、「檔案所有權」、「測試 gate」與「部署 gate」。
3. 每次任務開始前，要求 Claude/Codex 先讀本文件。

## 核心原則

1. **單一真相來源**：需求、設計、測試標準與部署條件必須落在 repo 內的文件，不以聊天紀錄為準。
2. **研究與實作分流**：Claude 優先做需求釐清、架構審查、風險分析與第二審；Codex 優先做程式修改、測試、修 bug 與部署檢查。
3. **小步交付**：每次只改一個明確範圍，完成後留下可審查的 diff、測試指令與結論。
4. **明確 ownership**：同一時間只讓一個 AI 修改同一個 ownership area。
5. **保護既有變更**：任何 AI 都不得重置、覆蓋或刪除不屬於自己本輪工作的變更。

## 角色分工

| 角色 | 主要責任 | 建議輸出 | 避免事項 |
| --- | --- | --- | --- |
| Claude | 需求拆解、產品/策略推理、架構審查、風險檢查、測試案例設計、PR/diff review | spec、review notes、risk memo、acceptance criteria | 沒有明確要求時直接大改核心實作 |
| Codex | 讀 codebase、實作、修 bug、補測試、跑測試、整理 diff、部署前檢查 | code diff、test result、implementation notes、deployment checklist | 根據聊天記憶擅自改需求、跳過測試後宣稱可部署 |
| 使用者 | 決定優先級、批准高風險變更、確認上線 | 明確批准、業務限制、風險上限、部署窗口 | 讓兩個 AI 同時自由修改同一批檔案 |

## 單一真相來源

每個專案都應指定自己的權威文件。可從下表開始調整：

| 資訊類型 | 建議權威檔案 |
| --- | --- |
| 產品需求 | `docs/requirements.md` |
| 技術設計 | `docs/spec.md` 或 `docs/architecture.md` |
| 任務拆解 | `docs/tasks.md` |
| 測試標準 | `docs/testing.md` |
| 部署流程 | `docs/deployment.md` |
| AI 協作規範 | `docs/ai_collaboration.md` |
| 專案入口 | `README.md` |
| 環境與參數 | `config/`、`.env.example`、CI/CD 設定 |

如果聊天內容與 repo 文件衝突，以 repo 文件為準。若要改變需求或策略假設，先更新權威文件，再實作。

## 建議工作流

### 1. 從需求到實作

1. Claude 先把需求整理成可驗收規格：
   - required behavior
   - non-goals
   - edge cases
   - risk concerns
   - acceptance criteria
2. Codex 根據規格修改程式與測試。
3. Codex 回報 changed files、測試指令、測試結果與剩餘風險。
4. Claude 審查 diff 與結果，特別檢查需求偏移、風險、缺測與邊界案例。
5. Codex 根據審查意見修正。
6. 使用者決定是否 merge、發布或部署。

### 2. 從 bug 到修復

1. Codex 先重現 bug 或定位不一致行為。
2. Codex 實作最小修補並補測試。
3. Claude 審查修補是否改壞需求、架構或風險假設。
4. Codex 跑完整必要檢查。
5. 使用者批准高風險變更或部署。

## 檔案所有權

請依專案調整下表。原則是同一時間只讓一個 AI 修改同一個 ownership area。

| Area | 建議主責 | 常見路徑 |
| --- | --- | --- |
| Requirements/spec | Claude | `docs/requirements.md`, `docs/spec.md`, `research/` |
| Architecture review | Claude | `docs/architecture.md`, ADRs |
| Core implementation | Codex | `src/`, `app/`, `lib/`, `packages/` |
| Tests | Codex with Claude review | `tests/`, `__tests__/`, `spec/` |
| Scripts/tooling | Codex | `scripts/`, `tools/` |
| Config/deployment | Codex with user approval | `config/`, `.github/`, `Dockerfile`, `docker-compose.yml`, infra files |
| UI/frontend | One owner at a time | `frontend/`, `web/`, `app/`, `components/`, styles |
| Collaboration docs | Either, but one editor at a time | `docs/ai_collaboration.md`, `AGENTS.md`, `CLAUDE.md` |

如果 Claude 與 Codex 都需要改同一區域，先由一方完成並交接，另一方再接手。

## Git 與 Worktree 建議

最穩定的協作方式是把 Claude 與 Codex 放在不同 branch 或 worktree。

```bash
git checkout -b codex/impl-feature-x
git worktree add ../project-claude claude/review-feature-x
```

建議命名：

| 用途 | Branch pattern |
| --- | --- |
| Claude 需求/研究 | `claude/spec-*` 或 `claude/research-*` |
| Claude 審查 | `claude/review-*` |
| Codex 實作 | `codex/impl-*` |
| Codex 修 bug | `codex/fix-*` |
| 部署準備 | `codex/deploy-*` |

## 任務開始模板

```text
請先閱讀 docs/ai_collaboration.md。

本次任務範圍：
不要修改：
權威需求來源：
完成條件：
完成後請回報 changed files、測試結果、假設與剩餘風險。
```

## 交接模板

### Claude 交給 Codex

```text
Task:
Source spec:
Required behavior:
Non-goals:
Files likely affected:
Validation required:
Risks:
Acceptance criteria:
Do not touch:
```

### Codex 交給 Claude

```text
Implementation summary:
Changed files:
Assumptions made:
Tests/checks run:
Results:
Questions for review:
Known risks:
Deployment readiness:
```

## 測試 Gate

進入 merge 或部署前，至少要確認：

1. 新行為有對應測試，或有明確理由說明為何不需要。
2. 相關單元測試通過。
3. 重要整合流程或 smoke test 通過。
4. config、環境變數與 secrets 沒有被硬編碼或誤提交。
5. 使用者可用 README 或 docs 重現主要操作。
6. 高風險變更有 rollback plan。

## 部署 Gate

任何 production/live/release 之前必須完成：

| Check | Requirement |
| --- | --- |
| Approval | 使用者明確批准 |
| Scope | 只包含本次任務需要的變更 |
| Tests | 必要測試通過並記錄指令 |
| Config | 環境與部署參數已確認 |
| Secrets | secrets 未進入 git |
| Observability | logs、metrics、alerts 或等價監控可用 |
| Rollback | 有回復、關閉或降級方案 |

## 衝突處理

如果兩個 AI 產出衝突：

1. 保留兩邊 diff，不要重置工作區。
2. 以權威需求文件、測試結果與使用者決策作為裁決依據。
3. 若是需求或策略假設衝突，先讓 Claude 審查並更新 spec。
4. 若是程式行為衝突，讓 Codex 補測試後用測試結果裁決。
5. 高風險或不可逆變更必須由使用者批准。

## 最小完成定義

一個 AI 任務完成時，至少應留下：

1. 明確 changed files。
2. 實作或研究摘要。
3. 已跑的測試/檢查指令與結果。
4. 沒跑測試時的原因。
5. 剩餘風險或下一步。

