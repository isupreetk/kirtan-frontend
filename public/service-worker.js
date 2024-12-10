const CACHE_NAME = "kirtan/v1";
const CACHE_FILES = [
    "/",
    "/index.html",
    "static/js/bundle.js"
]

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_FILES)
        })
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(fetch(e.request).then(res => {
        // console.log("Returning from network");
        const responseToBeCached = res.clone();

        caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToBeCached);
        });
        return res;
    }) 
    .catch(() => {
        // console.log("Returning from cache");
        return caches.match(e.request).then((file) => {
            return file
        })
    })
)
        
    }
)