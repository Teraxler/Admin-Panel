import { API_URL } from "@/constants";

export async function createCategory(category) {
  const response = await fetch(`${API_URL}/categories`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(category),
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to create category.");

  return result;
}

export async function updateCategory(category, categoryId) {
  const response = await fetch(`${API_URL}/categories/${categoryId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(category),
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to update category.");

  return result;
}

export async function deleteCategory(categoryId) {
  const response = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to delete category.");

  return result;
}
