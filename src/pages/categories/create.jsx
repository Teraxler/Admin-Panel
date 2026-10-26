import { useRouter } from "next/router";
import { toast } from "sonner";
import { Head, Breadcrumb } from "@/components/ui";
import { CategoryForm } from "@/features/category/components";
import { createCategory } from "@/features/category/index";
import { useStorageContext } from "@/context/StorageContext";

function CategoryCreatePage() {
  const storageContext = useStorageContext();
  const router = useRouter();

  async function handleCreateCategory(category) {
    try {
      await createCategory(storageContext, category);

      toast.success("Category created successfully");
      router.push("/categories");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Create Category</title>
      </Head>

      <div>
        <h1 className="title">Create Cateogry</h1>
        <Breadcrumb />
      </div>

      <CategoryForm onSubmit={handleCreateCategory} />
    </>
  );
}

export default CategoryCreatePage;
