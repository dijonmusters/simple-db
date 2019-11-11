const getDb = collection => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(collection, 1);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      let store;

      if (!db.objectStoreNames.contains(collection)) {
        store = db.createObjectStore(collection, { autoIncrement: true });
      }

      if (!store.indexNames.contains('key')) {
        store.createIndex('key', 'key', { unique: true });
      }

      if (!store.indexNames.contains('timestamp')) {
        store.createIndex('timestamp', 'timestamp');
      }
    }

    request.onsuccess = event => {
      const db = event.target.result;
      resolve(db);
    }

    request.onerror = event => {
      reject(`Error opening database ${event.target.errorCode}`);
    }
  });
}

const getStore = async (collection, accessLevel = 'readonly') => {
  const db = await getDb(collection);
  const transaction = db.transaction([collection], accessLevel);
  const store = transaction.objectStore(collection);
  return { store };
}

const getFromStore = (store, key) => new Promise((resolve, reject) => {
  if (key) {
    const index = store.index('key');
    const reqItem = index.get(key);
    reqItem.onsuccess = event => {
      const item = event.target.result;
      item ? resolve(item.data) : resolve(null);
    }
    reqItem.onerror = event => {
      reject(`Failed to get ${key} from store: ${event.target.errorCode}`);
    }
  } else {
    const results = [];
    const requestAll = store.openCursor();

    requestAll.onsuccess = event => {
      const cursor = event.target.result;
      if (cursor) {
        const { data } = cursor.value;
        results.push(data);
        cursor.continue();
      } else {
        resolve(results);
      }
    }

    requestAll.onerror = event => {
      reject(`Failed to get results from store: ${event.target.errorCode}`);
    }
  }
});

const removeFromStore = (store, key) => new Promise(async(resolve, reject) => {
  const index = key && store.index('key');
  if (index) {
    const reqId = index.getKey(key);

    reqId.onsuccess = event => {
      const id = reqId.result;
      if (id) {
        const reqDelete = store.delete(id);

        reqDelete.onsuccess = event => {
          resolve(`Removed ${key} from store`);
        }

        reqDelete.onerror = event => {
          reject(`Failed to remove ${key} from store: ${event.target.errorCode}`);
        }
      } else {
        resolve(`${key} does not exist in store`)
      }
    }
  } else {
    reject('Cannot remove from store without key');
  }
});

const setToStore = (store, obj) => new Promise(async (resolve, reject) => {
  const reqAdd = store.add(obj);

  reqAdd.onsuccess = () => {
    resolve(`Saved to store`);
  }

  reqAdd.onerror = event => {
    reject(`Error saving to store: ${event.target.errorCode}`);
  }
});

const clearStore = store => new Promise(async (resolve, reject) => {
  const reqClear = store.clear();

  reqClear.onsuccess = () => {
    resolve(`Cleared store`);
  }

  reqClear.onerror = event => {
    reject(`Error clearing store: ${event.target.errorCode}`);
  }
});

const get = async (collection, key) => {
  const { store } = await getStore(collection);
  return getFromStore(store, key);
}

const remove = async (collection, key) => {
  const { store } = await getStore(collection, 'readwrite');
  return removeFromStore(store, key);
}

const set = async (collection, key, data) => {
  const { store } = await getStore(collection, 'readwrite');
  const exists = await getFromStore(store, key);

  if (exists) {
    await removeFromStore(store, key);
  }

  const obj = {
    key,
    data,
    timestamp: Date.now()
  };

  return setToStore(store, obj)
}

const clear = async collection => {
  const { store } = await getStore(collection, 'readwrite');
  return clearStore(store)
}

export {
  get,
  set,
  clear,
  remove
}