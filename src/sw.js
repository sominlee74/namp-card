// sw.js

var CACHE_NAME = 'pwa-workshop.github.id-namp-card-cache-v1';
var urlsToCache = [
	'/namp-card'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			console.log(`Opened cache for namp-card ${new Date()}`);
			return cache.addAll(urlsToCache);
		})
	);
});
