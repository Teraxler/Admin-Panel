import { Link } from "react-router";
import { formattingDateTime, normalizeDateTime } from "@/utils/dateTime.util";
import AlertModalWarning from "@/components/AlertModalWarning";

const statusColor = {
  canceled: "bg-red-100 text-red-700",
  delivered: "bg-green-100 text-green-700",
  "in progress": "bg-blue-100 text-blue-700",
};

function TableRowOrder({
  orderId,
  number,
  discountPercent,
  status,
  createdAt,
  deliveredAddress,
  itemCount,
  totalPrice,
  userName,
  userFamily,
  onDelete,
  noAction = false,
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
          title={userName || userFamily ? `${userName} ${userFamily}` : ""}
        >
          {userName || userFamily ? `${userName} ${userFamily}` : "Unknown"}
        </span>
      </td>
      <td>
        <span className="line-clamp-1 w-max mx-auto">
          {`${formattedDateTime.monthName.slice(0, 3)} ${formattedDateTime.day}, ${formattedDateTime.year}`}
        </span>
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
        <span
          className={`line-clamp-1 w-max py-0.5 px-2 mx-auto rounded-lg ${statusColor[status]}`}
        >
          {status}
        </span>
      </td>
      {!noAction ? (
        <td>
          <div className="flex justify-center gap-x-2">
            <Link
              to={`/orders/${orderId}`}
              className="btn btn--square btn--secondary"
            >
              <svg className="size-4 lg:size-5">
                <use href="#arrow-up-right"></use>
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
      ) : null}
    </tr>
  );
}

export default TableRowOrder;
