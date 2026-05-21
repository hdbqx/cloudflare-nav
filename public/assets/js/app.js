/**
 * ==========================================
 * app.js - 核心前端逻辑（增量合并与隐藏编辑模式升级版）
 * CloudNav 个人导航页主程序
 * ==========================================
 */

// ==================== 全局变量定义 ====================
let appData = { settings: { siteName: '个人导航', siteIcon: '🌐', cardHeightDefault: 85, cardHeightColorful: 85 }, categories: [], items: [] };
let activeCatId = '';
let sysToken = localStorage.getItem('nav_token') || '';
let isAdmin = false;
let isEditMode = false; // 新增：控制管理员是否开启显式编辑面板
let editingType = 'items';
let editingId = null;
let toastTimer = null;
let currentViewStyle = parseInt(localStorage.getItem('nav_view_style') || '0');
let batchSelectMode = false;
let selectedCardIds = new Set();
let themeMode = localStorage.getItem('nav_theme_mode') || 'auto';
let simpleMode = localStorage.getItem('nav_simple_mode') === 'true';
let monacoEditor = null;

// ==================== Bilibili 封面缓存 ====================
const bilibiliCoverCache = new Map();

const fetchBilibiliCover = async (bvid) => {
    if (bilibiliCoverCache.has(bvid)) return bilibiliCoverCache.get(bvid);
    try {
        const res = await fetch(`/api/bilibili-cover?bvid=${bvid}`);
        const data = await res.json();
        if (data.coverUrl) {
            bilibiliCoverCache.set(bvid, data.coverUrl);
            return data.coverUrl;
        }
    } catch (e) {
        console.warn('Bilibili 封面获取失败:', bvid, e);
    }
    return null;
};

const loadVideoCovers = async (container) => {
    const coverSlots = container.querySelectorAll('.video-cover-slot[data-bvid]');
    for (const slot of coverSlots) {
        const bvid = slot.getAttribute('data-bvid');
        const coverUrl = await fetchBilibiliCover(bvid);
        if (coverUrl) {
            slot.innerHTML = `<img src="${coverUrl}" alt="" loading="lazy" referrerpolicy="no-referrer"
                onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='flex');">`;
            const fallback = slot.querySelector('.video-card-cover-fallback');
            if (fallback) fallback.style.display = 'none';
        }
    }
};

// ==================== 视频平台检测 ====================
const detectVideoPlatform = (url) => {
    if (!url || !url.startsWith('http')) return null;
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname.includes('bilibili.com')) {
            const bvidMatch = urlObj.pathname.match(/\/video\/(BV[a-zA-Z0-9]+)/);
            if (bvidMatch) return { type: 'bilibili', videoId: bvidMatch[1], bvid: bvidMatch[1] };
            const avidMatch = urlObj.pathname.match(/\/video\/av(\d+)/);
            if (avidMatch) return { type: 'bilibili', videoId: 'av' + avidMatch[1], aid: avidMatch[1] };
        }
        if (urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be') {
            let videoId = '';
            if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            } else if (urlObj.pathname.startsWith('/watch')) {
                videoId = urlObj.searchParams.get('v');
            } else if (urlObj.pathname.startsWith('/shorts/')) {
                videoId = urlObj.pathname.split('/')[2];
            } else if (urlObj.pathname.startsWith('/embed/')) {
                videoId = urlObj.pathname.split('/')[2];
            }
            if (videoId) return { type: 'youtube', videoId };
        }
    } catch (e) { }
    return null;
};

const getVideoEmbedUrl = (videoInfo) => {
    if (!videoInfo) return '';
    if (videoInfo.type === 'bilibili') {
        if (videoInfo.bvid) return `//player.bilibili.com/player.html?bvid=${videoInfo.bvid}&autoplay=1&high_quality=1`;
        if (videoInfo.aid) return `//player.bilibili.com/player.html?aid=${videoInfo.aid}&autoplay=1&high_quality=1`;
    }
    if (videoInfo.type === 'youtube') return `https://www.youtube.com/embed/${videoInfo.videoId}?autoplay=1`;
    return '';
};

const isVideoCategory = (cat) => {
    return cat.name.includes('视频') || cat.icon === '🎬' || cat.icon === '📺' || cat.icon === '🎥' || cat._isVideo;
};

const hashPassword = async (password) => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// ==================== 初始化入口 ====================
document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/ServiceWorker.js').catch(err => console.log('SW 注册失败:', err));
        });
    }

    initThemeMode();
    initSimpleMode();
    initSidebar();

    document.getElementById('grid-container').addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const link = e.target.closest('a');
        if (card && link && !card.classList.contains('card-add-new') && !e.target.closest('.admin-actions')) {
            const id = card.getAttribute('data-id');
            let clicks = JSON.parse(localStorage.getItem('nav_clicks') || '{}');
            clicks[id] = (clicks[id] || 0) + 1;
            localStorage.setItem('nav_clicks', JSON.stringify(clicks));
        }
    });

    initStyleSwitcher();
    initVideoModal();
    initMonacoModal();
    init();

    window.addEventListener('load', () => { hideLoader(); });
});

