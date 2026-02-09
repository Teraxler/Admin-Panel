import { Link } from "react-router";
import { formattingDateTime, normalizeDateTime } from "@/utils/dateTime";
import AlertModalWarning from "@/components/AlertModalWarning";

function TableRowCustomer({
  number,
  customerId,
  name,
  family,
  username,
  email,
  phone,
  birthday,
  onDelete,
}) {
  const normalizedDateTime = birthday && normalizeDateTime(birthday);
  const birthdayDateTime = birthday && formattingDateTime(normalizedDateTime);

  return (
    <>
      <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2">
        <td>
          <span className="line-clamp-1">{number}</span>
        </td>
        <td>
          <span
            className="line-clamp-1 capitalize min-w-30"
            title={`${name} ${family}`}
          >
            {name} {family}
          </span>
        </td>
        <td>
          <span className="line-clamp-1" title={username}>
            {username}
          </span>
        </td>
        <td>
          <span className="line-clamp-1" title={email}>
            {email}
          </span>
        </td>
        <td>
          <span className="line-clamp-1" title={phone}>
            {phone ?? "___"}
          </span>
        </td>
        <td>
          <span className="line-clamp-1" title={birthdayDateTime?.date}>
            {birthdayDateTime?.date ?? "___"}
          </span>
        </td>
        <td>
          <div className="flex justify-center gap-x-2">
            <Link
              to={`${customerId}`}
              className="btn btn--square btn--secondary"
            >
              <svg className="size-4 lg:size-5">
                <use href="#pencil-square"></use>
              </svg>
            </Link>
            <AlertModalWarning
              title={"Are you sure want to delete customer?"}
              description={"This can't be undo!!"}
              onConfirm={onDelete}
            >
              <button className="btn btn--square btn--secondary">
                <svg className="size-4 lg:size-5">
                  <use href="#trash"></use>
                </svg>
              </button>
            </AlertModalWarning>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableRowCustomer;
