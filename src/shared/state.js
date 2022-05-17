const state = () => ({
  callbacks: {},
  on(key, cb) {
    if (!this.callbacks[key]) this.callbacks[key] = [];

    this.callbacks[key].push(cb);
  },
  send(key, message) {
    let cbs = this.callbacks[key];
    if (!cbs) return;
    cbs.forEach(cb => cb(message));
  },
});

export default state();
