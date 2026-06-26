import { useReducer } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  editUserSchema,
  registerSchema,
} from "../../../validators/authValidator";
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
} from "../../actions/user";

function UserForm({ user: userInfo, onSubmit, isEditMode }) {
  const [user, dispatch] = useReducer(userReducer, {
    userId: userInfo?.userId || "",
    name: userInfo?.name || "",
    family: userInfo?.family || "",
    username: userInfo?.username || "",
    phone: userInfo?.phone || "",
    email: userInfo?.email || "",
    birthday: userInfo?.birthday?.slice(0, 10) || "",
    password: "",
    newPassword: "",
  });

  function handleSubmitForm(e) {
    e.preventDefault();

    const editedUser = {
      ...user,
      phone: user.phone || null,
      birthday: user.birthday || null,
      password: isEditMode ? user.password || null : user.password,
      newPassword: user.newPassword || null,
    };

    const { success, error } = isEditMode
      ? editUserSchema.safeParse(editedUser)
      : registerSchema.safeParse(editedUser);

    if (success) return onSubmit(editedUser);

    toast.error(error.issues[0].message);
  }

  return (
    <form
      className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-lg shadow text-sm font-medium"
      onSubmit={handleSubmitForm}
    >
      <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 leading-6">
        <div className="flex gap-x-2 sm:gap-x-4">
          <div className="w-1/2">
            <label htmlFor="name">First Name</label>
            <input
              id="name"
              type="text"
              placeholder="John"
              minLength={3}
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
              minLength={3}
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
              minLength={3}
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
              className="input"
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
              inputMode="numeric"
              placeholder="09123456789"
              maxLength={11}
              className="input"
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
              placeholder="johnfrans@gmail.com"
              inputMode="email"
              className="input"
              value={user.email}
              onChange={(e) =>
                dispatch({ type: EMAIL, payload: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex gap-x-2 sm:gap-x-4">
          <div className="w-1/2">
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
          <div
            className={`w-1/2 ${isEditMode ? "" : "invisible opacity-0 pointer-events-none"}`}
          >
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              type="password"
              placeholder="****"
              className="input"
              value={user.newPassword}
              onChange={(e) =>
                dispatch({ type: NEW_PASSWORD, payload: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div
        className={`flex justify-end gap-x-2 mt-10 ${isEditMode ? "sm:mt-25" : ""}`}
      >
        <button className="btn btn--small btn--secondary" type="submit">
          {isEditMode ? "Update" : "Create"}
        </button>
        <Link to={-1}>
          <button className="btn btn--small btn--secondary">Cancel</button>
        </Link>
      </div>
    </form>
  );
}

export default UserForm;
