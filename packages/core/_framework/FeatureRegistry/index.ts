export interface LayoutConfig<T extends Object> {
  path: string;
  params?: T;
}

export class FeatureRegistry<R> {
  private routes: Array<LayoutConfig<any>> = [];
  register<T>(layoutConfig: LayoutConfig<T>, handler: (params: T) => R) {
    this.routes.push(layoutConfig);
  }
  getRoutes() {
    return this.routes;
  }
}
