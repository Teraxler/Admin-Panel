import Link from "next/link";
import { useRouter } from "next/router";

const sidebarLinks = [
  {
    label: "Dashboard",
    icon: "home",
    pathname: "/",
  },
  {
    label: "Users",
    icon: "users",
    pathname: "/users",
  },
  {
    label: "Products",
    icon: "cube",
    pathname: "/products",
  },
  {
    label: "Orders",
    icon: "truck",
    pathname: "/orders",
  },
  {
    label: "Categories",
    icon: "squares",
    pathname: "/categories",
  },
];

function Sidebar({ isVisible, onClick }) {
  const { pathname } = useRouter();

  return (
    <aside
      className={`max-w-60 shrink-0 -left-41 top-9 xs:top-0 fixed xs:sticky bottom-0 h-dvh  text-white text-sm font-medium uppercase bg-carbon-black px-3 md:px-5 lg:px-8 pt-9.5 md:pt-3 pb-3 transition-all duration-200 z-10 ${
        isVisible ? "left-0" : "-left-41"
      }`}
    >
      <span className="font-bold text-lg lg:text-xl hidden md:inline">
        Brand.
      </span>

      <ul className="flex flex-col gap-y-2 mt-3">
        {sidebarLinks.map((sidebarLink) => (
          <li key={sidebarLink.label}>
            <Link
              href={`${sidebarLink.pathname}`}
              onClick={onClick}
              aria-label={`${sidebarLink.label} page`}
              className={`flex items-center gap-x-2 p-3 rounded-lg ${
                sidebarLink.pathname === pathname
                  ? "bg-gunmental"
                  : "hover:bg-gunmental transition"
              }`}
            >
              <svg className="size-5 lg:size-6 text-white">
                <use href={`#${sidebarLink.icon}`}></use>
              </svg>
              <span className="xs:hidden text-sm lg:text-base md:inline">
                {sidebarLink.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
