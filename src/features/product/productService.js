import { API_URL } from "@/constants";

export async function createProduct(formData) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to create product.");

  return result;
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) throw new Error("Failed to get product.");
  const result = await response.json();

  return result;
}

export async function getAllProducts() {
  const response = await fetch(`${API_URL}/products`);

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to get all products.");

  return result;
}

export async function updateProduct(formData, productId) {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PUT",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to update product.");

  return result;
}

export async function deleteProduct(productId) {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to delete product.");

  return response.ok;
}
