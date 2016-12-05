// service-worker.js

var CACHE_NAME = 'userid.github.id-cache-v1';
var urlsToCache = [
	'/',
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
});
