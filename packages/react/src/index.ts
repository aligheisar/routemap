import { BaseNavItem, ResolvedNavItem } from "./types/nav-item";
import { BuiltNavigation } from "./types/navigation-generator";
import { capitalize } from "./utils/capitalize";
import { resolveOrder, resolveTitle } from "./utils/resolvers";
import { authCheck } from "./utils/auth-check";

export class RouteMap<Ctx extends string> {
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
      return this.items
        .filter(
          (i) => i.showIn.includes(context) && authCheck(i.auth, loggedIn),
        )
        .map<ResolvedNavItem>((i) => ({
          href: i.href,
          icon: i.icon,
          title: resolveTitle(i.title, context),
          order: resolveOrder(i.order, context),
        }))
        .sort((a, b) => a.order - b.order);
    };

    const api: Record<string, unknown> = { getRoutes };

    for (const ctx of allContexts) {
      const key = `get${capitalize(ctx)}Routes`;
      api[key] = (loggedIn: boolean) => getRoutes(ctx, loggedIn);
    }

    return api as BuiltNavigation<Ctx>;
  }
}

export default RouteMap;
