import { useState } from "react";
import { searchProduct } from "@/utils/searchUtil";
import { SearchBar } from "@/components";
import { Head, Breadcrumb } from "@/components/ui";
import { ProductTable } from "../../features/product/components";
import Link from "next/link";
import { getAllProducts } from "@/features/product/productService";
import { useFetch } from "@/hooks/useFetch";
import { useStorageContext } from "@/context/StorageContext";

function ProductListPage() {
  const storageContext = useStorageContext();

  const { data: products, status } = useFetch({
    fn: async () => await getAllProducts(storageContext),
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
            isItemsLoaded={status === "success"}
            setFilteredItems={setFilteredProducts}
            placeholder={"Search (name, category)"}
          />
        </div>

        <ProductTable
          products={filteredProducts}
          setProducts={setFilteredProducts}
          isProductsLoaded={status === "success"}
        />
      </section>
    </>
  );
}

export default ProductListPage;
