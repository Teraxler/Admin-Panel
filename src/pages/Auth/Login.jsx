import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { API_URL } from "@/constants";
import { loginSchema } from "@/../validators/authValidator";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useCookie } from "@/hooks/useCookie";
import Head from "@/components/common/Head";

function Login() {
  useToastMessage();
  const navigate = useNavigate();
  const [userId, setUserId] = useCookie("userId");
  const usernameInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => usernameInputRef.current.focus(), []);

  async function login(user) {
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
          messageType: "success",
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  function loginHandler(e) {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    const { success, error } = loginSchema.safeParse(user);

    if (success) return login(user);

    toast.error(error.issues[0].message);
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

        <form
          className="w-132.5 max-h-screen bg-white p-2.5 px-9 py-10 mt-8 rounded-lg shadow text-sm font-medium"
          onSubmit={loginHandler}
        >
          <h2 className="text-2xl font-medium text-center mb-14">
            Log In Account
          </h2>

          <div className="flex flex-col gap-y-6">
            <div className="">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="input"
                ref={usernameInputRef}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn--small btn--secondary mt-6 mx-auto w-35">
              Log In
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Login;
