import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";
import { Head, Breadcrumb, Loader } from "@/components/ui";
import { UserForm } from "@/features/user/components";
import { updateUser } from "@/features/user";
import { useFetch } from "@/hooks/useFetch";
import { getUser } from "@/features/user/userService";
import { useStorageContext } from "@/context/StorageContext";

export default function UserEditPage() {
  const storageContext = useStorageContext();
  const router = useRouter();
  const { userId } = router.query;

  const { data: user, status: userStatus } = useFetch({
    fn: async () => await getUser(storageContext, userId),
    dependencies: [userId],
  });

  useEffect(() => {
    if (userStatus !== "failed") return;

    toast.error("User ID is invalid!");
    router.replace("/users");
  }, [userStatus, router]);

  async function handleUpdateUser(user) {
    try {
      await updateUser(storageContext, user, userId);

      toast.success("User updated successfully");
      router.push("/users");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Edit User</title>
      </Head>

      {["idle", "pending"].includes(userStatus) && <Loader />}

      {userStatus === "success" && (
        <>
          <div>
            <h1 className="title">Edit User</h1>
            <Breadcrumb />
          </div>

          <UserForm user={user} onSubmit={handleUpdateUser} isEditMode />
        </>
      )}
    </>
  );
}
