import React, { useState } from "react";
import { generateNumbers, removeItemFromList } from "@/utils/array.util";
import { Pagination, Table } from "@/components/ui";
import CategoryTableRow from "./CategoryTableRow";
import CategoryTableRowSkeleton from "./CategoryTableRowSkeleton";
import { API_URL, ITEMS_PER_PAGE } from "@/constants";

const tableColumns = ["#", "Category"];

const removeCategoryById = (categories, id) =>
  removeItemFromList(categories, "categoryId", id);

function CategoryTable({ categories, setCategories, isCategoriesLoaded }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCategories, setCurrentPageCategories] = useState([]);

  const calculateItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  async function deleteCategory(categoryId) {
    try {
      const response = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setCategories((prevCategories) =>
        removeCategoryById(prevCategories, categoryId),
      );
      toast.success("Category delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  return (
    <div className="p-2 sm:p-4 bg-white rounded-lg">
      <Table columns={tableColumns}>
        {isCategoriesLoaded
          ? currentPageCategories.map((category, i) => (
              <CategoryTableRow
                key={category.categoryId}
                number={calculateItemNumber(i)}
                onDelete={() => deleteCategory(category.categoryId)}
                {...category}
              />
            ))
          : generateNumbers(5, 1).map((number) => (
              <CategoryTableRowSkeleton key={number} />
            ))}
      </Table>
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        items={categories}
        setCurrentPageItems={setCurrentPageCategories}
      />

      {isCategoriesLoaded && !currentPageCategories?.length ? (
        <span className="block h-20 text-center leading-20">
          No Category Found!!!
        </span>
      ) : null}
    </div>
  );
}

export default CategoryTable;
