const Skeleton = ({ className = "w-full h-full rounded" }) => {
  return (
    <div className={`bg-gray-200 animate-pulse mx-auto ${className}`}></div>
  );
};

export default Skeleton;
