import { deleteItem, findItem, updateItem } from "@/utils/arrayUtil";
import { delay } from "@/utils/delay";

export async function createUser([storage, setStorage], user) {
  return await delay(() => {
    setStorage((prev) => ({
      ...prev,
      users: [...prev.users, user],
    }));

    return user;
  }, 500);
}

export async function getUser([storage, setStorage], id) {
  return await delay(() => {
    return findItem(storage.users, "userId", id);
  }, 350);
}

export async function getAllUsers([storage, setStorage]) {
  return await delay(() => storage.users, 500);
}

export async function updateUser([storage, setStorage], user, userId) {
  return await delay(() => {
    const newState = updateItem(storage.users, "userId", {
      id: userId,
      ...user,
    });

    setStorage((prev) => ({ ...prev, users: newState }));

    return newState;
  }, 500);
}

export async function deleteUser([storage, setStorage], userId) {
  return await delay(() => {
    const newState = deleteItem(storage.users, "userId", userId);

    setStorage((prev) => ({ ...prev, users: newState }));

    return newState;
  }, 400);
}
