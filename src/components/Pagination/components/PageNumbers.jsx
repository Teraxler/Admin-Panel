import PaginationButton from "./PaginationButton";

const PageNumbers = ({ currentPage, setCurrentPage, countPages }) => {
  const buttons = [];

  let startIndex = currentPage - 2;
  if (startIndex < 1) startIndex = 1;

  let endIndex = currentPage + 2;
  if (endIndex > countPages) endIndex = countPages;

  for (let i = startIndex; i <= endIndex; i++) {
    buttons.push(
      <PaginationButton
        arial-label={`Page ${i}`}
        key={i}
        isActive={currentPage === i}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </PaginationButton>,
    );
  }

  return buttons;
};

export default PageNumbers;