const initSidebar = () => {
    const toggle = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('visible');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    });

    document.getElementById('sidebar-nav').addEventListener('click', (e) => {
        const item = e.target.closest('.sidebar-nav-item');
        if (item && window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('visible');
        }
    });
};

const initVideoModal = () => {
    document.getElementById('btn-close-video').addEventListener('click', closeVideoModal);
};

const openVideoModal = (item, videoInfo) => {
    const iframe = document.getElementById('video-iframe');
    iframe.src = getVideoEmbedUrl(videoInfo);
    document.getElementById('video-title').textContent = item.title;
    document.getElementById('video-desc').textContent = item.desc || '';
    const extLink = document.getElementById('video-link');
    extLink.href = item.url;
    extLink.style.display = item.url ? 'inline-flex' : 'none';
    document.getElementById('video-modal').style.display = 'flex';
};

const closeVideoModal = () => {
    document.getElementById('video-iframe').src = '';
    document.getElementById('video-modal').style.display = 'none';
};

const initMonacoModal = () => {
    document.getElementById('btn-close-monaco').addEventListener('click', closeMonacoModal);
    document.getElementById('monaco-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeMonacoModal();
    });
    document.getElementById('btn-monaco-format').addEventListener('click', () => {
        if (monacoEditor) monacoEditor.getAction('editor.action.formatDocument').run();
    });
    document.getElementById('btn-monaco-save').addEventListener('click', saveMonacoData);
};

const openMonacoEditor = () => {
    const modal = document.getElementById('monaco-modal');
    const container = document.getElementById('monaco-container');
    modal.style.display = 'flex';

    if (monacoEditor) {
        monacoEditor.setValue(JSON.stringify(getCleanAppData(), null, 2));
        return;
    }

    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#aaa;font-size:14px;"><i class="ri-loader-4-line" style="animation:spin 1s linear infinite;margin-right:8px;"></i>正在加载代码编辑器...</div>';

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js';
    script.onload = () => {
        require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
        require(['vs/editor/editor.main'], () => {
            container.innerHTML = '';
            monacoEditor = monaco.editor.create(container, {
                value: JSON.stringify(getCleanAppData(), null, 2),
                language: 'json',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: true },
                fontSize: 14,
                wordWrap: 'on',
                tabSize: 2
            });
            monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => { saveMonacoData(); });
        });
    };
    script.onerror = () => {
        container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#e74c3c;font-size:14px;">代码编辑器加载失败</div>';
    };
    document.body.appendChild(script);
};

const saveMonacoData = () => {
    if (!monacoEditor) return;
    try {
        const text = monacoEditor.getValue();
        const parsed = JSON.parse(text);
        if (!parsed.categories || !parsed.items) {
            showToast('JSON 格式不正确', '#e74c3c');
            return;
        }
        appData = { ...appData, ...parsed, isAdmin: appData.isAdmin, bgUrl: appData.bgUrl };
        localStorage.setItem('nav_app_data', JSON.stringify(appData));
        updateGridWidth();
        renderTools();
        renderNav();
        applyBackgroundConfig();
        saveAll(true);
        showToast('JSON 数据已保存');
    } catch (e) {
        showToast('JSON 解析错误: ' + e.message, '#e74c3c');
    }
};

const closeMonacoModal = () => { document.getElementById('monaco-modal').style.display = 'none'; };
const getCleanAppData = () => { const data = { ...appData }; delete data.isAdmin; delete data.bgUrl; return data; };

const initStyleSwitcher = () => {
    document.querySelectorAll('.sidebar-style-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setViewStyle(parseInt(btn.getAttribute('data-style')));
        });
    });
    applyViewStyle(currentViewStyle);
};

const setViewStyle = (style) => {
    if (currentViewStyle === style) return;
    currentViewStyle = style;
    localStorage.setItem('nav_view_style', style);
    applyViewStyle(style);
    renderNav();
};

const applyViewStyle = (style) => {
    document.body.classList.remove('view-style-0', 'view-style-2');
    if (style !== 0) document.body.classList.add('view-style-' + style);
    document.querySelectorAll('.sidebar-style-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-style')) === style);
    });
};

const initThemeMode = () => { applyThemeMode(); };
const applyThemeMode = () => {
    document.body.classList.remove('light-theme', 'dark-theme');
    if (themeMode === 'light') document.body.classList.add('light-theme');
    else if (themeMode === 'dark') document.body.classList.add('dark-theme');
};

const initSimpleMode = () => { if (simpleMode) document.body.classList.add('no-blur'); };

