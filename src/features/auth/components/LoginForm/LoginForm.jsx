import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { loginSchema } from "./loginFormValidation";

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("Admin@2020");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameInputRef = useRef(null);

  useEffect(() => usernameInputRef.current.focus(), []);

  async function handleLoginUser(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const user = {
      username,
      password,
    };

    const { success, error } = loginSchema.safeParse(user);

    if (success) await onSubmit(user);
    if (!success) toast.error(error.issues[0].message);

    setIsSubmitting(false);
  }

  return (
    <form
      className="w-132.5 max-h-screen bg-white p-2.5 px-9 py-10 mt-8 rounded-lg shadow text-sm font-medium"
      onSubmit={handleLoginUser}
    >
      <h2 className="text-2xl font-medium text-center mb-14">Log In Account</h2>

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
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn--small btn--secondary mt-6 mx-auto w-35"
        >
          {isSubmitting ? "Submitting" : "Log In"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
