import { Link } from "react-router";
import { BASE_URL } from "@/constants";
import AlertModalWarning from "@/components/AlertModalWarning";

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
            className="max-h-full rounded-lg"
            src={`${BASE_URL}/images/products/${cover}`}
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
          <Link
            to={`/products/${productId}`}
            className="btn btn--square btn--secondary"
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
            <button className="btn btn--square btn--secondary">
              <svg className="size-4 lg:size-5 text-red-600">
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
