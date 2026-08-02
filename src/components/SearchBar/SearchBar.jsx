import { useSearch } from "@/components/SearchBar/useSearch";

const SearchBar = ({
  items,
  isItemsLoaded,
  setFilteredItems,
  handleSearch,
  placeholder,
}) => {
  const [searchValue, setSearchValue] = useSearch({
    isItemsLoaded,
    items,
    setFilteredItems,
    handleSearch,
  });

  const updateSearchValue = (e) => setSearchValue(e.target.value);

  return (
    <div>
      <form className="relative flex bg-white">
        <label
          aria-label="Serach"
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
