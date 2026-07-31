const PaginationButton = ({
  children,
  isActive,
  isDisabled,
  onClick,
  "arial-label": ariaLabel,
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
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
