import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import Head from "@/components/common/Head/Head";
import Loader from "@/components/common/Loader/Loader";
import UserForm from "@/components/Forms/UserForm";

function UserEdit() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { data: user, isLoaded: isUserLoaded } = useFetch(
    `${API_URL}/users/${userId}`,
  );

  useEffect(() => {
    if (!isUserLoaded) return;

    if (user == null) {
      navigate("/users", {
        state: { message: "User ID is invalid!", messageType: "error" },
      });
    }
  }, [isUserLoaded]);

  async function updateUser(user) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(user),
      });

      if (!response.ok) throw await response.json();

      navigate("/users", {
        state: { message: "User updated successfully" },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (!isUserLoaded) return <Loader />;

  return (
    <>
      <Head>
        <title>Admin Panel - Edit User</title>
      </Head>

      <div>
        <h1 className="title">Edit User</h1>
        <Breadcrumb />
      </div>

      <UserForm user={user} onSubmit={updateUser} isEditMode />
    </>
  );
}

export default UserEdit;
