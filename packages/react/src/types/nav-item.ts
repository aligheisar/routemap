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

type ChildNavItem = Pick<BaseNavItem<string[]>, "href" | "auth"> & {
  title: string;
  icon?: Icon;
  children?: NavChildren;
};

type ResolvedNavItem = {
  href: string;
  icon: Icon;
  title: string;
  order: number;
  children?: NavChildren;
};

export type { BaseNavItem, ResolvedNavItem, Auth };
