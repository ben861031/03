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
<div class="nav data-nav" data-admin-only="true" onclick="openAccessModal()">
<span class="nav-label">
<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M19 8v6M16 11h6"></path>
</svg>
同仁白名單
</span>
</div>
<div class="sidebar-settings" style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--sidebar-item-border, rgba(255,255,255,0.1));">
<div class="section" style="margin: 0 0 10px 0;">系統設定</div>
<div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px;">
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <label for="themeSelect" style="font-size: 12px; color: var(--sidebar-text); opacity: 0.8; font-weight: 600;">風格主題</label>
    <select id="themeSelect" onchange="document.documentElement.className = this.value; localStorage.setItem('dispatch_theme', this.value)" style="padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sidebar-item-border); background: var(--sidebar-item-bg); font-size: 13px; font-weight: 500; cursor: pointer; color: var(--sidebar-text); width: 100%;">
      <option value="" style="color:#333;">清新全白</option>
      <option value="theme-ocean" style="color:#333;">柔和海洋藍</option>
      <option value="theme-gray" style="color:#333;">莫蘭迪淺灰</option>
      <option value="theme-dark" style="color:#333;">經典深藍</option>
      <option value="theme-obsidian" style="color:#333;">曜石黑 (OLED)</option>
      <option value="theme-milktea" style="color:#333;">焦糖奶茶棕</option>
      <option value="theme-sakura" style="color:#333;">初戀櫻花粉</option>
      <option value="theme-sepia" style="color:#333;">溫暖護眼黃</option>
    </select>
  </div>
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <label for="linkMode" style="font-size: 12px; color: var(--sidebar-text); opacity: 0.8; font-weight: 600;">連線模式</label>
    <select id="linkMode" title="切換主旨連結使用內網或外網" onchange="setLinkMode(this.value)" style="padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sidebar-item-border); background: var(--sidebar-item-bg); font-size: 13px; font-weight: 500; cursor: pointer; color: var(--sidebar-text); width: 100%;">
      <option value="auto" style="color:#333;">自動判斷</option>
      <option value="internal" style="color:#333;">公司內網</option>
      <option value="external" style="color:#333;">公司外網</option>
    </select>
  </div>
  <div id="sessionRole" style="font-size:12px;color:var(--sidebar-text);opacity:.82;">權限：驗證中</div>
</div>
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
<button class="btn danger-soft" id="batchDeleteButton" onclick="batchDelete()">
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
<input id="search" placeholder="搜尋表單編號 / 主旨 / 承辦人">
<button id="clearSearchBtn" class="clear-search-btn" onclick="clearSearch()" title="清除搜尋" aria-label="清除搜尋">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;">
<line x1="18" y1="6" x2="6" y2="18"></line>
<line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
</button>
</div>
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
<div class="modal" id="accessModal">
<div class="modal-box access-modal-box" style="width:760px;max-width:95%;">
<div class="access-modal-heading">
<h2>帳號與同仁白名單</h2>
<button type="button" class="access-modal-close" onclick="closeAccessModal()" aria-label="關閉帳號與同仁白名單" title="關閉">×</button>
</div>
<p style="margin:8px 0 14px;color:#64748b;">管理員可建立、停用或刪除承辦帳號，也可管理既有帳號的發文系統權限；新帳號首次登入必須更改臨時密碼。</p>
<strong>建立新帳號</strong>
<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px;">
<input id="newAccountEmployeeId" inputmode="numeric" maxlength="12" placeholder="輸入 4–12 位員工編號" style="flex:1;min-width:220px;padding:10px;border:1px solid #cbd5e1;border-radius:8px;">
<input id="newAccountTemporaryPassword" type="password" autocomplete="new-password" maxlength="128" placeholder="自訂臨時密碼（8–128 碼，不限組合）" style="flex:1;min-width:220px;padding:10px;border:1px solid #cbd5e1;border-radius:8px;">
<button class="btn primary-import" onclick="createManagedAccount()">建立帳號</button>
</div>
<div id="temporaryCredential" style="display:none;margin-top:10px;padding:12px;border:1px solid #f59e0b;background:#fffbeb;border-radius:8px;white-space:pre-wrap;"></div>
<strong style="display:block;margin-top:18px;">既有登入帳號加入權限</strong>
<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
<input id="accessEmployeeId" inputmode="numeric" maxlength="12" placeholder="輸入 4–12 位員工編號" style="flex:1;min-width:220px;padding:10px;border:1px solid #cbd5e1;border-radius:8px;">
<button class="btn green" onclick="addAccessUser()">加入權限</button>
</div>
<strong style="display:block;margin-top:18px;">承辦帳號與權限</strong>
<div id="managedAccountList" class="account-management-list" style="margin-top:8px;max-height:390px;"></div>
<div style="display:flex;justify-content:flex-end;margin-top:14px;">
<button class="btn secondary" onclick="closeAccessModal()">關閉</button>
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
<div class="modal-box" style="width:700px; max-width:95%; padding:22px 26px;">
<h2 style="margin-bottom:10px; display:flex; align-items:center; gap:8px; font-size:19px;">
<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;color:#3b82f6;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
公文發送統計
</h2>
<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
    <p id="statsSubtitle" style="color:#64748b; margin:0; font-size:13px;"></p>
    <div style="display:inline-flex; background:#f1f5f9; padding:3px; border-radius:8px; gap:3px;">
        <button class="btn stats-mode-btn" id="statsModeDone" onclick="setStatsMode('doneTimestamp')" style="padding:4px 10px; font-size:12px; border-radius:6px; border:none; background:white; color:#2563eb; font-weight:600; box-shadow:0 1px 2px rgba(0,0,0,0.05);">完成時間</button>
        <button class="btn stats-mode-btn" id="statsModeSend" onclick="setStatsMode('sendDate')" style="padding:4px 10px; font-size:12px; border-radius:6px; border:none; background:transparent; color:#64748b; font-weight:500;">發文日期</button>
        <button class="btn stats-mode-btn" id="statsModeDisplay" onclick="setStatsMode('displayDate')" style="padding:4px 10px; font-size:12px; border-radius:6px; border:none; background:transparent; color:#64748b; font-weight:500;">公文顯示日期</button>
    </div>
</div>
<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
    <button class="btn secondary" onclick="changeStatsMonth(-1)" style="padding:4px 10px; font-size:12px;">◀ 上個月</button>
    <h3 id="statsMonthLabel" style="margin:0; color:var(--text-main, #334155); font-size:16px;"></h3>
    <button class="btn secondary" onclick="changeStatsMonth(1)" style="padding:4px 10px; font-size:12px;">下個月 ▶</button>
</div>
<div id="calendarGrid" class="calendar-grid"></div>
<div style="margin-top:12px; display:flex; justify-content:flex-end;">
<button class="btn secondary" onclick="closeStatsModal()" style="padding:5px 14px; font-size:13px;">關閉</button>
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
let doneDocsLoadPromise = null; // 合併同時間的歷史查詢，避免重複計費讀取
let doneDocsPageLoadPromise = null;
let doneDocsPageHasNext = false;
let doneDocsPageCursors = [null, null];
const doneDocsPageCache = new Map();
let doneDocsUseDocumentIdOrder = true;
let doneDocsScopedQuery = null;
let exactSearchDoc = null;
let exactSearchDocNo = '';
let exactSearchPromise = null;
const statsCountCache = new Map();
let currentUserRole = null;
let activeSessionUid = null;
let syncUnsubscribe = null;
let accountManagementCache = { users: [], fetchedAt: 0 };

