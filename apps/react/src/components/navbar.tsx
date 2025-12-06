import { useState } from "react";
import { getNavbarRoutes } from "../config/navigation";
import { RouteItem } from "./route-item/RouteItem";

const Navbar = () => {
  return (
    <nav>
      <NavbarItems />
    </nav>
  );
};

const NavbarItems = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const routes = getNavbarRoutes(isLoggedIn);

  return (
    <section>
      <button onClick={() => setIsLoggedIn((prev) => !prev)}></button>
      {routes.map((item) => (
        <RouteItem key={item.href} {...item} />
      ))}
    </section>
  );
};

export { Navbar };
