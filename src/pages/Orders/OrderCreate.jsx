import { useState } from "react";
import { toast } from "sonner";
import { Link, useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { useEffect } from "react";
import { productSchema } from "../../../validators/productValidator";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";

function OrderCreate() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [inventory, setInventory] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState(null);

  const [categories, isCategoriesLoaded] = useFetch(`${API_URL}/categories`);

  useEffect(() => {
    if (!coverFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(coverFile);

    reader.onload = (e) => setCover(e.target.result);
  }, [coverFile]);

  function createProductHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cover", coverFile);
    formData.append("name", JSON.stringify(name));
    formData.append("categoryId", categoryId ? categoryId : null);
    formData.append("price", JSON.stringify(price));
    formData.append("inventory", JSON.stringify(inventory));
    formData.append("description", JSON.stringify(description));

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

      if (!response.ok) throw new Error("Network Error");

      navigate("/products", {
        state: { message: "Product created successfully" },
      });
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  return (
    <>
      <div>
        <h1 className="title">Create Order</h1>
        <Breadcrumb />
      </div>

      <form
        className="w-full bg-white p-2.5 sm:px-4 py-4 mt-8 rounded-md shadow text-sm font-medium"
        onSubmit={createProductHandler}
      >
        <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 leading-6">
          <div className="flex gap-x-2 sm:gap-x-4">
            <div className="w-1/2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="espresso"
                className=" outline-0 border border-neutral-400 focus:border-primary-click w-full px-3 py-2 bg-white/10 rounded-lg"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId}
                className="capitalize outline-0 border border-neutral-400 focus:border-primary-click w-full px-3 py-2 bg-white/10 rounded-lg"
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
            <div className="w-1/2 relative">
              <label htmlFor="price">Price</label>
              <span className="absolute top-1/2 left-3">$</span>
              <input
                id="price"
                type="number"
                placeholder="10"
                className="outline-0 border border-neutral-400 focus:border-primary-click w-full ps-5 pe-3 py-2 bg-white/10 rounded-lg"
                value={price}
                min={0}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="inventory">Inventory</label>
              <input
                id="inventory"
                type="number"
                placeholder="15"
                className="outline-0 border border-neutral-400 focus:border-primary-click w-full px-3 py-2 bg-white/10 rounded-lg"
                value={inventory}
                min={0}
                onChange={(e) => setInventory(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Shot of espresso extracted the Italian way."
              className="outline-0 border h-36 border-neutral-400 focus:border-primary-click w-full px-3 py-2 bg-white/10 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="cover">
              <span>Cover</span>
              <div className="flex items-center justify-center size-27 outline-0 border border-neutral-400 px-3 py-2 bg-white/10 rounded-lg">
                {cover ? (
                  <img
                    className="max-w-full max-h-full rounded-sm"
                    src={`${API_URL}/images/products/${cover}`}
                    alt={name}
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
                onChange={(e) => setCoverFile(e.target.files[0])}
                placeholder="eg. johnfrans@gmail.com"
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-x-2">

          <Button type="submit">Update</Button>
          <Link to={"/products"}>
            <Button>Cancel</Button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default OrderCreate;
