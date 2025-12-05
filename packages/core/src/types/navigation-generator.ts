import { ResolvedNavItem } from "./nav-item";

type BuiltNavigation<AllCtx extends string> = {
  getRoutes: (context: AllCtx, loggedIn: boolean) => readonly ResolvedNavItem[];
} & {
  [K in Capitalize<AllCtx> as `get${K}Routes`]: (
    loggedIn: boolean,
  ) => readonly ResolvedNavItem[];
};

export type { BuiltNavigation };