const updateGridWidth = () => {
    document.documentElement.style.setProperty('--card-w', '85px');
    document.documentElement.style.setProperty('--card-h', '85px');
    const hDefault = (appData.settings && appData.settings.cardHeightDefault) ? appData.settings.cardHeightDefault : 85;
    const hColorful = (appData.settings && appData.settings.cardHeightColorful) ? appData.settings.cardHeightColorful : 85;
    document.documentElement.style.setProperty('--card-h-default', hDefault + 'px');
    document.documentElement.style.setProperty('--card-h-colorful', hColorful + 'px');
    const iconSizeDefault = (appData.settings && appData.settings.iconSizeDefault) ? appData.settings.iconSizeDefault : 32;
    const iconSizeColorful = (appData.settings && appData.settings.iconSizeColorful) ? appData.settings.iconSizeColorful : 32;
    document.documentElement.style.setProperty('--icon-size-default', iconSizeDefault + 'px');
    document.documentElement.style.setProperty('--icon-size-colorful', iconSizeColorful + 'px');
    document.documentElement.style.setProperty('--emoji-size-default', iconSizeDefault + 'px');
    document.documentElement.style.setProperty('--emoji-size-colorful', iconSizeColorful + 'px');
};

const showLoader = (text = '正在处理中...') => {
    document.getElementById('global-loading-text').innerText = text;
    document.getElementById('global-loading-overlay').style.display = 'flex';
};
const hideLoader = () => { document.getElementById('global-loading-overlay').style.display = 'none'; };

const showToast = (msg = "操作成功", color = "#27ae60") => {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.background = color;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
};

const toggleSkeleton = (show) => {
    document.getElementById('skeleton-screen').style.display = show ? 'block' : 'none';
    document.getElementById('main-content').style.display = show ? 'none' : 'block';
};

const loadBackground = async (url) => {
    if (!url) return;
    document.body.style.backgroundImage = `url('${url}')`;
    try {
        const bgCacheName = 'nav-bg-cache-v1';
        const cache = await caches.open(bgCacheName);
        const cachedResponse = await cache.match(url);
        if (cachedResponse) {
            const blob = await cachedResponse.blob();
            document.body.style.backgroundImage = `url('${URL.createObjectURL(blob)}')`;
            return;
        }
        fetch(url, { mode: 'cors' }).then(async response => {
            if (response.ok) {
                await cache.put(url, response.clone());
                const blob = await response.blob();
                document.body.style.backgroundImage = `url('${URL.createObjectURL(blob)}')`;
            }
        }).catch(() => { });
    } catch (e) { }
};

const applyBackgroundConfig = () => {
    const customBg = appData.settings?.bgUrl;
    if (customBg) {
        if (customBg.startsWith('#') || customBg.startsWith('rgb')) {
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = customBg;
        } else {
            loadBackground(customBg);
        }
    } else if (appData.bgUrl) {
        loadBackground(appData.bgUrl);
    }
};

const init = async (forceRender = false) => {
    let fetchUrl = '/api/config';
    const gridContainer = document.getElementById('grid-container');
    const localCache = localStorage.getItem('nav_app_data');
    let initialIsAdmin = isAdmin;

    if (localCache) {
        try {
            appData = JSON.parse(localCache);
            isAdmin = appData.isAdmin || false;
            initialIsAdmin = isAdmin;
            updateGridWidth();
            toggleSkeleton(false);
            renderTools();
            renderNav();
            applyBackgroundConfig();
            updateSidebarHeader();
            if (appData.lastUpdated) {
                document.getElementById('footer-cache').innerText = '最后同步：' + utils.escapeHTML(appData.lastUpdated);
            }
        } catch (e) { toggleSkeleton(true); }
    } else { toggleSkeleton(true); }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(fetchUrl, {
            headers: sysToken ? { 'Authorization': sysToken } : {},
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
            if (res.status === 401) { localStorage.removeItem('nav_token'); sysToken = ''; isAdmin = false; }
            throw new Error(`HTTP Error ${res.status}`);
        }

        const newData = await res.json();
        const isDataChanged = !localCache ||
            JSON.stringify(appData.items) !== JSON.stringify(newData.items) ||
            JSON.stringify(appData.categories) !== JSON.stringify(newData.categories);

        appData = newData;
        isAdmin = appData.isAdmin || false;
        localStorage.setItem('nav_app_data', JSON.stringify(appData));

        updateGridWidth();
        const isAdminChanged = initialIsAdmin !== isAdmin;
        applyBackgroundConfig();
        updateSidebarHeader();

        if (forceRender || isDataChanged || isAdminChanged || !localCache) {
            toggleSkeleton(false);
            renderTools();
            renderNav();
        }
        if (appData.lastUpdated) {
            document.getElementById('footer-cache').innerText = '最后同步：' + utils.escapeHTML(appData.lastUpdated);
        }
    } catch (e) {
        console.error("数据同步流错误", e);
        toggleSkeleton(false);
    }
};

