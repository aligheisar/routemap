import type { RouteItemType } from "@route-map/react";
import { ChildRouteItem } from "./ChildRouteItem";

const RouteItem = ({
  href,
  icon: Icon,
  title,
  children: Children,
}: RouteItemType) => {
  return (
    <a href={href}>
      <Icon />
      {title}
      {Children ? (
        typeof Children === "function" ? (
          <Children />
        ) : (
          <div style={{ background: "red", width: "fit-content" }}>
            {Children.map((item) => (
              <ChildRouteItem key={item.href} {...item} />
            ))}
          </div>
        )
      ) : null}
    </a>
  );
};

export { RouteItem };
