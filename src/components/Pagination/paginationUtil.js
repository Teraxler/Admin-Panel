const paginateItems = (items, currentPage, itemsPerPage) => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;

  return items?.slice(start, end) ?? [];
};

export { paginateItems };
