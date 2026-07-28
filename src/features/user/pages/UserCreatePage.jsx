import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Head, Breadcrumb } from "@/components/ui";
import { UserForm } from "../components";
import { createUser } from "../index";

function UserCreatePage() {
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

export default UserCreatePage;
