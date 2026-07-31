import { useState } from "react";
import { Link } from "react-router";
import { API_URL } from "@/constants";
import { searchCategory } from "@/utils/searchUtil";
import { useFetch } from "@/hooks/useFetch";
import { useToastMessage } from "@/hooks/useToastMessage";
import { Head, SearchBar, Breadcrumb } from "@/components/ui";
import { CategoryTable } from "../components";

function CategoryListPage() {
  useToastMessage();
  const [filteredCategories, setFilteredCategories] = useState([]);

  const { data: categories, isLoaded: isCategoriesLoaded } = useFetch(
    `${API_URL}/categories`,
  );

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
            aria-label="New Category"
            to={"/categories/create"}
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
            isItemsLoaded={isCategoriesLoaded}
            setFilteredItems={setFilteredCategories}
          />
        </div>
        <CategoryTable
          categories={filteredCategories}
          setCategories={setFilteredCategories}
          isCategoriesLoaded={isCategoriesLoaded}
        />
      </section>
    </>
  );
}

export default CategoryListPage;
