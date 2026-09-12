import { API_URL } from "@/constants";

export async function registerUser(user) {
  const response = await fetch(`${API_URL}/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Failed to delete category.");

  return result;
}

export async function loginUser({ username, password }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Something is wrong please try again.");

  return result;
}
