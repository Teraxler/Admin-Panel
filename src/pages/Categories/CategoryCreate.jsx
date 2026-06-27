import { toast } from "sonner";
import { useNavigate } from "react-router";
import { API_URL } from "@/constants";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import Head from "@/components/common/Head/Head";
import CategoryForm from "@/components/Forms/CategoryForm";

function CategoryCreate() {
  const navigate = useNavigate();

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
      <Head>
        <title>Admin Panel - Create Category</title>
      </Head>

      <div>
        <h1 className="title">Create Cateogry</h1>
        <Breadcrumb />
      </div>

      <CategoryForm onSubmit={createCategory} />
    </>
  );
}

export default CategoryCreate;
