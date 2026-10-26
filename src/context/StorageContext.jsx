import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext } from "react";
import coffeeShopDb from "@/database/coffeeShop";

const StorageContext = createContext("");

const StorageProvider = ({ children }) => {
  const [storage, setStorage] = useLocalStorage("coffee-shop", coffeeShopDb);

  return (
    <StorageContext value={[storage, setStorage]}>{children}</StorageContext>
  );
};

const useStorageContext = () => {
  const context = useContext(StorageContext);
  if (context == null)
    throw new Error("useStorageContext must use within StorageProvider");

  return context;
};

export { useStorageContext, StorageProvider };
