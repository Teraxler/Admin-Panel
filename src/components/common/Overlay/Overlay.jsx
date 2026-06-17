const Overlay = ({ onClick, className, isTransparent = false }) => {
  return (
    <div
      className={`${isTransparent ? "bg-transparent" : "bg-black/40"} inset-0 absolute z-5 ${className}`}
      onClick={onClick}
    ></div>
  );
};

export default Overlay;
