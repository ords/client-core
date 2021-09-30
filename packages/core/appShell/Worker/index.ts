// comlink inspired

type PromisifyProp<T> = T extends Promise<unknown> ? T : Promise<T>;
type PromisifyFunc<T> = T extends (...args: infer TArguments) => infer TReturn ? (...args: TArguments) => PromisifyProp<TReturn> : unknown

type Promisify<T> = T extends Function ? PromisifyFunc<T> : Promise<T>;

type ProxiedObject<T> = { [P in keyof T]: Promisify<T[P]> };

interface Demo {
  hello: string;
  demo(hello: string): boolean;
  hope(hello: string): Promise<string>;
}

type Test = ProxiedObject<Demo>;