// ==================== 管理面板侧边栏渲染 ====================
const renderTools = () => {
    const sidebarAdminActions = document.getElementById('sidebar-admin-actions');
    sidebarAdminActions.innerHTML = '';

    const createSidebarBtn = (icon, text, action, isSpecial = false, isActive = false) => {
        const btn = document.createElement('div');
        btn.className = 'sidebar-nav-item' + (isActive ? ' active' : '');
        if (isSpecial) {
            btn.style.background = isActive ? 'rgba(230, 126, 34, 0.9)' : 'rgba(255,255,255,0.06)';
            btn.style.boxShadow = isActive ? '0 2px 10px rgba(230, 126, 34, 0.4)' : 'none';
        }
        btn.innerHTML = `<span class="nav-icon"><i class="${icon}"></i></span><span class="nav-label">${text}</span>`;
        btn.addEventListener('click', action);
        sidebarAdminActions.appendChild(btn);
    };

    if (isAdmin) {
        document.title = "管理后台";
        // 核心改动：注入编辑模式显隐控制开关
        createSidebarBtn(isEditMode ? 'ri-lock-unlock-line' : 'ri-lock-line', isEditMode ? '关闭编辑面板' : '开启编辑面板', () => {
            isEditMode = !isEditMode;
            renderTools();
            renderNav();
        }, true, isEditMode);

        createSidebarBtn('ri-settings-3-line', '偏好设置', manageCats);
        createSidebarBtn('ri-code-s-slash-line', 'JSON编辑', openMonacoEditor);
        createSidebarBtn('ri-save-line', '保存', () => saveAll(false));
        createSidebarBtn('ri-download-line', '导出', exportConfig);
        createSidebarBtn('ri-upload-line', '导入', () => document.getElementById('import-file').click());
        createSidebarBtn('ri-refresh-line', '默认', resetConfig);
        createSidebarBtn('ri-logout-box-r-line', '登出', doLogout);
    } else {
        document.title = "个人导航";
        createSidebarBtn('ri-lock-line', '管理', () => {
            document.getElementById('auth-overlay').style.display = 'flex';
            setTimeout(() => document.getElementById('auth-input').focus(), 100);
        });
    }
};

const extractDomain = (url) => { try { return new URL(url).hostname; } catch (e) { return null; } };
const getAltFaviconUrl = (currentSrc, itemUrl) => {
    let domain = extractDomain(itemUrl);
    if (!domain) return null;
    return currentSrc && currentSrc.includes('favicon.im') ? 'https://icons.duckduckgo.com/ip3/' + domain + '.ico' : 'https://favicon.im/' + domain;
};

window.handleIconError = function (img) {
    if (img.dataset.fallbackTried) { img.outerHTML = '<span class="emoji-icon">' + window.utils.getRandomEmoji() + '</span>'; return; }
    img.dataset.fallbackTried = '1';
    let card = img.closest('.card');
    if (card) {
        let itemId = card.getAttribute('data-id');
        let item = appData.items.find(i => i.id === itemId);
        if (item && item.url) {
            let altSrc = getAltFaviconUrl(img.src, item.url);
            if (altSrc) {
                let preloader = new Image();
                preloader.onload = () => { img.src = altSrc; };
                preloader.onerror = () => { img.outerHTML = '<span class="emoji-icon">' + window.utils.getRandomEmoji() + '</span>'; };
                preloader.src = altSrc;
                return;
            }
        }
    }
    img.outerHTML = '<span class="emoji-icon">' + window.utils.getRandomEmoji() + '</span>';
};

window.handleGlowIconError = function (img) {
    if (img.dataset.fallbackTried) { img.style.display = 'none'; return; }
    img.dataset.fallbackTried = '1';
    let card = img.closest('.card');
    if (card) {
        let itemId = card.getAttribute('data-id');
        let item = appData.items.find(i => i.id === itemId);
        if (item && item.url) {
            let altSrc = getAltFaviconUrl(img.src, item.url);
            if (altSrc) {
                let preloader = new Image();
                preloader.onload = () => { img.src = altSrc; };
                preloader.onerror = () => { img.style.display = 'none'; };
                preloader.src = altSrc;
                return;
            }
        }
    }
    img.style.display = 'none';
};

const buildCardInnerHTML = (item, adminHtml, style) => {
    let fallbackAttr = 'onerror="window.handleIconError(this)"';
    const safeIcon = utils.escapeHTML(item.icon);
    const isImgIcon = item.icon && item.icon.startsWith('http');
    const iconHtml = isImgIcon ? `<img src="${safeIcon}" loading="lazy" ${fallbackAttr}>` : `<span class="emoji-icon">${safeIcon || '🔗'}</span>`;
    const safeUrl = utils.escapeHTML(item.url);
    const safeTitle = utils.escapeHTML(item.title);
    let glowFallback = 'onerror="window.handleGlowIconError(this)"';
    const glowBgHtml = isImgIcon ? `<div class="card-glow-bg"><img src="${safeIcon}" loading="lazy" aria-hidden="true" ${glowFallback}></div>` : `<div class="card-glow-bg"><div class="glow-emoji">${safeIcon || '🔗'}</div></div>`;

    return style === 2 
        ? `${glowBgHtml}${adminHtml}<a href="${safeUrl}" target="_blank"><div class="icon-wrapper">${iconHtml}</div><div class="card-text-block"><h3>${safeTitle}</h3></div></a>`
        : `${glowBgHtml}${adminHtml}<a href="${safeUrl}" target="_blank"><div class="icon-wrapper">${iconHtml}</div><h3>${safeTitle}</h3></a>`;
};

