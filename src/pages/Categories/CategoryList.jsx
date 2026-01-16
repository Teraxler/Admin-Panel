import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Table from "../../components/Table/Table";
import useFetch from "../../hooks/useFetch";
import { API_URL, ITEMS_PER_PAGE } from "../../constants";
import { toast } from "sonner";
import { removeItemFromList, searchCategory } from "../../utils/array.util";
import TableRowCategory from "../../components/Table/TableRowCategory";
import Breadcrumb from "../../components/Breadcrumb";
import SearchBar from "../../components/Searchbar";
import Pagination from "../../components/Pagination/Pagination";
const tableColumns = ["#", "Category", ""];

const removeCategoryById = (categories, id) =>
  removeItemFromList(categories, "categoryId", id);

function CategoryList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPageCategories, setCurrentPageCategories] = useState([]);

  const [categories, isCategoriesLoaded, error, setCategories] = useFetch(
    `${API_URL}/categories`
  );

  async function deleteCategoryHandler(categoryId) {
    try {
      const response = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setCategories((prevCategories) =>
        removeCategoryById(prevCategories, categoryId)
      );
      toast.success("Category delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  useEffect(() => {
    if (location.state) {
      toast.success(location.state.message);

      navigate(location.pathname, { replace: true, state: null });
    }
  }, []);

  return (
    <>
      <div>
        <h1 className="title">Categories</h1>
        <Breadcrumb />
      </div>
      <section className="mt-8">
        <div className="flex justify-between mb-4">
          <Link
            to={"create"}
            className="flex items-center justify-center gap-x-1 lg:gap-x-2 size-9.5 sm:w-auto p-2 lg:p-2.5 bg-white hover:bg-full-spectrum-blue text-full-spectrum-blue hover:text-white text-sm font-medium uppercase border border-full-spectrum-blue rounded-lg transition"
          >
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="text-sm lg:text-base hidden sm:inline">
              New Category
            </span>
          </Link>
          <SearchBar
            items={categories}
            placeholder="Search (category)"
            searchHandler={searchCategory}
            isItemsLoaded={isCategoriesLoaded}
            setFilteredItems={setFilteredCategories}
          />
        </div>
        <div className="p-2 sm:p-4 bg-white rounded-lg">
          {filteredCategories?.length && currentPageCategories?.length ? (
            <>
              <Table columns={tableColumns}>
                {currentPageCategories.map((category, i) => (
                  <TableRowCategory
                    key={category.categoryId}
                    number={i + 1}
                    onDelete={() => deleteCategoryHandler(category.categoryId)}
                    {...category}
                  />
                ))}
              </Table>
            </>
          ) : (
            <span className="block h-20 text-center leading-20">
              No Category Found!!!
            </span>
          )}
        </div>
        {filteredCategories?.length ? (
          <Pagination
            itemsPerPage={ITEMS_PER_PAGE}
            items={filteredCategories}
            setCurrentPageItems={setCurrentPageCategories}
          />
        ) : null}
      </section>
    </>
  );
}

export default CategoryList;
