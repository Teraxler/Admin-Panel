import { useEffect, useState, useTransition } from "react";

const SearchBar = ({
  items,
  placeholder,
  isItemsLoaded,
  setFilteredItems,
  searchHandler,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => setFilteredItems(items), [isItemsLoaded]);

  useEffect(() => {
    if (!isItemsLoaded) return;

    const timeoutId = setTimeout(() => {
      const result = searchHandler(items, searchValue);

      startTransition(() => setFilteredItems(result));
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const updateSearchValue = (e) => setSearchValue(e.target.value);

  return (
    <div>
      <form className="relative flex bg-white">
        <label
          htmlFor="search-input"
          className="absolute left-3 top-0 bottom-0 my-auto size-4 cursor-text"
        >
          <svg className="w-full h-full">
            <use href="#magnifying-glass"></use>
          </svg>
        </label>
        <input
          type="search"
          placeholder={placeholder}
          id="search-input"
          value={searchValue}
          onChange={updateSearchValue}
          className="input pl-9"
        />
      </form>
    </div>
  );
};

export default SearchBar;
