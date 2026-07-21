import { useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { Head, Breadcrumb } from "@/components/ui";
import { UserForm } from "@/features/user";

function UserCreate() {
  const navigate = useNavigate();

  async function createUser(user) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });

      if (!response.ok) throw await response.json();

      navigate("/users", {
        state: { message: "User created successfully" },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Create User</title>
      </Head>

      <div>
        <h1 className="title">Create User</h1>
        <Breadcrumb />
      </div>

      <UserForm onSubmit={createUser} />
    </>
  );
}

export default UserCreate;
