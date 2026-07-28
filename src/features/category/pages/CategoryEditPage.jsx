import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { Head, Loader, Breadcrumb } from "@/components/ui";
import { CategoryForm } from "../components";
import { updateCategory } from "../index";

function CategoryEditPage() {
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

  async function handleUpdateCategory(category) {
    try {
      await updateCategory(category, categoryId);

      navigate("/categories", {
        state: { message: "Category updated successfully" },
      });
    } catch (error) {
      toast.error(error.message);
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

      <CategoryForm
        category={category}
        onSubmit={handleUpdateCategory}
        isEditMode
      />
    </>
  );
}

export default CategoryEditPage;