const toggleCardSelection = (id) => {
    if (selectedCardIds.has(id)) selectedCardIds.delete(id); else selectedCardIds.add(id);
    updateBatchUI();
    renderNav();
};

const updateBatchUI = () => {
    let batchBar = document.querySelector('.batch-actions-bar');
    if (selectedCardIds.size > 0) {
        if (!batchBar) {
            batchBar = document.createElement('div');
            batchBar.className = 'batch-actions-bar';
            batchBar.innerHTML = `<span>已选 <b id="batch-count">0</b> 项</span><button class="batch-btn move" id="batch-move-btn">移动分类</button><button class="batch-btn delete" id="batch-delete-btn">批量删除</button><button class="batch-btn" id="batch-cancel-btn" style="background:#555;color:#fff">取消</button>`;
            document.body.appendChild(batchBar);
            document.getElementById('batch-delete-btn').addEventListener('click', batchDelete);
            document.getElementById('batch-move-btn').addEventListener('click', showBatchMoveDialog);
            document.getElementById('batch-cancel-btn').addEventListener('click', clearSelection);
        }
        batchBar.classList.add('visible');
        document.getElementById('batch-count').textContent = selectedCardIds.size;
    } else if (batchBar) { batchBar.classList.remove('visible'); }
};

const clearSelection = () => { selectedCardIds.clear(); updateBatchUI(); renderNav(); };
const batchDelete = () => {
    if (selectedCardIds.size === 0 || !confirm(`确定删除选中的 ${selectedCardIds.size} 个书签？`)) return;
    appData.items = appData.items.filter(item => !selectedCardIds.has(item.id));
    clearSelection(); saveAll(false); showToast('批量删除成功');
};

const showBatchMoveDialog = () => {
    if (selectedCardIds.size === 0) return;
    const catOptions = appData.categories.map(c => `<option value="${c.id}">${utils.escapeHTML(c.name)}</option>`).join('');
    const dialog = document.createElement('div');
    dialog.className = 'modal'; dialog.style.display = 'flex';
    dialog.innerHTML = `<div class="modal-content" style="text-align:center"><h3>移动到分类</h3><select id="batch-move-cat" style="margin: 15px 0">${catOptions}</select><div style="display:flex;gap:10px"><button class="tab-btn active" id="batch-move-confirm" style="flex:1">确认</button><button class="tab-btn" id="batch-move-cancel" style="flex:1;background:#555">取消</button></div></div>`;
    document.body.appendChild(dialog);
    document.getElementById('batch-move-cancel').addEventListener('click', () => document.body.removeChild(dialog));
    document.getElementById('batch-move-confirm').addEventListener('click', () => {
        const targetCatId = document.getElementById('batch-move-cat').value;
        appData.items.forEach(item => { if (selectedCardIds.has(item.id)) item.catId = targetCatId; });
        document.body.removeChild(dialog); clearSelection(); saveAll(false); showToast(`成功转移分类`);
    });
};

