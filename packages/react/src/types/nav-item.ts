import { ComponentType } from "react";

type Auth = "authenticated" | "guest";
type Icon = ComponentType<{ className?: string }>;

type BaseNavItem<Ctx extends readonly string[]> = {
  href: string;
  icon: Icon;
  title: string | Record<Ctx[number], string>;
  order: number | Record<Ctx[number], number>;
  auth?: Auth;
  showIn: Ctx;
};

type ResolvedNavItem = {
  href: string;
  icon: Icon;
  title: string;
  order: number;
};

export type { BaseNavItem, ResolvedNavItem, Auth };
