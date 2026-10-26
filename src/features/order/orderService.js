import { deleteItem, findItem } from "@/utils/arrayUtil";
import { delay } from "@/utils/delay";

export async function getOrder([storage, setStorage], id) {
  return await delay(() => findItem(storage.orders, "orderId", id), 350);
}

export async function getAllOrders([storage, setStorage]) {
  return await delay(() => storage.orders, 500);
}

export async function deleteOrder([storage, setStorage], orderId) {
  return await delay(() => {
    const newState = deleteItem(storage.orders, "orderId", orderId);

    setStorage((prev) => ({ ...prev, orders: newState }));

    return newState;
  }, 400);
}
