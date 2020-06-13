export class Event {
  subscribers = [];

  constructor(name) {
    this.name = name;
  }

  fire(...args) {
    this.subscribers.forEach(cb => cb(...args));
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(x => x !== callback);
  }
}
