import { useEffect, useState } from "react";
import PaginationButton from "./components/PaginationButton";
import { paginateItems } from "../../utils/array.util";

const Pagination = ({ items, setCurrentPageItems, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const countPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    setCurrentPageItems(() => paginateItems(items, currentPage, itemsPerPage));
  }, [currentPage, items]);

  useEffect(() => setCurrentPage(1), [countPages]);

  const nextPage = () => setCurrentPage((currentPage) => currentPage + 1);
  const previousPage = () => setCurrentPage((currentPage) => currentPage - 1);

  const renderPageNumbers = () => {
    const buttons = [];

    let startIndex = currentPage - 2;
    if (startIndex < 1) startIndex = 1;

    let endIndex = currentPage + 2;
    if (endIndex > countPages) endIndex = countPages;

    for (let i = startIndex; i <= endIndex; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          isActive={currentPage === i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    return buttons;
  };

  return countPages > 1 ? (
    <div className="flex justify-center gap-x-2 mt-10">
      <PaginationButton isDisabled={currentPage === 1} onClick={previousPage}>
        <svg className="size-5 rotate-90">
          <use href="#chevron-down"></use>
        </svg>
      </PaginationButton>

      {renderPageNumbers()}

      <PaginationButton
        isDisabled={currentPage === countPages}
        onClick={nextPage}
      >
        <svg className="size-5 -rotate-90">
          <use href="#chevron-down"></use>
        </svg>
      </PaginationButton>
    </div>
  ) : null;
};

export default Pagination;
