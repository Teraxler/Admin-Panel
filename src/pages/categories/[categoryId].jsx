import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useFetch } from "@/hooks/useFetch";
import { Head, Loader, Breadcrumb } from "@/components/ui";
import { CategoryForm } from "@/features/category/components";
import { updateCategory } from "@/features/category/index";
import { getCategory } from "@/features/category/categoryService";

function CategoryEditPage() {
  const router = useRouter();
  const { categoryId } = router.query;

  const { data: category, status: categoryStatus } = useFetch({
    fn: () => getCategory(categoryId),
    dependencies: [categoryId],
  });

  useEffect(() => {
    if (categoryStatus === "failed") {
      toast.error("Category ID is invalid!");
      router.replace("/categories");
    }
  }, [categoryStatus, router]);

  async function handleUpdateCategory(category) {
    try {
      await updateCategory(category, categoryId);

      toast.success("Category updated successfully");
      router.push("/categories");
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (["idle", "pending"].includes(categoryStatus)) return <Loader />;

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
