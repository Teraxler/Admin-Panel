import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { categorySchema } from "@/../validators/categoryValidator";
import { useFetch } from "@/hooks/useFetch";
import Breadcrumb from "@/components/Breadcrumb";
import Head from "@/components/common/Head";
import Loader from "@/components/Loader";

function CategoryEdit() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [categoryName, setCategoryName] = useState("");

  const { data: category, isLoaded: isCategoryLoaded } = useFetch(
    `${API_URL}/categories/${categoryId}`,
  );

  useEffect(() => {
    if (!isCategoryLoaded) return;

    if (category == null) {
      navigate("/categories", {
        state: { message: "Category ID is invalid!", messageType: "error" },
      });
    }

    setCategoryName(category.name);
  }, [isCategoryLoaded]);

  function updateCustomerHandler(e) {
    e.preventDefault();

    const { success, error } = categorySchema.safeParse({ categoryName });

    if (success) return updateCustomer({ categoryName });

    toast.error(error.issues[0].message);
  }

  async function updateCustomer(category) {
    try {
      const response = await fetch(`${API_URL}/categories/${categoryId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(category),
      });

      if (!response.ok) throw new Error("Network Error");

      navigate("/categories", {
        state: { message: "Customer updated successfully" },
      });
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  if (!isCategoryLoaded) return <Loader />;

  return (
    <>
      <Head>
        <title>Admin Panel - Edit Category</title>
      </Head>

      <div>
        <h1 className="font-medium text-4xl">Edit Cateogry</h1>
        <Breadcrumb />
      </div>

      <form
        className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-lg shadow text-sm font-medium"
        onSubmit={updateCustomerHandler}
      >
        <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 leading-6">
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="categoryName">Category</label>
              <input
                id="categoryName"
                type="text"
                placeholder="Cold Coffee"
                className="input"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-2 mt-10 sm:mt-25">
          <button className="btn btn--small btn--secondary" type="submit">
            Update
          </button>
          <Link to={"/categories"}>
            <button className="btn btn--small btn--secondary">Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default CategoryEdit;
