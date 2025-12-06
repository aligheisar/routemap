import {
  BaseNavItem,
  ResolvedNavItem,
  ResolvedChildNavItem,
} from "./types/nav-item";
import { BuiltNavigation } from "./types/navigation-generator";
import { capitalize } from "./utils/capitalize";
import { resolveItems } from "./utils/resolvers";

class RouteMap<Ctx extends string> {
  private items: BaseNavItem<readonly Ctx[]>[] = [];

  add<S extends readonly Ctx[]>(
    showIn: S,
    cfg: Omit<BaseNavItem<S>, "showIn">,
  ): this {
    this.items.push({
      ...cfg,
      showIn,
    });
    return this;
  }

  build(): BuiltNavigation<Ctx> {
    const allContexts = Array.from(
      new Set(this.items.flatMap((i) => i.showIn)),
    );

    const getRoutes = (
      context: Ctx,
      loggedIn: boolean,
    ): readonly ResolvedNavItem[] => {
      return resolveItems(this.items, context, loggedIn);
    };

    const api: Record<string, unknown> = { getRoutes };

    for (const ctx of allContexts) {
      const key = `get${capitalize(ctx)}Routes`;
      api[key] = (loggedIn: boolean) => getRoutes(ctx, loggedIn);
    }

    return api as BuiltNavigation<Ctx>;
  }
}

export {
  RouteMap,
  type ResolvedNavItem as RouteItemType,
  type ResolvedChildNavItem as ChildRouteItemType,
};
