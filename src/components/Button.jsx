const Button = ({ children, type = "button" }) => {
  return (
    <button
      className="uppercase border border-neutral-400 rounded-lg p-2.5 lg:p-4 cursor-pointer"
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
