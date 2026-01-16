import { useState } from "react";
import { toast } from "sonner";
import { Link, useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { useEffect } from "react";
import { registerSchema } from "../../../validators/registerValidator";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";

function OrderEdit() {
    useTitle("Admin Panel - Edit Order");

  const navigate = useNavigate();
  const { orderId } = useParams();

  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [customer, isCustomerLoaded] = useFetch(`${API_URL}/orders/${orderId}`);

  useEffect(() => {
    if (customer == null) return;

    setName(customer.name);
    setFamily(customer.family);
    setUsername(customer.username);
    setPhone(customer.phone ?? "");
    setEmail(customer.email);
    setBirthday(customer.birthday?.slice(0, 10) ?? "");
  }, [isCustomerLoaded]);

  function updateOrderHandler(e) {
    e.preventDefault();

    const OrderCustomer = {
      name,
      family,
      email,
      username,
      phone: phone || null,
      birthday: birthday || null,
      password: customer.password,
    };

    const { success, error } = registerSchema.safeParse(OrderCustomer);

    if (success) return updateCustomer(OrderCustomer);

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

      if (!response.ok) throw new Error("Network Error");

      navigate("/customers", {
        state: { message: "Customer updated successfully" },
      });
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  return (
    <>
      <div>
        <h1 className="title">Edit Customer</h1>
        <Breadcrumb />
      </div>

      <form
        className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-md shadow text-sm font-medium"
        onSubmit={updateOrderHandler}
      >
        <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 leading-6">
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="name">First Name</label>
              <input
                id="name"
                type="text"
                placeholder="eg. John"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="family">Last Name</label>
              <input
                id="family"
                type="text"
                placeholder="eg. Francisco"
                className="input"
                value={family}
                onChange={(e) => setFamily(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="eg. John"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="birthday">
                Birthday <span className="text-text-secondary">(optional)</span>
              </label>
              <input
                id="birthday"
                type="date"
                placeholder=""
                className="input"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="phone">
              Phone <span className="text-text-secondary">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="eg. Francisco"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="eg. johnfrans@gmail.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-x-2 mt-10 sm:mt-25">

          <Button type="submit">Update</Button>
          <Link to={"/customers"}>
            <Button>Cancel</Button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default OrderEdit;
