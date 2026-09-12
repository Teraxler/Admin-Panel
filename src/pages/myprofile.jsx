import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "sonner";
import { Head, Breadcrumb, Loader } from "@/components/ui";
import AuthContext from "@/context/AuthContext";
import { UserForm } from "@/features/user/components";
import { updateUser } from "@/features/user/index";

function UserProfilePage() {
  const { user, status, setUser } = useContext(AuthContext);
  const router = useRouter();

  async function handleUpdateUser(user) {
    try {
      await updateUser(user, user.userId);

      setUser((prevUser) => ({ ...prevUser, ...user }));

      toast.success("Your info updated successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (status === "idle" || status === "pending") return <Loader />;

  return (
    <>
      <Head>
        <title>Admin Panel - My Profile</title>
      </Head>

      <div>
        <h1 className="title">My Profile</h1>
        <Breadcrumb />
      </div>

      <UserForm user={user} onSubmit={handleUpdateUser} isEditMode />
    </>
  );
}

export default UserProfilePage;
