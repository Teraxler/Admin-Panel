import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { API_URL, ITEMS_PER_PAGE } from "@/constants";
import { removeItemFromList, searchCategory } from "@/utils/array.util";
import useFetch from "@/hooks/useFetch";
import { useToastMessage } from "@/hooks/useToastMessage";
import Head from "@/components/common/Head";
import Table from "@/components/Table/Table";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination/Pagination";
import TableRowCategory from "@/components/Table/TableRowCategory";

const tableColumns = ["#", "Category", ""];

const removeCategoryById = (categories, id) =>
  removeItemFromList(categories, "categoryId", id);

function CategoryList() {
  useToastMessage();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPageCategories, setCurrentPageCategories] = useState([]);

  const calcItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  const { data: categories, isLoaded: isCategoriesLoaded } = useFetch(
    `${API_URL}/categories`,
  );

  async function deleteCategoryHandler(categoryId) {
    try {
      const response = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setFilteredCategories((prevCategories) =>
        removeCategoryById(prevCategories, categoryId),
      );
      toast.success("Category delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Categories</title>
      </Head>
      <div>
        <h1 className="title">Categories</h1>
        <Breadcrumb />
      </div>
      <section className="mt-8">
        <div className="flex justify-between mb-4">
          <Link to={"create"} className="btn btn--small btn--primary">
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="hidden sm:inline">New Category</span>
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
                    number={calcItemNumber(i)}
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
          {filteredCategories?.length ? (
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              items={filteredCategories}
              setCurrentPageItems={setCurrentPageCategories}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

export default CategoryList;
