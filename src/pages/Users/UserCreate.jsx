import { useReducer } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { registerSchema } from "@/../validators/authValidator";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import Head from "@/components/common/Head/Head";
import userReducer from "@/reducers/user";
import {
  NAME,
  FAMILY,
  USERNAME,
  EMAIL,
  PHONE,
  BIRTHDAY,
  PASSWORD,
} from "../../actions/user";

function UserCreate() {
  const navigate = useNavigate();

  const [user, dispatch] = useReducer(userReducer, {
    name: "",
    family: "",
    username: "",
    phone: "",
    email: "",
    birthday: "",
    password: "",
  });

  function handleCreateUser(e) {
    e.preventDefault();

    const newUser = {
      ...user,
      phone: user.phone || null,
      birthday: user.birthday || null,
    };

    const { success, error } = registerSchema.safeParse(newUser);

    if (success) return createUser(newUser);

    toast.error(error.issues[0].message);
  }

  async function createUser(user) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });

      if (!response.ok) throw await response.json();

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

      <form
        className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-lg shadow text-sm font-medium"
        onSubmit={handleCreateUser}
      >
        <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 leading-6">
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="name">First Name</label>
              <input
                id="name"
                type="text"
                placeholder="John"
                className="input"
                value={user.name}
                onChange={(e) =>
                  dispatch({ type: NAME, payload: e.target.value })
                }
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="family">Last Name</label>
              <input
                id="family"
                type="text"
                placeholder="Francisco"
                className="input"
                value={user.family}
                onChange={(e) =>
                  dispatch({ type: FAMILY, payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="john"
                className="input"
                value={user.username}
                onChange={(e) =>
                  dispatch({ type: USERNAME, payload: e.target.value })
                }
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="birthday">
                Birthday <span className="text-text-secondary">(optional)</span>
              </label>
              <input
                id="birthday"
                type="date"
                className="input "
                value={user.birthday}
                onChange={(e) =>
                  dispatch({ type: BIRTHDAY, payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="phone">
                Phone <span className="text-text-secondary">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="09123456789"
                className="input"
                inputMode="numeric"
                value={user.phone}
                onChange={(e) =>
                  dispatch({ type: PHONE, payload: e.target.value })
                }
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                inputMode="email"
                placeholder="johnfrans@gmail.com"
                className="input"
                value={user.email}
                onChange={(e) =>
                  dispatch({ type: EMAIL, payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-1/2 pe-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="****"
              className="input"
              value={user.password}
              onChange={(e) =>
                dispatch({ type: PASSWORD, payload: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-x-2 mt-10">
          <button type="submit" className="btn btn--small btn--secondary">
            Create
          </button>
          <Link to={"/users"}>
            <button className="btn btn--small btn--secondary">Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default UserCreate;
