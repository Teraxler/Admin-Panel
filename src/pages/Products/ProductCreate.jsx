import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { productSchema } from "@/../validators/productValidator";
import { useFetch } from "@/hooks/useFetch";
import Breadcrumb from "@/components/Breadcrumb";
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
import Head from "@/components/common/Head";

function ProductCreate() {
  const navigate = useNavigate();

  const [product, dispatch] = useReducer(productReducer, {
    name: "",
    price: "",
    cover: "",
    categoryId: "",
    inventory: "",
    description: "",
    coverFile: null,
    isCoverBlob: false,
  });

  const { data: categories, isLoaded: isCategoriesLoaded } = useFetch(
    `${API_URL}/categories`,
  );

  useEffect(() => {
    if (!product.coverFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(product.coverFile);

    reader.onload = (e) => {
      dispatch({ type: COVER, payload: e.target.result });
    };
  }, [product.coverFile]);

  function handleCreateProduct(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("inventory", product.inventory);
    formData.append("categoryId", product.categoryId);
    formData.append("description", product.description);
    product.isCoverBlob && formData.append("cover", product.coverFile);

    const editedProduct = Object.fromEntries(formData.entries());

    const { success, error } = productSchema.safeParse(editedProduct);

    if (success) return updateProduct(formData);

    toast.error(error.issues[0].message);
  }

  async function updateProduct(formData) {
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
      console.log(error);

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

      <form
        className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-lg shadow text-sm font-medium"
        onSubmit={handleCreateProduct}
      >
        <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 leading-6">
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="espresso"
                className="input"
                onChange={(e) =>
                  dispatch({ type: NAME, payload: e.target.value })
                }
                value={product.name}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                onChange={(e) =>
                  dispatch({ type: CATEGORY_ID, payload: e.target.value })
                }
                value={product.categoryId}
                className="input capitalize"
              >
                <option value={""}>Please Select Category</option>
                {isCategoriesLoaded
                  ? categories?.length &&
                    categories.map((category) => (
                      <option
                        value={category.categoryId}
                        key={category.categoryId}
                        className="capitalize"
                      >
                        {category.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="price">Price</label>
              <div className="relative">
                <span className="absolute top-1/2 -translate-y-1/2 left-3">
                  $
                </span>
                <input
                  id="price"
                  type="number"
                  placeholder="10"
                  inputMode="numeric"
                  className="input ps-5"
                  value={product.price}
                  min={0}
                  onChange={(e) =>
                    dispatch({ type: PRICE, payload: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="inventory">Inventory</label>
              <input
                id="inventory"
                type="number"
                inputMode="numeric"
                placeholder="15"
                className="input"
                value={product.inventory}
                min={0}
                onChange={(e) =>
                  dispatch({ type: INVENTORY, payload: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={product.description}
              onChange={(e) =>
                dispatch({ type: DESCRIPTION, payload: e.target.value })
              }
              placeholder="Shot of espresso extracted the Italian way."
              className="input h-36"
            />
          </div>
          <div>
            <label className="inline-block cursor-pointer" htmlFor="cover">
              <span>Cover</span>
              <div className="input flex items-center justify-center size-27">
                {product.cover ? (
                  <img
                    className="max-w-full max-h-full rounded-lg"
                    src={
                      product.isCoverBlob
                        ? product.cover
                        : `${API_URL}/images/products/${product.cover}`
                    }
                    alt={product.name}
                  />
                ) : (
                  <svg className="w-full h-full">
                    <use href="#photo"></use>
                  </svg>
                )}
              </div>
              <input
                id="cover"
                type="file"
                className="hidden"
                onChange={(e) =>
                  dispatch({ type: COVER_FILE, payload: e.target.files[0] })
                }
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-x-2">
          <button className="btn btn--small btn--secondary" type="submit">
            Create
          </button>
          <Link to={"/products"}>
            <button className="btn btn--small btn--secondary">Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default ProductCreate;
