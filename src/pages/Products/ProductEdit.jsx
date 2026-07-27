import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { Head, Breadcrumb, Loader } from "@/components/ui";
import { ProductForm } from "@/features/product";
import { updateProduct } from "@/services/productService";

function ProductEdit() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { data: product, isLoaded: isProductLoaded } = useFetch(
    `${API_URL}/products/${productId}`,
  );

  useEffect(() => {
    if (!isProductLoaded) return;

    if (product == null) {
      navigate("/products", {
        state: { message: "Product ID is invalid!", messageType: "error" },
      });
    }
  }, [isProductLoaded]);

  async function handleUpdateProduct(formData) {
    try {
      await updateProduct(formData, productId);

      navigate("/products", {
        state: { message: "Product updated successfully" },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (!isProductLoaded) return <Loader />;

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

export default ProductEdit;