// ==================== 核心渲染函数 ====================
const renderNav = () => {
    const sidebarNav = document.getElementById('sidebar-nav');
    const container = document.getElementById('grid-container');
    sidebarNav.innerHTML = ''; container.innerHTML = '';

    const clickData = JSON.parse(localStorage.getItem('nav_clicks') || '{}');
    const hasFrequent = Object.keys(clickData).length > 0;
    let cats = isAdmin ? [...appData.categories] : appData.categories.filter(c => !c.hidden);

    if (hasFrequent) cats.unshift({ id: 'VIRTUAL_FREQ', name: '常去网站', icon: '⭐', hidden: false });
    if (cats.length > 0 && !activeCatId) activeCatId = cats[0].id;

    cats.forEach((cat) => {
        let catCount = cat.id === 'VIRTUAL_FREQ' ? appData.items.filter(i => clickData[i.id] > 0).slice(0, 12).length : appData.items.filter(i => i.catId === cat.id && (isAdmin || !i.hidden)).length;
        const item = document.createElement('div');
        item.className = 'sidebar-nav-item' + (activeCatId === cat.id ? ' active' : '') + (cat.hidden ? ' hidden-item' : '');
        item.setAttribute('data-cat-id', cat.id);
        item.innerHTML = `<span class="nav-icon">${utils.escapeHTML(cat.icon)}</span><span class="nav-label">${utils.escapeHTML(cat.name)}</span><span class="nav-count">${catCount}</span>`;
        item.addEventListener('click', () => {
            activeCatId = cat.id; renderNav();
            const section = document.getElementById('section-' + cat.id);
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        sidebarNav.appendChild(item);
    });

    cats.forEach((cat) => {
        const section = document.createElement('div');
        section.className = 'category-section'; section.id = 'section-' + cat.id;
        const title = document.createElement('div');
        title.className = 'category-section-title';
        title.innerHTML = `<span class="cat-icon">${utils.escapeHTML(cat.icon)}</span> ${utils.escapeHTML(cat.name)}`;
        section.appendChild(title);

        const catIsVideo = isVideoCategory(cat);
        let catItems = cat.id === 'VIRTUAL_FREQ' ? appData.items.filter(i => (isAdmin || !i.hidden) && clickData[i.id] > 0).sort((a, b) => (clickData[b.id] || 0) - (clickData[a.id] || 0)).slice(0, 12) : appData.items.filter(i => i.catId === cat.id && (isAdmin || !i.hidden));

        if (catIsVideo) {
            const videoGrid = document.createElement('div');
            videoGrid.className = 'video-grid';
            catItems.forEach(item => { videoGrid.appendChild(buildVideoCard(item, detectVideoPlatform(item.url))); });

            // 核心UI：只有开启编辑面板时，才会渲染“+ 新增”卡片
            if (isAdmin && isEditMode && cat.id !== 'VIRTUAL_FREQ') {
                const addCard = document.createElement('div');
                addCard.className = 'video-card'; addCard.style.cssText = 'border-style:dashed;display:flex;align-items:center;justify-content:center;min-height:120px;';
                addCard.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,0.5);"><i class="ri-add-line" style="font-size:32px;"></i><div>新增</div></div>`;
                addCard.addEventListener('click', () => openItemEdit('', cat.id));
                videoGrid.appendChild(addCard);
            }
            section.appendChild(videoGrid);
            loadVideoCovers(videoGrid);
        } else {
            const grid = document.createElement('div');
            grid.className = 'nav-grid'; grid.id = 'grid-' + cat.id;
            grid.addEventListener('click', (e) => {
                const actionBtn = e.target.closest('.action-mini');
                if (actionBtn) {
                    e.preventDefault(); e.stopPropagation();
                    const action = actionBtn.getAttribute('data-action');
                    const targetId = actionBtn.getAttribute('data-id');
                    if (action === 'toggleHide') toggleHide('items', targetId);
                    if (action === 'edit') openItemEdit(targetId, null);
                    if (action === 'delete') deleteObj('items', targetId);
                }
            });

            const fragment = document.createDocumentFragment();
            catItems.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'card' + (item.hidden ? ' hidden-item' : '');
                card.setAttribute('data-id', utils.escapeHTML(item.id));
                if (currentViewStyle === 2 && item.bgColor) { card.style.setProperty('--card-bg-color', item.bgColor); card.classList.add('has-bg'); }
                card.setAttribute('data-tooltip', item.desc ? `${item.title}\n${item.desc}` : item.title);

                // 核心UI：操作按钮栏与 isEditMode 深度绑定锁死
                let adminHtml = '';
                if (isAdmin && isEditMode && cat.id !== 'VIRTUAL_FREQ') {
                    adminHtml = `<div class="admin-actions">
                        <button class="action-mini batch-select-btn" data-id="${utils.escapeHTML(item.id)}"><i class="ri-checkbox-${selectedCardIds.has(item.id) ? 'fill' : 'blank-line'}"></i></button>
                        <button class="action-mini" data-action="toggleHide" data-id="${utils.escapeHTML(item.id)}"><i class="ri-eye-${item.hidden ? 'off-' : ''}line"></i></button>
                        <button class="action-mini" data-action="edit" data-id="${utils.escapeHTML(item.id)}"><i class="ri-edit-line"></i></button>
                        <button class="action-mini" data-action="delete" data-id="${utils.escapeHTML(item.id)}"><i class="ri-delete-bin-line"></i></button>
                    </div>`;
                }

                card.innerHTML = buildCardInnerHTML(item, adminHtml, currentViewStyle);
                const videoInfo = detectVideoPlatform(item.url);
                if (videoInfo) {
                    card.querySelector('a')?.addEventListener('click', (e) => {
                        if (!e.target.closest('.admin-actions')) { e.preventDefault(); openVideoModal(item, videoInfo); }
                    });
                }
                if (selectedCardIds.has(item.id)) card.classList.add('selected');
                fragment.appendChild(card);
            });

            // 核心UI：普通网格中的“+ 新增”也受编辑面板开关驱动
            if (isAdmin && isEditMode && cat.id !== 'VIRTUAL_FREQ') {
                const addCard = document.createElement('div');
                addCard.className = 'card card-add-new'; addCard.style.borderStyle = 'dashed';
                addCard.innerHTML = `<a href="javascript:void(0)"><div class="icon-wrapper"><div class="emoji-icon">➕</div></div><h3>新增</h3></a>`;
                addCard.addEventListener('click', () => openItemEdit('', cat.id));
                fragment.appendChild(addCard);
            }
            grid.appendChild(fragment);
            section.appendChild(grid);
        }
        container.appendChild(section);
    });

    initScrollSpy();
    initCardGlow(container);
};

