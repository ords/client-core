type Observer<T> = (value: T) => void;

type ObserverMap<T> = {
  [K in keyof T]?: Array<Observer<T[K]>>;
};

export class ObservableState<T extends object> {
  private listeners: ObserverMap<T> = {};
  constructor(public value: Readonly<T>) {}
  public addEventListener<K extends string & keyof T>(
    key: K,
    listner: Observer<T[K]>
  ) {
    if (!(key in this.listeners)) {
      this.listeners[key] = [];
    }
    this.listeners[key]!.push(listner);
  }
  public removeEventListener<K extends string & keyof T>(
    key: K,
    listner: Observer<T[K]>
  ) {
    const index = this.listeners[key]!.findIndex((e) => e === listner);
    this.listeners[key]!.splice(index, 1);
  }
  mutate<K extends string & keyof T>(key: K, value: T[K]) {
    this.value = { ...this.value, [key]: value };
    this.listeners[key]?.forEach((listener) => listener(this.value[key]));
  }
  mutateSet(valueSet: Partial<T>) {
    this.value = { ...this.value, ...valueSet };
    for (let key of Object.keys(valueSet)) {
      this.listeners[key]?.forEach((listener) => listener(this.value[key]));
    }
  }
}
