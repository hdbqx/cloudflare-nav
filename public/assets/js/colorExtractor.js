/**
 * ==========================================
 * colorExtractor.js - 图标颜色提取与光晕效果 v3
 * 从图标提取主色 RGB，生成自适应光晕效果
 *
 * 特性：
 * - 优先使用 Canvas + CORS 提取图标主色
 * - CORS 失败时降级到 ColorThief API
 * - 无图标时从文本哈希生成确定性颜色
 * - 提供鼠标追踪功能，驱动光晕跟随
 * - 持久化缓存，跨 DOM 重建自动恢复
 * ==========================================
 */
(function () {
    // 缓存已提取颜色的图标 URL
    const extractedUrls = new Set();

    // ---- 颜色提取核心 ----

    // 从 <img> 元素提取主色 RGB（Canvas 方式）
    function extractDominantColor(imgEl) {
        try {
            const canvas = document.createElement('canvas');
            const size = 50;
            const scaleFactor = size / Math.max(imgEl.naturalWidth || imgEl.width, imgEl.naturalHeight || imgEl.height, 1);
            canvas.width = Math.max(1, Math.round((imgEl.naturalWidth || imgEl.width) * scaleFactor));
            canvas.height = Math.max(1, Math.round((imgEl.naturalHeight || imgEl.height) * scaleFactor));
            const ctx = canvas.getContext('2d');
            ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            // 颜色量化分析
            const colorMap = new Map();
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
                if (a < 128) continue;
                const brightness = (r + g + b) / 3;
                if (brightness > 240) continue;
                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                const saturation = max === 0 ? 0 : (max - min) / max;
                if (saturation < 0.12) continue;
                // 量化
                const qR = Math.round(r / 20) * 20;
                const qG = Math.round(g / 20) * 20;
                const qB = Math.round(b / 20) * 20;
                const key = `${qR},${qG},${qB}`;
                colorMap.set(key, (colorMap.get(key) || 0) + 1);
            }

            let dominant = '', maxCount = 0;
            for (const [color, count] of colorMap) {
                if (count > maxCount) { maxCount = count; dominant = color; }
            }

            if (dominant) {
                return dominant.split(',').map(Number);
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    // 通过 ColorThief API 提取颜色（降级方案，无需 CORS）
    function extractColorViaAPI(imgUrl) {
        return new Promise(function (resolve) {
            const apiUrl = `https://api.colorthief.fns.design/color?image=${encodeURIComponent(imgUrl)}`;
            fetch(apiUrl)
                .then(function (res) { return res.json(); })
                .then(function (data) {
                    if (data && data.r !== undefined) {
                        resolve([data.r, data.g, data.b]);
                    } else {
                        resolve(null);
                    }
                })
                .catch(function () { resolve(null); });
        });
    }

    // 加载图片（优先尝试 CORS 模式）
    function loadImage(src) {
        return new Promise(function (resolve) {
            const img = new Image();
            img.onload = function () { resolve(img); };
            img.onerror = function () { resolve(null); };
            img.crossOrigin = 'anonymous';
            img.src = src;
        });
    }

    // RGB 转 HEX
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    // 从文本哈希生成颜色（用于没有图标的情况）
    function generateColorFromText(text) {
        if (!text) return { hex: '#399dff', rgb: '57, 157, 255' };

        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = text.charCodeAt(i) + ((hash << 5) - hash);
        }

        const hue = Math.abs(hash % 360);
        const saturation = 65 + (Math.abs(hash >> 8) % 15);
        const lightness = 45 + (Math.abs(hash >> 16) % 10);

        // HSL → RGB 转换
        const s = saturation / 100;
        const l = lightness / 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
        const m = l - c / 2;

        let r = 0, g = 0, b = 0;
        if (hue < 60) { r = c; g = x; }
        else if (hue < 120) { r = x; g = c; }
        else if (hue < 180) { g = c; b = x; }
        else if (hue < 240) { g = x; b = c; }
        else if (hue < 300) { r = x; b = c; }
        else { r = c; b = x; }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return {
            hex: rgbToHex(r, g, b),
            rgb: `${r}, ${g}, ${b}`
        };
    }

    // ---- 公开接口 ----

    /**
     * 提取图标颜色（异步）
     * iconUrl: 完整的图标 URL
     * callback: function({ hex, rgb }) 或 null
     */
    function getIconColor(iconUrl, callback) {
        if (!iconUrl) { callback(null); return; }

        const cacheKey = 'icon_color_v3_' + btoa(unescape(encodeURIComponent(iconUrl))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 40);

        // 先查 sessionStorage 缓存
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                callback(parsed);
                return;
            }
        } catch (e) { }

        // 异步加载图片并提取颜色
        loadImage(iconUrl).then(function (img) {
            if (!img) {
                extractColorViaAPI(iconUrl).then(function (color) {
                    if (color) {
                        const result = { hex: rgbToHex(color[0], color[1], color[2]), rgb: color.join(', ') };
                        try { sessionStorage.setItem(cacheKey, JSON.stringify(result)); } catch (e) { }
                        extractedUrls.add(iconUrl);
                        callback(result);
                    } else {
                        callback(null);
                    }
                });
                return;
            }

            const color = extractDominantColor(img);
            if (color) {
                const result = { hex: rgbToHex(color[0], color[1], color[2]), rgb: color.join(', ') };
                try { sessionStorage.setItem(cacheKey, JSON.stringify(result)); } catch (e) { }
                extractedUrls.add(iconUrl);
                callback(result);
            } else {
                extractColorViaAPI(iconUrl).then(function (apiColor) {
                    if (apiColor) {
                        const result = { hex: rgbToHex(apiColor[0], apiColor[1], apiColor[2]), rgb: apiColor.join(', ') };
                        try { sessionStorage.setItem(cacheKey, JSON.stringify(result)); } catch (e) { }
                        extractedUrls.add(iconUrl);
                        callback(result);
                    } else {
                        callback(null);
                    }
                });
            }
        });
    }

    /**
     * 将颜色应用到卡片元素（注入 CSS 变量 + 添加光晕结构）
     * @param {HTMLElement} card - .card 元素
     * @param {string} hex - 颜色 HEX 值
     * @param {string} rgb - 颜色 RGB 字符串 "r, g, b"
     */
    function applyColorToCard(card, hex, rgb) {
        card.style.setProperty('--icon-color', hex);
        card.style.setProperty('--icon-color-rgb', rgb);
        card.setAttribute('data-color-ready', '');

        // 如果卡片还没有 icon-bg 层，添加
        if (!card.querySelector('.icon-bg')) {
            ensureIconBgLayer(card);
        }

        // 如果卡片还没有 icon-glow 层（鼠标跟随径向渐变），添加
        if (!card.querySelector('.icon-glow')) {
            ensureIconGlowLayer(card);
        }

        // 将图标内容包裹到 icon-main 中
        ensureIconMainLayer(card);
    }

    /**
     * 为卡片创建/更新 icon-bg 模糊背景层
     * @param {HTMLElement} card - .card 元素
     */
    function ensureIconBgLayer(card) {
        let iconBg = card.querySelector('.icon-bg');
        if (!iconBg) {
            iconBg = document.createElement('div');
            iconBg.className = 'icon-bg';
            // 插入到卡片最前面
            card.insertBefore(iconBg, card.firstChild);
        }

        // 复制图标内容到 icon-bg
        const linkEl = card.querySelector('a');
        if (linkEl) {
            const imgEl = linkEl.querySelector('img');
            const emojiEl = linkEl.querySelector('.emoji-icon');

            if (imgEl) {
                iconBg.innerHTML = `<img src="${imgEl.src}" alt="">`;
            } else if (emojiEl) {
                iconBg.innerHTML = `<span>${emojiEl.textContent}</span>`;
            }
        }
    }

    /**
     * 为卡片创建 icon-glow 径向渐变层（鼠标跟随聚光效果）
     * 使用独立元素而非 ::before 伪元素，避免与 tooltip 冲突
     * @param {HTMLElement} card - .card 元素
     */
    function ensureIconGlowLayer(card) {
        let iconGlow = card.querySelector('.icon-glow');
        if (!iconGlow) {
            iconGlow = document.createElement('div');
            iconGlow.className = 'icon-glow';
            // 插入到 icon-bg 之后
            const iconBg = card.querySelector('.icon-bg');
            if (iconBg && iconBg.nextSibling) {
                card.insertBefore(iconGlow, iconBg.nextSibling);
            } else if (iconBg) {
                card.appendChild(iconGlow);
            } else {
                card.insertBefore(iconGlow, card.firstChild);
            }
        }
    }

    /**
     * 将卡片内容包裹到 icon-main 层中
     * @param {HTMLElement} card - .card 元素
     */
    function ensureIconMainLayer(card) {
        const linkEl = card.querySelector('a');
        if (linkEl && !linkEl.classList.contains('icon-main')) {
            linkEl.classList.add('icon-main');
        }
    }

    /**
     * 为卡片添加鼠标追踪（驱动光晕跟随）
     * 使用 RAF 节流优化性能
     * @param {HTMLElement} card - .card 元素
     */
    function setupMouseTracking(card) {
        if (card._hoverTrackingSetup) return;
        card._hoverTrackingSetup = true;

        let rafId = null;
        card.addEventListener('mousemove', function (e) {
            if (rafId) return;
            rafId = requestAnimationFrame(function () {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                card.style.setProperty('--pointer-x', x.toString());
                card.style.setProperty('--pointer-y', y.toString());
                rafId = null;
            });
        });
    }

    /**
     * 批量为所有卡片应用颜色和光晕效果
     * @param {boolean} forceRefresh - 是否强制刷新所有卡片
     */
    function applyToAllCards(forceRefresh) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(function (card) {
            // 跳过新增按钮和虚拟卡片
            if (card.classList.contains('card-add-new')) return;
            if (!card.getAttribute('data-id')) return;
            if (card.getAttribute('data-id') === '') return;

            // 设置鼠标追踪
            setupMouseTracking(card);

            // 已有颜色且不强制刷新，跳过
            if (card.hasAttribute('data-color-ready') && !forceRefresh) return;

            // 从卡片中提取图标 URL
            const imgEl = card.querySelector('a img');
            const emojiEl = card.querySelector('a .emoji-icon');
            const titleEl = card.querySelector('a h3');
            const title = titleEl ? titleEl.textContent : '';

            if (imgEl && imgEl.src) {
                // 有图片图标：异步提取颜色
                const iconUrl = imgEl.src;
                const cacheKey = 'icon_color_v3_' + btoa(unescape(encodeURIComponent(iconUrl))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 40);

                // 先尝试从缓存恢复
                try {
                    const cached = sessionStorage.getItem(cacheKey);
                    if (cached) {
                        const parsed = JSON.parse(cached);
                        applyColorToCard(card, parsed.hex, parsed.rgb);
                        return;
                    }
                } catch (e) { }

                getIconColor(iconUrl, function (result) {
                    if (result) {
                        applyColorToCard(card, result.hex, result.rgb);
                    } else {
                        // 提取失败，从标题生成颜色
                        const textResult = generateColorFromText(title);
                        applyColorToCard(card, textResult.hex, textResult.rgb);
                    }
                });
            } else {
                // 无图片：从标题或 emoji 生成颜色
                const textResult = generateColorFromText(emojiEl ? emojiEl.textContent : title);
                applyColorToCard(card, textResult.hex, textResult.rgb);
            }
        });
    }

    // 暴露到全局
    window.colorExtractor = {
        applyToAllCards: applyToAllCards,
        getIconColor: getIconColor,
        generateColorFromText: generateColorFromText,
        applyColorToCard: applyColorToCard,
        ensureIconBgLayer: ensureIconBgLayer,
        ensureIconMainLayer: ensureIconMainLayer,
        setupMouseTracking: setupMouseTracking,
        extractedUrls: extractedUrls
    };
})();
