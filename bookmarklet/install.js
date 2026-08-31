function dispatchImportBookmarklet() {
    try {
        const APP_URL = 'https://ben861031.github.io/03/';
        const APP_ORIGIN = 'https://ben861031.github.io';
        const TARGET_NAME = 'AutoImportApp';
        const visible = element => element && element.offsetParent !== null;
        const all = [...document.querySelectorAll('body *')];
        const title = all.find(element => visible(element)
            && (element.innerText || '').trim() === '總發'
            && element.children.length === 0);

        if (!title) {
            alert('找不到「總發」標題');
            return;
        }

        const titleTop = title.getBoundingClientRect().top;
        const boxes = [...document.querySelectorAll('input[type="checkbox"]')]
            .filter(box => visible(box) && box.getBoundingClientRect().top > titleTop);
        const rows = [];
        const used = new Set();

        for (const box of boxes) {
            let parent = box.parentElement;
            let row = null;
            for (let index = 0; index < 12 && parent; index += 1, parent = parent.parentElement) {
                const text = (parent.innerText || '').replace(/\s+/g, ' ').trim();
                const boxCount = parent.querySelectorAll('input[type="checkbox"]').length;
                if (boxCount === 1 && /\d{4}\/\d{2}\/\d{2}/.test(text) && /\d{7,}/.test(text) && text.length > 20) {
                    row = parent;
                    break;
                }
            }
            if (row && !used.has(row)) {
                used.add(row);
                rows.push(row);
            }
        }

        rows.sort((left, right) => left.getBoundingClientRect().top - right.getBoundingClientRect().top);
        if (!rows.length) {
            alert('找到「總發」，但找不到下方資料');
            return;
        }

        const parsedItems = [];
        let sortOrder = 0;
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.gap = '8px';

        for (const row of rows) {
            const lines = (row.innerText || '').split('\n')
                .map(value => value.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').trim())
                .filter(value => value && value !== '函');
            let projectNo = '';
            let docNo = '';
            let subject = '';
            let handler = '';
            let url = '';
            let projectIndex = -1;

            for (let index = 0; index < lines.length; index += 1) {
                if (/^[A-Z0-9]+$/.test(lines[index])) {
                    projectNo = lines[index];
                    projectIndex = index;
                    break;
                }
            }
            if (projectIndex !== -1 && lines[projectIndex + 2]) {
                docNo = lines[projectIndex + 2].replace(/[^\d]/g, '');
                for (let index = projectIndex + 3; index < lines.length; index += 1) {
                    if (lines[index].length >= 8 && !subject) subject = lines[index];
                    if (/^[\u4e00-\u9fa5]{2,4}$/.test(lines[index])) {
                        handler = lines[index];
                        break;
                    }
                }
            }
            const anchor = row.querySelector('a');
            if (anchor) url = anchor.href;
            if (docNo && docNo.length === 10 && subject) {
                sortOrder += 1;
                parsedItems.push({ projectNo, docNo, subject, handler, url, sortOrder });
            }

            const clone = row.cloneNode(true);
            // 保持既有書籤的複製結果：只移除勾選框與操作按鈕，其餘列內容照原頁複製。
            clone.querySelectorAll('input, button').forEach(element => element.remove());
            clone.style.display = 'flex';
            clone.style.alignItems = 'center';
            clone.style.borderBottom = '1px dashed #ccc';
            clone.style.paddingBottom = '8px';
            for (const child of clone.children) {
                if (child.nodeType === 1) {
                    child.style.flex = '1';
                    child.style.padding = '0 8px';
                }
            }
            wrapper.appendChild(clone);
        }

        if (!parsedItems.length) {
            alert('找到「總發」資料，但未能辨識有效的 10 碼公文編號');
            return;
        }

        const escapeHTML = value => String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        let pureVertical = '';
        for (const item of parsedItems) {
            pureVertical += `<div>${escapeHTML(item.projectNo)}</div><div>2026/01/01</div><div>發 ${escapeHTML(item.docNo)}</div><div>函</div><div><a href="${escapeHTML(item.url)}">${escapeHTML(item.subject)}</a></div><div>2026/01/01 10:00:00</div><div>${escapeHTML(item.handler)}</div>`;
        }
        const finalHtmlData = `${wrapper.innerHTML}<div style="opacity:0.01;font-size:1px;color:transparent;">${pureVertical}</div>`;
        if (finalHtmlData.length > 1_000_000) {
            alert('擷取資料超過匯入大小上限，請縮小頁面資料範圍後再試。');
            return;
        }

        const requestId = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
            ? crypto.randomUUID()
            : `import-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const target = window.open('', TARGET_NAME);
        if (!target) {
            alert('瀏覽器阻擋了彈出視窗，請允許此網站開啟彈出式視窗。');
            return;
        }
        target.focus();

        let navigationToken = '';
        let message = { type: 'AUTO_BATCH_IMPORT', requestId, navigationToken, payload: finalHtmlData, json: parsedItems };
        let didNavigate = false;
        const navigateToApp = () => {
            if (didNavigate) return;
            didNavigate = true;
            navigationToken = requestId;
            message = { type: 'AUTO_BATCH_IMPORT', requestId, navigationToken, payload: finalHtmlData, json: parsedItems };
            target.location.replace(`${APP_URL}#auto-import=${encodeURIComponent(navigationToken)}`);
        };
        try {
            // 新開的具名分頁仍是同來源 about:blank；既有管理平台為跨來源，讀取 location 會被瀏覽器阻擋。
            if (!target.location.href || target.location.href === 'about:blank') navigateToApp();
        } catch (error) {
            // 已有管理平台時先直接傳送，不重新載入，保留登入狀態與記憶體歷史資料。
        }

        let attempts = 0;
        let timer = null;
        const cleanup = () => {
            if (timer) clearInterval(timer);
            window.removeEventListener('message', receiveAck);
        };
        const receiveAck = event => {
            if (event.origin !== APP_ORIGIN || event.source !== target) return;
            if (!event.data || event.data.type !== 'AUTO_BATCH_IMPORT_ACK' || event.data.requestId !== requestId) return;
            cleanup();
            target.focus();
            if (event.data.status === 'error') alert(event.data.message || '系統拒絕匯入資料');
        };
        const send = () => {
            attempts += 1;
            try { target.postMessage(message, APP_ORIGIN); } catch (error) {}
            // 既有具名分頁若不是可回應的管理平台，2 秒後才重新導向作為復原機制。
            if (attempts === 5 && !didNavigate) navigateToApp();
            if (attempts >= 60) {
                cleanup();
                alert('發文系統在 30 秒內未回應，請確認系統分頁已正常開啟後再試一次。');
            }
        };

        window.addEventListener('message', receiveAck);
        timer = setInterval(send, 500);
        send();
    } catch (error) {
        alert(`程式錯誤：${error.message}`);
    }
}

(function setupInstaller() {
    const code = `javascript:(${dispatchImportBookmarklet.toString()})();`;
    const link = document.getElementById('bookmarkLink');
    const textarea = document.getElementById('bookmarkCode');
    const copyButton = document.getElementById('copyButton');
    const status = document.getElementById('copyStatus');
    link.href = code;
    textarea.value = code;
    link.addEventListener('click', event => {
        event.preventDefault();
        status.textContent = '請將藍色按鈕拖曳到書籤列，或使用下方複製按鈕。';
    });
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(code);
            status.textContent = '已複製，請貼到書籤的「網址」欄位。';
        } catch (error) {
            textarea.focus();
            textarea.select();
            status.textContent = '請按 Ctrl+C 複製後，貼到書籤的「網址」欄位。';
        }
    });
})();
