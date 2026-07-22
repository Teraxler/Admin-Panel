import { useState } from "react";
import { toast } from "sonner";
import { API_URL, ITEMS_PER_PAGE } from "@/constants";
import { removeItemFromList, generateNumbers } from "@/utils/array.util";
import { Table, Pagination } from "@/components/ui";
import ProductTableRowSkeleton from "./ProductTableRowSkeleton";
import ProductTableRow from "./ProductTableRow";

const tableColumns = [
  "#",
  "Cover",
  "Name",
  "Category",
  "Description",
  "Price",
  "Inventory",
];

const removeProductById = (products, id) =>
  removeItemFromList(products, "productId", id);

function ProductTable({ products, setProducts, isProductsLoaded }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);

  const calculateItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  async function handleDeleteProduct(productId) {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setProducts((prevProducts) => removeProductById(prevProducts, productId));

      toast.success("Product delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  return (
    <div className="p-2 sm:p-4 bg-white rounded-lg">
      <div className="overflow-x-auto">
        <Table columns={tableColumns}>
          {isProductsLoaded
            ? currentPageProducts.map((product, i) => (
                <ProductTableRow
                  key={product.productId}
                  number={calculateItemNumber(i)}
                  onDelete={() => handleDeleteProduct(product.productId)}
                  {...product}
                />
              ))
            : generateNumbers(5, 1).map((item) => (
                <ProductTableRowSkeleton key={item} />
              ))}
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        items={products}
        itemsPerPage={ITEMS_PER_PAGE}
        setCurrentPageItems={setCurrentPageProducts}
      />

      {isProductsLoaded && !currentPageProducts?.length ? (
        <span className="h-20 block text-center leading-20">
          No Product Found!!!
        </span>
      ) : null}
    </div>
  );
}

export default ProductTable;
