import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";
import { Head, Breadcrumb, Loader } from "@/components/ui";
import { UserForm } from "@/features/user/components";
import { updateUser } from "@/features/user";
import { getAllUsers, getUser } from "@/features/user/userService";

export const getStaticPaths = async () => {
  const users = await getAllUsers();

  const paths = users.map((user) => ({
    params: { userId: user.userId },
  }));

  return { paths, fallback: true };
  // return { paths: [], fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const user = await getUser(params.userId);

  return {
    props: { user },
    revalidate: 60,
  };
};

function UserEditPage({ user }) {
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (user != null) return;

    toast.error("User ID is invalid!");
    router.push("/users");
  }, [user, router]);

  async function handleUpdateUser(user) {
    try {
      await updateUser(user, userId);

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

      <div>
        <h1 className="title">Edit User</h1>
        <Breadcrumb />
      </div>

      <UserForm user={user} onSubmit={handleUpdateUser} isEditMode />
    </>
  );
}

export default UserEditPage;
