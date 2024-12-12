const CACHE_NAME = "kirtan/v1";
const CACHE_FILES = ["/index.html", "static/js/bundle.js"];
let STRATEGY;

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener("fetch", (e) => {
    // console.log("strategy", getStrategyForRequest(e.request));
  const strategy = getStrategyForRequest(e.request);
  if (strategy === "DEFAULT") {
    actionForDefaultStrategy(e);
  }
  if (strategy === "CACHE_PREFERRED") {
    actionForCachePreferredStrategy(e);
  }
  if (strategy === "CACHE_EXCLUDED") {
    actionForCacheExcludedStrategy(e);
  }
});

// input is e.request, returns string of strategry CACHE_PREFERRED/CACHE_EXCLUDED/DEFAULT
function getStrategyForRequest(request) {
  //   console.log("request received to get strategy", request);
  //   console.log("request.url.includes(`.csv`)", request.url.includes(".csv"));
  //   console.log("request.url.includes(`.mp3`)", request.url.includes(".mp3"));

  // if url is ending with csv return CACHE_PREFERRED
  if (request.url.includes(".csv")) {
    STRATEGY = "CACHE_PREFERRED";
  }
  // IF url is ending with .mp3 return CACHE_EXCLUDED
  else if (request.url.includes(".mp3")) {
    STRATEGY = "CACHE_EXCLUDED";
  }
  // ELSE DEFAULT
  else {
    STRATEGY = "DEFAULT";
  }
//   console.log("STRATEGY", STRATEGY);
  return STRATEGY;
}

function actionForDefaultStrategy(e) {
//   console.log("actionForDefaultStrategy triggered");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
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
          return file;
        });
      })
  );
}
function actionForCachePreferredStrategy(e) {
//   console.log("actionForCachePreferredStrategy triggered");
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        // console.log("Cached response", res);
        return res;
      } else {
        // console.log("Network response", fetch(e.request));
        return fetch(e.request).then((res) => {
          const responseToBeCached = res.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(e.request, responseToBeCached));
            return res;
        });
      }
      
    })
  );
}
function actionForCacheExcludedStrategy(e) {
//   console.log("actionForCacheExcludedStrategy triggered");

  e.respondWith(
        fetch(e.request)
    )
    // console.log("fetch(e.request)", fetch(e.request));
}
