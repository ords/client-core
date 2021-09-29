type GuardedPromise = () => Promise<any>;

class GuardError extends Error {
  public type: "UNAUTHENTICATED" | "ONBOARDING_REQUIRED";
  constructor(message: string) {
    super(message);
  }
}

interface LazyLoad {
  (): Promise<any>;
}

export const routes = [];

export function registerFeature(paths: Array<string>, lazyLoad: LazyLoad) {
  
}

export function guardOnboarded(guardedPromise: GuardedPromise) {
  // lookup
  Promise.resolve()
    .then(guardedPromise)
    .catch((e: GuardError) => {});
}
