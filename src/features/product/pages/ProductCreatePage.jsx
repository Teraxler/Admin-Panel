import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Head, Breadcrumb } from "@/components/ui";
import { ProductForm } from "../components";
import { createProduct } from "../index";

function ProductCreatePage() {
  const navigate = useNavigate();

  async function handleCreateProduct(formData) {
    try {
      await createProduct(formData);

      navigate("/products", {
        state: { message: "Product created successfully" },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Create Product</title>
      </Head>

      <div>
        <h1 className="title">Create Product</h1>
        <Breadcrumb />
      </div>

      <ProductForm onSubmit={handleCreateProduct} />
    </>
  );
}

export default ProductCreatePage;
