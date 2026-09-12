import { useEffect } from "react";
import { toast } from "sonner";

import { Head, Breadcrumb, Loader } from "@/components/ui";
import { ProductForm } from "../../features/product/components";
import { updateProduct } from "../../features/product/index";
import { useRouter } from "next/router";
import { getAllProducts, getProduct } from "@/features/product/productService";

export const getStaticPaths = async () => {
  const products = await getAllProducts();

  const paths = products.map((product) => ({
    params: { productId: product.productId },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const product = await getProduct(params.productId);

  return { props: { product, productId: params.productId } };
};

function ProductEditPage({ product, productId }) {
  const router = useRouter();

  useEffect(() => {
    if (product == null) {
      toast.error("Product ID is invalid!");
      router.replace("/products");
    }
  }, [product, router]);

  async function handleUpdateProduct(formData) {
    try {
      await updateProduct(formData, productId);

      toast.success("Product updated successfully");
      router.push("/products");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Edit Product</title>
      </Head>

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
  );
}

export default ProductEditPage;
