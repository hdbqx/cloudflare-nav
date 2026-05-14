/**
 * ==========================================
 * ServiceWorker.js - PWA 核心脚本
 * 实现 Stale-While-Revalidate 缓存策略
 * ==========================================
 */

// 缓存版本号（更新时需修改）
const CACHE_NAME = 'nav-cache-v7';

// 需要缓存的核心静态资源
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/js/utils.js',
  '/assets/js/colorExtractor.js',
  '/assets/js/app.js',
  'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js'
];

/**
 * 安装事件
 * @description 缓存核心静态资源，跳过等待直接激活
 *               单个资源失败不影响其他资源的缓存
 */
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 逐个缓存，单个失败不影响整体（比 cache.addAll 更健壮）
      return Promise.allSettled(
        URLS_TO_CACHE.map(url =>
          cache.add(url).catch(err => console.warn('SW 缓存失败:', url, err.message))
        )
      );
    })
  );
});

/**
 * 激活事件
 * @description 清理旧版本缓存，确保只保留当前版本
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/**
 * 请求拦截事件
 */
self.addEventListener('fetch', event => {
  // API 请求不走 SW 缓存
  if (event.request.url.includes('/api/')) return;

  // 1. 对于 HTML 页面请求，优先使用缓存，后台更新（Stale-While-Revalidate）
  //    避免每次导航都等待网络，提升首屏加载速度
  const acceptHeader = event.request.headers.get('accept') || '';
  if (event.request.mode === 'navigate' || acceptHeader.includes('text/html')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
          }
          return networkResponse;
        }).catch(() => {});
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 2. 其他静态资源 (CSS/JS/图片) 保持 Stale-While-Revalidate (缓存优先并后台更新)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse.ok) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
        }
        return networkResponse;
      }).catch(() => {});
      return cachedResponse || fetchPromise;
    })
  );
});