const SENSITIVE_STORAGE_KEYS = [
    'syncAccount',
    'syncPassword',
    'syncToken',
    'cachedDocs',
    'syncOngoingUntil',
    'firebase_done_docs_cache',
    'firebase_done_docs_time'
];

function clearSensitiveBrowserStorage() {
    SENSITIVE_STORAGE_KEYS.forEach(key => {
        try { localStorage.removeItem(key); } catch(e) {}
        try { sessionStorage.removeItem(key); } catch(e) {}
    });
}

function isAdmin() {
    return currentUserRole === 'admin';
}

function applyRoleToUI() {
    const roleEl = document.getElementById('sessionRole');
    if (roleEl) roleEl.textContent = `權限：${isAdmin() ? '管理員' : '承辦人員'}`;
    document.querySelectorAll('[data-admin-only="true"]').forEach(el => {
        el.hidden = !isAdmin();
    });
}

function setStartupLoader(visible, message = '確認登入狀態中...') {
    const loader = document.getElementById('fullScreenLoader');
    if (!loader) return;
    const text = document.getElementById('fsLoaderText');
    if (text) text.innerText = message;
    loader.classList.toggle('hidden', !visible);
}

async function resolveDocumentRole(user) {
    const { db, doc, getDoc, getIdTokenResult } = window.firebaseAPI;
    const token = await getIdTokenResult(user);
    if (token.claims.documentManagementMustChangePassword === true) {
        return 'password_change_required';
    }
    if (token.claims.documentManagementAdmin === true) return 'admin';
    const email = String(user.email || '').toLowerCase();
    if (!email) return null;
    const accessSnapshot = await getDoc(doc(db, 'document_management_access', email));
    const access = accessSnapshot.exists() ? accessSnapshot.data() : null;
    return access && access.active === true && access.role === 'staff' && access.email === email
        ? 'staff'
        : null;
}

