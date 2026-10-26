import { delay } from "@/utils/delay";

export async function loginUser([storage, setStorage], { username, password }) {
  return delay(
    () =>
      storage.users.find((user) => {
        return user.username === username && user.password === password;
      }),
    650,
  );
}
