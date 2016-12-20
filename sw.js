// sw.js

//var CACHE_NAME = 'pwa-workshop.github.id-namp-card-cache-v1';
var CACHE_NAME = 'myCache-Simon.id-namp-card-cache-v1';
var urlsToCache = [
	'/namp-card',
	'/index.html',
	'/manifest.json',
	'/user.png'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			console.log(`Opened cache for namp-card ${new Date()}`);
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.waitUntil(
		caches.match(event.request.url).then(function(res) {
			return res || fetch(event.request.url);
		})
	);
});
