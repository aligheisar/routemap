import type { ChildRouteItemType } from "@route-map/react";

const ChildRouteItem = ({
  href,
  title,
  children: Children,
  icon: Icon,
}: ChildRouteItemType) => {
  return (
    <div data-href={href}>
      {Icon && <Icon />}
      {title}
      {Children ? (
        typeof Children === "function" ? (
          <Children />
        ) : (
          <div style={{ background: "cyan" }}>
            {Children.map((item: ChildRouteItemType) => (
              <ChildRouteItem key={item.href} {...item} />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

export { ChildRouteItem };
