const CACHE = "skylish-v72-pre-lancamento";
const CORE = [
  "/", "/index.html", "/404.html", "/offline.html", "/acesso-negado.html", "/site.webmanifest",
  "/assets/favicon.png", "/assets/logo-oficial.jpg",
  "/css/core.css", "/css/style.css", "/css/responsive-v28.css", "/css/responsive-v30.css",
  "/css/student-dashboard-v31.css", "/css/student-experience-v32.css", "/css/stability-v33.css", "/css/quizzes-v34.css",
  "/js/core.js", "/js/responsive-v28.js", "/js/student-ui-v30.js", "/js/student-ui-v31.js",
  "/js/student-experience-v32.js", "/js/stability-v33.js", "/js/student-content-real.js", "/js/main.js",
  "/pages/student/quizzes.html"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) caches.open(CACHE).then(cache => cache.put(request, response.clone()));
          return response;
        })
        .catch(async () => (await caches.match(request)) || caches.match("/offline.html"))
    );
    return;
  }

  const isCode = /\.(?:js|css)$/i.test(url.pathname);
  if (isCode) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) caches.open(CACHE).then(cache => cache.put(request, response.clone()));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response.ok) caches.open(CACHE).then(cache => cache.put(request, response.clone()));
        return response;
      }).catch(() => cached || Response.error());
      return cached || network;
    })
  );
});
