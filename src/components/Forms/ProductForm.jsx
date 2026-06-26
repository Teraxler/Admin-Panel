import { useEffect, useReducer } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { BASE_URL, API_URL } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { productSchema } from "../../../validators/productValidator";
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
import Loader from "../common/Loader/Loader";

function ProductForm({ product: productInfo, onSubmit, isEditMode }) {
  const [product, dispatch] = useReducer(productReducer, {
    productId: productInfo?.productId,
    name: productInfo?.name || "",
    price: productInfo?.price || "",
    cover: productInfo?.cover || "",
    categoryId: productInfo?.categoryId || "",
    inventory: productInfo?.inventory || "",
    description: productInfo?.description || "",
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

  function handleSubmitForm(e) {
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

    if (success) return onSubmit(formData);

    toast.error(error.issues[0].message);
  }

  if (!isCategoriesLoaded) return <Loader />;

  return (
    <form
      className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-lg shadow text-sm font-medium"
      onSubmit={handleSubmitForm}
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
              value={product.categoryId ?? ""}
              className="input"
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
                inputMode="numeric"
                placeholder="10"
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
            className="input h-36 "
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
                      : `${BASE_URL}/images/products/${product.cover}`
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
              onChange={(e) =>
                dispatch({ type: COVER_FILE, payload: e.target.files[0] })
              }
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-end gap-x-2">
        <button className="btn btn--small btn--secondary" type="submit">
          {isEditMode ? "Update" : "Create"}
        </button>
        <Link to={-1}>
          <button className="btn btn--small btn--secondary">Cancel</button>
        </Link>
      </div>
    </form>
  );
}

export default ProductForm;
