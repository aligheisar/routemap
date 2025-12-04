import type { ComponentType } from "react";

export type AuthRequirement = "user" | "guest";

export interface NavItem<Contexts extends string, Href = string> {
  title: string | Record<Contexts, string>;
  href?: Href;
  icon: ComponentType<{ className?: string }>;
  showIn: readonly Contexts[];
  order: Record<Contexts, number>;
  auth?: AuthRequirement;
  children?: ComponentType<any> | NavItem<Contexts, Href>[];
}

export function createNavigation<
  const Contexts extends string,
  Href = string,
>() {
  type Item = NavItem<Contexts, Href>;

  const items: Item[] = [];

  const builder = {
    add(title: string | Record<Contexts, string>, config: Omit<Item, "title">) {
      items.push({ title, ...config } as Item);
      return builder;
    },

    build() {
      const allContexts = [
        ...new Set(items.flatMap((i) => [...i.showIn])),
      ] as Contexts[];

      const cache = new Map<string, readonly Item[]>();

      const get = (context: Contexts, isLoggedIn: boolean): readonly Item[] => {
        const key = `${context}-${isLoggedIn}`;
        if (cache.has(key)) return cache.get(key)!;

        const result = items
          .filter((item) => item.showIn.includes(context))
          .filter((item) => {
            if (!item.auth) return true;
            return item.auth === "user" ? isLoggedIn : !isLoggedIn;
          })
          .sort((a, b) => a.order[context] - b.order[context]);

        const frozen = Object.freeze(result);
        cache.set(key, frozen);
        return frozen;
      };

      const handler: ProxyHandler<any> = {
        get(_, prop: string) {
          if (prop === "get") return get;

          const ctx = allContexts.find(
            (c) => prop === c || prop === `${c}User` || prop === `${c}Guest`,
          );
          if (!ctx) return undefined;

          if (prop === ctx) return (loggedIn: boolean) => get(ctx, loggedIn);
          if (prop === `${ctx}User`) return () => get(ctx, true);
          if (prop === `${ctx}Guest`) return () => get(ctx, false);
        },
      };

      return new Proxy({ get }, handler) as any;
    },
  };

  return builder;
}
