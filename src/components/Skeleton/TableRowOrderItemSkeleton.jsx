import Skeleton from "./Skeleton";

const TableRowOrderItemSkeleton = () => {
  return (
    <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2 capitalize">
      <td>
        <Skeleton className="w-5 lg:w-6 h-3.5 lg:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="size-12 sm:size-15 lg:size-18 rounded" />
      </td>
      <td>
        <Skeleton className="w-21 lg:w-25 h-3.5 lg:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-5 lg:w-6 h-3.5 lg:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-6 lg:w-7 h-3.5 lg:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-7 lg:w-8 h-3.5 lg:h-4 rounded" />
      </td>
    </tr>
  );
};

export default TableRowOrderItemSkeleton;
