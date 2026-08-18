/* Service worker: guarda o app para funcionar sem internet.
   Troque a VERSAO quando publicar uma atualização. */
const VERSAO = "westeros-v2";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./app.js",
  "./manifest.webmanifest",
  "./icone-192.png",
  "./icone-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n !== VERSAO).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // navegação: rede primeiro, cache como reserva (offline)
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  // demais arquivos: cache primeiro, e atualiza em segundo plano
  e.respondWith(
    caches.match(req).then((cacheado) => {
      const rede = fetch(req)
        .then((resp) => {
          if (resp && resp.status === 200 && new URL(req.url).origin === location.origin) {
            const copia = resp.clone();
            caches.open(VERSAO).then((c) => c.put(req, copia));
          }
          return resp;
        })
        .catch(() => cacheado);
      return cacheado || rede;
    })
  );
});
