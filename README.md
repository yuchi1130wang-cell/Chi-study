# 奇的學測進度 — GitHub Pages ＋ Firebase 版

這份是公開查看的獨立網站。家人開網址就能看，只有你指定的 Google 帳號可以修改。已包含可直接上傳的網頁檔案，不必先安裝 Node.js 或執行編譯。

**目前狀態：網站檔案已做好，Firebase 設定尚未填入，也尚未發布到新的 GitHub 儲存庫。**

## 已有功能

- 63 天、9 週；數學／自然每週各 3 回，英文／國文每週各 1 回。
- 每回分成寫完與訂正，兩項勾選才算完成，並可寫筆記。
- 英文單字每天 30 分鐘、國文閱讀每天 20 分鐘。
- 各科已完成／剩餘回數、每週清單、段考與緩衝時間紀錄。
- 題本名稱、總回數、起始日、倒數目標日可以修改。
- Firebase 雲端同步、家人公開查看、指定管理員修改。
- 同時操作時會檢查版本，防止另一台裝置的舊資料蓋掉新進度。
- 下載 JSON 進度備份。

每週精確時間為 21 小時 50 分鐘；28 小時扣掉後，預留 6 小時 10 分鐘。題本時間是完成項目的計畫折算，不是實際計時。
初始 27／27／9／9 回是按 9 週目標推算，請依實際題本修改。日期依 2026/11/20 起算 63 天，並非已核對的官方學測日期。

## 最簡單的接續方式

1. 建立一個新的公開 GitHub 儲存庫，例如 `chi-study-progress`。
2. 提供新儲存庫網址，以及新 Firebase 網頁應用程式的 `firebaseConfig`。
3. 網站首次 Google 登入後會顯示 Firebase UID；提供這個 UID，便可設定你的修改權限。

`firebaseConfig` 與 UID 可以放在前端，真正的修改限制在 Firebase Security Rules。不要提供服務帳戶私鑰、密碼或管理員金鑰。

## 自行設定的完整步驟

### 1. GitHub Pages

在 GitHub 建立一個新的 Public 儲存庫，建議名稱 `chi-study-progress`。把解壓縮後的內容上傳到儲存庫根目錄，不要只上傳 ZIP，也不要多包一層資料夾。

至少需要：

- `index.html`
- `firebase-config.js`
- `favicon.svg`
- `assets/app.js`
- `assets/style.css`
- `.nojekyll`（若手機不方便上傳，可稍後補上；目前檔案名稱不依賴此檔）

其他檔案是完整原始碼與設定，也可以一起上傳。

進入儲存庫 Settings → Pages → Build and deployment，選 `Deploy from a branch`，Branch 選 `main`，資料夾選 `/(root)`，按 Save。實際網址以 GitHub Pages 顯示的網址為準。

### 2. 建立專用 Firebase 專案

開啟 https://console.firebase.google.com/ ，建立學測專用專案並加入「網頁應用程式」。

建議使用新專案，避免學測網站的規則與 RC 圈速資料互相影響。不要直接用這份規則覆蓋 RC 專案既有規則。

從「專案設定 → 你的應用程式 → 網頁應用程式」取得 `firebaseConfig`，填入 `firebase-config.js` 的 `firebase` 區塊。`adminUid` 此時可先留空。

### 3. 啟用 Google 登入

Firebase → Authentication → 開始使用 → 登入方式 → Google → 啟用，依後台要求設定支援電子郵件。

在 Authentication → Settings → Authorized domains 加入 GitHub Pages 的**網域**，例如：

```
yuchi1130wang-cell.github.io
```

不要填 `https://`，不要填 `/chi-study-progress/` 等路徑。

iPhone 若在 LINE 或其他內建瀏覽器無法開啟登入視窗，改用 Safari 開啟網站，再點「管理員登入」。家人查看不需要登入。

### 4. 建立 Firestore 並發布規則

Firebase → Firestore Database → Create database。選 Standard edition，選適合你的地區，以 Production mode 開始。

在 Rules 分頁貼上本資料夾的 `firestore.rules`。第一次尚未取得 UID 時，可以先保留 `REPLACE_WITH_YOUR_FIREBASE_UID` 後發布；這時任何人都不能修改，符合預期。

這份規則只公開 `studyPlans/main` 這一份計畫，其他資料預設禁止存取。它不會公開整個資料庫。

### 5. 取得 UID，啟用你的修改權限

把填好 Firebase 設定的檔案上傳 GitHub。開啟 Pages 網站，點「管理員登入」，用自己的 Google 帳號登入。

網站會顯示「目前登入的 Firebase UID」。複製這段 UID：

- 填入 `firebase-config.js` 的 `adminUid`。
- 將 `firestore.rules` 裡的 `REPLACE_WITH_YOUR_FIREBASE_UID` 換成同一段 UID，並在 Firebase Rules 分頁重新發布。

再次上傳 `firebase-config.js`，等待 GitHub Pages 更新後重新整理。網站會自動建立初始計畫，你可以開始打勾。

家人只需收到同一個 Pages 網址，不需 Google 或 ChatGPT 帳號。

## 公開內容範圍

此版本公開整份讀書計畫，包含題本筆記與緩衝紀錄。有網址的人都能讀取。只有指定 UID 可新增及更新，刪除整份計畫在規則中禁止。

## 驗證

設定完成後：

1. 用你的帳號登入，將數學第 1 回勾選「寫完」，重新整理後確認仍保留。
2. 勾選「訂正」，確認總進度增加 1 回。
3. 用無痕視窗或家人手機開啟網址，確認無須登入就能看到同一份紀錄。
4. 家人未登入或以其他 Google 帳號登入時，勾選與儲存應不可用。
5. 測試完可取消原本的測試勾選。

目前已完成靜態編譯與 TypeScript 檢查；實際 Firebase 登入、同步與 Rules 需在完成設定後驗證。

## 原始碼修改

如果只是修改 Firebase 設定，不用重新編譯。直接改 `firebase-config.js` 即可。

程式原始碼在 `src/`。修改功能後需在自己的電腦執行：

```
npm install
npm run build
```

再把產生的 `assets/app.js` 與相關檔案上傳 GitHub。

Firebase 官方參考：
- 網頁設定：https://firebase.google.com/docs/web/setup
- Google 登入：https://firebase.google.com/docs/auth/web/google-signin
- Firestore 規則：https://firebase.google.com/docs/firestore/security/get-started
- 交易與同時更新：https://firebase.google.com/docs/firestore/manage-data/transactions
