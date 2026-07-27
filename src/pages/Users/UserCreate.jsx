import { useNavigate } from "react-router";
import { Head, Breadcrumb } from "@/components/ui";
import { UserForm } from "@/features/user";
import { createUser } from "@/services/userService";
import { toast } from "sonner";

function UserCreate() {
  const navigate = useNavigate();

  async function handleCreateUser(user) {
    try {
      await createUser(user);

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

      <UserForm onSubmit={handleCreateUser} />
    </>
  );
}

export default UserCreate;
