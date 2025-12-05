import { BaseNavItem, ResolvedNavItem } from "./types/nav-item";
import { BuiltNavigation } from "./types/navigation-generator";
import { capitalize } from "./utils/capitalize";
import { resolveOrder, resolveTitle } from "./utils/resolvers";
import { authCheck } from "./utils/auth-check";

export const createNavigation = <const Ctx extends string>() => {
  type Contexts = readonly Ctx[];

  const items: BaseNavItem<Contexts>[] = [];

  const builder = {
    add<const S extends Contexts>(
      showIn: S,
      cfg: Omit<BaseNavItem<S>, "showIn">,
    ) {
      items.push({
        ...cfg,
        showIn,
      } as BaseNavItem<Contexts>);
      return builder;
    },

    build(): BuiltNavigation<Ctx> {
      const allContexts = Array.from(new Set(items.flatMap((i) => i.showIn)));

      const getRoutes = (
        context: Ctx,
        loggedIn: boolean,
      ): readonly ResolvedNavItem[] => {
        return items
          .filter((i) => {
            if (!i.showIn.includes(context)) return false;
            if (!authCheck(i.auth, loggedIn)) return false;
            return true;
          })
          .map<ResolvedNavItem>((i) => ({
            href: i.href,
            icon: i.icon,
            auth: i.auth,
            title: resolveTitle(i.title, context),
            order: resolveOrder(i.order, context),
          }))
          .sort((a, b) => a.order - b.order);
      };

      const api: Record<string, unknown> = {
        getRoutes,
      };

      for (const ctx of allContexts) {
        const key = `get${capitalize(ctx)}Routes`;
        api[key] = (loggedIn: boolean) => getRoutes(ctx, loggedIn);
      }

      return api as BuiltNavigation<Ctx>;
    },
  };

  return builder;
};
