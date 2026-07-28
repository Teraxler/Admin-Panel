import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { API_URL } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { Head, Breadcrumb, Loader } from "@/components/ui";
import { UserForm } from "@/features/user/components";
import { updateUser } from "@/features/user";

function UserEditPage() {
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

  async function handleUpdateUser(user) {
    const result = await updateUser(user, userId);

    result &&
      navigate("/users", {
        state: { message: "User updated successfully" },
      });
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

      <UserForm user={user} onSubmit={handleUpdateUser} isEditMode />
    </>
  );
}

export default UserEditPage;
