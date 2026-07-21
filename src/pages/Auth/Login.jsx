import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { API_URL } from "@/constants";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useCookie } from "@/hooks/useCookie";
import Head from "@/components/ui/Head/Head";
import LoginForm from "@/features/auth/components/LoginForm/LoginForm";

function Login() {
  useToastMessage();
  const navigate = useNavigate();
  const [userId, setUserId] = useCookie("userId");

  async function loginUser(user) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Username or password is wrong!");

      const result = await response.json();
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

        <LoginForm onSubmit={loginUser} />
      </main>
    </>
  );
}

export default Login;
