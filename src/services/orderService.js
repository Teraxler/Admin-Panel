import { API_URL } from "@/constants";

export async function deleteOrder(orderId) {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to delete order.");

  return result;
}
