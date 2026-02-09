const PaginationButton = ({ children, isActive, isDisabled, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn btn--square ${
        isDisabled
          ? "btn--disabled"
          : isActive
            ? "btn--primary"
            : "btn--secondary text-text-normal"
      }`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
