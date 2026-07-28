import { useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useCookie } from "@/hooks/useCookie";
import { Head } from "@/components/ui";
import { LoginForm } from "../components";
import { loginUser } from "../index";

function LoginPage() {
  useToastMessage();
  const navigate = useNavigate();
  const [userId, setUserId] = useCookie("userId");

  async function handleLoginUser(user) {
    try {
      const result = await loginUser(user);

      setUserId(result.userId);

      navigate("/", {
        state: {
          message: "You logged in successfully",
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Login</title>
      </Head>
      <Toaster richColors position="top-right" />

      <main className="h-svh w-svw flex items-center justify-center bg-[#f4f4f4]">
        <div
          className={`-z-10 fixed inset-0 bg-coffee-shop bg-no-repeat bg-cover`}
        ></div>

        <LoginForm onSubmit={handleLoginUser} />
      </main>
    </>
  );
}

export default LoginPage;
