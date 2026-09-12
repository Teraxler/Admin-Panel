import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "sonner";
import { Head } from "@/components/ui";
import { LoginForm } from "@/features/auth/components";
import AuthContext from "@/context/AuthContext";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  async function handleLoginUser(user) {
    try {
      await login(user);

      toast.success("You logged in successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Login</title>
      </Head>

      <main className="h-svh w-svw flex items-center justify-center bg-[#f4f4f4]">
        <div
          className={`-z-10 fixed inset-0 bg-coffee-shop bg-no-repeat bg-cover`}
        ></div>

        <LoginForm onSubmit={handleLoginUser} />
      </main>
    </>
  );
}

LoginPage.getLayout = function Layout(page) {
  return <>{page}</>;
};

export default LoginPage;
