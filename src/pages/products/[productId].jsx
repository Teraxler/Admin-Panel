import { useEffect } from "react";
import { toast } from "sonner";
import { Head, Breadcrumb, Loader } from "@/components/ui";
import { ProductForm } from "../../features/product/components";
import { updateProduct } from "../../features/product/index";
import { useRouter } from "next/router";
import { useFetch } from "@/hooks/useFetch";
import { getProduct } from "../../features/product/productService";

function ProductEditPage() {
  const router = useRouter();
  const { productId } = router.query;

  const { data: product, status: productStatus } = useFetch({
    fn: () => getProduct(productId),
    dependencies: [productId],
  });

  useEffect(() => {
    if (productStatus !== "failed") return;

    toast.error("Product ID is invalid!");
    router.replace("/products");
  }, [productStatus, router]);

  async function handleUpdateProduct(formData) {
    try {
      await updateProduct(formData, productId);

      toast.success("Product updated successfully");
      router.replace("/products");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Edit Product</title>
      </Head>

      {["idle", "pending"].includes(productStatus) && <Loader />}

      {productStatus === "success" && (
        <>
          <div>
            <h1 className="title">Edit Product</h1>
            <Breadcrumb />
          </div>

          <ProductForm
            product={product}
            onSubmit={handleUpdateProduct}
            isEditMode
          />
        </>
      )}
    </>
  );
}

export default ProductEditPage;
