import { API_URL } from "@/constants";

export async function getOrder(orderId) {
  const response = await fetch(`${API_URL}/orders/${orderId}`);

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Failed to get order.");

  return result;
}

export async function getAllOrders() {
  const response = await fetch(`${API_URL}/orders`);

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to get all orders.");

  return result;
}

export async function deleteOrder(orderId) {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to delete order.");

  return result;
}
