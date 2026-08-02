import { useState } from "react";
import { Link } from "react-router";
import { API_URL } from "@/constants";
import { searchProduct } from "@/utils/searchUtil";
import { useFetch } from "@/hooks/useFetch";
import { useToastMessage } from "@/hooks/useToastMessage";
import { SearchBar } from "@/components";
import { Head, Breadcrumb } from "@/components/ui";
import { ProductTable } from "../components";

function ProductListPage() {
  useToastMessage();

  const [filteredProducts, setFilteredProducts] = useState([]);

  const { data: products, isLoaded: isProductsLoaded } = useFetch(
    `${API_URL}/products`,
  );

  return (
    <>
      <Head>
        <title>Admin Panel - Products</title>
      </Head>

      <div>
        <h1 className="title">Products</h1>
        <Breadcrumb />
      </div>
      <section className="mt-8">
        <div className="flex justify-between mb-4">
          <Link
            aria-label="New Product"
            to={"/products/create"}
            className="btn btn--small btn--primary"
          >
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="hidden sm:inline">New Product</span>
          </Link>
          <SearchBar
            items={products}
            handleSearch={searchProduct}
            isItemsLoaded={isProductsLoaded}
            setFilteredItems={setFilteredProducts}
            placeholder={"Search (name, category)"}
          />
        </div>

        <ProductTable
          products={filteredProducts}
          setProducts={setFilteredProducts}
          isProductsLoaded={isProductsLoaded}
        />
      </section>
    </>
  );
}

export default ProductListPage;
