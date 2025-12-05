import type { ComponentType } from "react";

export type AuthRequirement = "authenticated" | "guest";

type ExactKeys<T extends readonly string[], V> = {
  [K in T[number]]: V;
};

// Allow string/number OR object with EXACT keys from showIn
type UniversalOrExact<T extends readonly string[], V> = V | ExactKeys<T, V>;

export interface NavItem<Contexts extends readonly string[], Href = string> {
  title: UniversalOrExact<Contexts, string>;
  href: Href;
  icon: ComponentType<{ className?: string }>;
  showIn: Contexts;
  order: UniversalOrExact<Contexts, number>;
  auth?: AuthRequirement;
  children?: ComponentType<any> | NavItem<any, any>[];
}

// Return type
type BuiltNavigation<Contexts extends string> = {
  get(context: Contexts, loggedIn: boolean): readonly NavItem<any, any>[];
} & Record<
  `${Contexts}${"" | "Authenticated" | "Guest"}`,
  (loggedIn?: boolean) => readonly NavItem<any, any>[]
>;

export function createNavigation<const Contexts extends string>() {
  const items: NavItem<readonly string[], any>[] = [];

  const builder = {
    add<const C extends readonly Contexts[]>(
      showIn: C,
      title: C extends readonly [infer Single]
        ? string | { [K in Single & string]: string }
        : string | { [K in C[number]]: string },
      config: {
        href?: any;
        icon: ComponentType<{ className?: string }>;
        order?: C extends readonly [infer Single]
          ? number | { [K in Single & string]: number }
          : number | { [K in C[number]]: number };
        auth?: AuthRequirement;
        children?: ComponentType<any> | NavItem<any, any>[];
      },
    ) {
      items.push({
        title: title as any,
        href: config.href,
        icon: config.icon,
        showIn,
        order: (config.order ?? 0) as any,
        auth: config.auth,
        children: config.children,
      });

      return builder;
    },

    build(): BuiltNavigation<Contexts> {
      const allContexts = [
        ...new Set(items.flatMap((i) => [...i.showIn])),
      ] as Contexts[];

      const cache = new Map<string, readonly NavItem<any, any>[]>();

      const getRoutes = (context: Contexts, loggedIn: boolean) => {
        const key = `${context}-${loggedIn}`;
        const cached = cache.get(key);
        if (cached) return cached;

        const result = items
          .filter((item) => {
            if (!item.showIn.includes(context)) return false;
            if (!item.auth) return true;
            return item.auth === "authenticated" ? loggedIn : !loggedIn;
          })
          .sort((a, b) => {
            const aOrder =
              typeof a.order === "number" ? a.order : a.order[context];
            const bOrder =
              typeof b.order === "number" ? b.order : b.order[context];
            return aOrder - bOrder;
          });

        const frozen = Object.freeze(result);
        cache.set(key, frozen);
        return frozen;
      };

      return new Proxy(
        { getRoutes },
        {
          get(_target, prop: string | symbol) {
            if (typeof prop !== "string") return;
            if (prop === "getRoutes") return getRoutes;

            const match = allContexts.find(
              (c) => prop === `get${capitalize(c)}Routes`,
            );
            if (!match) return;

            return (loggedIn: boolean) => getRoutes(match, loggedIn);
          },
        },
      ) as BuiltNavigation<Contexts>;
    },
  };

  return builder;
}
