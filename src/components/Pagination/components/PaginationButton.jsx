const PaginationButton = ({ children, isActive, isDisabled, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${isDisabled ? "pointer-events-none opacity-40" : ""}
      ${
        isActive
          ? "bg-full-spectrum-blue text-white"
          : "bg-white hover:bg-full-spectrum-blue text-full-spectrum-blue hover:text-white"
      } flex items-center justify-center size-9 lg:size-10 p-2 text-sm uppercase border border-full-spectrum-blue rounded-lg transition cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