const buildVideoCard = (item, videoInfo) => {
    const card = document.createElement('div');
    card.className = 'video-card'; card.setAttribute('data-id', utils.escapeHTML(item.id));
    let badgeHtml = videoInfo ? `<div class="video-card-badge ${videoInfo.type === 'bilibili'?'bilibili':'youtube'}">${videoInfo.type === 'bilibili'?'Bilibili':'YouTube'}</div>` : '';
    let coverHtml = videoInfo?.type === 'bilibili' ? `<div class="video-cover-slot" data-bvid="${videoInfo.bvid}"><div class="video-card-cover-fallback"><i class="ri-play-circle-line"></i></div></div>` : (videoInfo?.type === 'youtube' ? `<img src="https://img.youtube.com/vi/${videoInfo.videoId}/mqdefault.jpg" loading="lazy">` : `<div class="video-card-cover-fallback"><i class="ri-play-circle-line"></i></div>`);

    // 核心UI：视频小组件内部图标也跟编辑模式联动
    let adminHtml = '';
    if (isAdmin && isEditMode) {
        adminHtml = `<div class="admin-actions">
            <button class="action-mini" data-action="toggleHide" data-id="${utils.escapeHTML(item.id)}"><i class="ri-eye-${item.hidden ? 'off-' : ''}line"></i></button>
            <button class="action-mini" data-action="edit" data-id="${utils.escapeHTML(item.id)}"><i class="ri-edit-line"></i></button>
            <button class="action-mini" data-action="delete" data-id="${utils.escapeHTML(item.id)}"><i class="ri-delete-bin-line"></i></button>
        </div>`;
    }

    card.innerHTML = `${adminHtml}<div class="video-card-cover">${badgeHtml}${coverHtml}<div class="video-play-overlay"><div class="video-play-btn"><i class="ri-play-fill"></i></div></div></div><div class="video-card-body"><div class="video-card-title">${utils.escapeHTML(item.title)}</div><div class="video-card-desc">${utils.escapeHTML(item.desc || '')}</div></div>`;

    card.addEventListener('click', (e) => {
        if (e.target.closest('.admin-actions')) return;
        if (videoInfo) { e.preventDefault(); openVideoModal(item, videoInfo); } else if (item.url) { window.open(item.url, '_blank'); }
    });

    if (item.hidden) { card.style.opacity = '0.3'; card.style.filter = 'grayscale(1)'; }
    return card;
};

const initCardGlow = (container) => {
    const cards = container.querySelectorAll('.card[data-id]');
    const extractor = window.colorExtractor;
    if (!extractor) return;

    cards.forEach(card => {
        let item = appData.items.find(i => i.id === card.getAttribute('data-id'));
        if (!item) return;
        if (item.icon && item.icon.startsWith('http')) {
            extractor.extractColorFromImage(item.icon).then(color => {
                if (color) {
                    card.style.setProperty('--icon-color', color.hex);
                    card.style.setProperty('--icon-color-rgb', color.rgb);
                    card.setAttribute('data-color-ready', '');
                }
            });
        } else {
            let color = extractor.generateColorFromText(item.icon || item.title);
            card.style.setProperty('--icon-color', color.hex);
            card.style.setProperty('--icon-color-rgb', color.rgb);
            card.setAttribute('data-color-ready', '');
        }
    });
};

const initScrollSpy = () => {
    const sections = document.querySelectorAll('.category-section');
    if (sections.length === 0) return;
    if (window._scrollSpyObserver) window._scrollSpyObserver.disconnect();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const catId = entry.target.id.replace('section-', '');
                activeCatId = catId;
                document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                    item.classList.toggle('active', item.getAttribute('data-cat-id') === catId);
                });
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));
    window._scrollSpyObserver = observer;
};

// ==================== 智能增量解析 Edge 收藏夹 ====================
const importConfig = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const content = e.target.result;
        let parsedData = null;

        if (content.includes("NETSCAPE-Bookmark-file-1") || content.includes("<TITLE>Bookmarks</TITLE>")) {
            showLoader('正在为您智能增量解析 Edge 文件夹...');
            parsedData = parseEdgeHtmlBookmarks(content);
        } else {
            try { parsedData = JSON.parse(content); } catch (err) {
                hideLoader(); showToast("格式不正确", "#e74c3c"); return;
            }
        }

        if (parsedData && parsedData.categories && parsedData.items) {
            // 前端本地查重合并流
            parsedData.categories.forEach(inCat => {
                if (!appData.categories.some(c => c.id === inCat.id || c.name === inCat.name)) appData.categories.push(inCat);
            });
            parsedData.items.forEach(inItem => {
                if (!appData.items.some(i => i.url === inItem.url)) appData.items.push(inItem);
            });

            renderTools(); renderNav();
            await saveAll(false);
            showToast("已成功智能增量导入！");
        }
    };
    reader.readAsText(file, "UTF-8");
    event.target.value = '';
};

