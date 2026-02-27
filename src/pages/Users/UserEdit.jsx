import { useEffect, useReducer } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { editUserSchema } from "@/../validators/authValidator";
import { useFetch } from "@/hooks/useFetch";
import Breadcrumb from "@/components/Breadcrumb";
import Head from "@/components/common/Head";
import userReducer from "@/reducers/user";
import {
  NAME,
  FAMILY,
  USERNAME,
  EMAIL,
  PHONE,
  BIRTHDAY,
  PASSWORD,
  NEW_PASSWORD,
} from "@/actions/user";
import Loader from "@/components/Loader";

function UserEdit() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userState, dispatch] = useReducer(userReducer, {
    name: "",
    family: "",
    username: "",
    phone: "",
    email: "",
    birthday: "",
    password: "",
    newPassword: "",
  });

  const { data: user, isLoaded: isUserLoaded } = useFetch(
    `${API_URL}/users/${userId}`,
  );

  useEffect(() => {
    if (!isUserLoaded) return;

    if (user == null) {
      navigate("/users", {
        state: { message: "User ID is invalid!", messageType: "error" },
      });
    }

    dispatch({
      type: "ALL",
      payload: {
        ...user,
        phone: user.phone ?? "",
        birthday: user.birthday?.slice(0, 10) ?? "",
        password: "",
        newPassword: "",
      },
    });
  }, [isUserLoaded]);

  function updateUserHandler(e) {
    e.preventDefault();

    const editedUser = {
      ...userState,
      phone: userState.phone || null,
      birthday: userState.birthday || null,
      password: userState.password || null,
      newPassword: userState.newPassword || null,
    };

    const { success, error } = editUserSchema.safeParse(editedUser);

    if (success) return updateUser(editedUser);

    toast.error(error.issues[0].message);
  }

  async function updateUser(user) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(user),
      });

      if (!response.ok) throw await response.json();

      navigate("/users", {
        state: { message: "User updated successfully" },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (!isUserLoaded) return <Loader />;

  return (
    <>
      <Head>
        <title>Admin Panel - Edit User</title>
      </Head>

      <div>
        <h1 className="title">Edit User</h1>
        <Breadcrumb />
      </div>

      <form
        className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-md shadow text-sm font-medium"
        onSubmit={updateUserHandler}
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
                value={userState.name}
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
                value={userState.family}
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
                value={userState.username}
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
                className="input"
                value={userState.birthday}
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
                inputMode="numeric"
                placeholder="09123456789"
                className="input"
                value={userState.phone}
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
                placeholder="johnfrans@gmail.com"
                inputMode="email"
                className="input"
                value={userState.email}
                onChange={(e) =>
                  dispatch({ type: EMAIL, payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="password">Current Password</label>
              <input
                id="password"
                type="password"
                placeholder="****"
                className="input"
                value={userState.password}
                onChange={(e) =>
                  dispatch({ type: PASSWORD, payload: e.target.value })
                }
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                placeholder="****"
                className="input"
                value={userState.newPassword}
                onChange={(e) =>
                  dispatch({ type: NEW_PASSWORD, payload: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-2 mt-10 sm:mt-25">
          <button className="btn btn--small btn--secondary" type="submit">
            Update
          </button>
          <Link to={"/users"}>
            <button className="btn btn--small btn--secondary">Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default UserEdit;
