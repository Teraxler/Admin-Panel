import React from "react";
import { Link, useNavigate } from "react-router";
import { API_URL } from "@/constants";
import { useCookie } from "@/hooks/useCookie";

const ProfileDropDown = ({ user }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useCookie("userId");

  const logout = () => {
    setUserId(null);
    navigate("/auth/login");
  };

  return (
    <div className="group-hover:visible group-hover:opacity-100 group-active:visible group-active:opacity-100 invisible opacity-0 absolute top-full right-0 bg-white rounded-lg overflow-hidden z-20 w-50 shadow-sm text-sm transition duration-300 capitalize">
      <div className="flex items-center gap-x-2 p-2 m-1 cursor-default">
        <div className="shrink-0 size-5 lg:size-6 rounded-xs overflow-hidden">
          <img src={`${API_URL}/images/users/user-1.png`} alt="User Profile" />
        </div>
        <div>
          <span className="block">
            {user?.name} {user?.family}
          </span>
          <span className="block text-xs text-slate-grey lowercase">
            {user?.email}
          </span>
        </div>
      </div>
      <ul className="border-t border-black/15">
        <li>
          <Link
            className="flex gap-x-2 p-2 m-1 rounded-sm hover:bg-neutral-100 active:bg-neutral-200 transition"
            to={`/users/${userId}`}
          >
            <svg className="size-5">
              <use href="#user"></use>
            </svg>
            <span>View Profile</span>
          </Link>
        </li>
        <li>
          <Link className="flex gap-x-2 p-2 m-1 rounded-sm hover:bg-neutral-100 active:bg-neutral-200 transition">
            <svg className="size-5">
              <use href="#settings"></use>
            </svg>
            <span>Settings</span>
          </Link>
        </li>
        <div className="border-t border-black/15"></div>
        <li
          className="flex gap-x-2 p-2 m-1 rounded-sm text-red-600 hover:bg-red-600/10 active:bg-red-600/15 transition"
          onClick={logout}
        >
          <svg className="size-5">
            <use href="#log-out"></use>
          </svg>
          <span>Log out</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
