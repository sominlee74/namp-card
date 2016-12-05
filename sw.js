// service-worker.js

var CACHE_NAME = 'pwa-workshop.github.id-namp-card-cache-v1';
var urlsToCache = [
	'/',
	'/nampcard',
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			console.log(`Opened cache for nampcard ${new Date()}`);
			return cache.addAll(urlsToCache);
		})
	);
});
