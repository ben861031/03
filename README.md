# 發文時程管理平台 v2.1.5

這個資料夾可直接作為 GitHub Pages 網站內容上傳，請保留目前的資料夾層級，不要只上傳 `index.html`。

## 第一層檔案

- `index.html`：網站入口
- `manifest.webmanifest`：PWA 安裝設定
- `service-worker.js`：PWA 快取與離線頁控制；必須留在網站根目錄
- `offline.html`：離線提示頁

## 分類資料夾

- `assets/css/`：網站樣式
- `assets/js/`：網站程式與 Firebase 設定
- `assets/icons/`：網站、手機桌面與 PWA 圖示

## 上傳提醒

1. 將第一層四個網站檔案、`assets` 資料夾及其全部內容一起上傳。
2. `README.md` 是說明文件，可一併保留在 GitHub。
3. 若手機已安裝舊版，請先移除舊的「發文管理」捷徑或 App，再重新開啟網站並安裝，才能確保桌面更新成純白底圖示。
