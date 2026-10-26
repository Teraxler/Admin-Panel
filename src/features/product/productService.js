import { deleteItem, findItem, updateItem } from "@/utils/arrayUtil";
import { delay } from "@/utils/delay";

export async function createProduct([storage, setStorage], product) {
  return await delay(() => {
    setStorage((prev) => ({
      ...prev,
      products: [...prev.products, product],
    }));

    return product;
  }, 500);
}

export async function getProduct([storage, setStorage], id) {
  return await delay(() => findItem(storage.products, "productId", id), 350);
}

export async function getAllProducts([storage, setStorage]) {
  return await delay(() => storage.products, 500);
}

export async function updateProduct([storage, setStorage], product, productId) {
  return await delay(() => {
    const newState = updateItem(storage.products, "productId", {
      id: productId,
      ...product,
    });

    setStorage((prev) => ({ ...prev, products: newState }));

    return newState;
  }, 500);
}

export async function deleteProduct([storage, setStorage], productId) {
  return await delay(() => {
    const newState = deleteItem(storage.products, "productId", productId);

    setStorage((prev) => ({ ...prev, products: newState }));

    return newState;
  }, 400);
}
