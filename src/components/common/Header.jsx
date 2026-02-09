import { API_URL } from "@/constants";
import { useScroll } from "@/hooks/useScroll";

function Header({ onClick }) {
  const offset = useScroll();

  return (
    <header
      className={`flex justify-between py-3 px-4 sm:px-6 lg:px-8 sticky top-0 bg-white z-10 transition-shadow duration-75 ${
        offset > 0 ? "shadow-md" : ""
      }`}
    >
      <div
        className="btn btn--square btn--secondary xs:hidden"
        onClick={onClick}
      >
        <svg className="size-5 lg:size-6">
          <use href="#bars-3"></use>
        </svg>
      </div>
      <div className="flex gap-x-2 ml-auto">
        <div className="btn btn--square btn--secondary relative">
          <div className="absolute size-1.5 lg:size-2 rounded-full bg-racing-red right-2 top-2"></div>
          <svg className="size-5 lg:size-6">
            <use href="#bell"></use>
          </svg>
        </div>
        <div className="btn btn--square btn--secondary">
          <svg className="size-5 lg:size-6">
            <use href="#envelop"></use>
          </svg>
        </div>
        <div className="btn btn--small btn--secondary max-lg:h-9">
          <div className="rounded-xs overflow-hidden size-5 lg:size-6">
            <img
              src={`${API_URL}/images/customers/customer1.png`}
              alt="User Profile"
            />
          </div>
          <span className="line-clamp-1">Derek Alvarado</span>
          <svg className="size-4 lg:size-5">
            <use href="#chevron-down"></use>
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;
