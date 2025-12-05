# Routemap

Routemap is a small TypeScript utility that lets you define navigation
items for your React or Next.js app in one place. It generates helper
functions so you can easily render sidebars, menus, or dashboards based
on context and authentication state.

## Features

- Central navigation configuration.
- Context-aware titles and ordering.
- Authentication-based filtering.
- Fully typed and framework-agnostic.
- Simple add → build workflow.

## Basic Usage

```ts
import { createNavigation } from "@routemap/react";

const navigation = createNavigation<"navbar" | "sidebar">()
  .add(["navbar", "sidebar"], {
    href: "/",
    icon: Icon,
    title: { sidebar: "Main", navbar: "Home" },
    order: { navbar: 2, sidebar: 1 },
    // if you don't set auth property it show the route to authenticated and guest users
  })
  .add(["sidebar"], {
    href: "/login",
    icon: Icon,
    title: "Login",
    order: 2,
    auth: "guest", // Show only if user not logged in
  })
  .add(["sidebar"], {
    href: "/profile",
    icon: Icon,
    title: "Profile",
    order: 2,
    auth: "authenticated", // Show only if user logged in
  })
  .build();

// Generated helpers
const navbarRoutes = navigation.getNavbarRoutes(false); // Passing the login state of the user
const sidebarRoutes = navigation.getSidebarRoutes(true);
```

## How It Works

- `createNavigation()` creates a builder.
- `.add(showIn, item)` registers a navigation item.
- `.build()` generates a typed API with:
  - `getRoutes(context, loggedIn)`
  - `get<Context>Routes(loggedIn)`

## Rendering Example

```tsx
function Sidebar() {
  const currentUser = getCurrentUser();
  const routes = navigation.getDashboardRoutes(!!currentUser);

  return (
    <nav>
      {routes.map((route) => (
        <a key={route.href} href={route.href}>
          {route.title}
        </a>
      ))}
    </nav>
  );
}
```
