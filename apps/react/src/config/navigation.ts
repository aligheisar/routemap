import { RouteMap } from "@route-map/react";
import {
  Ban,
  Ellipsis,
  Home,
  Info,
  LogIn,
  Newspaper,
  ShoppingCart,
  Store,
  User,
  Users,
  Wallet,
} from "lucide-react";

const { getNavbarRoutes, getNavigationRoutes, getRoutes, getSidebarRoutes } =
  new RouteMap<"navbar" | "navigation" | "sidebar">()
    .add(["navbar", "navigation", "sidebar"], {
      href: "/",
      icon: Home,
      order: { navbar: 1, navigation: 1, sidebar: 0 },
      title: { navbar: "House", navigation: "Home", sidebar: "Main" },
    })
    .add(["sidebar", "navbar"], {
      href: "/wallet",
      icon: Wallet,
      order: 1,
      title: "Wallet",
      auth: "authenticated",
    })
    .add(["sidebar", "navbar"], {
      href: "/cart",
      icon: ShoppingCart,
      order: { navbar: 2, sidebar: 2 },
      title: "Cart",
      auth: "authenticated",
    })
    .add(["sidebar", "navigation", "navbar"], {
      href: "/products",
      icon: Store,
      order: { navigation: 0, navbar: 3, sidebar: 3 },
      title: "Products",
    })
    .add(["sidebar"], {
      href: "/blog",
      icon: Newspaper,
      order: 4,
      title: "Blog",
    })
    .add(["navigation", "navbar"], {
      href: "/login",
      icon: LogIn,
      order: { navbar: 0, navigation: 999 },
      title: "Login",
      auth: "guest",
    })
    .add(["navigation", "navbar"], {
      href: "/profile",
      icon: User,
      order: { navbar: 0, navigation: 999 },
      title: "Profile",
      auth: "authenticated",
    })
    .add(["navbar", "navigation"], {
      href: "#",
      icon: Ellipsis,
      order: { navbar: 999, navigation: 2 },
      title: "Other",
      children: [
        {
          href: "/about-us",
          auth: "authenticated",
          title: "About Us",
          icon: Info,
        },
        {
          href: "/contact-us",
          title: "Contact Us",
          icon: Users,
          children: [
            { href: "/test", title: "test", icon: Ban },
            { href: "teddd", title: "tddd", auth: "guest" },
          ],
        },
      ],
    })
    .build();

export { getNavbarRoutes, getNavigationRoutes, getRoutes, getSidebarRoutes };
