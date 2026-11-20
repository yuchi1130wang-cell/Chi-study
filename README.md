# 學測網站完整修正版 20261121-fix1

專案：study-28254
管理員 Google 帳號：yuchi1130.wang@gmail.com
不需要取得或填寫 UID。若你使用其他 Google 帳號，請同步修改 firebase-config.js 的 adminEmail 與 Firestore Rules 的電子郵件，然後重新發布規則。

## 一次完成

1. 解壓縮，把全部檔案上傳到 GitHub Chi-study 儲存庫根目錄，覆蓋同名檔案。不要只上傳 ZIP，不要多包一層資料夾。此次所有程式與樣式都在根目錄。
2. 按 Commit changes。GitHub Pages 設定：Deploy from a branch / main / (root)。等 Actions 最新部署成功。
3. Firebase Authentication → Sign-in method：啟用 Google，設定支援電子郵件並儲存。
4. Authentication → Settings → Authorized domains：新增 yuchi1130wang-cell.github.io（不加 https://，不加路徑）。
5. 確認 Firestore 的 (default) 資料庫已建立。開啟 Firestore → Rules，刪除原規則，貼上 firestore.rules 的全部內容，按 Publish。只把 rules 檔上傳 GitHub 不會發布 Firebase 規則。
6. 開啟 https://yuchi1130wang-cell.github.io/Chi-study/?v=20261121-fix1 。Windows Chrome 按 Ctrl+Shift+R。左下角或頁尾應顯示「版本 20261121-fix1」。若不是，表示仍是舊部署。
7. 點「管理員登入」，選 yuchi1130.wang@gmail.com。這個帳號登入後，網站會建立計畫，讓你勾選。
8. 勾一次再重新整理，確認紀錄保留。家人用同一網址可直接查看，不需要登入。

## 此次已修正

- 已填好使用者提供的 Firebase 設定。
- index.html、app.js、style.css、build.mjs 都使用根目錄路徑。
- 新版載入網址加入版本，降低舊快取混用。
- 移除 UID 佔位設定，前端和 Firebase Rules 都使用同一個已驗證電子郵件。
- 登入時顯示「登入中」，失敗顯示原因。
- 登入改變後重新訂閱雲端資料，避免先前權限錯誤中止同步。
- 讀取超過 15 秒會顯示可操作的錯誤，不會無限等待。
- 程式檔載入失敗時顯示明確提示。

## 如果仍有錯誤

- 「未授權網域」：檢查 Authentication 授權網域。
- 「operation-not-allowed」：啟用 Google 登入。
- 「權限不足」：確認已在 Firebase 後台按 Publish，且登入的是上面指定的帳號。
- 「popup-blocked」：允許此網站開啟彈出視窗，或用 Safari/Chrome 直接開啟。
- 看到另一帳號：登出後重選正確帳號。

公開查看包含題本筆記與緩衝紀錄。其他人無法寫入；授權由 Firestore 規則執行，不只靠停用網頁按鈕。

網站不收錄 Google Analytics。measurementId 僅保留你提供的設定，沒有初始化分析服務。

## 開發

npm install
npm run build

原始碼與建置輸出都在根目錄。變更 cloud.ts 或 dashboard.tsx 後需重新建置 app.js；只修改 firebase-config.js 不需建置。

## 驗證範圍

已檢查編譯、TypeScript、檔案連結與設定一致性。Firebase 後台的 Google 開關、授權網域與規則發布無法從公開 GitHub 驗證；必須完成上方步驟後，實測管理員寫入與家人查看。
