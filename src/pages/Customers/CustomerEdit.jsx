import { useReducer } from "react";
import { toast } from "sonner";
import { Link, useParams, useNavigate } from "react-router";
import useFetch from "@/hooks/useFetch";
import { API_URL } from "@/constants";
import { useEffect } from "react";
import { registerSchema } from "@/../validators/registerValidator";
import Breadcrumb from "@/components/Breadcrumb";
import customerReducer from "@/reducers/customer";
import Head from "@/components/common/Head";
import {
  NAME,
  FAMILY,
  USERNAME,
  EMAIL,
  PHONE,
  BIRTHDAY,
} from "@/actions/customer";

function CustomerEdit() {
  const navigate = useNavigate();
  const { customerId } = useParams();

  const [customerState, dispatch] = useReducer(customerReducer, {
    name: "",
    family: "",
    username: "",
    phone: "",
    email: "",
    birthday: "",
    password: "",
  });

  const { data: customer, isLoaded: isCustomerLoaded } = useFetch(
    `${API_URL}/customers/${customerId}`,
  );

  useEffect(() => {
    if (!isCustomerLoaded) return;

    dispatch({
      type: "ALL",
      payload: {
        ...customer,
        phone: customer.phone ?? "",
        birthday: customer.birthday?.slice(0, 10) ?? "",
      },
    });
  }, [isCustomerLoaded]);

  function updateCustomerHandler(e) {
    e.preventDefault();

    const editedCustomer = {
      ...customerState,
      phone: customerState.phone || null,
      birthday: customerState.birthday || null,
    };

    const { success, error } = registerSchema.safeParse(editedCustomer);

    if (success) return updateCustomer(editedCustomer);

    toast.error(error.issues[0].message);
  }

  async function updateCustomer(customer) {
    try {
      const response = await fetch(`${API_URL}/customers/${customerId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(customer),
      });

      if (!response.ok) throw await response.json();

      navigate("/customers", {
        state: { message: "Customer updated successfully" },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Edit Customer</title>
      </Head>

      <div>
        <h1 className="title">Edit Customer</h1>
        <Breadcrumb />
      </div>

      <form
        className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-md shadow text-sm font-medium"
        onSubmit={updateCustomerHandler}
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
                value={customerState.name}
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
                value={customerState.family}
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
                value={customerState.username}
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
                value={customerState.birthday}
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
                value={customerState.phone}
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
                value={customerState.email}
                onChange={(e) =>
                  dispatch({ type: EMAIL, payload: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-2 mt-10 sm:mt-25">
          <button className="btn btn--small btn--secondary" type="submit">
            Update
          </button>
          <Link to={"/customers"}>
            <button className="btn btn--small btn--secondary">Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default CustomerEdit;
