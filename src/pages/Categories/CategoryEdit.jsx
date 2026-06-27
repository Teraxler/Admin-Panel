import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import Head from "@/components/common/Head/Head";
import Loader from "@/components/common/Loader/Loader";
import CategoryForm from "@/components/Forms/CategoryForm";

function CategoryEdit() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

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
  }, [isCategoryLoaded]);

  async function updateCategory(category) {
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

      <CategoryForm category={category} onSubmit={updateCategory} isEditMode />
    </>
  );
}

export default CategoryEdit;
