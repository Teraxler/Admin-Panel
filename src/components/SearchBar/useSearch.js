import { useEffect, useState, useTransition } from "react";

export const useSearch = ({
  items,
  isItemsLoaded,
  setFilteredItems,
  handleSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(
    () => setFilteredItems(items),
    [isItemsLoaded, items, setFilteredItems],
  );

  useEffect(() => {
    if (!isItemsLoaded) return;

    const timeoutId = setTimeout(() => {
      const result = handleSearch(items, searchValue);

      startTransition(() => setFilteredItems(result));
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [isItemsLoaded, searchValue, items, handleSearch, setFilteredItems]);

  return [searchValue, setSearchValue];
};
