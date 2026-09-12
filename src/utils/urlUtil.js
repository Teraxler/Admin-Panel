import { breadcrumbs as routes } from "@/config/breadcrumbs";

const breadcrumbPath = (pathname) => {
  const breadcrumbs = [{ path: "/", label: routes["/"].label }];
  const segments = pathname.split("/").filter(Boolean);

  segments.forEach((_, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");

    const newBreadcrumb = {
      label: routes[path].label,
      path: path,
    };

    breadcrumbs.push(newBreadcrumb);
  });

  return breadcrumbs;
};

export { breadcrumbPath };
