const Overlay = ({ onClick }) => {
  return (
    <div className="bg-black/40 inset-0 absolute z-5" onClick={onClick}></div>
  );
};

export default Overlay;
