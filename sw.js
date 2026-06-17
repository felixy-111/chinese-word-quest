const CACHE = "cwq-v35";
const ASSETS = ["./", "index.html", "data/words.js", "data/strokes.js", "hanzi-writer.min.js", "manifest.webmanifest", "audio/bgm.mp3"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)).catch(()=>caches.match("index.html")));
});
self.addEventListener("message", e => { if(e.data === "skipWaiting") self.skipWaiting(); });
