import { useRouter } from "next/router";
import { toast } from "sonner";
import { Head, Breadcrumb } from "@/components/ui";
import { createUser } from "@/features/user";
import { UserForm } from "@/features/user/components";
import { useStorageContext } from "@/context/StorageContext";

function UserCreatePage() {
  const storageContext = useStorageContext();
  const router = useRouter();

  async function handleCreateUser(user) {
    try {
      await createUser(storageContext, user);
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
