import {
  BaseNavItem,
  ChildNavItem,
  ResolvedChildNavItem,
  ResolvedNavItem,
} from "../types/nav-item";
import { authCheck } from "./auth-check";

const resolveTitle = <T extends string>(
  value: string | Record<T, string>,
  context: T,
): string => {
  if (typeof value === "string") return value;
  return value[context];
};

const resolveOrder = <T extends string>(
  value: number | Record<T, number>,
  context: T,
): number => {
  if (typeof value === "number") return value;
  return value[context];
};

const resolveChildNavItem = (
  item: ChildNavItem[],
  loggedIn: boolean,
): ResolvedChildNavItem[] => {
  return item
    .filter((i) => authCheck(i.auth, loggedIn))
    .map<ResolvedChildNavItem>((i) => ({
      href: i.href,
      icon: i.icon,
      title: i.title,
      children: i.children
        ? typeof i.children === "function"
          ? i.children
          : resolveChildNavItem(i.children, loggedIn)
        : undefined,
    }));
};

const resolveItems = <Ctx extends string>(
  items: BaseNavItem<readonly Ctx[]>[],
  context: Ctx,
  loggedIn: boolean,
) => {
  return items
    .filter((i) => i.showIn.includes(context) && authCheck(i.auth, loggedIn))
    .sort(
      (a, b) => resolveOrder(a.order, context) - resolveOrder(b.order, context),
    )
    .map<ResolvedNavItem>((i) => ({
      href: i.href,
      icon: i.icon,
      title: resolveTitle(i.title, context),
      children: i.children
        ? typeof i.children === "function"
          ? i.children
          : resolveChildNavItem(i.children, loggedIn)
        : undefined,
    }));
};

export { resolveItems };
