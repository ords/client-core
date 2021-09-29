import { createBrowserHistory } from "history";
import pathToRegexp from "path-to-regexp";

export const history = createBrowserHistory();

export interface LayoutConfig<T> {
  path: string;
  params?: T;
}

export type LayoutParams<T> = T extends LayoutConfig<infer R> ? R : T;

export interface NavigationOptions {
  root?: string;
}

interface RootReference {
  title: string;
  historyStackReference?: number;
}

let root: RootReference = {
  title: "",
};

let historyStackLength = 0;

history.listen(function trackRoot(update) {
  switch (update.action) {
    case "PUSH":
      root.historyStackReference--;
      historyStackLength++;
      break;
    case "POP": {
      root.historyStackReference++;
      historyStackLength--;
      break;
    }
    default:
  }
});

export function pushNavigate<T extends LayoutConfig<any>>(
  feature: T,
  params: LayoutParams<T>,
  options?: NavigationOptions
) {
  const { _unsafe, ...safeParams } = params;

  const url = pathToRegexp.compile(feature.path)(safeParams);

  if (options?.root) {
    root = {
      title: options.root,
      // 1 as it will instantly be changed to 0 by listener
      historyStackReference: 1,
    };
  }

  history.push(url, _unsafe);
}

export function navigateBack<T extends LayoutConfig<any>>(
  feature: T,
  params: LayoutParams<T>
) {
  return function navigate() {
    const inAppReferrer = document.referrer === location.hostname;

    if (inAppReferrer && historyStackLength) {
      history.back();
    } else {
      const { _unsafe, ...safeParams } = params;
      const url = pathToRegexp.compile(feature.path)(safeParams);
      history.replace(url, _unsafe);
    }
  };
}

export function navigateRoot<T extends LayoutConfig<any>>(
  feature: T,
  params: LayoutParams<T>
) {
  return function navigate() {
    if (root.historyStackReference !== undefined) {
      history.go(root.historyStackReference);
    } else {
      const { _unsafe, ...safeParams } = params;
      const url = pathToRegexp.compile(feature.path)(safeParams);
      history.replace(url, _unsafe);
    }
  };
}
