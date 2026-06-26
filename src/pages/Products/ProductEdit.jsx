import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import Head from "@/components/common/Head/Head";
import Loader from "@/components/common/Loader/Loader";
import ProductForm from "@/components/Forms/ProductForm";

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

  async function updateProduct(formData) {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw await response.json();

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

      <ProductForm product={product} onSubmit={updateProduct} isEditMode />
    </>
  );
}

export default ProductEdit;
