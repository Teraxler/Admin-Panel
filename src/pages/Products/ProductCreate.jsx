import { useNavigate } from "react-router";
import { toast } from "sonner";
<<<<<<< HEAD
import { API_URL } from "@/constants";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import Head from "@/components/common/Head/Head";
import ProductForm from "@/components/Forms/ProductForm";
=======
import { API_URL, BASE_URL } from "@/constants";
import { productSchema } from "@/../validators/productValidator";
import { useFetch } from "@/hooks/useFetch";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import productReducer from "@/reducers/product";
import {
  CATEGORY_ID,
  COVER,
  COVER_FILE,
  DESCRIPTION,
  INVENTORY,
  NAME,
  PRICE,
} from "@/actions/product";
import Head from "@/components/common/Head/Head";
>>>>>>> 0943c44af24d68570a5304dfce6478bcc82e8b25

function ProductCreate() {
  const navigate = useNavigate();

  async function createProduct(formData) {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw await response.json();

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

      <ProductForm onSubmit={createProduct} />
    </>
  );
}

export default ProductCreate;
