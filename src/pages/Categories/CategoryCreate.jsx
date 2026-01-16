import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { API_URL } from "../../constants";
import { categorySchema } from "../../../validators/categoryValidator";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import { useTitle } from "../../hooks/useTitle";

function CategoryCareate() {
  useTitle("Admin Panel - Create Category");

  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");

  function createCategoryHandler(e) {
    e.preventDefault();

    const { success, error } = categorySchema.safeParse({ categoryName });

    if (success) return createCategory({ categoryName });

    toast.error(error.issues[0].message);
  }

  async function createCategory(category) {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(category),
      });

      if (!response.ok) throw new Error("Network Error");

      navigate("/categories", {
        state: { message: "Category created successfully" },
      });
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  return (
    <>
      <div>
        <h1 className="title">Create Cateogry</h1>
        <Breadcrumb />
      </div>

      <form
        className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-md shadow text-sm font-medium"
        onSubmit={createCategoryHandler}
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
          <Button type="submit">Create</Button>
          <Link to={"/categories"}>
            <Button>Cancel</Button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default CategoryCareate;
