const AppTemplate = `
<div class="sidebar">
<div class="logo collapsed-logo">
☰
</div>
<div class="logo expanded-logo">
<svg class="logo-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
  <path d="M10 9H8"></path>
  <path d="M16 13H8"></path>
  <path d="M16 17H8"></path>
</svg>
<span>發文時程管理平台</span>
</div>
<div class="section"><span>工作狀態</span></div>
<div class="nav active" id="navPending" onclick="setFilter('pending',this)">
<span>尚待發文</span>
<span class="badge" id="pendingBadge">0</span>
</div>
<div class="nav" id="navNodate" onclick="setFilter('nodate',this)">
<span>未設定日期</span>
<span class="badge" id="nodateBadge">0</span>
</div>
<div class="nav" id="navToday" onclick="setFilter('today',this)">
<span>今日待發</span>
<span class="badge" id="todayBadge">0</span>
</div>
<div class="nav" id="navOverdue" onclick="setFilter('overdue',this)">
<span>已逾期</span>
<span class="badge" id="overdueBadge">0</span>
</div>
<div class="nav" onclick="setFilter('done',this)">
<span>累計已發</span>
<span class="badge" id="doneBadge">0</span>
</div>
<div class="section"><span>未來一週發文量</span></div>
<div id="forecastBox"></div>
<div class="section"><span>資料管理</span></div>
<div class="nav data-nav" onclick="exportBackup()">
<span class="nav-label">
<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>
</svg>
匯出備份
</span>
</div>
<div class="nav data-nav" onclick="document.getElementById('backupFile').click()">
<span class="nav-label">
<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 21V9"></path><path d="m7 14 5-5 5 5"></path><path d="M5 3h14"></path>
</svg>
匯入備份
</span>
</div>
<div class="nav data-nav" onclick="logout()" style="margin-top: 12px; color: var(--danger);">
<span class="nav-label">
<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
</svg>
登出系統
</span>
</div>
</div>
<div class="mobile-overlay" id="mobileOverlay" onclick="toggleMobileMenu()"></div>
<div class="main">
<div class="topbar">
<div class="page-title-wrap">
<button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="選單">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>
</svg>
</button>
<h1 id="pageTitle">尚待發文</h1>
</div>
<div class="top-actions">
<button class="btn primary-import" onclick="openImport()">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M4 19h16"></path>
</svg>
批次匯入
</button>
<button class="btn secondary" onclick="openDispatchList()">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M14 3h7v7"></path><path d="M10 14 21 3"></path><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path>
</svg>
發文作業
</button>
<button class="btn review-link" onclick="openMyReview()">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M9 12l2 2 4-5"></path><path d="M21 12a9 9 0 1 1-4.2-7.6"></path><path d="M21 3v6h-6"></path>
</svg>
線上簽核
</button>
<button class="btn success-soft" onclick="batchDone()">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<circle cx="12" cy="12" r="9"></circle><path d="m8 12 3 3 5-6"></path>
</svg>
批次完成
</button>
<button class="btn danger-soft" onclick="batchDelete()">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M4 7h16"></path><path d="M9 7V4h6v3"></path><path d="m6 7 1 14h10l1-14"></path><path d="M10 11v6M14 11v6"></path>
</svg>
批次刪除
</button>
<span id="excelExportArea" style="display:none; gap: 8px;">
<button class="btn blue-soft" onclick="openStatsModal()" style="background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe;">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>
</svg>
公文統計
</button>
<button class="btn excel-export" onclick="exportDoneExcel()">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"></path>
</svg>
匯出 Excel
</button>
</span>
<input type="file" id="backupFile" accept=".json" style="display:none" onchange="importBackup(event)">
</div>
</div>
<div id="warningBox" class="warning" style="display:none"></div>
<div class="cards">
<div class="card"><p>尚待發文</p><h2 id="pendingCount">0</h2></div>
<div class="card"><p>今日待發</p><h2 id="todayCount">0</h2></div>
<div class="card"><p>已逾期</p><h2 id="overdueCount">0</h2></div>
<div class="card"><p>累計已發</p><h2 id="doneCount">0</h2></div>
</div>
<div class="table-wrap">
<div class="toolbar">
<div class="search-wrap">
<input id="search"
placeholder="搜尋文號 / 主旨 / 承辦人"
style="padding:10px;border-radius:10px;border:1px solid #ccc;min-width:280px;">
<button class="btn muted-btn" onclick="clearSearch()" title="清除搜尋">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
</svg>
</button>
</div>
<select id="themeSelect" onchange="document.documentElement.className = this.value; localStorage.setItem('dispatch_theme', this.value)" style="padding:10px 14px; border-radius:10px; border:1px solid #e2e8f0; background:white; font-weight:600; cursor:pointer; color:var(--text-main);">
  <option value="">主題：清新全白</option>
  <option value="theme-ocean">主題：柔和海洋藍</option>
  <option value="theme-gray">主題：莫蘭迪淺灰</option>
  <option value="theme-dark">主題：經典深藍</option>
  <option value="theme-obsidian">主題：曜石黑 (OLED)</option>
  <option value="theme-milktea">主題：焦糖奶茶棕</option>
  <option value="theme-sakura">主題：初戀櫻花粉</option>
  <option value="theme-sepia">主題：溫暖護眼黃</option>
</select>
<select id="linkMode" title="切換主旨連結使用內網或外網" onchange="setLinkMode(this.value)">
<option value="auto">連結：自動</option>
<option value="internal">連結：公司內</option>
<option value="external">連結：公司外</option>
</select>
<span id="doneFilterArea" style="display:none; align-items:center; gap:8px;">
<button class="btn blue quick-date" data-range="all" onclick="setQuickDate('all')">全部</button>
<button class="btn muted-btn quick-date" data-range="today" onclick="setQuickDate('today')">今天</button>
<button class="btn muted-btn quick-date" data-range="week" onclick="setQuickDate('week')">本週</button>
<button class="btn muted-btn quick-date" data-range="month" onclick="setQuickDate('month')">本月</button>
<span style="color:#cbd5e1; margin:0 4px;">|</span>
<button class="btn muted-btn quick-date" data-range="custom" onclick="openCustomDateModal()">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:16px;height:16px;margin-bottom:-3px;">
<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4M8 3v4M3 10h18"></path>
</svg>
自訂區間
</button>
<input type="date" id="doneStartDate" style="display:none;">
<input type="date" id="doneEndDate" style="display:none;">
</span>
</div>
<div class="table-scroll">
<table>
<thead>
<tr>
<th><input type="checkbox" id="selectAllVisible" class="select-all" title="全選目前畫面" onchange="toggleSelectAllVisible(this.checked)"></th>
<th><button class="sort-btn" onclick="setSort('docNo')">表單編號 <span class="sort-mark" data-sort-mark="docNo"></span></button></th>
<th><button class="sort-btn" onclick="setSort('subject')">主旨 <span class="sort-mark" data-sort-mark="subject"></span></button></th>
<th><button class="sort-btn" onclick="setSort('projectNo')">計畫編號 <span class="sort-mark" data-sort-mark="projectNo"></span></button></th>
<th><button class="sort-btn" onclick="setSort('handler')">承辦人 <span class="sort-mark" data-sort-mark="handler"></span></button></th>
<th><button class="sort-btn" onclick="setSort('sendDate')">發文日期 <span class="sort-mark" data-sort-mark="sendDate"></span></button></th>
<th><button class="sort-btn" onclick="setSort('displayDate')">公文顯示日期 <span class="sort-mark" data-sort-mark="displayDate"></span></button></th>
<th><button class="sort-btn" onclick="setSort('status')">狀態 <span class="sort-mark" data-sort-mark="status"></span></button></th>
<th>備註說明</th>
<th class="done-column"><button class="sort-btn" onclick="setSort('doneTime')">完成時間 <span class="sort-mark" data-sort-mark="doneTime"></span></button></th>
<th>操作</th>
</tr>
</thead>
<tbody id="tbody"></tbody>
</table>
</div>
<div id="paginationBar" style="margin-top:15px;text-align:center;"></div>
</div>
</div>
<div class="modal" id="importModal">
<div class="modal-box">
<h2>智慧批次匯入</h2>
<div style="position:relative; width:100%;">
<div 
id="importText"
contenteditable="true"
data-placeholder="💡 請貼入從「電子表單 → 待審表單 → 總發」項下的所有公文資料"
style="
width:100%;
height:320px;
padding:12px;
border-radius:12px;
border:1px solid #ccc;
overflow:auto;
background:white;
white-space:pre-wrap;
"></div>
<button class="btn secondary" onclick="pasteFromClipboard()" style="position:absolute; top:8px; right:16px; padding:6px 10px; font-size:13px; display:flex; align-items:center; gap:6px; background:white; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
快速貼上
</button>
</div>
<div style="margin-top:14px;display:flex;gap:10px;">
<button class="btn green" onclick="confirmImport()">確認匯入</button>
<button class="btn blue" onclick="closeImport()">關閉</button>
</div>
</div>
</div>
<div class="modal" id="importPreviewModal">
<div class="modal-box" style="width:720px;">
<h2>確認同步內容</h2>
<p style="margin-top:8px;color:#64748b;">請確認以下變更，按下「執行同步」後才會更新資料。</p>
<div class="preview-summary">
<div class="preview-stat">新增公文<strong id="previewAddedCount">0</strong></div>
<div class="preview-stat">既有公文<strong id="previewExistingCount">0</strong></div>
<div class="preview-stat danger">將標記已發文<strong id="previewAutoDoneCount">0</strong></div>
</div>
<div style="margin-bottom:14px;">
<strong>新增公文</strong>
<div id="previewAddedList" class="preview-list"></div>
</div>
<div style="margin-bottom:14px;">
<strong>既有公文（保留原狀）</strong>
<div id="previewExistingList" class="preview-list"></div>
</div>
<div style="margin-bottom:14px;">
<strong style="color:#991b1b;">將自動標記為已發文</strong>
<div id="previewAutoDoneList" class="preview-list"></div>
</div>
<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;">
<button class="btn secondary" onclick="closeImportPreview()">返回檢查</button>
<button class="btn primary-import" onclick="executeImport()">執行同步</button>
</div>
</div>
</div>
<div class="modal" id="dateQuickModal">
<div class="modal-box" style="width:380px; max-width:95%;">
<h3 id="dateQuickModalTitle" style="margin-bottom:15px;">設定發文日期</h3>
<div style="display:flex;flex-direction:column;gap:8px;">
<button class="btn blue" onclick="quickDate(activeDateIndex,0);closeDateQuickModal();">今天</button>
<button class="btn green" onclick="quickDate(activeDateIndex,1);closeDateQuickModal();">明天</button>
<button class="btn orange" onclick="quickDate(activeDateIndex,2);closeDateQuickModal();">後天</button>
<input type="date" id="modalDateInput" style="padding:10px;border:1px solid #ccc;border-radius:8px;">
<button class="btn secondary" onclick="applyCustomDate()">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4M8 3v4M3 10h18"></path>
</svg>
選擇日期
</button>
<button class="btn red" onclick="closeDateQuickModal()">取消</button>
</div>
</div>
</div>
<div class="modal" id="statsModal">
<div class="modal-box" style="width:720px; max-width:95%;">
<h2 style="margin-bottom:8px; display:flex; align-items:center; gap:8px;">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;color:#3b82f6;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
公文發送統計
</h2>
<p id="statsSubtitle" style="color:#64748b; margin-bottom:20px; font-size:14px;"></p>
<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
    <button class="btn secondary" onclick="changeStatsMonth(-1)">◀ 上個月</button>
    <h3 id="statsMonthLabel" style="margin:0; color:var(--text-main, #334155);"></h3>
    <button class="btn secondary" onclick="changeStatsMonth(1)">下個月 ▶</button>
</div>
<div id="calendarGrid" class="calendar-grid"></div>
<div style="margin-top:20px; display:flex; justify-content:flex-end;">
<button class="btn secondary" onclick="closeStatsModal()">關閉</button>
</div>
</div>
</div>
<div class="modal" id="customDateModal">
<div class="modal-box" style="width:380px; max-width:95%;">
<h3 style="margin-bottom:15px;">自訂篩選區間</h3>
<div style="display:flex;flex-direction:column;gap:8px;">
<label style="font-size:14px; color:var(--text-muted, #64748b);">起始日期</label>
<input type="date" id="modalStartDateInput" style="padding:10px;border:1px solid #ccc;border-radius:8px;">
<label style="font-size:14px; color:var(--text-muted, #64748b); margin-top:8px;">結束日期</label>
<input type="date" id="modalEndDateInput" style="padding:10px;border:1px solid #ccc;border-radius:8px;">
<button class="btn blue" style="margin-top:12px;" onclick="applyCustomDateFilter()">
套用篩選
</button>
<button class="btn red" onclick="closeCustomDateModal()">取消</button>
</div>
</div>
</div>
`;

