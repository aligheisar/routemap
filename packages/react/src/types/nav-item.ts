import { ComponentType } from "react";

type Auth = "authenticated" | "guest";
type Icon = ComponentType<{ className?: string }>;
type NavChildren = ChildNavItem[] | ComponentType;

type BaseNavItem<Ctx extends readonly string[]> = {
  href: string;
  icon: Icon;
  title: string | Record<Ctx[number], string>;
  order: number | Record<Ctx[number], number>;
  auth?: Auth;
  children?: NavChildren;
  showIn: Ctx;
};

type ChildNavItem = Pick<
  BaseNavItem<string[]>,
  "href" | "auth" | "children"
> & {
  title: string;
  icon?: Icon;
};

type ResolvedNavItem = {
  href: BaseNavItem<string[]>["href"];
  icon: Icon;
  title: string;
  children?: NavChildren;
};

type ResolvedChildNavItem = Pick<
  ChildNavItem,
  "children" | "href" | "icon" | "title"
>;

export type {
  BaseNavItem,
  ChildNavItem,
  ResolvedNavItem,
  ResolvedChildNavItem,
  Auth,
};
