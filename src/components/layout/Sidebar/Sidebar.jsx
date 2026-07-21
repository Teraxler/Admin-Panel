import { NavLink } from "react-router";

function Sidebar({ isVisible, onClick }) {
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
        <li>
          <NavLink
            to="/"
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-x-2 p-3 rounded-lg ${
                isActive ? "bg-gunmental" : "hover:bg-gunmental transition"
              }`
            }
          >
            <svg className="size-5 lg:size-6 text-white">
              <use href="#home"></use>
            </svg>
            <span className="xs:hidden text-sm lg:text-base md:inline">
              Dashboard
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-x-2 p-3 rounded-lg ${
                isActive ? "bg-gunmental" : "hover:bg-gunmental transition"
              }`
            }
          >
            <svg className="size-5 lg:size-6 text-white">
              <use href="#users"></use>
            </svg>
            <span className="xs:hidden text-sm lg:text-base md:inline">
              Users
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-x-2 p-3 rounded-lg ${
                isActive ? "bg-gunmental" : "hover:bg-gunmental transition"
              }`
            }
          >
            <svg className="size-5 lg:size-6 text-white">
              <use href="#cube"></use>
            </svg>
            <span className="xs:hidden text-sm lg:text-base md:inline">
              Products
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-x-2 p-3 rounded-lg ${
                isActive ? "bg-gunmental" : "hover:bg-gunmental transition"
              }`
            }
          >
            <svg className="size-5 lg:size-6 text-white">
              <use href="#truck"></use>
            </svg>
            <span className="xs:hidden text-sm lg:text-base md:inline">
              Orders
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-x-2 p-3 rounded-lg ${
                isActive ? "bg-gunmental" : "hover:bg-gunmental transition"
              }`
            }
          >
            <svg className="size-5 lg:size-6 text-white">
              <use href="#squares-2x2"></use>
            </svg>
            <span className="xs:hidden text-sm lg:text-base md:inline">
              Categories
            </span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
