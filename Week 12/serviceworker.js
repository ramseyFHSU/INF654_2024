// Import Firebase libraries using importScripts
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyCq_ss2DfJPgJxG096h7yYudgB_KcS4mvI",
  authDomain: "taskmanager-f8b23.firebaseapp.com",
  projectId: "taskmanager-f8b23",
  storageBucket: "taskmanager-f8b23.appspot.com",
  messagingSenderId: "1072082620996",
  appId: "1:1072082620996:web:70b432bb54f9979c4b2211",
  vapidKey:
    "BAYQsDeWodHVYFkcj6JUP1aZH6-iWXoghPhiJCD3y1RBTsoOA00V4M8tXULbCWZes8yCDnKVSFJKltPdrHrW00A",
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("[serviceworker.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/img/icons/icon-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// serviceworker.js
const CACHE_NAME = "task-manager-v5";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/profile.html",
  "/pages/auth.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/ui.js",
  "/img/icons/task.png",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching files...");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => console.error("Caching failed:", error))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Deleting old cache...");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") {
    // Only handle GET requests
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request)
            .then((networkResponse) => {
              return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
            })
            .catch((error) => {
              console.error("Network fetch failed:", error);
              // Optionally, return a fallback offline page if desired
            })
        );
      })
    );
  }
});

// Listen for messages from ui.js
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "FCM_TOKEN") {
    const fcmToken = event.data.token;
    console.log("Received FCM token in service worker:", fcmToken);
    // Here you might store or use the token as needed for push notifications
  }
});

// Display notification for background messages
self.addEventListener("push", (event) => {
  if (event.data) {
    const payload = event.data.json();
    const { title, body, icon } = payload.notification;
    const options = {
      body,
      icon: icon || "/img/icons/icon-192x192.png",
    };
    event.waitUntil(self.registration.showNotification(title, options));
  }
});
