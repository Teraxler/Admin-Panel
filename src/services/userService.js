import { API_URL } from "@/constants";

export async function createUser(user) {
  const response = await fetch(`${API_URL}/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Failed to create user.");

  return result;
}

export async function updateUser(user, userId) {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(user),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Failed to update user.");

  return result;
}

export async function deleteUser(userId) {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Failed to delete user.");

  return result;
}