function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('mobileOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
    }
}

let isFirstSync = true;
let doneDocsCount = 0; // 儀表板使用的累計已發數量
let doneDocs = [];     // 已載入的歷史公文
let doneDocsLoadedAll = false; // 是否已載入所有歷史公文

async function initFirebaseSync() {
    if (!window.firebaseAPI) {
        console.error("Firebase API not ready");
        return;
    }
    const { db, collection, query, where, onSnapshot, getCountFromServer } = window.firebaseAPI;
    
    // 1. 取得歷史公文總數 (極低 Reads，只需抓 Count)
    try {
        const doneQuery = query(collection(db, "docs"), where("status", "==", "已發文"));
        const snapshot = await getCountFromServer(doneQuery);
        doneDocsCount = snapshot.data().count;
        
        const countEl = document.getElementById('doneCount');
        if (countEl) countEl.innerText = doneDocsCount;
        
        const badgeEl = document.getElementById('doneBadge');
        if (badgeEl) badgeEl.innerText = doneDocsCount;
        
        // 如果已經拿到主資料，再強制更新一次畫面確保同步
        if (docs.length > 0) render();
    } catch(e) {
        console.error("Error getting done count:", e);
    }
    
    // 2. 只即時監聽活躍公文 (大幅減少 Reads)
    const activeQuery = query(collection(db, "docs"), where("status", "!=", "已發文"));
    
    onSnapshot(activeQuery, (snapshot) => {
        // 防止首次空快取提前解除載入畫面與導致重複匯入
        if (snapshot.metadata.fromCache && snapshot.empty) {
            return;
        }
        
        const loadedDocs = [];
        snapshot.forEach(doc => {
            loadedDocs.push(doc.data());
        });
        
        docs = loadedDocs;
        normalizeDates(docs);
        
        if (isFirstSync) {
            setupEvents();
            initFiltersAndEvents();
            isFirstSync = false;
        }
        
        render();
        
        // 資料載入完成，隱藏全螢幕載入動畫
        const fsLoader = document.getElementById('fullScreenLoader');
        if (fsLoader) fsLoader.classList.add('hidden');
    }, (error) => {
        console.error("Firebase sync error:", error);
    });
}

function renderAppShell() {
    document.getElementById('app').innerHTML = AppTemplate;
    
    const linkModeSelect = document.getElementById('linkMode');
    if(linkModeSelect){
        linkModeSelect.value = linkMode;
    }
    
    const savedTheme = localStorage.getItem('dispatch_theme') ?? 'theme-dark';
    document.documentElement.className = savedTheme;
    const themeSelect = document.getElementById('themeSelect');
    if(themeSelect) {
        themeSelect.value = savedTheme;
    }
}

async function initApp() {
    let account = localStorage.getItem('syncAccount');
    
    if (!account) {
        document.getElementById('loginModal').classList.remove('hidden');
    } else {
        renderAppShell();
        
        // 沒有快取，顯示載入動畫
        const fsLoader = document.getElementById('fullScreenLoader');
        if (fsLoader) {
            document.getElementById('fsLoaderText').innerText = "載入公文資料中...";
            fsLoader.classList.remove('hidden');
        }
        
        initFirebaseSync();
    }
    
    document.getElementById('loginBtn').addEventListener('click', async () => {
        const accInput = document.getElementById('loginAccount').value.trim();
        const pwdInput = document.getElementById('loginPassword').value;
        
        if(!accInput || !pwdInput) {
            document.getElementById('loginError').innerText = "請輸入帳號與密碼";
            document.getElementById('loginError').classList.remove('hidden');
            return;
        }
        
        document.getElementById('loginBtn').innerText = "驗證中...";
        document.getElementById('loginError').classList.add('hidden');
        
        try {
            const { auth, signInWithEmailAndPassword } = window.firebaseAPI;
            
            // 將員工編號轉換為虛擬 Email 格式供 Firebase 認證使用
            const virtualEmail = `${accInput}@sinotech.com`;
            
            await signInWithEmailAndPassword(auth, virtualEmail, pwdInput);
            
            // 登入成功
            localStorage.setItem('syncAccount', accInput);
            renderAppShell();
            document.getElementById('loginModal').classList.add('hidden');
            document.getElementById('loginBtn').innerText = "登入";
            document.getElementById('loginPassword').value = '';
            
            // 顯示全螢幕載入動畫
            const fsLoader = document.getElementById('fullScreenLoader');
            if (fsLoader) {
                document.getElementById('fsLoaderText').innerText = "載入公文資料中...";
                fsLoader.classList.remove('hidden');
            }
            
            initFirebaseSync();
        } catch (error) {
            console.error("Login verification error:", error);
            document.getElementById('loginError').innerText = "帳號不存在或密碼錯誤";
            document.getElementById('loginError').classList.remove('hidden');
            document.getElementById('loginBtn').innerText = "登入";
        }
    });
}

function logout() {
    localStorage.removeItem('syncAccount');
    localStorage.removeItem('syncToken');
    location.reload();
}

// Firestore Helpers
async function updateDocInCloud(docNo, data) {
    if(!window.firebaseAPI) return;
    const { db, doc, setDoc } = window.firebaseAPI;
    try {
        await setDoc(doc(db, "docs", String(docNo)), data, { merge: true });
    } catch(e) { console.error("Error updating doc:", e); }
}

async function setDocInCloud(docNo, data) {
    if(!window.firebaseAPI) return;
    const { db, doc, setDoc } = window.firebaseAPI;
    try {
        await setDoc(doc(db, "docs", String(docNo)), data);
    } catch(e) { console.error("Error setting doc:", e); }
}

async function deleteDocInCloud(docNo) {
    if(!window.firebaseAPI) return;
    const { db, doc, deleteDoc } = window.firebaseAPI;
    try {
        await deleteDoc(doc(db, "docs", String(docNo)));
    } catch(e) { console.error("Error deleting doc:", e); }
}

async function saveBatchToCloud(docsArray) {
    if(!window.firebaseAPI) return;
    const { db, doc, writeBatch } = window.firebaseAPI;
    
    // Firestore batch limit is 500
    const CHUNK_SIZE = 500;
    for (let i = 0; i < docsArray.length; i += CHUNK_SIZE) {
        const chunk = docsArray.slice(i, i + CHUNK_SIZE);
        try {
            const batch = writeBatch(db);
            chunk.forEach(d => {
                if(d.docNo) {
                    batch.set(doc(db, "docs", String(d.docNo)), d, { merge: true });
                }
            });
            await batch.commit();
        } catch (e) {
            console.error("Error committing batch:", e);
        }
    }
}


