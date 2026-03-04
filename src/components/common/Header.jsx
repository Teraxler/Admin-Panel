import { useContext } from "react";
import { API_URL } from "@/constants";
import AuthContext from "@/contexts/AuthContext";
import { useScroll } from "@/hooks/useScroll";
import ProfileDropDown from "@/components/ProfileDropDown/ProfileDropDown";
import Skeleton from "@/components/Skeleton/Skeleton";

function Header({ onClick }) {
  const { user, isUserLoaded } = useContext(AuthContext);
  const offset = useScroll();

  return (
    <header
      className={`flex justify-between py-3 px-4 sm:px-6 lg:px-8 sticky top-0 bg-white z-10 transition-shadow duration-75 ${
        offset > 0 ? "shadow-md" : ""
      }`}
    >
      <div
        className="btn btn--square btn--secondary xs:hidden"
        onClick={onClick}
      >
        <svg className="size-5 lg:size-6">
          <use href="#bars-3"></use>
        </svg>
      </div>
      <div className="flex gap-x-2 ml-auto">
        <div className="btn btn--square btn--secondary relative">
          <div className="absolute size-1.5 lg:size-2 rounded-full bg-racing-red right-2 top-2"></div>
          <svg className="size-5 lg:size-6">
            <use href="#bell"></use>
          </svg>
        </div>
        <div className="btn btn--square btn--secondary">
          <svg className="size-5 lg:size-6">
            <use href="#envelop"></use>
          </svg>
        </div>
        <div className="group relative btn btn--small btn--secondary justify-between max-lg:h-9 w-9 min-w-auto sm:w-50">
          <div className="flex items-center gap-x-2">
            <div className="shrink-0 rounded-xs overflow-hidden size-5 lg:size-6">
              {isUserLoaded ? (
                <img
                  src={`${API_URL}/images/users/user-1.png`}
                  alt="User Profile"
                />
              ) : (
                <Skeleton className={"rounded-xs"} />
              )}
            </div>
            {isUserLoaded ? (
              <span className="capitalize hidden sm:line-clamp-1">
                {`${user?.name} ${user?.family}`}
              </span>
            ) : (
              <Skeleton className="hidden sm:block w-22 h-3.5 rounded" />
            )}
          </div>
          <svg className="hidden sm:block sm:size-4 lg:size-5 shrink-0">
            <use href="#chevron-down"></use>
          </svg>
          <ProfileDropDown user={user} isUserLoaded={isUserLoaded} />
        </div>
      </div>
    </header>
  );
}

export default Header;
