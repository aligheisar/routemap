import { ComponentType } from "react";

type Auth = "authenticated" | "guest";

type BaseNavItem<Ctx extends readonly string[]> = {
  href: string;
  icon?: ComponentType;
  title: string | Record<Ctx[number], string>;
  order?: number | Record<Ctx[number], number>;
  auth?: Auth;
  showIn: Ctx;
};

type ResolvedNavItem = {
  href: string;
  icon?: ComponentType;
  title: string;
  order: number;
  auth?: Auth;
};

export type { BaseNavItem, ResolvedNavItem, Auth };
