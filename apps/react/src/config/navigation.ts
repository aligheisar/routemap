import { RouteMap } from "@route-map/react";
import { Home, LogIn, User } from "lucide-react";

const { getNavbarRoutes, getNavigationRoutes, getRoutes, getSidebarRoutes } =
  new RouteMap<"navbar" | "navigation" | "sidebar">()
    .add(["navbar", "navigation", "sidebar"], {
      href: "/",
      icon: Home,
      order: { navbar: 3, navigation: 2, sidebar: 0 },
      title: { navbar: "House", navigation: "Home", sidebar: "Main" },
    })
    .add(["navigation", "navbar"], {
      href: "/login",
      icon: LogIn,
      order: { navbar: 1, navigation: 999 },
      title: "Login",
      auth: "guest",
    })
    .add(["navigation", "navbar"], {
      href: "/profile",
      icon: User,
      order: { navbar: 1, navigation: 999 },
      title: "Profile",
      auth: "authenticated",
    })
    .build();

export { getNavbarRoutes, getNavigationRoutes, getRoutes, getSidebarRoutes };
