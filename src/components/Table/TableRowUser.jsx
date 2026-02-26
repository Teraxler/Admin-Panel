import { Link } from "react-router";
import { formattingDateTime, normalizeDateTime } from "@/utils/dateTime";
import AlertModalWarning from "@/components/AlertModalWarning";
import { phoneFormat } from "@/utils/string.util";

function TableRowUser({
  number,
  userId,
  name,
  family,
  username,
  email,
  phone,
  birthday,
  onDelete,
}) {
  const normalizedDateTime = birthday && normalizeDateTime(birthday);
  const formatedDateTime = birthday && formattingDateTime(normalizedDateTime);

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
          <span className="line-clamp-1 w-max mx-auto" title={phone}>
            {phone ? phoneFormat(phone) : "___"}
          </span>
        </td>
        <td>
          <span className="line-clamp-1 w-max mx-auto">
            {formatedDateTime
              ? `${formatedDateTime.monthName.slice(0, 3)} ${formatedDateTime.day}, ${formatedDateTime.year}`
              : "___"}
          </span>
        </td>
        <td>
          <div className="flex justify-center gap-x-2">
            <Link to={userId} className="btn btn--square btn--secondary">
              <svg className="size-4 lg:size-5">
                <use href="#pencil-square"></use>
              </svg>
            </Link>
            <AlertModalWarning
              title={"Are you sure want to delete user?"}
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
    </>
  );
}

export default TableRowUser;