async function loadDataAndRender(silent = false) {
    const result = await fetchFromCloud(silent);
    if (result && result.success) {
        // --- 解決跨分頁延遲：如果本地有還在進行中的同步，忽略雲端的舊資料 ---
        const until = parseInt(localStorage.getItem('syncOngoingUntil') || '0', 10);
        if (Date.now() < until) {
            const cached = localStorage.getItem('cachedDocs');
            if (cached) {
                docs = JSON.parse(cached);
                normalizeDates(docs);
                setupEvents();
                initFiltersAndEvents();
                render();
            }
            return { success: true };
        }
        // ----------------------------------------------------------------

        // 更新快取
        localStorage.setItem('cachedDocs', JSON.stringify(result.data));
        docs = result.data;
        normalizeDates(docs);
        setupEvents();
        initFiltersAndEvents();
        render();
        return { success: true };
    }
    return result;
}

let isEventsSetup = false;
function setupEvents() {
    if (isEventsSetup) return;
    isEventsSetup = true;
    const tbody = document.getElementById('tbody');
    if(tbody) {
        tbody.addEventListener('click', e => {
            const btn = e.target.closest('[data-action]');
            if (!btn || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
            const action = btn.dataset.action;
            const docNo = btn.dataset.docno;
            
            if (action === 'openDateQuickModal') openDateQuickModal(docNo);
            else if (action === 'openDateQuickModalDisplay') openDateQuickModal(docNo, 'display');
            else if (action === 'openCompare') openCompare(docNo);
            else if (action === 'deleteDoc') deleteDoc(docNo);
            else if (action === 'setFilter') setFilter(btn.dataset.filter, btn);
        });

        tbody.addEventListener('change', e => {
            if (!e.target.dataset.action) return;
            const action = e.target.dataset.action;
            const docNo = e.target.dataset.docno;
            const val = e.target.value;
            
            if (action === 'updateSend') updateSend(docNo, val);
            else if (action === 'updateDisplay') updateDisplay(docNo, val);
            else if (action === 'changeStatus') changeStatus(docNo, val);
        });

        tbody.addEventListener('input', e => {
            if (!e.target.dataset.action) return;
            const action = e.target.dataset.action;
            const docNo = e.target.dataset.docno;
            const val = e.target.value;
            
            if (action === 'updateNote') updateNote(docNo, val);
        });
    }
    
    // Add setFilter delegation for sidebar links
    const sidebar = document.querySelector('.sidebar');
    if(sidebar) {
        sidebar.addEventListener('click', e => {
            const btn = e.target.closest('[data-action="setFilter"]');
            if (btn) setFilter(btn.dataset.filter, btn);
        });
        sidebar.addEventListener('mouseleave', () => {
            sidebar.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function normalizeDates(docsArray) {
    docsArray.forEach(d=>{
        ['sendDate', 'displayDate'].forEach(field => {
            if (d[field] && d[field].includes('T')) {
                const dateObj = new Date(d[field]);
                if (!isNaN(dateObj)) {
                    d[field] = dateObj.getFullYear() + '-' + String(dateObj.getMonth() + 1).padStart(2, '0') + '-' + String(dateObj.getDate()).padStart(2, '0');
                }
            }
        });
        
        if(d.status !== '已發文' || !d.doneTime) return;
        if(
            d.doneTime.includes('上午') ||
            d.doneTime.includes('下午')
        ){
            const m = d.doneTime.match(/(\d+)\/(\d+)\/(\d+)\s*(上午|下午)(\d+):(\d+):(\d+)/);
            if(m){
                let hour = Number(m[5]);
                if(m[4] === '下午' && hour < 12){ hour += 12; }
                if(m[4] === '上午' && hour === 12){ hour = 0; }
                d.doneTimestamp = new Date(`${m[1]}-${String(m[2]).padStart(2,'0')}-${String(m[3]).padStart(2,'0')} ${String(hour).padStart(2,'0')}:${m[6]}`).getTime();
                d.doneTime = `${m[1]}/${String(m[2]).padStart(2,'0')}/${String(m[3]).padStart(2,'0')} ${String(hour).padStart(2,'0')}:${String(m[6]).padStart(2,'0')}`;
            }
        }else{
            const dateObj = new Date(d.doneTime);
            if(!isNaN(dateObj)){
                d.doneTimestamp = dateObj.getTime();
                d.doneTime = dateObj.getFullYear() + '/' + String(dateObj.getMonth()+1).padStart(2,'0') + '/' + String(dateObj.getDate()).padStart(2,'0') + ' ' + String(dateObj.getHours()).padStart(2,'0') + ':' + String(dateObj.getMinutes()).padStart(2,'0');
            }
        }
    });
}

let docs = [];

let currentFilter = 'pending';
let selectedForecastDate = '';
let pendingImportPlan = null;
let currentPage = 1;
let sortState = { key: '', direction: 'asc' };
let linkMode = localStorage.getItem('dispatch_link_mode') || 'auto';
const pageSize = 20;
const internalSinoSignHost = 'iiseng.sinotech-eng.com';
const externalSinoSignHost = 'web.sinotech-eng.com';
const dispatchListPath = '/SinoForm/Doc/Dispatch';
const dispatchDetailPath = '/SinoForm/Doc/Dispatch1/';
const signEditPath = '/SinoSign/Form/Edit/';
const myReviewPath = '/SinoSign/#/MyReview';

function getLocalDateString(date = new Date()){

return (
date.getFullYear() + '-' +
String(date.getMonth()+1).padStart(2,'0') + '-' +
String(date.getDate()).padStart(2,'0')
);

}

function getLocalDateTimestamp(dateString,endOfDay=false){

const [year,month,day]=dateString.split('-').map(Number);

return new Date(
year,
month-1,
day,
endOfDay ? 23 : 0,
endOfDay ? 59 : 0,
endOfDay ? 59 : 0,
endOfDay ? 999 : 0
).getTime();

}

function getDoneInfo(){

const now = new Date();

return {
    timestamp: now.getTime(),
    display:
        now.getFullYear() + '/' +
        String(now.getMonth()+1).padStart(2,'0') + '/' +
        String(now.getDate()).padStart(2,'0') + ' ' +
        String(now.getHours()).padStart(2,'0') + ':' +
        String(now.getMinutes()).padStart(2,'0')
};

}

function escapeHTML(value){
return String(value ?? '')
.replace(/&/g,'&amp;')
.replace(/</g,'&lt;')
.replace(/>/g,'&gt;')
.replace(/"/g,'&quot;')
.replace(/'/g,'&#039;');
}

function normalizeText(value){
return String(value ?? '').toLowerCase().replace(/\s+/g,'');
}

function getEffectiveLinkMode(){
if(linkMode !== 'auto'){
return linkMode;
}

return location.hostname === internalSinoSignHost ? 'internal' : 'external';
}

function getSmartUrl(rawUrl){
if(!rawUrl){
return '';
}

try{
const url = new URL(rawUrl);
const isSinoSignEdit =
(url.hostname === internalSinoSignHost || url.hostname === externalSinoSignHost) &&
url.pathname.startsWith('/SinoSign/Form/Edit/');

if(!isSinoSignEdit){
return rawUrl;
}

url.protocol = 'https:';
url.hostname = getEffectiveLinkMode() === 'internal'
? internalSinoSignHost
: externalSinoSignHost;

if(getEffectiveLinkMode() === 'internal'){
url.protocol = 'http:';
}

return url.toString();
}catch(err){
return rawUrl;
}
}

function getSmartBaseUrl(){
return getEffectiveLinkMode() === 'internal'
? `http://${internalSinoSignHost}`
: `https://${externalSinoSignHost}`;
}

function extractFormId(rawUrl){
if(!rawUrl){
return '';
}

try{
const url = new URL(rawUrl);
const match = url.pathname.match(/\/(?:SinoSign\/Form\/Edit|SinoForm\/Doc\/Dispatch1)\/([^/?#]+)/i);
return match ? match[1] : '';
}catch(err){
const match = String(rawUrl).match(/\/(?:SinoSign\/Form\/Edit|SinoForm\/Doc\/Dispatch1)\/([^/?#]+)/i);
return match ? match[1] : '';
}
}

function getSignEditUrl(rawUrl){
const id=extractFormId(rawUrl);
return id ? `${getSmartBaseUrl()}${signEditPath}${id}` : getSmartUrl(rawUrl);
}

function getDispatchDetailUrl(rawUrl){
const id=extractFormId(rawUrl);
return id ? `${getSmartBaseUrl()}${dispatchDetailPath}${id}` : '';
}

function getDispatchListUrl(){
return `${getSmartBaseUrl()}${dispatchListPath}`;
}

function getMyReviewUrl(){
return `${getSmartBaseUrl()}${myReviewPath}`;
}

function getLinkModeLabel(){
const mode=getEffectiveLinkMode();
return mode === 'internal' ? '公司內連結' : '公司外連結';
}

let toastQueue = [];
let isToastShowing = false;

function showToast(message) {
  toastQueue.push(message);
  processToastQueue();
}

function processToastQueue() {
  if (isToastShowing || toastQueue.length === 0) return;
  
  isToastShowing = true;
  const message = toastQueue.shift();
  
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  // Trigger reflow
  void toast.offsetWidth;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      isToastShowing = false;
      processToastQueue();
    }, 400);
  }, 2200);
}

function save(){
    console.warn("save() is deprecated. Using direct Firestore updates instead.");
}

function setLinkMode(value){
linkMode=value;
localStorage.setItem('dispatch_link_mode',linkMode);
render();
showToast(linkMode === 'auto' ? `已切回自動模式，目前使用${getLinkModeLabel()}` : `已切換為${getLinkModeLabel()}`);
}

function openDispatchList(){
window.open(getDispatchListUrl(),'_blank','noopener');
}

function openMyReview(){
window.open(getMyReviewUrl(),'_blank','noopener');
}

function getDocByNo(docNo) {
    return docs.find(d => String(d.docNo) === String(docNo)) || doneDocs.find(d => String(d.docNo) === String(docNo));
}

function openCompare(docNo){
const doc=getDocByNo(docNo);
if(!doc){
alert('找不到資料。');
return;
}
const signUrl=getSignEditUrl(doc.url);
const dispatchUrl=getDispatchDetailUrl(doc.url);

if(!dispatchUrl || !signUrl){
alert('這筆資料沒有可辨識的表單連結，無法開啟對照。');
return;
}

window.open(dispatchUrl,'_blank','noopener');
window.open(signUrl,'_blank','noopener');
showToast('已開啟發文作業與電子表單對照');
}

function setSort(key){
if(sortState.key===key){
sortState.direction=sortState.direction==='asc' ? 'desc' : 'asc';
}else{
sortState={key,direction:key==='doneTime' ? 'desc' : 'asc'};
}
currentPage=1;
render();
}

function clearSearch(){
const search=document.getElementById('search');
search.value='';
currentPage=1;
render();
search.focus();
}

function getCheckedDocNos(){
return [...document.querySelectorAll('.batch-check:checked')]
.map(check=>check.dataset.docno);
}

function setQuickDate(range) {
    const startInput = document.getElementById('doneStartDate');
    const endInput = document.getElementById('doneEndDate');
    const today = new Date();
    
    const formatDate = (date) => {
        return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    };

    if (range === 'all') {
        startInput.value = '';
        endInput.value = '';
    } else if (range === 'today') {
        const d = formatDate(today);
        startInput.value = d;
        endInput.value = d;
    } else if (range === 'week') {
        const start = new Date(today);
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1); 
        start.setDate(diff);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        startInput.value = formatDate(start);
        endInput.value = formatDate(end);
    } else if (range === 'month') {
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        startInput.value = formatDate(start);
        endInput.value = formatDate(end);
    }
    
    document.querySelectorAll('.quick-date').forEach(btn => {
        btn.classList.remove('blue');
        btn.classList.add('muted-btn');
    });
    const clickedBtn = document.querySelector(`.quick-date[data-range="${range}"]`);
    if(clickedBtn) {
        clickedBtn.classList.remove('muted-btn');
        clickedBtn.classList.add('blue');
    }

    render();
}

function clearQuickDateHighlight() {
    document.querySelectorAll('.quick-date').forEach(btn => {
        btn.classList.remove('blue');
        btn.classList.add('muted-btn');
    });
}

async function setFilter(type,el){
window.isManualNav = true;
currentFilter = type;
selectedForecastDate = '';
currentPage = 1;

document.querySelectorAll('.nav').forEach(v=>v.classList.remove('active'));

el.classList.add('active');

const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('mobileOverlay');
if (sidebar && sidebar.classList.contains('mobile-open')) {
    sidebar.classList.remove('mobile-open');
    if(overlay) overlay.classList.remove('active');
}

const titles = {
pending:'尚待發文',
nodate:'未設定日期',
today:'今日待發',
overdue:'已逾期',
done:'累計已發'
};

document.getElementById('pageTitle').innerText = titles[type];

const dateControls = document.getElementById('doneFilterArea');

const excelArea =
document.getElementById('excelExportArea');

if(excelArea){

excelArea.style.display =
type === 'done'
? 'inline-block'
: 'none';

}

if(dateControls){

dateControls.style.display =
type === 'done'
? 'inline-flex'
: 'none';

}

if (type === 'done' && !doneDocsLoadedAll) {
    const fsLoader = document.getElementById('fullScreenLoader');
    if (fsLoader) {
        document.getElementById('fsLoaderText').innerText = "載入歷史公文中...";
        fsLoader.classList.remove('hidden');
    }
    await loadAllDoneDocs();
    if (fsLoader) fsLoader.classList.add('hidden');
}

render();

}

function filterForecastDate(dateStr){

currentFilter = 'forecast';
selectedForecastDate = dateStr;
currentPage = 1;

document.querySelectorAll('.nav').forEach(v=>v.classList.remove('active'));

const date = new Date(dateStr + 'T00:00:00');
const weekNames = ['日','一','二','三','四','五','六'];

document.getElementById('pageTitle').innerText =
`${date.getMonth()+1}月${date.getDate()}日（週${weekNames[date.getDay()]}）待發公文`;

document.getElementById('doneFilterArea').style.display = 'none';
document.getElementById('excelExportArea').style.display = 'none';

render();

}

function openImport(){
document.getElementById('importModal').style.display='flex';
setTimeout(()=>document.getElementById('importText').focus(),0);
}

function closeImport(){
document.getElementById('importModal').style.display='none';
}

function cleanLine(text){
return text
.replace(/\*\*/g,'')
.replace(/函``/g,'')
.replace(/\[|\]/g,'')
.replace(/\(https?:\/\/[^\s]+\)/g,'')
.replace(/https?:\/\/[^\s]+/g,'')
.replace(/\s+/g,' ')
.trim();
}



async function confirmImport(){

if (!doneDocsLoadedAll) {
    const fsLoader = document.getElementById('fullScreenLoader');
    if (fsLoader) {
        document.getElementById('fsLoaderText').innerText = "載入歷史資料中...";
        fsLoader.classList.remove('hidden');
    }
    await loadAllDoneDocs();
    if (fsLoader) fsLoader.classList.add('hidden');
}

const editor = document.getElementById('importText');

const htmlContent = editor.innerHTML;
const textContent = editor.innerText;

if(!textContent.trim()){
alert('尚未貼上任何資料，未執行匯入。');
return;
}

const parser = new DOMParser();
const parsed = parser.parseFromString(htmlContent,'text/html');

const links = [...parsed.querySelectorAll('a')];

const linkEntries = [];

links.forEach(link=>{

const text = cleanLine(link.innerText);
const href = link.href;

if(text && href){
linkEntries.push({
text,
href,
used:false
});
}

});

function takeMatchingUrl(subject){

const exactMatch=linkEntries.find(entry=>
!entry.used &&
entry.text===subject
);

const match=exactMatch || linkEntries.find(entry=>
!entry.used &&
(subject.includes(entry.text) || entry.text.includes(subject))
);

if(!match){
return '';
}

match.used=true;
return match.href;

}

let lines = textContent.split('\n')
.map(v=>cleanLine(v))
.filter(v=>v && v!=='函');

const importedDocNos = [];
let parsedItems = [];
const seenDocNos = new Set();

if (pendingImportJSON) {
    parsedItems = pendingImportJSON;
    parsedItems.forEach(item => {
        importedDocNos.push(item.docNo);
        seenDocNos.add(item.docNo);
    });
    pendingImportJSON = null;
} else {
    let currentSection = '總發'; // 預設狀態為「總發」，支援單純貼上無標題的資料

    for(let i=0;i<lines.length;i++){

    // --- 區塊狀態追蹤 (Context-Aware) ---
    if (lines[i] === '總檔') {
        currentSection = '其他';
        continue;
} else if (lines[i] === '總發') {
    currentSection = '總發';
    continue;
} else if (/^\d{4}$/.test(lines[i])) {
    // 若為 4 碼數字，判斷是「員編標題」還是「計畫編號」
    // 若下一行是收創日期 (YYYY/MM/DD)，代表這行是剛好 4 碼的計畫編號
    if (i + 1 < lines.length && /^\d{4}\/\d{2}\/\d{2}$/.test(lines[i+1])) {
        // 這是計畫編號，不切換狀態，繼續往下執行
    } else {
        // 這是員編區塊標題
        currentSection = '其他';
        continue;
    }
}

if(/^[A-Z0-9]+$/.test(lines[i])){

    // 核心邏輯：只處理「總發」區塊內的資料
    if (currentSection !== '總發') {
        continue;
    }

const projectNo = lines[i];
const rawDocNo = lines[i+2] || '';
const docNo = rawDocNo.replace(/[^\d]/g,'');

let subject='';
let handler='';
let url='';

for(let j=i+3;j<i+8 && j<lines.length;j++){

if(lines[j].length >= 8 && !subject){

subject = lines[j];
url = takeMatchingUrl(subject);

continue;

}

if(/^[\u4e00-\u9fa5]{2,4}$/.test(lines[j])){
handler = lines[j];
break;
}

}

// 嚴格過濾：必須有數字與主旨、原本沒有橫槓，且萃取出的數字剛好 10 碼 (排除表單)
if(docNo && subject && !rawDocNo.includes('-') && docNo.length === 10){

if(seenDocNos.has(docNo)){
continue;
}

seenDocNos.add(docNo);
importedDocNos.push(docNo);

const order = importedDocNos.length;
parsedItems.push({
projectNo,
docNo,
subject,
handler,
url:url,
sortOrder:order
});

}

}

}
}

if(importedDocNos.length===0){
alert('未解析到有效的發文資料，未變更任何既有資料。請確認貼上的內容格式是否正確。');
return;
}

const importedSet = new Set(importedDocNos.map(String));
const newItems = parsedItems.filter(item=>!getDocByNo(item.docNo));
const existingItems = parsedItems.filter(item=>getDocByNo(item.docNo));
const autoDoneItems = docs.filter(d=>
d.status==='待發' &&
!importedSet.has(String(d.docNo))
);

pendingImportPlan = {
parsedItems,
newItems,
existingItems,
autoDoneItems,
importedSet
};

document.getElementById('previewAddedCount').innerText=newItems.length;
document.getElementById('previewExistingCount').innerText=existingItems.length;
document.getElementById('previewAutoDoneCount').innerText=autoDoneItems.length;

fillPreviewList('previewAddedList',newItems);
fillPreviewList('previewExistingList',existingItems);
fillPreviewList('previewAutoDoneList',autoDoneItems);

document.getElementById('importPreviewModal').style.display='flex';

}

function fillPreviewList(elementId,items){

const box=document.getElementById(elementId);
box.innerHTML='';

items.forEach(item=>{
const div=document.createElement('div');
div.textContent=`${item.docNo || '無文號'}　${item.subject || ''}`;
box.appendChild(div);
});

}

function closeImportPreview(){
pendingImportPlan=null;
document.getElementById('importPreviewModal').style.display='none';
}

function executeImport(){

if(!pendingImportPlan){
alert('沒有可執行的同步內容。');
return;
}

const changedDocs = [];

pendingImportPlan.parsedItems.forEach(item=>{

const existingDoc=getDocByNo(item.docNo);

if(existingDoc){
existingDoc.sortOrder=item.sortOrder;
if(item.url) existingDoc.url=item.url;
changedDocs.push(existingDoc);
return;
}

const newDoc = {
projectNo:item.projectNo,
docNo:item.docNo,
subject:item.subject,
handler:item.handler,
sendDate:'',
displayDate:'',
status:'待發',
doneTime:'',
doneTimestamp:0,
note:'',
url:item.url,
sortOrder:item.sortOrder
};

docs.push(newDoc);
changedDocs.push(newDoc);

});

pendingImportPlan.autoDoneItems.forEach(item=>{

const doc=docs.find(d=>d.docNo===item.docNo);

if(doc && doc.status==='待發'){
const doneInfo=getDoneInfo();
doc.status='已發文';
doc.doneTimestamp=doneInfo.timestamp;
doc.doneTime=doneInfo.display;

// Move to doneDocs locally
let idx = docs.indexOf(doc);
if (idx > -1) docs.splice(idx, 1);
if (!doneDocs.find(d => String(d.docNo) === String(doc.docNo))) {
    doneDocs.push(doc);
    doneDocsCount++;
}

changedDocs.push(doc);
}

});

const added=pendingImportPlan.newItems.length;
const autoDone=pendingImportPlan.autoDoneItems.length;
const hasNoDate=docs.some(d=>d.status!=='已發文' && !d.sendDate);

if(hasNoDate){
currentFilter='nodate';
selectedForecastDate='';
currentPage=1;

document.querySelectorAll('.nav').forEach(v=>v.classList.remove('active'));
document.getElementById('navNodate').classList.add('active');
document.getElementById('pageTitle').innerText='未設定日期';
document.getElementById('doneFilterArea').style.display='none';
document.getElementById('excelExportArea').style.display='none';
}

saveBatchToCloud(changedDocs);
render();
document.getElementById('importText').innerHTML = '';
document.getElementById('importPreviewModal').style.display='none';
pendingImportPlan=null;
closeImport();

alert(
`同步完成

新增：${added} 筆
自動完成：${autoDone} 筆`
);

}



async function exportBackup(){

if (!doneDocsLoadedAll) {
    const fsLoader = document.getElementById('fullScreenLoader');
    if (fsLoader) {
        document.getElementById('fsLoaderText').innerText = "載入歷史資料中...";
        fsLoader.classList.remove('hidden');
    }
    await loadAllDoneDocs();
    if (fsLoader) fsLoader.classList.add('hidden');
}

const allData = [...docs, ...doneDocs];
const dataStr = JSON.stringify(allData,null,2);

const blob = new Blob([dataStr],{
type:'application/json'
});

const a = document.createElement('a');

const today = new Date();

const fileName =
'總收發備份_' +
today.getFullYear() +
String(today.getMonth()+1).padStart(2,'0') +
String(today.getDate()).padStart(2,'0') +
'_' +
String(today.getHours()).padStart(2,'0') +
String(today.getMinutes()).padStart(2,'0') +
'.json';

a.href = URL.createObjectURL(blob);
a.download = fileName;
a.click();

}

function importBackup(event){

const file = event.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

try{

const imported = JSON.parse(e.target.result);

if(!Array.isArray(imported)){

alert('備份格式錯誤');
return;

}

if(!confirm(`確定匯入 ${imported.length} 筆資料？\n目前資料將被覆蓋。`)){
return;
}

saveBatchToCloud(imported).then(() => {
    alert('備份匯入完成，將重新載入畫面');
    window.location.reload();
});

}catch(err){
    console.error("Import error:", err);
    alert('JSON格式錯誤或寫入失敗：' + err.message);
}

};

reader.readAsText(file);

}


function render(){

const tbody = document.getElementById('tbody');
tbody.innerHTML='';
const fragment = document.createDocumentFragment();

const isDonePage = currentFilter==='done';

document.querySelectorAll('.done-column').forEach(v=>{
v.style.display = isDonePage ? '' : 'none';
});

document.querySelectorAll('.done-cell').forEach(v=>{
v.style.display = isDonePage ? '' : 'none';
});


const now = new Date();
const todayFull = getLocalDateString(now);
const search = normalizeText(document.getElementById('search').value || '');

const doneStartDate =
document.getElementById('doneStartDate')?.value || '';

const doneEndDate =
document.getElementById('doneEndDate')?.value || '';

let pending=0,nodateCount=0,todayCount=0,overdue=0;

docs.forEach(v=>{
if(v.status!=='已發文') pending++;
if(v.status!=='已發文' && !v.sendDate) nodateCount++;
if(v.sendDate===todayFull && v.status!=='已發文') todayCount++;
if(v.sendDate && v.sendDate<todayFull && v.status!=='已發文') overdue++;
});

let rows = [];

let currentSourceData = docs;
if (search) {
    // If searching, combine both active and historical docs for full search
    currentSourceData = [...docs, ...doneDocs];
} else if (currentFilter === 'done') {
    // If viewing history, only look at done docs
    currentSourceData = doneDocs;
}

currentSourceData.forEach((d,i)=>{

const text = normalizeText(`${d.docNo} ${d.subject} ${d.handler} ${d.note || ''}`);

if(search && !text.includes(search)) return;
if(currentFilter==='pending' && d.status==='已發文') return;
if(currentFilter==='nodate' && !(d.status!=='已發文' && !d.sendDate)) return;
if(currentFilter==='today' && !(d.sendDate===todayFull && d.status!=='已發文')) return;
if(currentFilter==='overdue' && !(d.sendDate && d.sendDate<todayFull && d.status!=='已發文')) return;
if(currentFilter==='done' && d.status!=='已發文') return;
if(currentFilter==='forecast' && !(d.sendDate===selectedForecastDate && d.status!=='已發文')) return;

if(currentFilter==='done'){

if(doneStartDate){

const start =
getLocalDateTimestamp(doneStartDate);

if((d.doneTimestamp||0) < start){
return;
}

}

if(doneEndDate){

const end =
getLocalDateTimestamp(doneEndDate,true);

if((d.doneTimestamp||0) > end){
return;
}

}

}

rows.push({d,i});

})

if(sortState.key){
rows.sort((a,b)=>{
const direction=sortState.direction==='asc' ? 1 : -1;

if(sortState.key==='doneTime'){
return ((a.d.doneTimestamp || 0) - (b.d.doneTimestamp || 0)) * direction;
}

const av=normalizeText(a.d[sortState.key] || '');
const bv=normalizeText(b.d[sortState.key] || '');
return av.localeCompare(bv,'zh-Hant') * direction;
});
} else {
    if (currentFilter === 'done') {
        rows.sort((a, b) => (b.d.doneTimestamp || 0) - (a.d.doneTimestamp || 0));
    } else {
        rows.sort((a, b) => (a.d.sortOrder || 999999) - (b.d.sortOrder || 999999));
    }
}


const start=(currentPage-1)*pageSize;
const end=start+pageSize;
const paged=rows.slice(start,end);

paged.forEach((item)=>{
    const d = item.d;
    const i = item.i;

    const isOverdue = d.sendDate && d.sendDate < todayFull && d.status!=='已發文';
    const isToday = d.sendDate === todayFull && d.status!=='已發文';
    
    let rowClass = '';
    if(isOverdue) rowClass='overdue-row';
    else if(isToday) rowClass='today-row';
    
    const safeSubject = escapeHTML(d.subject);
    const safeNote = escapeHTML(d.note || '');
    const safeDoneTime = d.doneTime ? escapeHTML(d.doneTime) : '';
    
    const tr = document.createElement('tr');
    tr.className = rowClass;
    
    const smartUrl = getSignEditUrl(d.url);
    const dispatchUrl = getDispatchDetailUrl(d.url);
    const safeUrl = escapeHTML(smartUrl);
    
    let subjectContent = dispatchUrl 
        ? `<a class="subject-link" href="${safeUrl}" target="_blank" rel="noopener" title="${escapeHTML(getLinkModeLabel())}">${safeSubject}</a>` 
        : `<div class="subject-link">${safeSubject}</div>`;
        
    tr.innerHTML = `
        <td data-label="選取">
            <input type="checkbox" class="batch-check" data-docno="${d.docNo}">
        </td>
        <td data-label="表單編號">
            <div class="doc-no" onclick="copyToClipboard('${d.docNo}')" title="點擊複製表單編號">${d.docNo}</div>
        </td>
        <td data-label="主旨">
            ${subjectContent}
        </td>
        <td data-label="計畫編號">
            <span class="val">${d.projectNo || ''}</span>
        </td>
        <td data-label="承辦人">
            <span class="val">${d.handler || ''}</span>
        </td>

        <td data-label="應發文日">
        <div class="pill send-pill" data-action="openDateQuickModal" data-docno="${d.docNo}">
        ${d.sendDate ? d.sendDate.replace(/^\d{4}-/,'').replace('-','/') : '未設'}
        </div>
        <input id="send_${d.docNo}" class="hidden-date" type="date" value="${d.sendDate}" data-action="updateSend" data-docno="${d.docNo}">
        </td>

        <td data-label="顯示發文">
        <div class="pill display-pill" data-action="openDateQuickModalDisplay" data-docno="${d.docNo}">
        ${d.displayDate ? d.displayDate.replace(/^\d{4}-/,'').replace('-','/') : '未設'}
        </div>
        <input id="display_${d.docNo}" class="hidden-date" type="date" value="${d.displayDate}" data-action="updateDisplay" data-docno="${d.docNo}">
        </td>

        <td data-label="狀態">
        <select 
        class="status-btn ${d.status==='已發文'?'done':'pending'}"
        data-action="changeStatus" data-docno="${d.docNo}">
        <option value="待發" ${d.status==='待發'?'selected':''}>待發</option>
        <option value="已發文" ${d.status==='已發文'?'selected':''}>已發文</option>
        </select>
        </td>

        <td data-label="備註">
        <input class="note" value="${safeNote}" title="${safeNote}" data-action="updateNote" data-docno="${d.docNo}" placeholder="輸入備註">
        </td>

        ${isDonePage ? `<td data-label="完成時間" class="done-cell">${safeDoneTime}</td>` : ``}
        <td data-label="操作">
        ${dispatchUrl ? `<button class="btn secondary" style="padding:6px 10px;min-height:34px;margin-right:4px;" data-action="openCompare" data-docno="${d.docNo}" title="同時開啟發文作業與電子表單">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="7" height="16" rx="1"></rect><rect x="14" y="4" width="7" height="16" rx="1"></rect>
        </svg>
        </button>` : ``}
        <button class="btn danger-soft" style="padding:6px 10px;min-height:34px;" data-action="deleteDoc" data-docno="${d.docNo}" title="刪除">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 7h16"></path><path d="M9 7V4h6v3"></path><path d="m6 7 1 14h10l1-14"></path>
        </svg>
        </button>
        </td>
        `;

        fragment.appendChild(tr);

    });

if(rows.length===0){
tbody.innerHTML='<tr><td colspan="9" style="text-align:center;padding:40px;color:#94a3b8;">此分類目前無資料</td></tr>';
}else{
tbody.appendChild(fragment);
}

const selectAll=document.getElementById('selectAllVisible');
const visibleChecks=[...document.querySelectorAll('.batch-check')];

selectAll.checked=false;
selectAll.indeterminate=false;
selectAll.disabled=visibleChecks.length===0;

visibleChecks.forEach(check=>{
check.addEventListener('change',updateSelectAllState);
});

document.querySelectorAll('[data-sort-mark]').forEach(mark=>{
mark.textContent = mark.dataset.sortMark===sortState.key
? (sortState.direction==='asc' ? '▲' : '▼')
: '';
});

document.getElementById('pendingBadge').innerText=pending;
document.getElementById('nodateBadge').innerText=nodateCount;
document.getElementById('todayBadge').innerText=todayCount;
document.getElementById('overdueBadge').innerText=overdue;
document.getElementById('doneBadge').innerText=doneDocsCount;

document.getElementById('pendingCount').innerText=pending;
document.getElementById('todayCount').innerText=todayCount;
document.getElementById('overdueCount').innerText=overdue;
document.getElementById('doneCount').innerText=doneDocsCount;



const warning = document.getElementById('warningBox');

if(overdue>0){
warning.style.display='block';
warning.innerText=`⚠ 目前有 ${overdue} 件已逾期未發文`;
}else{
warning.style.display='none';
}

// --- 瀑布式工作流自動跳轉 (Waterfall Auto-Routing) ---
const justBecameEmpty = (window.lastRenderedFilter === currentFilter && window.lastRenderedRowsCount > 0 && rows.length === 0);
if (justBecameEmpty && !search && currentFilter !== 'done' && currentFilter !== 'forecast') {
    let targetFilter = null;
    let navId = null;
    
    if (currentFilter === 'nodate') {
        if (overdue > 0) { targetFilter = 'overdue'; navId = 'navOverdue'; }
        else if (todayCount > 0) { targetFilter = 'today'; navId = 'navToday'; }
        else if (pending > 0) { targetFilter = 'pending'; navId = 'navPending'; }
    } else if (currentFilter === 'overdue') {
        if (todayCount > 0) { targetFilter = 'today'; navId = 'navToday'; }
        else if (pending > 0) { targetFilter = 'pending'; navId = 'navPending'; }
    } else if (currentFilter === 'today') {
        if (pending > 0) { targetFilter = 'pending'; navId = 'navPending'; }
    }

    if (targetFilter && navId) {
        const navEl = document.getElementById(navId);
        if (navEl) {
            setTimeout(() => setFilter(targetFilter, navEl), 10);
            return;
        }
    }
}
// --------------------------------------

renderForecast();

const pageBar=document.getElementById('paginationBar');
if(pageBar){
pageBar.innerHTML='';

if(currentFilter==='done'){

const totalPages=Math.ceil(rows.length/pageSize)||1;

const pagination=document.createElement('div');
pagination.className='pagination';

const info=document.createElement('div');
info.className='pagination-info';
info.textContent=`共 ${rows.length} 筆資料　第 ${currentPage} / ${totalPages} 頁`;
pagination.appendChild(info);

const prev=document.createElement('button');
prev.className='page-btn page-nav';
prev.textContent='上一頁';
prev.disabled=currentPage===1;
prev.onclick=()=>{currentPage--;render();};
pagination.appendChild(prev);

function getVisiblePages(total,current){
const pages=new Set([1,total,current,current-1,current+1]);

if(current<=4){
for(let p=1;p<=Math.min(5,total);p++) pages.add(p);
}

if(current>=total-3){
for(let p=Math.max(1,total-4);p<=total;p++) pages.add(p);
}

return [...pages]
.filter(p=>p>=1 && p<=total)
.sort((a,b)=>a-b);
}

let lastPage=0;
getVisiblePages(totalPages,currentPage).forEach(p=>{
if(lastPage && p-lastPage>1){
const ellipsis=document.createElement('span');
ellipsis.className='page-ellipsis';
ellipsis.textContent='…';
pagination.appendChild(ellipsis);
}

const b=document.createElement('button');
b.className='page-btn';
if(p===currentPage){
b.classList.add('active');
}
b.textContent=p;
b.onclick=()=>{currentPage=p;render();};
pagination.appendChild(b);
lastPage=p;
});

const next=document.createElement('button');
next.className='page-btn page-nav';
next.textContent='下一頁';
next.disabled=currentPage===totalPages;
next.onclick=()=>{currentPage++;render();};
pagination.appendChild(next);

pageBar.appendChild(pagination);
}

}

window.lastRenderedRowsCount = rows.length;
window.lastRenderedFilter = currentFilter;
}

function toggleSelectAllVisible(checked){

document.querySelectorAll('.batch-check').forEach(check=>{
check.checked=checked;
});

updateSelectAllState();

}

function updateSelectAllState(){

const selectAll=document.getElementById('selectAllVisible');
const checks=[...document.querySelectorAll('.batch-check')];
const checkedCount=checks.filter(check=>check.checked).length;

selectAll.disabled=checks.length===0;
selectAll.checked=checks.length>0 && checkedCount===checks.length;
selectAll.indeterminate=checkedCount>0 && checkedCount<checks.length;

}

function renderForecast(){

const box = document.getElementById('forecastBox');
box.innerHTML='';

const today = new Date();

const weekNames = ['日','一','二','三','四','五','六'];
for(let i=0;i<7;i++){

const d = new Date();
d.setDate(today.getDate()+i);

const yyyy=d.getFullYear();
const mm=String(d.getMonth()+1).padStart(2,'0');
const dd=String(d.getDate()).padStart(2,'0');
const dayName = weekNames[d.getDay()];

const dateStr=`${yyyy}-${mm}-${dd}`;

const count = docs.filter(v=>v.sendDate===dateStr && v.status!=='已發文').length;

const div = document.createElement('div');

div.className='forecast-item';
div.title=`查看 ${mm}/${dd} 待發公文`;
div.onclick=()=>filterForecastDate(dateStr);

if(currentFilter==='forecast' && selectedForecastDate===dateStr){
div.classList.add('active');
}

if(i===0){
div.classList.add('forecast-today');
}

if(count>=5){
div.classList.add('forecast-danger');
}

div.innerHTML=`<span>${mm}/${dd} (${dayName})</span><span>${count} 件</span>`;

box.appendChild(div);

}

}


let activeDateIndex=null;
let activeDateMode='send';

function openDateQuickModal(docNo, mode='send') {
activeDateIndex = docNo;
activeDateMode = mode;

const title = document.getElementById('dateQuickModalTitle');
const input = document.getElementById('modalDateInput');

if (title) {
title.innerText = mode === 'display' ? '設定公文顯示日期' : '設定發文日期';
}

const doc = getDocByNo(docNo);
if (input && doc) {
input.value = mode === 'display' ? (doc.displayDate || '') : (doc.sendDate || '');
}

document.getElementById('dateQuickModal').style.display = 'flex';
}

function closeDateQuickModal(){
document.getElementById('dateQuickModal').style.display='none';
}

let statsCurrentDate = new Date();

async function openStatsModal() {
    if (!doneDocsLoadedAll) {
        const fsLoader = document.getElementById('fullScreenLoader');
        if (fsLoader) {
            document.getElementById('fsLoaderText').innerText = "載入歷史資料中...";
            fsLoader.classList.remove('hidden');
        }
        await loadAllDoneDocs();
        if (fsLoader) fsLoader.classList.add('hidden');
    }

    statsCurrentDate = new Date();
    document.getElementById('statsModal').style.display = 'flex';
    renderStatsCalendar();
}

function closeStatsModal() {
    document.getElementById('statsModal').style.display = 'none';
}

function changeStatsMonth(delta) {
    statsCurrentDate.setMonth(statsCurrentDate.getMonth() + delta);
    renderStatsCalendar();
}

function renderStatsCalendar() {
    const year = statsCurrentDate.getFullYear();
    const month = statsCurrentDate.getMonth();
    
    document.getElementById('statsMonthLabel').innerText = `${year} 年 ${month + 1} 月`;
    
    // 計算這個月有幾筆發文
    const monthStart = new Date(year, month, 1).getTime();
    const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999).getTime();
    
    const monthDoneDocs = doneDocs.filter(d => d.doneTimestamp >= monthStart && d.doneTimestamp <= monthEnd);
    document.getElementById('statsSubtitle').innerText = `本月累計發文：${monthDoneDocs.length} 件`;
    
    // 計算每一天的數量
    const dailyCounts = {};
    monthDoneDocs.forEach(d => {
        const dObj = new Date(d.doneTimestamp);
        const dayKey = dObj.getDate();
        dailyCounts[dayKey] = (dailyCounts[dayKey] || 0) + 1;
    });
    
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    // 星期表頭
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    days.forEach(d => {
        const div = document.createElement('div');
        div.className = 'calendar-header';
        div.innerText = d;
        grid.appendChild(div);
    });
    
    // 空白格子
    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-cell empty';
        grid.appendChild(div);
    }
    
    // 每一天的格子
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const isThisMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();

    for (let i = 1; i <= lastDate; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-cell';
        if (isThisMonth && i === todayDate) {
            div.classList.add('today');
        }
        
        const count = dailyCounts[i] || 0;
        
        let html = `<div class="date-num">${i}</div>`;
        if (count > 0) {
            html += `<div class="doc-badge">${count} 件</div>`;
            div.classList.add('has-data');
            div.onclick = () => {
                // 點擊事件：跳轉到那一天
                closeStatsModal();
                const padMonth = String(month + 1).padStart(2, '0');
                const padDay = String(i).padStart(2, '0');
                const dateStr = `${year}-${padMonth}-${padDay}`;
                document.getElementById('doneStartDate').value = dateStr;
                document.getElementById('doneEndDate').value = dateStr;
                clearQuickDateHighlight();
                render();
            };
        }
        
        div.innerHTML = html;
        grid.appendChild(div);
    }
}

function openCustomDateModal() {
    document.getElementById('modalStartDateInput').value = document.getElementById('doneStartDate').value;
    document.getElementById('modalEndDateInput').value = document.getElementById('doneEndDate').value;
    document.getElementById('customDateModal').style.display = 'flex';
}

function closeCustomDateModal() {
    document.getElementById('customDateModal').style.display = 'none';
}

function applyCustomDateFilter() {
    document.getElementById('doneStartDate').value = document.getElementById('modalStartDateInput').value;
    document.getElementById('doneEndDate').value = document.getElementById('modalEndDateInput').value;
    
    // Highlight the custom button, remove highlight from others
    document.querySelectorAll('.quick-date').forEach(btn => {
        btn.classList.remove('blue');
        btn.classList.add('muted-btn');
    });
    const clickedBtn = document.querySelector(`.quick-date[data-range="custom"]`);
    if(clickedBtn) {
        clickedBtn.classList.remove('muted-btn');
        clickedBtn.classList.add('blue');
    }
    
    closeCustomDateModal();
    render();
}

function applyCustomDate(){
const val=document.getElementById('modalDateInput').value;
if(!val) return;

if(activeDateMode === 'display'){
updateDisplay(activeDateIndex,val);
}else{
updateSend(activeDateIndex,val);
}

closeDateQuickModal();
}

function updateSend(docNo,val){

const doc = getDocByNo(docNo);
if (!doc) return;

doc.sendDate=val;

if(!doc.displayDate){
doc.displayDate=val;
}

updateDocInCloud(doc.docNo, { sendDate: val, displayDate: doc.displayDate || val });
render();
showToast('發文日期已更新');

}

function quickDate(docNo,offset){

const d=new Date();
d.setDate(d.getDate()+offset);

const yyyy=d.getFullYear();
const mm=String(d.getMonth()+1).padStart(2,'0');
const dd=String(d.getDate()).padStart(2,'0');
const dateStr=`${yyyy}-${mm}-${dd}`;

const doc = getDocByNo(docNo);
if (!doc) return;

if(activeDateMode === 'display'){
doc.displayDate=dateStr;
updateDocInCloud(docNo, { displayDate: dateStr });
}else{
doc.sendDate=dateStr;

if(!doc.displayDate){
doc.displayDate=doc.sendDate;
updateDocInCloud(docNo, { sendDate: dateStr, displayDate: dateStr });
} else {
updateDocInCloud(docNo, { sendDate: dateStr });
}
}

render();
showToast(activeDateMode === 'display' ? '顯示日期已更新' : '發文日期已更新');
}


function updateDisplay(docNo,val){
const doc = getDocByNo(docNo);
if (!doc) return;
doc.displayDate=val;
updateDocInCloud(docNo, { displayDate: val });
render();
showToast('顯示日期已更新');
}

function updateNote(docNo,val){
const doc=getDocByNo(docNo);
if(!doc) return;
doc.note=val;
updateDocInCloud(docNo, { note: val });
}

function changeStatus(docNo,val){

const doc=getDocByNo(docNo);
if(!doc) return;

doc.status = val;

if(val==='已發文'){

const doneInfo = getDoneInfo();

doc.doneTimestamp = doneInfo.timestamp;
doc.doneTime = doneInfo.display;

// Move to doneDocs locally
let idx = docs.findIndex(d => String(d.docNo) === String(docNo));
if (idx > -1) docs.splice(idx, 1);
if (!doneDocs.find(d => String(d.docNo) === String(docNo))) {
    doneDocs.push(doc);
    doneDocsCount++;
}

}else{

doc.doneTime = '';
doc.doneTimestamp = 0;

// Move to docs locally
let idx = doneDocs.findIndex(d => String(d.docNo) === String(docNo));
if (idx > -1) doneDocs.splice(idx, 1);
if (!docs.find(d => String(d.docNo) === String(docNo))) {
    docs.push(doc);
    doneDocsCount = Math.max(0, doneDocsCount - 1);
}

}

updateDocInCloud(docNo, { 
    status: val,
    doneTime: doc.doneTime || '',
    doneTimestamp: doc.doneTimestamp || 0
});
render();
showToast(val==='已發文' ? '已標記為已發文' : '已改回待發');

}

function batchDone(){

const docNos = getCheckedDocNos();

if(docNos.length===0){

alert('請先勾選資料');
return;

}

const changedDocs = [];

docNos.forEach(docNo=>{

const doc=getDocByNo(docNo);
if(!doc) return;

doc.status='已發文';

const doneInfo = getDoneInfo();

doc.doneTimestamp = doneInfo.timestamp;
doc.doneTime = doneInfo.display;

// Move to doneDocs locally
let idx = docs.findIndex(d => String(d.docNo) === String(docNo));
if (idx > -1) docs.splice(idx, 1);
if (!doneDocs.find(d => String(d.docNo) === String(docNo))) {
    doneDocs.push(doc);
    doneDocsCount++;
}

changedDocs.push(doc);

});

saveBatchToCloud(changedDocs);
render();

showToast(`已將 ${docNos.length} 筆資料標記為已發文`);

}



function deleteDoc(docNo){

if(confirm('確定刪除這筆資料？')){

deleteDocInCloud(docNo);

let idx = docs.findIndex(d => String(d.docNo) === String(docNo));
if (idx > -1) docs.splice(idx, 1);
idx = doneDocs.findIndex(d => String(d.docNo) === String(docNo));
if (idx > -1) doneDocs.splice(idx, 1);

render();
showToast('資料已刪除');

}

}

function batchDelete(){

const docNos = getCheckedDocNos();

if(docNos.length===0){

alert('請先勾選資料');
return;

}

if(!confirm(`確定刪除 ${docNos.length} 筆資料？`)){
return;
}

docNos.forEach(docNo=>{
deleteDocInCloud(docNo);
let idx = docs.findIndex(d => String(d.docNo) === String(docNo));
if (idx > -1) docs.splice(idx, 1);
idx = doneDocs.findIndex(d => String(d.docNo) === String(docNo));
if (idx > -1) doneDocs.splice(idx, 1);
});

render();
showToast(`已刪除 ${docNos.length} 筆資料`);

}


function exportDoneExcel(){

const startDate =
document.getElementById('doneStartDate')?.value || '';

const endDate =
document.getElementById('doneEndDate')?.value || '';

const rows = doneDocs.filter(v=>{

if(startDate){

const start =
getLocalDateTimestamp(startDate);

if((v.doneTimestamp||0) < start){
return false;
}

}

if(endDate){

const end =
getLocalDateTimestamp(endDate,true);

if((v.doneTimestamp||0) > end){
return false;
}

}

return true;

})
.sort((a,b)=>
(b.doneTimestamp||0)-
(a.doneTimestamp||0)
);

const exportDate = new Date();
const exportDateText =
exportDate.getFullYear() + '/' +
String(exportDate.getMonth()+1).padStart(2,'0') + '/' +
String(exportDate.getDate()).padStart(2,'0');

const rangeText = startDate || endDate
? `${startDate || '不限'} ~ ${endDate || '不限'}`
: '全部累計已發資料';

function xml(value){
return String(value || '')
.replace(/&/g,'&amp;')
.replace(/</g,'&lt;')
.replace(/>/g,'&gt;')
.replace(/"/g,'&quot;')
.replace(/'/g,'&apos;');
}

function dataCell(value,style='Data'){
return `<Cell ss:StyleID="${style}"><Data ss:Type="String">${xml(value)}</Data></Cell>`;
}

const bodyRows = rows.length
? rows.map((r,index)=>`
<Row ss:AutoFitHeight="1" ss:Height="48">
${dataCell(index + 1,'DataCenter')}
${dataCell(r.docNo,'DataCenterText')}
${dataCell(r.handler,'DataCenter')}
${dataCell(r.subject,'DataLeftMiddleWrap')}
${dataCell(r.sendDate,'DataCenter')}
${dataCell(r.displayDate,'DataCenter')}
${dataCell(r.doneTime,'DataCenter')}
${dataCell(r.note,'DataLeftMiddleWrap')}
</Row>
`).join('')
: `<Row ss:Height="28"><Cell ss:MergeAcross="7" ss:StyleID="Empty"><Data ss:Type="String">查無資料</Data></Cell></Row>`;

const xmlRowCount = rows.length ? rows.length + 5 : 6;

const workbookXml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
<Author>發文時程管理平台</Author>
<Title>發文完成紀錄表</Title>
<Created>${new Date().toISOString()}</Created>
</DocumentProperties>
<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
<WindowHeight>9000</WindowHeight>
<WindowWidth>16000</WindowWidth>
<ProtectStructure>False</ProtectStructure>
<ProtectWindows>False</ProtectWindows>
</ExcelWorkbook>
<Styles>
<Style ss:ID="Default" ss:Name="Normal">
<Alignment ss:Vertical="Center"/>
<Font ss:FontName="Microsoft JhengHei" x:CharSet="136" ss:Size="11" ss:Color="#111111"/>
</Style>
<Style ss:ID="Title">
<Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
<Font ss:FontName="Microsoft JhengHei" x:CharSet="136" ss:Size="16" ss:Bold="1" ss:Color="#111111"/>
</Style>
<Style ss:ID="Meta">
<Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
<Font ss:FontName="Microsoft JhengHei" x:CharSet="136" ss:Size="10" ss:Color="#555555"/>
</Style>
<Style ss:ID="Header">
<Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
<Borders>
<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#333333"/>
<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D9D9D9"/>
<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D9D9D9"/>
<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#333333"/>
</Borders>
<Font ss:FontName="Microsoft JhengHei" x:CharSet="136" ss:Size="11" ss:Bold="1" ss:Color="#111111"/>
<Interior ss:Color="#F3F4F6" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="Data">
<Alignment ss:Vertical="Top"/>
<Borders>
<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
</Borders>
<Font ss:FontName="Microsoft JhengHei" x:CharSet="136" ss:Size="11" ss:Color="#111111"/>
</Style>
<Style ss:ID="DataLeftMiddleWrap" ss:Parent="Data">
<Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
</Style>
<Style ss:ID="DataCenter" ss:Parent="Data">
<Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
</Style>
<Style ss:ID="DataCenterText" ss:Parent="DataCenter">
<NumberFormat ss:Format="@"/>
</Style>
<Style ss:ID="Empty" ss:Parent="DataCenter">
<Font ss:FontName="Microsoft JhengHei" x:CharSet="136" ss:Size="11" ss:Color="#64748B"/>
</Style>
</Styles>
<Worksheet ss:Name="發文完成紀錄">
<Table ss:ExpandedColumnCount="8" ss:ExpandedRowCount="${xmlRowCount}" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="18">
<Column ss:AutoFitWidth="0" ss:Width="42"/>
<Column ss:AutoFitWidth="0" ss:Width="96"/>
<Column ss:AutoFitWidth="0" ss:Width="82"/>
<Column ss:AutoFitWidth="0" ss:Width="500"/>
<Column ss:AutoFitWidth="0" ss:Width="88"/>
<Column ss:AutoFitWidth="0" ss:Width="108"/>
<Column ss:AutoFitWidth="0" ss:Width="126"/>
<Column ss:AutoFitWidth="0" ss:Width="190"/>
<Row ss:Height="28"><Cell ss:MergeAcross="7" ss:StyleID="Title"><Data ss:Type="String">發文完成紀錄表</Data></Cell></Row>
<Row ss:Height="21"><Cell ss:MergeAcross="7" ss:StyleID="Meta"><Data ss:Type="String">匯出日期：${xml(exportDateText)}</Data></Cell></Row>
<Row ss:Height="21"><Cell ss:MergeAcross="7" ss:StyleID="Meta"><Data ss:Type="String">資料範圍：${xml(rangeText)}</Data></Cell></Row>
<Row ss:Height="8"><Cell ss:MergeAcross="7"></Cell></Row>
<Row ss:Height="30">
${['序號','表單編號','承辦人','主旨','發文日期','公文顯示日期','完成時間','備註'].map(label=>dataCell(label,'Header')).join('')}
</Row>
${bodyRows}
</Table>
<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
<PageSetup>
<Layout x:Orientation="Landscape"/>
<FitToPage/>
</PageSetup>
<Print>
<FitWidth>1</FitWidth>
<FitHeight>0</FitHeight>
</Print>
<Selected/>
<FreezePanes/>
<FrozenNoSplit/>
<SplitHorizontal>5</SplitHorizontal>
<TopRowBottomPane>5</TopRowBottomPane>
<ActivePane>2</ActivePane>
<Panes>
<Pane>
<Number>2</Number>
<ActiveRow>5</ActiveRow>
</Pane>
</Panes>
<ProtectObjects>False</ProtectObjects>
<ProtectScenarios>False</ProtectScenarios>
</WorksheetOptions>
</Worksheet>
</Workbook>`;

const blob = new Blob(
['\uFEFF' + workbookXml],
{type:'application/vnd.ms-excel;charset=utf-8;'}
);

const link = document.createElement('a');

link.href =
URL.createObjectURL(blob);

link.download =
'發文完成紀錄_' +
getLocalDateString().replace(/-/g,'') +
'_匯出.xls';

link.click();

}

function exportToday(){

const today = getLocalDateString();

const rows = docs.filter(v=>v.sendDate===today);

let content = `
<h1>今日待發清單</h1>
<table border="1" cellspacing="0" cellpadding="8">
<tr>
<th>表單編號</th>
<th>主旨</th>
<th>承辦人</th>
</tr>
`;

rows.forEach(r=>{

content += `
<tr>
<td>${r.docNo}</td>
<td>${r.subject}</td>
<td>${r.handler}</td>
</tr>
`;

});

content += '</table>';

const w = window.open('');
w.document.write(content);
w.print();

}

async function loadAllDoneDocs() {
    if (!window.firebaseAPI || doneDocsLoadedAll) return;
    const { db, collection, query, where, getDocs } = window.firebaseAPI;
    try {
        const q = query(collection(db, "docs"), where("status", "==", "已發文"));
        const snapshot = await getDocs(q);
        const loaded = [];
        snapshot.forEach(doc => loaded.push(doc.data()));
        normalizeDates(loaded);
        doneDocs = loaded;
        doneDocsLoadedAll = true;
    } catch(e) {
        console.error("Error loading all done docs:", e);
    }
}

let isFiltersEventsSetup = false;
function initFiltersAndEvents() {
    if (isFiltersEventsSetup) return;
    isFiltersEventsSetup = true;
let searchTimeout;
document.getElementById('search').addEventListener('input',()=>{
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        const searchVal = document.getElementById('search').value.trim();
        if (searchVal && !doneDocsLoadedAll) {
            const fsLoader = document.getElementById('fullScreenLoader');
            if (fsLoader) {
                document.getElementById('fsLoaderText').innerText = "搜尋中...正在載入歷史資料";
                fsLoader.classList.remove('hidden');
            }
            await loadAllDoneDocs();
            if (fsLoader) fsLoader.classList.add('hidden');
        }
        currentPage=1;
        render();
    }, 500);
});

document.getElementById('doneStartDate').addEventListener('change',()=>{
currentPage=1;
render();
});

document.getElementById('doneEndDate').addEventListener('change',()=>{
currentPage=1;
render();
});

document.addEventListener('keydown',event=>{
if(event.key==='Escape'){
closeImport();
closeImportPreview();
closeDateQuickModal();
}

if((event.ctrlKey || event.metaKey) && event.key.toLowerCase()==='f'){
event.preventDefault();
document.getElementById('search').focus();
}
});

(function(){
const today=getLocalDateString();

const overdueCount=docs.filter(v=>
v.sendDate &&
v.sendDate<today &&
v.status!=='已發文'
).length;

const todayCount=docs.filter(v=>v.sendDate===today && v.status!=='已發文').length;

const nodateCount=docs.filter(v=>
v.status!=='已發文' &&
!v.sendDate
).length;

document.querySelectorAll('.nav').forEach(v=>v.classList.remove('active'));

if(overdueCount>0){
currentFilter='overdue';
document.getElementById('pageTitle').innerText='已逾期';
document.getElementById('navOverdue').classList.add('active');
}else if(todayCount>0){
currentFilter='today';
document.getElementById('pageTitle').innerText='今日待發';
document.getElementById('navToday').classList.add('active');
}else if(nodateCount>0){
currentFilter='nodate';
document.getElementById('pageTitle').innerText='未設定日期';
document.getElementById('navNodate').classList.add('active');
}else{
currentFilter='pending';
document.getElementById('pageTitle').innerText='尚待發文';
document.getElementById('navPending').classList.add('active');
}
})();

document.getElementById('excelExportArea').style.display =
currentFilter === 'done'
? 'inline-block'
: 'none';



}

async function pasteFromClipboard() {
    try {
        const clipboardItems = await navigator.clipboard.read();
        let hasHtml = false;
        
        for (const clipboardItem of clipboardItems) {
            if (clipboardItem.types.includes('text/html')) {
                const blob = await clipboardItem.getType('text/html');
                const html = await blob.text();
                document.getElementById('importText').innerHTML = html;
                hasHtml = true;
                break;
            }
        }
        
        if (!hasHtml) {
            const text = await navigator.clipboard.readText();
            document.getElementById('importText').innerText = text;
        }
    } catch (err) {
        alert('無法讀取剪貼簿，請確認瀏覽器已允許讀取剪貼簿權限，或直接使用 Ctrl+V 貼上。');
        console.error('Failed to read clipboard contents: ', err);
    }
}

if (window.firebaseAPI) {
    initApp();
} else {
    window.addEventListener('firebase-ready', () => {
        initApp();
    });
}

let pendingImportJSON = null;

// --- 接收來自書籤小工具的跨網域資料 (自動匯入功能) ---
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'AUTO_BATCH_IMPORT') {
        const textData = event.data.payload;
        if (event.data.json) {
            pendingImportJSON = event.data.json;
        } else {
            pendingImportJSON = null;
        }
        
        // 1. 開啟匯入視窗
        document.getElementById('importModal').classList.remove('hidden');
        
        // 2. 填入資料 (使用 innerHTML 確保超連結不會遺失)
        document.getElementById('importText').innerHTML = textData;
        
        // 3. 自動觸發「確認匯入」，稍微延遲讓畫面更新
        setTimeout(() => {
            confirmImport();
        }, 100);
    }
});



