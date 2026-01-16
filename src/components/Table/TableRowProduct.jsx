import { Link } from "react-router";
import AlertModalWarning from "../AlertModalWarning";
import { API_URL } from "../../constants";

function TableRowProduct({
  productId,
  name,
  categoryName,
  cover,
  description,
  price,
  number,
  inventory,
  onDelete,
}) {
  return (
    <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2 capitalize">
      <td>
        <span className="line-clamp-1">{number}</span>
      </td>
      <td>
        <div className="flex items-center justify-center size-12 sm:size-15 lg:size-18 mx-auto">
          <img
            className="max-h-full rounded-sm"
            src={`${API_URL}/images/products/${cover}`}
          />
        </div>
      </td>
      <td>
        <span className="line-clamp-1" title={name}>
          {name}
        </span>
      </td>
      <td>
        <span
          className="line-clamp-1 min-w-25 sm:min-w-37.5"
          title={categoryName}
        >
          {categoryName ?? "___"}
        </span>
      </td>
      <td>
        <span className="line-clamp-1" title={description}>
          {description}
        </span>
      </td>
      <td>
        <span className="line-clamp-1">${price}</span>
      </td>
      <td>
        <span className="line-clamp-1">{inventory}</span>
      </td>
      <td>
        <div className="flex justify-center gap-x-2">
          {/* <Link
            to={`${productId}`}
            className="size-10 flex items-center justify-center border border-pale-slate rounded-lg text-carbon-black cursor-pointer"
          >
            <svg className="size-5">
              <use href="#arrow-up-right"></use>
            </svg>
          </Link> */}
          <Link
            to={`${productId}`}
            className="size-9 lg:size-10 flex items-center justify-center border border-pale-slate rounded-lg text-carbon-black cursor-pointer"
          >
            <svg className="size-4 lg:size-5">
              <use href="#pencil-square"></use>
            </svg>
          </Link>
          <AlertModalWarning
            title={"Are you sure want to delete product?"}
            description={"This can't be undo!!"}
            onConfirm={onDelete}
          >
            <button className="size-9 lg:size-10 flex items-center justify-center border border-pale-slate rounded-lg text-carbon-black cursor-pointer">
              <svg className="size-4 lg:size-5">
                <use href="#trash"></use>
              </svg>
            </button>
          </AlertModalWarning>
        </div>
      </td>
    </tr>
  );
}

export default TableRowProduct;
