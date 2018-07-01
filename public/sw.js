const CACHE_STATIC_NAME = 'static-v12';
const CACHE_DYNAMIC_NAME = 'dynamic-v2';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.json',
  '/src/css/style.css',
  '/src/js/idb.js',
  '/src/js/indexedDB.js',
  '/src/js/main.js',
  'https://free.currencyconverterapi.com/api/v5/currencies',
  'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900'
];

self.addEventListener('install', function (event) {
  console.log('Installing service worker');
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        cache.addAll(STATIC_FILES);
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('Activating service worker');
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('Removing old caches', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(self.origin) === 0) {
    console.log('matched ', string);
    cachePath = string.substring(self.origin.length);
  } else {
    cachePath = string;
  }
  return array.indexOf(cachePath) > -1;
}

self.addEventListener('fetch', function (event) {
  event.respondWith(
		caches.match(event.request).then( response => {
			if(response){
				return response;
			}
			return fetch(event.request);
		})
	);
});