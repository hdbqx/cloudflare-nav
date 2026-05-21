/**
 * ==========================================
 * ServiceWorker.js - PWA 核心脚本
 * 实现 Stale-While-Revalidate 缓存策略
 * 升级版：深度排除后端动态API，防止静态缓存拦截更新
 * ==========================================
 */

const CACHE_NAME = 'nav-cache-v8'; // 升级版本号强制触发静态文件刷洗

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

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        URLS_TO_CACHE.map(url =>
          cache.add(url).catch(err => console.warn('SW 缓存静态资源失败:', url, err.message))
        )
      );
    })
  );
});

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

self.addEventListener('fetch', event => {
  // 核心安全屏障：凡是包含 /api/ 的后端请求，直接不碰不拦截，交给原生网络，防止覆盖云端新改动
  if (event.request.url.includes('/api/')) return;

  // 1. HTML 页面请求流
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

  // 2. 静态小组件与样式资源 (CSS/JS/图片)
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
