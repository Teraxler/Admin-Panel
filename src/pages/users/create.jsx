import { useRouter } from "next/router";
import { toast } from "sonner";
import { Head, Breadcrumb } from "@/components/ui";
import { createUser } from "@/features/user";
import { UserForm } from "@/features/user/components";

function UserCreatePage() {
  const router = useRouter();

  async function handleCreateUser(user) {
    try {
      await createUser(user);
      toast.success("User created successfully");
      router.push("/users");
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
