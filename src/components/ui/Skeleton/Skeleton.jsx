const Skeleton = ({ className, children }) => {
  return (
    <div role="skeleton" className={`skeleton mx-auto ${className}`}>{children}</div>
  );
};

export default Skeleton;
