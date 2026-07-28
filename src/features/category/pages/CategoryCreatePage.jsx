import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Head, Breadcrumb } from "@/components/ui";
import { CategoryForm } from "../components";
import { createCategory } from "../index";

function CategoryCreatePage() {
  const navigate = useNavigate();

  async function handleCreateCategory(category) {
    try {
      await createCategory(category);

      navigate("/categories", {
        state: { message: "Category created successfully" },
      });
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
