import { Link } from "react-router";
import AlertModalWarning from "../AlertModalWarning";

function TableRowCategory({ number, categoryId, name, onDelete }) {
  return (
    <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2">
      <td>
        <span className="line-clamp-1">{number}</span>
      </td>
      <td>
        <span className="line-clamp-1 capitalize">{name}</span>
      </td>
      <td>
        <div className="flex justify-center gap-x-2">
          {/* <Link
            to={`${categoryId}`}
            className="size-10 flex items-center justify-center border border-pale-slate rounded-lg text-carbon-black cursor-pointer"
          >
            <svg className="size-5">
              <use href="#arrow-up-right"></use>
            </svg>
          </Link> */}
          <Link
            to={`${categoryId}`}
            className="size-9 lg:size-10 flex items-center justify-center border border-pale-slate rounded-lg text-carbon-black cursor-pointer"
          >
            <svg className="size-4 lg:size-5">
              <use href="#pencil-square"></use>
            </svg>
          </Link>
          <AlertModalWarning
            title={"Are you sure want to delete category?"}
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

export default TableRowCategory;
