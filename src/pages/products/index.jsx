import { useState } from "react";
import { searchProduct } from "@/utils/searchUtil";
import { SearchBar } from "@/components";
import { Head, Breadcrumb } from "@/components/ui";
import { ProductTable } from "../../features/product/components";
import Link from "next/link";
import { getAllProducts } from "@/features/product/productService";
import { useFetch } from "@/hooks/useFetch";

function ProductListPage() {
  const { data: products, status: productsStatus } = useFetch({
    fn: getAllProducts,
    dependencies: [],
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

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
            href={"/products/create"}
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
            isItemsLoaded={productsStatus === "success"}
            setFilteredItems={setFilteredProducts}
            placeholder={"Search (name, category)"}
          />
        </div>

        <ProductTable
          products={filteredProducts}
          setProducts={setFilteredProducts}
          isProductsLoaded={productsStatus === "success"}
        />
      </section>
    </>
  );
}

export default ProductListPage;
