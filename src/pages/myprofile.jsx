import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "sonner";
import { Head, Breadcrumb, Loader } from "@/components/ui";
import { useAuthContext } from "@/context/AuthContext";
import { UserForm } from "@/features/user/components";
import { updateUser } from "@/features/user/index";
import { useStorageContext } from "@/context/StorageContext";

function UserProfilePage() {
  const storageContext = useStorageContext();
  const { user, status: userStatus, setUser } = useAuthContext();
  const router = useRouter();

  async function handleUpdateUser(user) {
    try {
      await updateUser(storageContext, user, user.userId);

      setUser((prevUser) => ({ ...prevUser, ...user }));

      toast.success("Your info updated successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - My Profile</title>
      </Head>

      {["idle", "pending"].includes(userStatus) && <Loader />}

      {userStatus === "success" && (
        <>
          <div>
            <h1 className="title">My Profile</h1>
            <Breadcrumb />
          </div>

          <UserForm user={user} onSubmit={handleUpdateUser} isEditMode />
        </>
      )}
    </>
  );
}

export default UserProfilePage;
