// Firebase 網頁應用程式設定是公開連線資料，不是管理員金鑰。
// 請填入新學測專案的設定，勿放入服務帳戶 JSON 或任何私鑰。
window.STUDY_CONFIG = {
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
  // 首次 Google 登入後，頁面會顯示你的 UID；填入後也需更新 firestore.rules。
  adminUid: ""
};
