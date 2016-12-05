// service-worker.js

var CACHE_NAME = 'userid.github.id-namp-card-cache-v1';
var urlsToCache = [
	'/',
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			console.log('Opened cache for namp-card');
			return cache.addAll(urlsToCache);
		})
	);
});
