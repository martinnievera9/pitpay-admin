const polyfill = {
  data: {},
  getItem(key) {
    return this.data[key];
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  },
  clear() {
    this.data = {};
  }
};

var storage = polyfill;

try {
  localStorage.setItem('test', true);
  localStorage.removeItem('test');
  storage = localStorage;
} catch (e) {
  try {
    sessionStorage.setItem('test', true);
    sessionStorage.removeItem('test');
    storage = sessionStorage;
  } catch (e) {
    storage = polyfill;
  }
}

export default {
  get(key, defaultValue) {
    try {
      return JSON.parse(storage.getItem(key)) || defaultValue;
    } catch (e) {
      return storage.getItem(key) || defaultValue;
    }
  },
  removeItem(key) {
    storage.removeItem(key);
  },
  set(key, value) {
    return storage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value
    );
  },
  clear() {
    let cartId = storage.getItem('cartId') || '';
    let authLink = storage.getItem('auth-link') || '';
    let viewedHome = storage.getItem('viewed-home') || '';

    storage.clear();

    storage.setItem('cartId', cartId);
    storage.setItem('viewed-home', viewedHome);
    storage.setItem('auth-link', authLink);
  },
  clearUser() {
    storage.setItem('user', '');
    storage.setItem('token', '');
  }
};
