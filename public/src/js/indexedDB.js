
var dbPromise = idb.open('currency-database', 1, function(db) {
  if(!db.objectStoreNames.contains('currency')) {
    var store = db.createObjectStore('currency', {keyPath: ('title')});
  }
  store.createIndex('by-date', 'publishedAt')
})

function writeData(st, data) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      data.articles.forEach(function(article) {
        store.put(article);
      });
      return tx.complete;
    });
}

function readAllData(st) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st).index('by-date');
      return store.getAll();
    });
}

function clearAllData(st) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.clear();
      return tx.complete;
    });
}