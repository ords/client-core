type EventObserver<T> = (e: CustomEvent<T>) => void;

type EventObserverMap<T> = {
  [K in keyof T]?: Array<EventObserver<T[K]>>;
};

export class EventHub<T extends object> {
  private listeners: EventObserverMap<T> = {};
  addEventListener<K extends string & keyof T>(
    key: K,
    listener: EventObserver<T[K]>
  ) {
    if (!(key in this.listeners)) {
      this.listeners[key] = [];
    }
    this.listeners[key]!.push(listener);
  }
  removeEventListener<K extends string & keyof T>(
    key: K,
    listener: EventObserver<T[K]>
  ) {
    const index = this.listeners[key]!.findIndex((e) => e === listener);
    this.listeners[key]!.splice(index, 1);
  }
  createAttachedListener<K extends string & keyof T>(
    key: K,
    listener: EventObserver<T[K]>
  ) {
    this.addEventListener(key, listener);
    return () => this.removeEventListener(key, listener);
  }
  dispatchEvent<K extends string & keyof T>(key: K, value: T[K]) {
    const event = new CustomEvent(key, {
      detail: value,
    });

    this.listeners[key]?.forEach((listener) => listener(event));
  }
}
