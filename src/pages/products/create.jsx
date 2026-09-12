import { toast } from "sonner";
import { Head, Breadcrumb } from "@/components/ui";
import { ProductForm } from "../../features/product/components";
import { createProduct } from "../../features/product/index";
import { useRouter } from "next/router";

function ProductCreatePage() {
  const router = useRouter();

  async function handleCreateProduct(formData) {
    try {
      await createProduct(formData);

      toast.success("Product created successfully");
      router.push("/products");
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
