import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { toast } from "sonner";
import { BASE_URL } from "@/constants";
import { Skeleton, AlertModalWarning } from "@/components/ui";
import AuthContext from "@/context/AuthContext";

const ProfileDropDown = ({ user, isUserLoaded, isVisible = true }) => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("You logout successfully");
    router.push("/auth/login");
  };

  return (
    <div
      role="Dropdown"
      className={`${isVisible ? "visible opacity-100" : "invisible opacity-0"} xs:group-hover:visible xs:group-hover:opacity-100 absolute top-[calc(100%+2px)] right-0 bg-white rounded-lg overflow-hidden z-20 w-50 shadow-sm text-sm transition duration-300 capitalize`}
    >
      <div className="flex items-center gap-x-2 p-2 m-1 cursor-default">
        <div className="shrink-0 size-5 lg:size-6 rounded-xs overflow-hidden">
          {isUserLoaded ? (
            <Image
              src={`${BASE_URL}/images/users/user-1.png`}
              alt="User Profile"
              width={24}
              height={24}
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
            href={`/myprofile`}
          >
            <svg className="size-5">
              <use href="#user"></use>
            </svg>
            <span>My Profile</span>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="flex gap-x-2 p-2 m-1 rounded-lg hover:bg-neutral-100 active:bg-neutral-200 transition"
          >
            <svg className="size-5">
              <use href="#settings"></use>
            </svg>
            <span>Settings</span>
          </Link>
        </li>
        <div className="border-t border-black/15"></div>
        <AlertModalWarning
          title={"Are you sure want to Logout?"}
          onConfirm={handleLogout}
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
