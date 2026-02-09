import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { API_URL, ITEMS_PER_PAGE } from "@/constants";
import { searchProduct, removeItemFromList } from "@/utils/array.util";
import useFetch from "@/hooks/useFetch";
import { useTitle } from "@/hooks/useTitle";
import { useToastMessage } from "@/hooks/useToastMessage";
import Table from "@/components/Table/Table";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination/Pagination";
import TableRowProduct from "@/components/Table/TableRowProduct";

const tableColumns = [
  "#",
  "Cover",
  "Name",
  "Category",
  "Description",
  "Price",
  "Inventory",
  "",
];

const removeProductById = (products, id) =>
  removeItemFromList(products, "productId", id);

function ProductList() {
  useTitle("Admin Panel - Products");
  useToastMessage();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);

  const calcItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  const { data: products, isLoaded: isProductsLoaded } = useFetch(
    `${API_URL}/products`,
  );

  async function deleteProductHandler(productId) {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setFilteredProducts((prevProducts) =>
        removeProductById(prevProducts, productId),
      );

      toast.success("Product delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  return (
    <>
      <div>
        <h1 className="title">Products</h1>
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
              New Product
            </span>
          </Link>
          <SearchBar
            items={products}
            searchHandler={searchProduct}
            isItemsLoaded={isProductsLoaded}
            setFilteredItems={setFilteredProducts}
            placeholder={"Search (name, category)"}
          />
        </div>
        <div className="p-2 sm:p-4 bg-white rounded-lg">
          <div className="overflow-x-auto">
            {isProductsLoaded && filteredProducts?.length ? (
              <Table columns={tableColumns}>
                {currentPageProducts.map((product, i) => (
                  <TableRowProduct
                    key={product.productId}
                    number={calcItemNumber(i)}
                    onDelete={() => deleteProductHandler(product.productId)}
                    {...product}
                  />
                ))}
              </Table>
            ) : (
              <span className="h-20 block text-center leading-20">
                No Product Found!!!
              </span>
            )}
          </div>
          {filteredProducts?.length ? (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              items={filteredProducts}
              itemsPerPage={ITEMS_PER_PAGE}
              setCurrentPageItems={setCurrentPageProducts}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

export default ProductList;
