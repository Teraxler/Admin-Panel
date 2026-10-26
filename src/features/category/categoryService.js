import { deleteItem, findItem, updateItem } from "@/utils/arrayUtil";
import { delay } from "@/utils/delay";

export async function createCategory([storage, setStorage], category) {
  return await delay(() => {
    setStorage((prev) => ({
      ...prev,
      categories: [...prev.categories, category],
    }));

    return category;
  }, 500);
}

export async function getCategory([storage, setStorage], id) {
  return await delay(() => findItem(storage.categories, "categoryId", id), 350);
}

export async function getAllCategories([storage, setStorage]) {
  return await delay(() => storage.categories, 500);
}

export async function updateCategory(
  [storage, setStorage],
  category,
  categoryId,
) {
  return await delay(() => {
    const newState = updateItem(storage.categories, "categoryId", {
      id: categoryId,
      ...category,
    });

    setStorage((prev) => ({ ...prev, categories: newState }));

    return newState;
  }, 500);
}

export async function deleteCategory([storage, setStorage], categoryId) {
  return await delay(() => {
    const newState = deleteItem(storage.categories, "categoryId", categoryId);

    setStorage((prev) => ({ ...prev, categories: newState }));

    return newState;
  }, 400);
}
