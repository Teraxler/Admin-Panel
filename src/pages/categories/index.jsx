import { useState } from "react";
import Link from "next/link";
import { searchCategory } from "@/utils/searchUtil";
import { SearchBar } from "@/components";
import { Head, Breadcrumb } from "@/components/ui";
import { CategoryTable } from "@/features/category/components";
import { getAllCategories } from "@/features/category/categoryService";

export const getServerSideProps = async () => {
  const categories = await getAllCategories();

  return {
    props: { categories },
  };
};

function CategoryListPage({ categories }) {
  const [filteredCategories, setFilteredCategories] = useState([]);

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
          <Link
            href="/categories/create"
            aria-label="New Category"
            className="btn btn--small btn--primary"
          >
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="hidden sm:inline">New Category</span>
          </Link>
          <SearchBar
            items={categories}
            placeholder="Search (category)"
            handleSearch={searchCategory}
            isItemsLoaded={true}
            setFilteredItems={setFilteredCategories}
          />
        </div>
        <CategoryTable
          categories={filteredCategories}
          setCategories={setFilteredCategories}
          isCategoriesLoaded={true}
        />
      </section>
    </>
  );
}

export default CategoryListPage;
