import { Link } from "react-router";
import AlertModalWarning from "../AlertModalWarning";
import { API_URL } from "../../constants";
import {
  formattingDateTime,
  getDateTime,
  normalizeDateTime,
} from "../../utils/dateTime";

function TableRowOrder({
  number,
  orderId,
  discountPercent,
  status,
  createdAt,
  deliveredAddress,
  itemCount,
  totalPrice,
  customerName,
  customerFamily,
  onDelete,
}) {
  const normalizedDateTime = normalizeDateTime(createdAt);
  const formattedDateTime = formattingDateTime(normalizedDateTime);

  return (
    <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2 capitalize">
      <td>
        <span className="line-clamp-1">{number}</span>
      </td>
      <td>
        <span
          className="line-clamp-1 capitalize min-w-30"
          title={`${customerName} ${customerFamily}`}
        >
          {customerName} {customerFamily}
        </span>
      </td>
      <td>
        <span className="line-clamp-1">{formattedDateTime.date}</span>
      </td>
      <td>
        <span className="line-clamp-1 min-w-50" title={deliveredAddress}>
          {deliveredAddress}
        </span>
      </td>
      <td>
        <span className="line-clamp-1">{discountPercent}%</span>
      </td>
      <td>
        <span className="line-clamp-1">{itemCount}</span>
      </td>
      <td>
        <span className="line-clamp-1">${totalPrice}</span>
      </td>
      <td>
        <span className="line-clamp-1 min-w-25">{status}</span>
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
            to={``}
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

export default TableRowOrder;
