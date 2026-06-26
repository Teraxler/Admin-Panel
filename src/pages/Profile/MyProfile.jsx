import { Activity, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import Head from "@/components/common/Head/Head";
import AuthContext from "@/contexts/AuthContext";
import Loader from "@/components/common/Loader/Loader";
import UserForm from "@/components/Forms/UserForm";

function MyProfile() {
  const { user, isUserLoaded, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function updateUser(user) {
    try {
      const response = await fetch(`${API_URL}/users/${user.userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(user),
      });

      if (!response.ok) throw await response.json();

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

      <UserForm user={user} onSubmit={updateUser} isEditMode />
    </>
  );
}

export default MyProfile;
