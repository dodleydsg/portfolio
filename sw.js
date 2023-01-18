const cacheName = "shell-cache";
const dynamicCache = "dynamic-cache";
const assets = [
  "/",
  "/styles/output.css",
  "/scripts/particle.js",
  "index.html",
  "404.html",
  "/assets/images/css.svg",
  "/assets/images/django.svg",
  "/assets/images/figma.svg",
  "/assets/images/js.svg",
  "/assets/images/logos/logo-24x24.png",
  "/assets/images/logos/logo-144x144.png",
  "/assets/images/git.svg",
  "/assets/images/html.svg",
  "/assets/images/material.svg",
  "/assets/images/node.svg",
  "/assets/images/otis-redding.png",
  "/assets/images/python.svg",
  "/assets/images/react.svg",
  "/assets/images/tailwind.svg",
  "/assets/images/xd.svg",
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap",
  "https://fonts.googleapis.com/css2?family=Inter:wght@200;400&family=JetBrains+Mono:wght@700&display=swap",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(assets);
        console.log("Caching shell assets");
      })
      .catch()
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys, "");
      return Promise.all(
        keys
          .filter((key) => key !== cacheName && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//fetch events

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("404.html");
        }
      })
  );
});
