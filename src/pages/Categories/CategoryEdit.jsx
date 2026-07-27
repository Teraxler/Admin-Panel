import { useEffect } from "react";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router";
import { API_URL } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { Head, Loader } from "@/components/ui";
import { CategoryForm } from "@/features/category";
import { updateCategory } from "@/services/categoryService";

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

export default CategoryEdit;
