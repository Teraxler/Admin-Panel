import { useNavigate } from "react-router";
import { Head, Breadcrumb } from "@/components/ui";
import { ProductForm } from "@/features/product";
import { createProduct } from "@/services/productService";
import { toast } from "sonner";

function ProductCreate() {
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

export default ProductCreate;