function parseEdgeHtmlBookmarks(htmlStr) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlStr, 'text/html');
    const categories = []; const items = [];
    const generateCatId = (idx) => 'CAT_' + (Date.now() + idx);
    const generateItemId = (catId, idx) => 'ITEM_' + (Date.now() + idx);
    const folderHeaders = doc.querySelectorAll('dt > h3');
    let catIndex = 0;

    folderHeaders.forEach((h3) => {
        const name = h3.textContent.trim();
        if (['收藏夹栏', 'Bookmarks', '书签栏'].includes(name)) return;
        const catId = generateCatId(catIndex);
        categories.push({ id: catId, name, icon: name.includes('视频')?'🎬':'📁', hidden: false, _isVideo: name.includes('视频') });

        const nextDl = h3.parentElement.querySelector('dl');
        if (nextDl) {
            nextDl.querySelectorAll('a').forEach((a, itemIndex) => {
                const title = a.textContent.trim(); const url = a.getAttribute('href');
                items.push({ id: generateItemId(catId, itemIndex), catId, title, url, desc: title, icon: "https://favicon.im/" + new URL(url).hostname, hidden: false });
            });
        }
        catIndex++;
    });
    return { categories, items };
}

// ==================== 其余弹窗、数据逻辑保持不变 ====================
const openItemEdit = (id, catId) => {
    editingType = 'items'; editingId = id;
    const item = id ? appData.items.find(i => i.id === id) : { id: 'i' + Date.now(), title: '', url: '', desc: '', icon: '', catId };
    document.getElementById('edit-title').innerText = id ? '编辑网站' : '新增网站';
    document.getElementById('edit-form-body').innerHTML = `
        <div class="form-row"><label>网站 URL</label><input id="f-url" value="${utils.escapeHTML(item.url)}"></div>
        <div class="form-row"><label>网站名称</label><input id="f-title" value="${utils.escapeHTML(item.title)}"></div>
        <div class="form-row"><label>网站描述</label><input id="f-desc" value="${utils.escapeHTML(item.desc || '')}"></div>
        <div class="form-row"><label>图标URL</label><input id="f-icon" value="${utils.escapeHTML(item.icon)}"></div>
        <div class="form-row"><label>归属分类</label><select id="f-cat">${appData.categories.map(c => `<option value="${c.id}" ${c.id===item.catId?'selected':''}>${c.name}</option>`).join('')}</select></div>`;
    document.getElementById('edit-modal').style.display = 'flex';
};

const confirmEdit = () => {
    const url = document.getElementById('f-url').value;
    const title = document.getElementById('f-title').value;
    const desc = document.getElementById('f-desc').value;
    const icon = document.getElementById('f-icon').value;
    const catId = document.getElementById('f-cat').value;

    if (editingId) {
        const idx = appData.items.findIndex(i => i.id === editingId);
        if (idx > -1) appData.items[idx] = { ...appData.items[idx], url, title, desc, icon, catId };
    } else {
        appData.items.push({ id: 'i' + Date.now(), url, title, desc, icon, catId, hidden: false });
    }
    renderNav(); closeModal(); saveAll(false);
};

const toggleHide = (type, id) => { let obj = appData[type].find(o => o.id === id); if (obj) obj.hidden = !obj.hidden; saveAll(false); renderNav(); };
const deleteObj = (type, id) => { if (confirm('确定删除？')) { appData[type] = appData[type].filter(o => o.id !== id); renderNav(); saveAll(false); } };
const closeModal = () => { document.getElementById('edit-modal').style.display = 'none'; };

const doLogin = async () => {
    showLoader('安全鉴定中...');
    const rawPwd = document.getElementById('auth-input').value.trim();
    sysToken = await hashPassword(rawPwd);
    localStorage.setItem('nav_token', sysToken);
    document.getElementById('auth-overlay').style.display = 'none';
    await init(true); hideLoader();
};

const doLogout = () => { localStorage.removeItem('nav_token'); sysToken = ''; isAdmin = false; isEditMode = false; init(true); };

const saveAll = async (silent = false) => {
    if (!silent) showLoader('云端增量同步中...');
    try {
        const res = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Authorization': sysToken, 'Content-Type': 'application/json' },
            body: JSON.stringify(appData)
        });
        if (!silent) { hideLoader(); showToast("数据同步成功！"); }
    } catch (e) { if (!silent) { hideLoader(); showToast("同步失败", "#e67e22"); } }
};

const exportConfig = () => {
    const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `nav-backup.json`; a.click();
};

const resetConfig = async () => {
    if (confirm('确定重置？')) {
        await fetch('/api/config', { method: 'DELETE', headers: { 'Authorization': sysToken } });
        init(true);
    }
};

const manageCats = () => { showToast("日常偏好可在JSON或代码中调整"); };
const updateSidebarHeader = () => {
    document.getElementById('sidebar-title').textContent = appData.settings?.siteName || '个人导航';
};

document.getElementById('btn-login').addEventListener('click', doLogin);
document.getElementById('auth-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });
document.getElementById('btn-close-auth').addEventListener('click', () => { document.getElementById('auth-overlay').style.display = 'none'; });
document.getElementById('btn-confirm-edit').addEventListener('click', confirmEdit);
document.getElementById('btn-close-edit').addEventListener('click', closeModal);
document.getElementById('import-file').addEventListener('change', importConfig);