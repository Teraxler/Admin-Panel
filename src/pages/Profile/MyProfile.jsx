import { useContext } from "react";
import { useNavigate } from "react-router";
import { Head, Breadcrumb, Loader } from "@/components/ui";
import { AuthContext } from "@/features/auth";
import { UserForm } from "@/features/user";
import { updateUser } from "@/services/userService";
import { toast } from "sonner";

function MyProfile() {
  const { user, isUserLoaded, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleUpdateUser(user) {
    try {
      await updateUser(user, user.userId);

      setUser((prevUser) => ({ ...prevUser, ...user }));

      navigate("/", {
        state: { message: "Your info updated successfully" },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (!isUserLoaded) return <Loader />;

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

export default MyProfile;
