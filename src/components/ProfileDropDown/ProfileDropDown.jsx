import { Link, useNavigate } from "react-router";
import { API_URL } from "@/constants";
import { useCookie } from "@/hooks/useCookie";
import Skeleton from "@/components/Skeleton/Skeleton";
import AlertModalWarning from "../AlertModalWarning";

const ProfileDropDown = ({ user, isUserLoaded }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useCookie("userId");

  const logoutUser = () => {
    setUserId(null);
    navigate("/auth/login");
  };

  return (
    <div className="group-hover:visible group-hover:opacity-100 group-active:visible group-active:opacity-100 invisible opacity-0 absolute top-full right-0 bg-white rounded-lg overflow-hidden z-20 w-50 shadow-sm text-sm transition duration-300 capitalize">
      <div className="flex items-center gap-x-2 p-2 m-1 cursor-default">
        <div className="shrink-0 size-5 lg:size-6 rounded-xs overflow-hidden">
          {isUserLoaded ? (
            <img
              src={`${API_URL}/images/users/user-1.png`}
              alt="User Profile"
            />
          ) : (
            <Skeleton className="rounded-xs" />
          )}
        </div>
        <div>
          {isUserLoaded ? (
            <>
              <span className="block">
                {user?.name} {user?.family}
              </span>
              <span className="block text-xs text-slate-grey lowercase">
                {user?.email}
              </span>
            </>
          ) : (
            <>
              <Skeleton className="w-20 h-3.5 ml-0" />
              <Skeleton className="w-25 h-3 ml-0 mt-1.75" />
            </>
          )}
        </div>
      </div>
      <ul className="border-t border-black/15">
        <li>
          <Link
            className="flex gap-x-2 p-2 m-1 rounded-lg hover:bg-neutral-100 active:bg-neutral-200 transition"
            to={`/myprofile`}
          >
            <svg className="size-5">
              <use href="#user"></use>
            </svg>
            <span>My Profile</span>
          </Link>
        </li>
        <li>
          <Link className="flex gap-x-2 p-2 m-1 rounded-lg hover:bg-neutral-100 active:bg-neutral-200 transition">
            <svg className="size-5">
              <use href="#settings"></use>
            </svg>
            <span>Settings</span>
          </Link>
        </li>
        <div className="border-t border-black/15"></div>
        <AlertModalWarning
          title={"Are you sure want to Logout?"}
          onConfirm={logoutUser}
          confirmLabel="Log out"
        >
          <li className="flex gap-x-2 p-2 m-1 rounded-lg text-red-600 hover:bg-red-600/10 active:bg-red-600/15 transition">
            <svg className="size-5">
              <use href="#log-out"></use>
            </svg>
            <span>Log out</span>
          </li>
        </AlertModalWarning>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
