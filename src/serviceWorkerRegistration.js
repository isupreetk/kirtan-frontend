export function register() {
  if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/service-worker.js", { scope: '/' })
  .then((res) => {console.log("Service worker is successfully registered!")})
  .catch((err) => {console.log("Error while registering service worker", err)})
} else {
  console.log("Service worker is not supported by browser");
}
}