function waitForFirstSync() {
    return new Promise((resolve) => {
        if (!isFirstSync) return resolve();
        const check = setInterval(() => {
            if (!isFirstSync) {
                clearInterval(check);
                resolve();
            }
        }, 100);
    });
}

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
    
    if (typeof syncUnsubscribe === 'function') syncUnsubscribe();
    syncUnsubscribe = onSnapshot(activeQuery, (snapshot) => {
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
        
        // 若使用者正在輸入備註，暫緩重新渲染 DOM，避免輸入法中斷
        const activeEl = document.activeElement;
        const isEditingNote = activeEl && activeEl.tagName === 'INPUT' && activeEl.classList.contains('note');
        if (!isEditingNote) {
            render();
        }
        
        // 資料載入完成，隱藏全螢幕載入動畫
        const fsLoader = document.getElementById('fullScreenLoader');
        if (fsLoader) fsLoader.classList.add('hidden');
    }, async (error) => {
        console.error("Firebase sync error:", error);
        if (error && (error.code === 'permission-denied' || (error.message && error.message.includes('permission')))) {
            isFirebaseError = true;
            currentUserRole = null;
            activeSessionUid = null;
            docs = [];
            doneDocs = [];
            clearSensitiveBrowserStorage();
            try {
                const { auth, signOut } = window.firebaseAPI;
                await signOut(auth);
            } catch(e) {}
            const fsLoader = document.getElementById('fullScreenLoader');
            if (fsLoader) fsLoader.classList.add('hidden');
            const loginErr = document.getElementById('loginError');
            if (loginErr) {
                loginErr.innerText = "雲端連線權限已過期，請重新登入！";
                loginErr.classList.remove('hidden');
            }
            const loginModal = document.getElementById('loginModal');
            if (loginModal) loginModal.classList.remove('hidden');
        }
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

let isFirebaseError = false;

async function initApp() {
    clearSensitiveBrowserStorage();
    const { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut } = window.firebaseAPI;
    setStartupLoader(true);

    onAuthStateChanged(auth, async user => {
        if (!user) {
            activeSessionUid = null;
            currentUserRole = null;
            setStartupLoader(false);
            document.getElementById('loginModal').classList.remove('hidden');
            return;
        }

        if (activeSessionUid === user.uid && currentUserRole) return;

        try {
            const role = await resolveDocumentRole(user);
            if (role === 'password_change_required') {
                setStartupLoader(false);
                document.getElementById('loginModal').classList.add('hidden');
                document.getElementById('changePasswordModal').classList.remove('hidden');
                return;
            }
            if (!role) {
                setStartupLoader(false);
                document.getElementById('loginError').innerText = '此帳號尚未取得發文系統權限，請聯絡系統管理員';
                document.getElementById('loginError').classList.remove('hidden');
                await signOut(auth);
                return;
            }

            currentUserRole = role;
            activeSessionUid = user.uid;
            isFirebaseError = false;
            renderAppShell();
            applyRoleToUI();
            document.getElementById('loginModal').classList.add('hidden');

            const fsLoader = document.getElementById('fullScreenLoader');
            if (fsLoader) {
                document.getElementById('fsLoaderText').innerText = "載入公文資料中...";
                fsLoader.classList.remove('hidden');
            }
            await initFirebaseSync();
        } catch (error) {
            console.error('Role verification error:', error);
            setStartupLoader(false);
            document.getElementById('loginError').innerText = '無法驗證系統權限，請稍後再試';
            document.getElementById('loginError').classList.remove('hidden');
            await signOut(auth);
        }
    });
    
    document.getElementById('loginBtn').addEventListener('click', async () => {
        const accInput = document.getElementById('loginAccount').value.trim();
        const pwdInput = document.getElementById('loginPassword').value;
        
        if(!/^\d{4,12}$/.test(accInput) || !pwdInput) {
            document.getElementById('loginError').innerText = "請輸入 4–12 位數字員工編號與密碼";
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
            
            // Firebase 僅保存工作階段，不在 Web Storage 留存帳號或密碼。
            document.getElementById('loginPassword').value = '';
        } catch (error) {
            console.error("Login verification error:", error);
            document.getElementById('loginError').innerText = "帳號不存在或密碼錯誤";
            document.getElementById('loginError').classList.remove('hidden');
        } finally {
            document.getElementById('loginBtn').innerText = "登入";
        }
    });
}

async function logout() {
    if (typeof syncUnsubscribe === 'function') {
        syncUnsubscribe();
        syncUnsubscribe = null;
    }
    clearSensitiveBrowserStorage();
    try {
        const { auth, signOut } = window.firebaseAPI;
        await signOut(auth);
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        location.reload();
    }
}

async function changeOwnPassword() {
    const password = document.getElementById('newPassword').value;
    const confirmation = document.getElementById('confirmNewPassword').value;
    const errorEl = document.getElementById('changePasswordError');
    const button = document.getElementById('changePasswordBtn');
    errorEl.classList.add('hidden');

    if (password.length < 8 || password.length > 128) {
        errorEl.textContent = '密碼長度需為 8–128 碼';
        errorEl.classList.remove('hidden');
        return;
    }
    if (password !== confirmation) {
        errorEl.textContent = '兩次輸入的密碼不一致';
        errorEl.classList.remove('hidden');
        return;
    }

    button.disabled = true;
    button.textContent = '更新中…';
    try {
        const { functions, httpsCallable, auth } = window.firebaseAPI;
        const changePassword = httpsCallable(functions, 'documentManagementChangeOwnPassword');
        await changePassword({ password });
        await auth.currentUser.getIdToken(true);
        location.reload();
    } catch (error) {
        console.error('Password change error:', error);
        errorEl.textContent = '密碼更新失敗，請確認 App Check 與後端功能已部署';
        errorEl.classList.remove('hidden');
    } finally {
        button.disabled = false;
        button.textContent = '更新密碼';
    }
}

async function openAccessModal() {
    if (!isAdmin()) return;
    document.getElementById('accessModal').style.display = 'flex';
    await loadManagedAccounts();
}

function closeAccessModal() {
    document.getElementById('accessModal').style.display = 'none';
}

async function callDocumentFunction(name, data = {}) {
    const { functions, httpsCallable } = window.firebaseAPI;
    return httpsCallable(functions, name)(data);
}

async function createManagedAccount() {
    if (!isAdmin()) return;
    const input = document.getElementById('newAccountEmployeeId');
    const passwordInput = document.getElementById('newAccountTemporaryPassword');
    const employeeId = input.value.trim();
    const temporaryPassword = passwordInput.value;
    if (!/^\d{4,12}$/.test(employeeId)) {
        alert('請輸入 4–12 位數字員工編號。');
        return;
    }
    if (temporaryPassword.length < 8 || temporaryPassword.length > 128) {
        alert('臨時密碼長度需為 8–128 碼。');
        return;
    }
    try {
        const result = await callDocumentFunction('documentManagementCreateUser', { employeeId, temporaryPassword });
        const credential = document.getElementById('temporaryCredential');
        const message = document.createElement('div');
        message.textContent = `帳號：${result.data.email}\n一次性臨時密碼：${temporaryPassword}\n請安全交付本人，首次登入會強制變更。`;
        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.className = 'btn secondary';
        copyButton.style.cssText = 'margin-top:8px;padding:5px 10px;';
        copyButton.textContent = '複製帳密';
        copyButton.addEventListener('click', () => copyToClipboard(
            `帳號：${employeeId}\n臨時密碼：${temporaryPassword}`
        ));
        credential.replaceChildren(message, copyButton);
        credential.style.display = 'block';
        input.value = '';
        passwordInput.value = '';
        await loadManagedAccounts(true);
    } catch (error) {
        console.error('Create account error:', error);
        alert('建立帳號失敗；若帳號已存在，請改用「加入權限」。');
    }
}

function formatLastSignInTime(value) {
    if (!value) return '尚未登入';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '尚未登入';
    const formatter = new Intl.DateTimeFormat('zh-TW', {
        timeZone: 'Asia/Taipei',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const parts = Object.fromEntries(
        formatter.formatToParts(date)
            .filter(part => part.type !== 'literal')
            .map(part => [part.type, part.value])
    );
    return `${parts.year}/${parts.month}/${parts.day} ${parts.hour}:${parts.minute}`;
}

function createAccountStatusBadge(text, state) {
    const badge = document.createElement('span');
    badge.className = `account-status-badge ${state}`;
    badge.textContent = text;
    return badge;
}

function createAccountActionButton(text, className, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `btn account-action ${className}`;
    button.textContent = text;
    button.addEventListener('click', handler);
    return button;
}

function renderManagedAccountList(entries) {
    const list = document.getElementById('managedAccountList');
    list.replaceChildren();
    if (entries.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'account-list-message';
        empty.textContent = '目前沒有已授權的承辦帳號。';
        list.appendChild(empty);
        return;
    }
    entries.forEach(entry => {
        const row = document.createElement('div');
        row.className = 'account-management-row';

        const details = document.createElement('div');
        details.className = 'account-details';
        const identity = document.createElement('div');
        identity.className = 'account-identity';
        const employeeId = document.createElement('strong');
        employeeId.textContent = entry.employeeId || '未知員編';
        const email = document.createElement('span');
        email.textContent = entry.email || '無電子郵件';
        identity.append(employeeId, email);

        const statuses = document.createElement('div');
        statuses.className = 'account-statuses';
        if (entry.authExists === false) {
            statuses.append(createAccountStatusBadge('帳號：不存在', 'missing'));
        } else if (entry.disabled) {
            statuses.append(createAccountStatusBadge('帳號：已停用', 'disabled'));
        } else {
            statuses.append(createAccountStatusBadge('帳號：使用中', 'active'));
        }
        statuses.append(createAccountStatusBadge(
            entry.active === false ? '權限：已停用' : '權限：已開通',
            entry.active === false ? 'disabled' : 'active'
        ));

        const lastLogin = document.createElement('div');
        lastLogin.className = 'account-last-login';
        lastLogin.textContent = entry.authExists === false
            ? '最近登入：無登入帳號'
            : `最近登入：${formatLastSignInTime(entry.lastSignInTime)}`;
        details.append(identity, statuses, lastLogin);

        const actions = document.createElement('div');
        actions.className = 'account-actions';
        if (entry.authExists !== false && entry.uid) {
            actions.append(createAccountActionButton(
                entry.disabled ? '啟用帳號' : '停用帳號',
                'secondary',
                () => setManagedAccountDisabled(entry.uid, !entry.disabled)
            ));
            actions.append(createAccountActionButton(
                '移除權限',
                'permission-soft',
                () => removeAccessUser(entry.email)
            ));
            actions.append(createAccountActionButton(
                '刪除帳號',
                'danger-soft',
                () => deleteManagedAccount(entry.uid, entry.email)
            ));
        } else {
            actions.append(createAccountActionButton(
                '移除失效紀錄',
                'danger-soft',
                () => removeAccessUser(entry.email)
            ));
        }
        row.append(details, actions);
        list.appendChild(row);
    });
}

function showAccountManagementError(messageText) {
    const list = document.getElementById('managedAccountList');
    list.replaceChildren();
    const message = document.createElement('div');
    message.className = 'account-list-message error';
    message.textContent = messageText;
    list.appendChild(message);
}

async function loadManagedAccounts(forceRefresh = false) {
    if (!isAdmin()) return;
    const list = document.getElementById('managedAccountList');
    let users = accountManagementCache.users;
    const cacheFresh = Date.now() - accountManagementCache.fetchedAt < 30000;

    if (!forceRefresh && cacheFresh) {
        renderManagedAccountList(users);
    } else {
        list.replaceChildren();
        const loading = document.createElement('div');
        loading.className = 'account-list-message';
        loading.textContent = '載入中…';
        list.appendChild(loading);
    }
    try {
        if (forceRefresh || !cacheFresh) {
            const result = await callDocumentFunction('documentManagementListUsers');
            users = Array.isArray(result.data.users) ? result.data.users : [];
            users.sort((a, b) => String(a.employeeId || '').localeCompare(String(b.employeeId || '')));
            accountManagementCache = { users, fetchedAt: Date.now() };
        }
        renderManagedAccountList(users);
    } catch (error) {
        console.error('Managed account list error:', error);
        showAccountManagementError('帳號與權限讀取失敗，請確認 App Check 與 Cloud Functions 已部署。');
    }
}

async function setManagedAccountDisabled(uid, disabled) {
    if (!isAdmin()) return;
    if (!confirm(`確定${disabled ? '停用' : '啟用'}這個帳號？`)) return;
    try {
        await callDocumentFunction('documentManagementSetUserDisabled', { uid, disabled });
        await loadManagedAccounts(true);
        showToast(disabled ? '帳號已停用' : '帳號已啟用');
    } catch (error) {
        console.error('Account status error:', error);
        alert('帳號狀態更新失敗。');
    }
}

async function deleteManagedAccount(uid, email) {
    if (!isAdmin()) return;
    if (!confirm(`確定永久刪除 ${email}？此操作無法復原。`)) return;
    try {
        await callDocumentFunction('documentManagementDeleteUser', { uid });
        await loadManagedAccounts(true);
        showToast('帳號與系統權限已刪除');
    } catch (error) {
        console.error('Delete account error:', error);
        alert('帳號刪除失敗。');
    }
}

async function addAccessUser() {
    if (!isAdmin()) return;
    const input = document.getElementById('accessEmployeeId');
    const employeeId = input.value.trim();
    if (!/^\d{4,12}$/.test(employeeId)) {
        alert('請輸入 4–12 位數字員工編號。');
        return;
    }

    const email = `${employeeId}@sinotech.com`.toLowerCase();
    try {
        const { db, doc, setDoc } = window.firebaseAPI;
        await setDoc(doc(db, 'document_management_access', email), {
            employeeId,
            email,
            role: 'staff',
            active: true
        });
        input.value = '';
        await loadManagedAccounts(true);
        showToast(`已開通 ${employeeId} 的系統權限`);
    } catch (error) {
        console.error('Add access error:', error);
        alert('加入系統權限失敗，請確認該帳號已存在且管理員權限有效。');
    }
}

async function removeAccessUser(email) {
    if (!isAdmin()) return;
    if (!confirm(`確定移除 ${email} 的發文系統權限？帳號本身不會刪除。`)) return;
    try {
        const { db, doc, deleteDoc } = window.firebaseAPI;
        await deleteDoc(doc(db, 'document_management_access', String(email)));
        await loadManagedAccounts(true);
        showToast('已移除發文系統權限');
    } catch (error) {
        console.error('Remove access error:', error);
        alert('移除系統權限失敗。');
    }
}

// Firestore Helpers
function clearDoneDocsCache() {
    doneDocsLoadedAll = false;
    doneDocsPageHasNext = false;
    doneDocsPageCursors = [null, null];
    doneDocsPageCache.clear();
    doneDocsScopedQuery = null;
    statsCountCache.clear();
}

async function loadDoneDocsPage(page = 1, forceRefresh = false) {
    if (!window.firebaseAPI || doneDocsLoadedAll) return false;
    const targetPage = Math.max(1, Number(page) || 1);
    const cached = doneDocsPageCache.get(targetPage);
    if (cached && !forceRefresh) {
        doneDocs = cached.items.slice();
        doneDocsPageHasNext = cached.hasNext;
        doneDocsScopedQuery = null;
        currentPage = targetPage;
        return true;
    }
    if (targetPage > 1 && !doneDocsPageCursors[targetPage]) return false;
    if (doneDocsPageLoadPromise) return doneDocsPageLoadPromise;

    const {
        db, collection, query, where, orderBy, documentId,
        limit, startAfter, getDocs
    } = window.firebaseAPI;

    doneDocsPageLoadPromise = (async () => {
        try {
            const buildQuery = useDocumentIdOrder => {
                const constraints = [where("status", "==", "已發文")];
                if (useDocumentIdOrder) constraints.push(orderBy(documentId(), "desc"));
                const cursor = doneDocsPageCursors[targetPage];
                if (cursor) constraints.push(startAfter(cursor));
                constraints.push(limit(doneDocsPageSize));
                return query(collection(db, "docs"), ...constraints);
            };

            let snapshot;
            try {
                snapshot = await getDocs(buildQuery(doneDocsUseDocumentIdOrder));
            } catch (error) {
                if (!doneDocsUseDocumentIdOrder || error?.code !== 'failed-precondition') throw error;
                // 若現有 Firestore 索引不支援文件編號倒序，退回預設文件順序，仍維持 50 筆分批讀取。
                console.warn('Falling back to default completed-document ordering:', error);
                doneDocsUseDocumentIdOrder = false;
                snapshot = await getDocs(buildQuery(false));
            }

            const loaded = snapshot.docs.map(item => {
                const data = item.data();
                return { ...data, docNo: data.docNo || item.id };
            });
            normalizeDates(loaded);
            loaded.sort((a, b) => (b.doneTimestamp || 0) - (a.doneTimestamp || 0));

            const hasNext = loaded.length === doneDocsPageSize && targetPage * doneDocsPageSize < doneDocsCount;
            doneDocs = loaded;
            doneDocsPageHasNext = hasNext;
            doneDocsScopedQuery = null;
            currentPage = targetPage;
            doneDocsPageCache.set(targetPage, { items: loaded.slice(), hasNext });
            if (snapshot.docs.length) doneDocsPageCursors[targetPage + 1] = snapshot.docs[snapshot.docs.length - 1];
            return true;
        } catch (error) {
            console.error('Error loading completed-document page:', error);
            showToast('歷史公文載入失敗，請稍後重試');
            return false;
        } finally {
            doneDocsPageLoadPromise = null;
        }
    })();
    return doneDocsPageLoadPromise;
}

async function updateDocInCloud(docNo, data) {
    if(!window.firebaseAPI) return;
    const { db, doc, setDoc } = window.firebaseAPI;
    try {
        await setDoc(doc(db, "docs", String(docNo)), data, { merge: true });
        // 一般日期／備註更新不影響歷史集合，避免因此重讀全部已發文公文。
        if (Object.prototype.hasOwnProperty.call(data, 'status')) clearDoneDocsCache();
        if (['doneTimestamp', 'sendDate', 'displayDate'].some(key => Object.prototype.hasOwnProperty.call(data, key))) {
            statsCountCache.clear();
        }
    } catch(e) { console.error("Error updating doc:", e); }
}

async function setDocInCloud(docNo, data) {
    if(!window.firebaseAPI) return;
    const { db, doc, setDoc } = window.firebaseAPI;
    try {
        await setDoc(doc(db, "docs", String(docNo)), data);
        if (data?.status === '已發文') clearDoneDocsCache();
    } catch(e) { console.error("Error setting doc:", e); }
}

async function deleteDocInCloud(docNo) {
    if(!window.firebaseAPI) return;
    const { db, doc, deleteDoc } = window.firebaseAPI;
    const removesHistoricalDocument = getDocByNo(docNo)?.status === '已發文';
    try {
        await deleteDoc(doc(db, "docs", String(docNo)));
        if (removesHistoricalDocument) clearDoneDocsCache();
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
    if (docsArray.some(item => item?.status === '已發文')) clearDoneDocsCache();
}


async function loadDataAndRender(silent = false) {
    const result = await fetchFromCloud(silent);
    if (result && result.success) {
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
            else if (action === 'copyDocNo' && docNo) copyToClipboard(docNo);
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
            else if (action === 'updateNote') updateNote(docNo, val);
        });

        tbody.addEventListener('input', e => {
            if (!e.target.dataset.action) return;
            const action = e.target.dataset.action;
            const docNo = e.target.dataset.docno;
            const val = e.target.value;
            
            if (action === 'updateNote') {
                const doc = getDocByNo(docNo);
                if (doc) doc.note = val;
            }
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
        if (!d || typeof d !== 'object') return;
        ['sendDate', 'displayDate'].forEach(field => {
            d[field] = String(d[field] ?? '');
            if (d[field] && d[field].includes('T')) {
                const dateObj = new Date(d[field]);
                if (!isNaN(dateObj)) {
                    d[field] = dateObj.getFullYear() + '-' + String(dateObj.getMonth() + 1).padStart(2, '0') + '-' + String(dateObj.getDate()).padStart(2, '0');
                }
            }
        });
        
        d.doneTime = String(d.doneTime ?? '');
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
const doneDocsPageSize = 50;
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

function cleanBoundedText(value, maxLength) {
return String(value ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
}

function normalizeDocNo(value) {
const docNo = String(value ?? '').trim();
return /^\d{10}$/.test(docNo) ? docNo : '';
}

function normalizeDateValue(value) {
const date = String(value ?? '').trim();
return date === '' || /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/.test(date) ? date : '';
}

function isAllowedBusinessUrl(value) {
if (!value) return true;
try {
const url = new URL(String(value));
return (url.protocol === 'https:' || url.protocol === 'http:') &&
    (url.hostname === internalSinoSignHost || url.hostname === externalSinoSignHost);
} catch (error) {
return false;
}
}

function normalizeImportItem(item, index = 0) {
if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
const docNo = normalizeDocNo(item.docNo);
const subject = cleanBoundedText(item.subject, 500);
const url = String(item.url ?? '').trim().slice(0, 2000);
if (!docNo || !subject || !isAllowedBusinessUrl(url)) return null;
return {
    projectNo: cleanBoundedText(item.projectNo, 50),
    docNo,
    subject,
    handler: cleanBoundedText(item.handler, 100),
    url,
    sortOrder: Number.isInteger(item.sortOrder) && item.sortOrder >= 0 ? item.sortOrder : index + 1
};
}

function normalizeBackupRecord(item, index = 0) {
const base = normalizeImportItem(item, index);
if (!base) return null;
const status = item.status === '已發文' ? '已發文' : (item.status === '待發' ? '待發' : null);
if (!status) return null;
const doneTimestamp = Number(item.doneTimestamp ?? 0);
if (!Number.isSafeInteger(doneTimestamp) || doneTimestamp < 0) return null;
return {
    ...base,
    sendDate: normalizeDateValue(item.sendDate),
    displayDate: normalizeDateValue(item.displayDate),
    status,
    doneTime: cleanBoundedText(item.doneTime, 50),
    doneTimestamp,
    note: cleanBoundedText(item.note, 2000)
};
}

function setSafeImportHTML(rawHtml) {
const editor = document.getElementById('importText');
const parsed = new DOMParser().parseFromString(String(rawHtml ?? ''), 'text/html');
const fragment = document.createDocumentFragment();
const blockTags = new Set(['DIV', 'P', 'TR', 'LI', 'SECTION', 'ARTICLE', 'HEADER']);

function appendSafeNode(node, parent) {
    if (node.nodeType === Node.TEXT_NODE) {
        parent.appendChild(document.createTextNode(node.textContent || ''));
        return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.tagName === 'BR') {
        parent.appendChild(document.createElement('br'));
        return;
    }
    if (node.tagName === 'A') {
        const href = node.getAttribute('href') || '';
        if (isAllowedBusinessUrl(href)) {
            const anchor = document.createElement('a');
            anchor.href = href;
            anchor.textContent = node.textContent || '';
            anchor.rel = 'noopener noreferrer';
            parent.appendChild(anchor);
        } else {
            parent.appendChild(document.createTextNode(node.textContent || ''));
        }
    } else {
        [...node.childNodes].forEach(child => appendSafeNode(child, parent));
    }
    if (blockTags.has(node.tagName)) parent.appendChild(document.createElement('br'));
}

[...parsed.body.childNodes].forEach(node => appendSafeNode(node, fragment));
editor.replaceChildren(fragment);
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

async function copyToClipboard(text) {
    if (!text) return;
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(String(text));
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = String(text);
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        showToast(`已複製表單編號：${text}`);
    } catch(err) {
        console.error('Failed to copy text: ', err);
        showToast(`複製失敗：${text}`);
    }
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
if (search) search.value='';
exactSearchDoc = null;
exactSearchDocNo = '';
const clearBtn = document.getElementById('clearSearchBtn');
if (clearBtn) clearBtn.classList.remove('active');
currentPage=1;
render();
if (search) search.focus();
}

function getCheckedDocNos(){
return [...document.querySelectorAll('.batch-check:checked')]
.map(check=>check.dataset.docno);
}

async function setQuickDate(range) {
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

    if (range !== 'all' && !doneDocsLoadedAll) {
        setStartupLoader(true, '載入完整歷史以套用日期篩選...');
        await loadAllDoneDocs();
        setStartupLoader(false);
        currentPage = 1;
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
doneDocsScopedQuery = null;

const searchInput = document.getElementById('search');
if (searchInput) searchInput.value = '';
exactSearchDoc = null;
exactSearchDocNo = '';
document.getElementById('clearSearchBtn')?.classList.remove('active');

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
    dateControls.style.display = (type === 'done' ? 'flex' : 'none');
}

if (type === 'done' && !doneDocsLoadedAll) {
    const fsLoader = document.getElementById('fullScreenLoader');
    if (fsLoader) {
        document.getElementById('fsLoaderText').innerText = "載入最近 50 筆歷史公文中...";
        fsLoader.classList.remove('hidden');
    }
    await loadDoneDocsPage(1);
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

const fsLoader = document.getElementById('fullScreenLoader');

if (isFirstSync) {
    if (fsLoader) {
        document.getElementById('fsLoaderText').innerText = "雲端資料初始化中，請稍候...";
        fsLoader.classList.remove('hidden');
    }
    await waitForFirstSync();
}

if (!doneDocsLoadedAll) {
    if (fsLoader) {
        document.getElementById('fsLoaderText').innerText = "載入歷史資料中...";
        fsLoader.classList.remove('hidden');
    }
    await loadAllDoneDocs();
}

if (fsLoader) fsLoader.classList.add('hidden');

if (isFirebaseError) {
    alert('⚠️ 雲端連線權限已過期或驗證失敗，請先重新登入後再執行匯入，避免公文比對錯誤！');
    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.classList.remove('hidden');
    return;
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

if(text && href && isAllowedBusinessUrl(href)){
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
    if (!Array.isArray(pendingImportJSON) || pendingImportJSON.length > 5000) {
        pendingImportJSON = null;
        alert('自動匯入資料格式錯誤或筆數超過上限。');
        return;
    }
    parsedItems = pendingImportJSON.map((item, index) => normalizeImportItem(item, index));
    if (parsedItems.some(item => !item)) {
        pendingImportJSON = null;
        alert('自動匯入資料包含不合法欄位，已拒絕匯入。');
        return;
    }
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

parsedItems = parsedItems
    .map((item, index) => normalizeImportItem(item, index))
    .filter(Boolean);
importedDocNos.length = 0;
parsedItems.forEach(item => importedDocNos.push(item.docNo));

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
div.textContent=`${item.docNo || '無表單編號'}　${item.subject || ''}`;
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

if(imported.length > 10000){
alert('備份筆數超過 10,000 筆安全上限。');
return;
}

const normalizedImported = imported.map((item, index) => normalizeBackupRecord(item, index));
if(normalizedImported.some(item => !item)){
alert('備份檔包含不合法、缺漏或非本系統欄位，已拒絕匯入。');
return;
}

if(!confirm(`確定匯入 ${normalizedImported.length} 筆資料？\n同文號資料將被覆蓋。`)){
return;
}

saveBatchToCloud(normalizedImported).then(() => {
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

let currentSourceData = currentFilter === 'done' ? doneDocs : docs;
if (search && currentFilter === 'done' && exactSearchDoc) {
    // 累計已發輸入完整表單編號時，額外合併單筆直接查詢結果。
    const combined = [...doneDocs, exactSearchDoc];
    const seenDocNos = new Set();
    currentSourceData = combined.filter(item => {
        const key = String(item?.docNo || '');
        if (!key || seenDocNos.has(key)) return false;
        seenDocNos.add(key);
        return true;
    });
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

if(currentFilter==='done' && !doneDocsScopedQuery){

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


const shouldClientPaginate = doneDocsLoadedAll && (currentFilter === 'done' || Boolean(search));
const start = shouldClientPaginate ? (currentPage-1)*pageSize : 0;
const end = shouldClientPaginate ? start+pageSize : rows.length;
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
    const normalizedDocNo = normalizeDocNo(d.docNo);
    const safeDocNo = escapeHTML(normalizedDocNo || '無效文號');
    const safeProjectNo = escapeHTML(cleanBoundedText(d.projectNo, 50));
    const safeHandler = escapeHTML(cleanBoundedText(d.handler, 100));
    const safeSendDate = normalizeDateValue(d.sendDate);
    const safeDisplayDate = normalizeDateValue(d.displayDate);
    
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
            <input type="checkbox" class="batch-check" data-docno="${normalizedDocNo}" ${normalizedDocNo ? '' : 'disabled'}>
        </td>
        <td data-label="表單編號">
            <div class="doc-no" data-action="copyDocNo" data-docno="${normalizedDocNo}" title="點擊複製表單編號">${safeDocNo}</div>
        </td>
        <td data-label="主旨">
            ${subjectContent}
        </td>
        <td data-label="計畫編號">
            <span class="val">${safeProjectNo}</span>
        </td>
        <td data-label="承辦人">
            <span class="val">${safeHandler}</span>
        </td>

        <td data-label="應發文日">
        <div class="pill send-pill" data-action="openDateQuickModal" data-docno="${normalizedDocNo}">
        ${safeSendDate ? safeSendDate.replace(/^\d{4}-/,'').replace('-','/') : '未設'}
        </div>
        <input id="send_${normalizedDocNo}" class="hidden-date" type="date" value="${safeSendDate}" data-action="updateSend" data-docno="${normalizedDocNo}">
        </td>

        <td data-label="顯示發文">
        <div class="pill display-pill" data-action="openDateQuickModalDisplay" data-docno="${normalizedDocNo}">
        ${safeDisplayDate ? safeDisplayDate.replace(/^\d{4}-/,'').replace('-','/') : '未設'}
        </div>
        <input id="display_${normalizedDocNo}" class="hidden-date" type="date" value="${safeDisplayDate}" data-action="updateDisplay" data-docno="${normalizedDocNo}">
        </td>

        <td data-label="狀態">
        <select 
        class="status-btn ${d.status==='已發文'?'done':'pending'}"
        data-action="changeStatus" data-docno="${normalizedDocNo}">
        <option value="待發" ${d.status==='待發'?'selected':''}>待發</option>
        <option value="已發文" ${d.status==='已發文'?'selected':''}>已發文</option>
        </select>
        </td>

        <td data-label="備註">
        <input class="note" maxlength="2000" value="${safeNote}" title="${safeNote}" data-action="updateNote" data-docno="${normalizedDocNo}" placeholder="輸入備註">
        </td>

        ${isDonePage ? `<td data-label="完成時間" class="done-cell">${safeDoneTime}</td>` : ``}
        <td data-label="操作">
        ${dispatchUrl ? `<button class="btn secondary" style="padding:6px 10px;min-height:34px;margin-right:4px;" data-action="openCompare" data-docno="${normalizedDocNo}" title="同時開啟發文作業與電子表單">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="7" height="16" rx="1"></rect><rect x="14" y="4" width="7" height="16" rx="1"></rect>
        </svg>
        </button>` : ``}
        <button class="btn danger-soft" style="padding:6px 10px;min-height:34px;" data-action="deleteDoc" data-docno="${normalizedDocNo}" title="刪除">
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
        else if (nodateCount > 0) { targetFilter = 'nodate'; navId = 'navNodate'; }
        else if (pending > 0) { targetFilter = 'pending'; navId = 'navPending'; }
    } else if (currentFilter === 'today') {
        if (nodateCount > 0) { targetFilter = 'nodate'; navId = 'navNodate'; }
        else if (pending > 0) { targetFilter = 'pending'; navId = 'navPending'; }
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

if(currentFilter==='done' && doneDocsScopedQuery){
    const pagination=document.createElement('div');
    pagination.className='pagination';

    const info=document.createElement('div');
    info.className='pagination-info';
    info.textContent=`${doneDocsScopedQuery.label}：共 ${rows.length} 筆`;
    pagination.appendChild(info);

    const back=document.createElement('button');
    back.className='page-btn page-nav';
    back.textContent='返回累計已發';
    back.onclick=async()=>{
        setStartupLoader(true, '返回最近 50 筆歷史公文中...');
        await loadDoneDocsPage(1);
        setStartupLoader(false);
        document.getElementById('pageTitle').innerText='累計已發';
        render();
    };
    pagination.appendChild(back);
    pageBar.appendChild(pagination);
} else if(currentFilter==='done' && !doneDocsLoadedAll){
    const totalBatches = Math.max(1, Math.ceil(doneDocsCount / doneDocsPageSize));
    const pagination=document.createElement('div');
    pagination.className='pagination';

    const info=document.createElement('div');
    info.className='pagination-info';
    info.textContent=`共 ${doneDocsCount} 筆；第 ${currentPage} / ${totalBatches} 批，本批顯示 ${rows.length} 筆`;
    pagination.appendChild(info);

    const loadPage = async targetPage => {
        setStartupLoader(true, `載入第 ${targetPage} 批歷史公文中...`);
        await loadDoneDocsPage(targetPage);
        setStartupLoader(false);
        render();
    };

    const prev=document.createElement('button');
    prev.className='page-btn page-nav';
    prev.textContent='上一批';
    prev.disabled=currentPage===1;
    prev.onclick=()=>loadPage(currentPage-1);
    pagination.appendChild(prev);

    const current=document.createElement('button');
    current.className='page-btn active';
    current.textContent=currentPage;
    current.disabled=true;
    pagination.appendChild(current);

    const next=document.createElement('button');
    next.className='page-btn page-nav';
    next.textContent='下一批';
    next.disabled=!doneDocsPageHasNext;
    next.onclick=()=>loadPage(currentPage+1);
    pagination.appendChild(next);

    pageBar.appendChild(pagination);
} else if(currentFilter==='done' || (search && doneDocsLoadedAll)){

    const totalPages=Math.ceil(rows.length/pageSize)||1;
    if (currentPage > totalPages) currentPage = totalPages;

    const pagination=document.createElement('div');
    pagination.className='pagination';

    const info=document.createElement('div');
    info.className='pagination-info';
    info.textContent=`完整搜尋共 ${rows.length} 筆資料　第 ${currentPage} / ${totalPages} 頁`;
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
        return [...pages].filter(p=>p>=1 && p<=total).sort((a,b)=>a-b);
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
        if(p===currentPage) b.classList.add('active');
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
let currentStatsMode = 'doneTimestamp'; // 'doneTimestamp' | 'sendDate' | 'displayDate'
let statsRenderRequestId = 0;

function setStatsMode(mode) {
    currentStatsMode = mode;
    
    const modes = [
        { id: 'statsModeDone', key: 'doneTimestamp' },
        { id: 'statsModeSend', key: 'sendDate' },
        { id: 'statsModeDisplay', key: 'displayDate' }
    ];
    
    modes.forEach(m => {
        const btn = document.getElementById(m.id);
        if (btn) {
            if (m.key === mode) {
                btn.style.background = 'white';
                btn.style.color = '#2563eb';
                btn.style.fontWeight = '600';
                btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
            } else {
                btn.style.background = 'transparent';
                btn.style.color = '#64748b';
                btn.style.fontWeight = '500';
                btn.style.boxShadow = 'none';
            }
        }
    });
    
    renderStatsCalendar();
}

function getStatsModeLabel(mode) {
    return mode === 'doneTimestamp' ? '完成時間' : (mode === 'sendDate' ? '發文日期' : '公文顯示日期');
}

function getStatsDateString(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function buildStatsDayQuery(year, month, day, mode) {
    const { db, collection, query, where } = window.firebaseAPI;
    const constraints = [where('status', '==', '已發文')];
    if (mode === 'doneTimestamp') {
        const start = new Date(year, month, day).getTime();
        const end = new Date(year, month, day + 1).getTime();
        constraints.push(where('doneTimestamp', '>=', start), where('doneTimestamp', '<', end));
    } else {
        constraints.push(where(mode, '==', getStatsDateString(year, month, day)));
    }
    return query(collection(db, 'docs'), ...constraints);
}

async function loadStatsMonthCounts(year, month, mode) {
    const cacheKey = `${year}-${month}-${mode}`;
    if (statsCountCache.has(cacheKey)) return statsCountCache.get(cacheKey);
    const { getCountFromServer } = window.firebaseAPI;
    const lastDate = new Date(year, month + 1, 0).getDate();
    const entries = await Promise.all(Array.from({ length: lastDate }, async (_, index) => {
        const day = index + 1;
        const snapshot = await getCountFromServer(buildStatsDayQuery(year, month, day, mode));
        return [day, Number(snapshot.data().count || 0)];
    }));
    const dailyCounts = Object.fromEntries(entries);
    const total = entries.reduce((sum, [, count]) => sum + count, 0);
    const result = { dailyCounts, total };
    statsCountCache.set(cacheKey, result);
    return result;
}

async function loadDoneDocsForStatsDay(year, month, day, mode) {
    const { getDocs } = window.firebaseAPI;
    const dateStr = getStatsDateString(year, month, day);
    setStartupLoader(true, `載入 ${dateStr} 的公文中...`);
    try {
        const snapshot = await getDocs(buildStatsDayQuery(year, month, day, mode));
        const loaded = snapshot.docs.map(item => {
            const data = item.data();
            return { ...data, docNo: data.docNo || item.id };
        });
        normalizeDates(loaded);
        loaded.sort((a, b) => (b.doneTimestamp || 0) - (a.doneTimestamp || 0));
        doneDocs = loaded;
        doneDocsLoadedAll = false;
        doneDocsPageHasNext = false;
        doneDocsScopedQuery = {
            type: 'stats-day',
            mode,
            date: dateStr,
            label: `${getStatsModeLabel(mode)} ${dateStr}`
        };
        currentPage = 1;
        document.getElementById('doneStartDate').value = '';
        document.getElementById('doneEndDate').value = '';
        document.getElementById('pageTitle').innerText = `${dateStr} 公文`;
        clearQuickDateHighlight();
        closeStatsModal();
        render();
    } catch (error) {
        console.error('Daily statistics document load failed:', error);
        showToast('該日公文載入失敗，請確認 Firestore 索引已部署');
    } finally {
        setStartupLoader(false);
    }
}

async function openStatsModal() {

    statsCurrentDate = new Date();
    document.getElementById('statsModal').style.display = 'flex';
    setStatsMode(currentStatsMode);
}

function closeStatsModal() {
    document.getElementById('statsModal').style.display = 'none';
}

function changeStatsMonth(delta) {
    statsCurrentDate.setMonth(statsCurrentDate.getMonth() + delta);
    renderStatsCalendar();
}

async function renderStatsCalendar() {
    const requestId = ++statsRenderRequestId;
    const year = statsCurrentDate.getFullYear();
    const month = statsCurrentDate.getMonth();
    
    document.getElementById('statsMonthLabel').innerText = `${year} 年 ${month + 1} 月`;
    
    const grid = document.getElementById('calendarGrid');
    const modeLabel = getStatsModeLabel(currentStatsMode);
    document.getElementById('statsSubtitle').innerText = `正在以「${modeLabel}」計算每日件數，不下載公文內容…`;
    grid.innerHTML = '<div style="grid-column:1/-1;padding:32px;text-align:center;color:#64748b;">統計載入中…</div>';

    let stats;
    try {
        stats = await loadStatsMonthCounts(year, month, currentStatsMode);
    } catch (error) {
        if (requestId !== statsRenderRequestId) return;
        console.error('Monthly statistics count failed:', error);
        document.getElementById('statsSubtitle').innerText = '統計載入失敗，請確認 Firestore 日期索引已部署';
        grid.innerHTML = '<div style="grid-column:1/-1;padding:32px;text-align:center;color:#b91c1c;">無法載入本月統計</div>';
        return;
    }
    if (requestId !== statsRenderRequestId) return;
    const { dailyCounts, total } = stats;
    document.getElementById('statsSubtitle').innerText = `本月依「${modeLabel}」統計：共 ${total} 件（僅讀取每日計數）`;
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
                loadDoneDocsForStatsDay(year, month, i, currentStatsMode);
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

async function applyCustomDateFilter() {
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
    if (!doneDocsLoadedAll) {
        setStartupLoader(true, '載入完整歷史以套用日期篩選...');
        await loadAllDoneDocs();
        setStartupLoader(false);
        currentPage = 1;
    }
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


async function exportDoneExcel(){

if (!doneDocsLoadedAll) {
    setStartupLoader(true, '載入完整歷史以匯出 Excel...');
    const loaded = await loadAllDoneDocs();
    setStartupLoader(false);
    if (!loaded) return;
}

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
<td>${escapeHTML(normalizeDocNo(r.docNo))}</td>
<td>${escapeHTML(cleanBoundedText(r.subject, 500))}</td>
<td>${escapeHTML(cleanBoundedText(r.handler, 100))}</td>
</tr>
`;

});

content += '</table>';

const w = window.open('');
w.document.write(content);
w.print();

}

async function loadAllDoneDocs(forceRefresh = false) {
    if (!window.firebaseAPI) return false;
    if (doneDocsLoadedAll && !forceRefresh) return true;
    if (doneDocsLoadPromise) return doneDocsLoadPromise;

    const { db, collection, query, where, getDocs } = window.firebaseAPI;
    doneDocsLoadPromise = (async () => {
        try {
            const q = query(collection(db, "docs"), where("status", "==", "已發文"));
            const snapshot = await getDocs(q);
            const loaded = [];
            snapshot.forEach(doc => loaded.push(doc.data()));
            normalizeDates(loaded);
            doneDocs = loaded;
            doneDocsLoadedAll = true;
            doneDocsScopedQuery = null;
            doneDocsPageCache.clear();
            doneDocsPageCursors = [null, null];
            doneDocsPageHasNext = false;
            return true;
        } catch(e) {
            console.error("Error loading all done docs:", e);
            showToast('完整歷史載入失敗，請稍後重試');
            return false;
        } finally {
            doneDocsLoadPromise = null;
        }
    })();
    return doneDocsLoadPromise;
}

async function loadExactSearchDocument(rawDocNo) {
    const docNo = normalizeDocNo(rawDocNo);
    if (!docNo || !window.firebaseAPI) return false;
    if (exactSearchDocNo === docNo) return Boolean(exactSearchDoc);
    const existing = getDocByNo(docNo);
    if (existing) {
        exactSearchDocNo = docNo;
        exactSearchDoc = existing;
        return true;
    }
    if (exactSearchPromise) return exactSearchPromise;

    const { db, doc, getDoc } = window.firebaseAPI;
    exactSearchPromise = (async () => {
        try {
            const snapshot = await getDoc(doc(db, 'docs', docNo));
            exactSearchDocNo = docNo;
            exactSearchDoc = snapshot.exists()
                ? { ...snapshot.data(), docNo: snapshot.data().docNo || snapshot.id }
                : null;
            if (exactSearchDoc) normalizeDates([exactSearchDoc]);
            return Boolean(exactSearchDoc);
        } catch (error) {
            console.error('Exact document search failed:', error);
            showToast('表單編號查詢失敗，請稍後重試');
            return false;
        } finally {
            exactSearchPromise = null;
        }
    })();
    return exactSearchPromise;
}

async function runCompleteHistorySearch() {
    const searchInput = document.getElementById('search');
    const searchValue = String(searchInput?.value || '').trim();
    if (!searchValue || currentFilter !== 'done') {
        exactSearchDoc = null;
        exactSearchDocNo = '';
        currentPage = 1;
        render();
        return;
    }

    const fsLoader = document.getElementById('fullScreenLoader');
    if (/^\d{10}$/.test(searchValue)) {
        setStartupLoader(true, '查詢表單編號中...');
        await loadExactSearchDocument(searchValue);
        setStartupLoader(false);
    } else if (!doneDocsLoadedAll) {
        if (fsLoader) setStartupLoader(true, '載入完整歷史以搜尋主旨與承辦人...');
        await loadAllDoneDocs();
        if (fsLoader) setStartupLoader(false);
    }
    currentPage = 1;
    render();
}

let isFiltersEventsSetup = false;
function initFiltersAndEvents() {
    if (isFiltersEventsSetup) return;
    isFiltersEventsSetup = true;
let searchTimeout;
document.getElementById('search').addEventListener('input',()=>{
    const rawVal = document.getElementById('search').value;
    const clearBtn = document.getElementById('clearSearchBtn');
    if (clearBtn) {
        if (rawVal && rawVal.length > 0) {
            clearBtn.classList.add('active');
        } else {
            clearBtn.classList.remove('active');
        }
    }
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        const searchVal = document.getElementById('search').value.trim();
        if (currentFilter === 'done' && searchVal) {
            await runCompleteHistorySearch();
            return;
        }
        if (searchVal !== exactSearchDocNo) {
            exactSearchDoc = null;
            exactSearchDocNo = '';
        }
        currentPage=1;
        render();
    }, 600);
});

document.getElementById('search').addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        clearTimeout(searchTimeout);
        if (currentFilter === 'done') runCompleteHistorySearch();
        else {
            currentPage = 1;
            render();
        }
    }
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
                setSafeImportHTML(html);
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
const AUTO_IMPORT_ALLOWED_ORIGINS = new Set([
    location.origin,
    'https://web.sinotech-eng.com',
    'http://iiseng.sinotech-eng.com',
    'https://iiseng.sinotech-eng.com'
]);

// --- 接收來自書籤小工具的跨網域資料 (自動匯入功能) ---
window.addEventListener('message', (event) => {
    if (!AUTO_IMPORT_ALLOWED_ORIGINS.has(event.origin) || !event.source) return;
    if (event.data && event.data.type === 'AUTO_BATCH_IMPORT') {
        const textData = event.data.payload;
        if (typeof textData !== 'string' || textData.length > 1_000_000) {
            console.warn('Rejected invalid auto-import payload.');
            return;
        }
        if (event.data.json) {
            if (!Array.isArray(event.data.json) || event.data.json.length > 5000) {
                console.warn('Rejected invalid auto-import JSON.');
                return;
            }
            pendingImportJSON = event.data.json;
        } else {
            pendingImportJSON = null;
        }
        
        // 1. 開啟匯入視窗
        document.getElementById('importModal').classList.remove('hidden');
        
        // 2. 只保留文字與受信任業務連結，不接受事件屬性、script 或任意 HTML。
        setSafeImportHTML(textData);
        
        // 3. 自動觸發「確認匯入」，稍微延遲讓畫面更新
        setTimeout(() => {
            confirmImport();
        }, 100);
    }
});



